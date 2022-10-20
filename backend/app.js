const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { dbConnect } = require('./db/connection');
try {
    dbConnect();
}
catch (err) {
    console.log("database not connected due to : "+err);
}
// app.get("/", (req, res) => {
    
    
//     res.json({ test: "Am working" })

    
// })
app.get("/", (req, res) => {
    const all = User.find().toArray()
    
    res.json(all)

})
app.post("/", (req, res, next) => {
    console.log(req.body);
    const { first_name,last_name, email,password } = req.body;
    const us1 = new User();
    us1.email = email;
    us1.first_name = first_name;
    us1.last_name = last_name;
    us1.password=password
    us1.save();
    res.json(us1);
})


app.use(('*'), (req, res, next) => {
    next(new Error('Route Not found'))
    
})

app.use((err, req, res, next) => {
    

    res.json({error:err.message})
})



app.listen(process.env.PORT||3000, () => {
    console.log("running on port 3000");
})