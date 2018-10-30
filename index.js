const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

// Fill in your request handlers here

app.post('/updates', (req, res) => {

    if (req.body.clientUpdates.length) {
        req.body.clientUpdates.forEach(element => {
            globalUpdates.push(element)


        });
    }
    if (globalUpdates.length > req.body.clientUpdateCount) {
        sendBackNumber = globalUpdates.length - req.body.clientUpdateCount
        console.log('global updates.length', globalUpdates.length)
        console.log('client updates', req.body.clientUpdateCount)

    }
    let sendBackArray = globalUpdates.slice(sendBackNumber)
    console.log(globalUpdates)
    if (req.body.clientUpdateCount === 0) {
        res.send({ globalUpdates: globalUpdates });
    } else if (req.body.clientUpdateCount > 0) {
        res.send({ globalUpdates: sendBackArray });
    }

})



app.listen(port)