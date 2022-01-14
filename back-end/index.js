const express = require("express");
const users = require('./controller/userController')
const register = require('./controller/registerController')
const booking=require('./controller/bookingController')
const clients=require('./controller/clientController')
const contractors=require('./controller/contractorController')
const jobs=require('./controller/jobController')
const app=express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());



app.use('/api', [booking,jobs]);
app.use('/api/users', [users,register,clients,contractors]);

app.use(cors());
app.use(express.json());

app.listen(PORT, function () {
    console.log(`server is running ${PORT}`);
})

app.get("/test", (req, res) => {
    let result = [{ "name": "noppadol" }]
    res.send(result);
});