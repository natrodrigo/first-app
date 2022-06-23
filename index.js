const express = require('express');
const cors = require('cors')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const app = express();

const PORT = process.env.PORT || 5500;

app.use(cors())

app.listen(PORT,() => {
    console.log(`Server is running in port ${PORT}`)
});

app.get('/',(req,res) =>{
    res.json({
        msg:'Welcome to my API.'
    })

})

app.post('/post',jsonParser,(req,res) =>{
    let result = req.body.value*2

    res.json({result})

})