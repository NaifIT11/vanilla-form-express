const express = require("express");
const path = require("path")
const bodyParser = require('body-parser')
app =  express();


app.use("/assets", express.static(path.join(__dirname , 'views/assets')));

app.use(bodyParser.json());

app.get("/" , (req , res) => {
    console.log(`GET / ${res.statusCode}`)
    res.sendFile(path.join(__dirname , "views/index.html"))
});

app.post("/api/auth" , (req , res) => {
    console.log(`POST /api/auth`);
    const form = req.body;

    if(form.email !== "ahmed@gmail.com"){
        res.json({err: true , message: "invalid data"})
    }
    if(form.password !== "112233"){
        res.json({err: true , message: "invalid data"})
    }

    res.json({err: false , message: "data correct (:"})
})



app.listen(5000 , () => {
    console.log("server is running on port 5000")
})