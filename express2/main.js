const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const formhelper = bodyParser.urlencoded()

app.get('/now', (request, response) => {
    const query = request.query.q
    const timezone = Intl.DateTimeFormat().resolvedOptions(query).timeZone;
    response.send(timezone)
});

app.get('/name', (request, response) => {
    response.sendFile(__dirname + "/form.html")
});

app.post('/name', formhelper, (request, response) => {
    const name = request.body.name
    response.send(`Hallo ${name}`)
});

app.delete('/name', (request, response) => {
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});