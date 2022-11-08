const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "pul",
    password: "admin",
    database: "crud_express"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const {id} = req.params
    const sqlDelete = "DELETE FROM contact_db where id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) console.log(err)
    });
});

app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ? ,?)"
    db.query(sqlInsert, [name, email, contact], (err, result)=> {
        if(err){
            console.log(err)
        }
    });
});

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? where id = ?"
    db.query(sqlUpdate, [name, email, contact, id], (err, result)=> {
        if(err){
            console.log(err)
        }
    });
});

app.listen(5000, () => {
    console.log("Server is running");
});