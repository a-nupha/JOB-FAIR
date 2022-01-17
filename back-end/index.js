const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const http = require('http');
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const crypto = require('crypto');
const assert = require('assert');
const fs = require('fs');
const bodyParser = require('body-parser');

// const users = require('./controller/userController')
// const register = require('./controller/registerController')
// const booking = require('./controller/bookingController')
// const clients = require('./controller/clientController')
// const contractors = require('./controller/contractorController')
// const jobs = require('./controller/jobController')
const functions = require('./functions')
const dbConfig = require('./config/db')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true
}));

app.listen(PORT, function () {
    console.log(`server is running ${PORT}`);
})

const db_config = {
    user: "wasun_199",
    host: "db4free.net",
    password: "WAsun@123",
    database: "job_fair",
};

var connection = mysql.createPool(db_config);

app.post("/register", (req, res) => {
    const request = req.body
    let user_data = {
        username: request.username,
        position: "admin"
    }
    // const token = jwt.sign(user_data, process.env.TOKEN_SECRET, { expiresIn: '5m' });
    const token = functions.generateAccessToken(user_data);
    // console.log("token --> ", token)

    res.send({
        username: req.body.username,
        token: token
    });
});

app.post("/login", async (req, res) => {
    // const header_bearer = req.headers['authorization']
    // const validateToken = functions.validateToken(functions.getTokenfromBearer(header_bearer))

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const validateToken = await functions.validateToken(token);
    console.log("validateToken --> ", validateToken.success)
    if (!validateToken.success) {
        // if (validateToken == null) return res.sendStatus(401)
        res.status(401);
    }

    res.status(200).json({ isSuccess: validateToken.success });

    // const verifyToken = await functions.authenticateToken(token)
    // if (!validateToken.success) {
    //     res.status(400).json(validateToken);
    // } else {
    //     res.status(200).json(validateToken);
    // }
});

app.post("/encryptpassword", async (req, res) => {
    let algorithm = process.env.ALGORITHM; // or any other algorithm supported by OpenSSL // key 1
    let key = process.env.SECRET_KEY; // key 2
    let text = 'WAsun123'; // รหัสผ่าน

    let cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    let decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

    // console.log("cipher --> ", cipher) 
    console.log("encrypted --> ", encrypted)
    // console.log("decipher --> ", decipher) 
    console.log("decrypted --> ", decrypted)

    // assert.equal(decrypted, text);
    res.status(200).json(decrypted);
});

app.post("/decryptpassword", async (req, res) => {
    let algorithm = process.env.ALGORITHM; // or any other algorithm supported by OpenSSL // key 1
    let key = process.env.SECRET_KEY; // key 2
    let text = 'WAsun123'; // รหัสผ่าน

    let saved_password = "538f94fad35152aa1b4a89799e050478"

    let cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');


    let decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(saved_password, 'hex', 'utf8') + decipher.final('utf8');

    let check_password_1 = req.body.password == decrypted
    let check_password_2 = encrypted == saved_password

    // console.log("cipher --> ", cipher) 
    // console.log("encrypted --> ", encrypted)
    // console.log("decipher --> ", decipher) 
    // console.log("decrypted --> ", decrypted)

    // assert.equal(decrypted, text);
    res.status(200).json({
        type_1: check_password_1,
        type_2: check_password_2
    });
});

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig.db_config); // Recreate the connection, since
    // the old one cannot be reused.
    connection.connect(function (err) {              // The server is either down
        if (err) {                                      // or restarting (takes a while sometimes).
            console.log(' Error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000);         // We introduce a delay before attempting to reconnect,
        }                                               // to avoid a hot loop, and to allow our node script to
    });                                             // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('  Database Error', function (err) {
        console.log('db error: ' + err.code, err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                       // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                // server variable configures this)
        }
    });
}


app.get("/jobs", async (req, res) => {
    connection.query("SELECT * FROM jobs", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err })
        } else {
            res.status(200).json(result)
        }
    });
})

app.post('/api/photos', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let response = []
            let files = req.files.files;
            console.log("files --> ", files)

            if (files.length > 1) {
                for (const f of files) {
                    let name = f.name.split(".")[0]
                    f.mv('./assets/uploads/' + name + ".jpg");
                }
            } else {
                let name = files.name.split(".")[0]
                files.mv('./assets/uploads/' + name + ".jpg");
            }
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: response
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/photos', async (req, res) => {
    const filename = req.query.filename
    const contents = fs.readFileSync(`./assets/uploads/${filename}.jpg`, { encoding: 'base64' });
    res.send(contents)
})
// app.use('/api/users', [users, register, clients, contractors]);