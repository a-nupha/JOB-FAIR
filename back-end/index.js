const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// const http = require('http');
const PORT = process.env.PORT || 5001;
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const crypto = require('crypto');
const assert = require('assert');
const fs = require('fs');
const bodyParser = require('body-parser');

const users = require('./controller/userController')
const register = require('./controller/registerController')
// const booking = require('./controller/bookingController')
// const clients = require('./controller/clientController')
// const contractors = require('./controller/contractorController')
const jobs = require('./controller/jobController')
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

const connection = mysql.createPool(dbConfig.db_config);

// app.post("/register_", (req, res) => {
//     const request = req.body
//     let user_data = {
//         username: request.username,
//         position: "admin"
//     }
//     // const token = jwt.sign(user_data, process.env.TOKEN_SECRET, { expiresIn: '5m' });
//     const token = functions.generateAccessToken(user_data);
//     // console.log("token --> ", token)

//     res.send({
//         username: req.body.username,
//         token: token
//     });
// });

app.post("/api/login", register.logIn);

app.get("/api/users", users.getUsers)

app.get("/api/jobs", jobs.getJobs)

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

            if (files.length > 1) {
                for (const f of files) {
                    let name = f.name.split(".")[0]
                    f.mv('./assets/uploads/' + name + ".jpg");
                    response.push({
                        name: f.name,
                        mimetype: f.mimetype,
                        size: f.size
                    })
                }
            } else {
                let name = files.name.split(".")[0]
                files.mv('./assets/uploads/' + name + ".jpg");
                response.push({
                    name: files.name,
                    mimetype: files.mimetype,
                    size: files.size
                })
            }
            //send response
            res.status(200).send({
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

app.post("/api/register", register.insertUsers)
// app.use('/api/users', [users, register, clients, contractors]);