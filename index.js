const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5500;
const jsonParser = bodyParser.json()

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
    let respost = eval(req.body.value*2)

    res.json({respost})

})