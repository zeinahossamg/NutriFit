const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.sendFile("./payment & Billing.html", { root: __dirname })
})



mongoose
.connect("mongodb+srv://sedouky123:sedouky123@cluster0.gu5krui.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then(function () { 
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`)
    })
})
.catch(function (err) {console.log(err) });