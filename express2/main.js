const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const formhelper = bodyParser.urlencoded()
const jsonHelper = bodyParser.json()

app.get('/now', (request, response) => {
    const now = new Date().toLocaleTimeString('de-CH', {timeZone: request.query.tz})
    response.send(`Bei dir ist es: ${now}`)
});

const names = new Set(["Daniel", "Yannick", "Matas", "Theodor"]);

app.get('/names', (request, response) => {
    response.json(Array.from(names))
});

app.post('/names', formhelper, (request, response) => {
    const name = request.body.name
    names.add(name)
    response.sendStatus(201)
});

app.delete('/names', formhelper, (request, response) => {
    const name = request.body.name
    if(names.has(name)) {
        names.delete(name)
        response.sendStatus(204)
    } else {
        response.sendStatus(404)
    }
});

app.get('/secret2', (request, response) => {
    const auth = request.headers.authorization
    if(auth == "Basic aGFja2VyOjEyMzQ="){
        response.sendStatus(200)
    } else {
        response.sendStatus(401)
    }
});

app.get('/chuck', async (request, response) => {
    const apiResponse = await fetch("https://api.chucknorris.io/jokes/random")
    const data = await apiResponse.json()
    const joke = data.value
    const name = request.query.name
    response.send(joke.replace("Chuck Noris", name))
});

app.get('/me', (request, response) => {
    const me = {
        firstName: "Daniel",
        lastName: "Boulter",
        age: "21",
        place: "Wollerau",
        eyeColour: "Green"
    }
app.get('/me', (request, response) => {
    response.json(me)
});
});



app.patch('/me', jsonHelper, (request, response) => {
    const merge = request.body
    const result = {
        ...me,
        ...merge
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});