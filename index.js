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

    if (req.body.uk == undefined || req.body.qry == undefined || req.body.keys_name == undefined) {
        res.json({ "result": "($*.): Erro. Os parâmtros uk, qry e keys_name devem ser enviados na requisição e não podem ser 'undefined'." })
    }

    let uk = req.body.uk
    let query = "https://public-api2.ploomes.com/" + req.body.qry
    let keys_name = req.body.keys_name


    const config = {
        headers: {
            "User-Key": uk
        }
    };

    axios.get(query, config)
        .then(response => {
            let list = Object.values(keys_name)
            let keylist = Object.keys(keys_name)
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
                    delete item.ProductId
                    Object.keys(item).forEach((key) => {
                        if (item[key] == null) {
                            delete item[key]
                        }
                        else if (key == 'FieldKey') { }
                        else {
                            opcional[`${item['FieldKey']}`] = item[key]
                        }
                    });
                }

                delete opcional.OtherProperties

                Object.keys(opcional).forEach((key) => {

                    if (key == 'Code' || key == 'Name') {
                        //pass
                    }
                    else {
                        for (fkeys of keylist) {
                            if (Object.keys(opcional).indexOf(fkeys) == -1) {
                                opcional[fkeys] = ' '
                            }
                        }
                    }
                })

                for (key of Object.keys(keys_name)) {
                    opcional[`${keys_name[key]}`] = opcional[key]
                }

                for (key of Object.keys(opcional)) {
                    if (key == 'Code' || key == 'Name' || list.indexOf(key) != -1) {
                        //pass
                    }
                    else {
                        delete opcional[key]
                    }
                }
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
                string += item
            }
            string = string.replace(/undefined/g, " ")
            res.json({ "result": string })
        }).catch((error) => {
            console.log('Error ' + error.message)
            return res.json({ "result": `($*.): Erro. Houve um problema com a requisição de get feita no Ploomes. Há um problema com a uk ou com a qry. ${error.message}` })
        })

});