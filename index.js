const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5500;


const jsonParser = bodyParser.json()

app.listen(PORT,() => {
    console.log(`Server is running in port ${PORT}`)
});

app.get('/',(req,res) =>{
    res.json({
        msg:'Welcome to my API.'
    })

})

app.post('/post',jsonParser,(req,res) =>{
    let a = eval(req.body.value1*req.body.value2)

    res.json(a)

})