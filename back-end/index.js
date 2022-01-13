const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const http = require('http');
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.listen(PORT, function () {
    console.log(`server is running ${PORT}`);
})

app.get("/test", (req, res) => {
    let result = [{ "name": "noppadol" }]
    res.send(result);
});