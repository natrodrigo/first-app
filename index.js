const express = require('express');
const cors = require('cors')
const axios = require('axios');
const bodyParser = require('body-parser');


const jsonParser = bodyParser.json()

const app = express();

const PORT = process.env.PORT || 5500;

app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
});

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to my API.'
    })

})

app.post('/post', jsonParser, (req, res) => {
    let uk = req.body.uk
    let query = "https://public-api2.ploomes.com/" + req.body.qry
    const config = {
        headers: {
            "User-Key": uk
        }
    };


    axios.get(query, config)
        .then(response => {
            let $ = response.data

            $ = $.value

            let opc = []

            for (item of $) {

                opc.push(item.ProductPart)

            }

            for (opcional of opc) {
                delete opcional.Id
                for (let [index, item] of opcional.OtherProperties.entries()) {
                    delete item.Id
                    delete item.FieldId
                    delete item.FieldKey
                    delete item.ProductId

                    Object.keys(item).forEach((key) => {
                        if (item[key] == null) {

                            delete item[key]
                        }
                        else { opcional[`${index.toString()}${key}`] = item[key] }
                    });

                }
                delete opcional.OtherProperties
            }

            let array = []
            for ([index, opcional] of opc.entries()) {

                Object.keys(opcional).forEach((key) => {

                    array[index] += `${opcional[key]}---`

                });
                array[index] = `${array[index].replace('undefined', '')}***`

            }

            let string = '';
            for (item of array) {

                let concat = item.split("---");
                string += `${concat[1]}---${concat[0]}---${concat[3]}---${concat[4]}---${concat[6]}---${concat[7]}***`

            }

            string = string.replace(/undefined/g," ")
            res.json({ "result": string })
        })

});