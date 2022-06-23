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

    res.json(req.body.uk)

})