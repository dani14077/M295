const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.get('/', (request, response) => {
    response.send('Hello World!')
});

app.get('/now', (request, response) => {
    const time = new Date().toLocaleString("de-CH");
    response.send(time);
});

app.get('/zli', (request, response) => {
    response.redirect("https://www.zli.ch")
});

app.get('/name', (request, response) => {
    let names = [ "Daniel", "Yannick", "Matas", "Andrea", "Andy", "Jael", "Lars", "Refsat", "Simon", "Adrian", "Sven",
        "John", "Loris", "Louis", "Marco", "Justin", "Anna", "Cloe", "Peter", "Chris",
        "Stewie", "Ben", "Theodor", "James", "David",]

const random = names[Math.floor(Math.random() * names.length)];
response.send(random);
});

app.get('/html', (request, response) => {
    response.sendFile(`${__dirname}/index.html`)
});

app.get('/image', (request, response) => {
    response.sendFile(`${__dirname}/image.jpg`)
});

app.get('/teapot', (request, response) => {
    response.sendStatus(418)
});

app.get('/user-agent', (request, response) => {
    const userAgent = request.headers["user-agent"]
    response.send(`Du nutzt: ${userAgent}`)
});

app.get('/secret', (request, response) => {
    response.sendStatus(401)
});

app.get('/xml', (request, response) => {
    fs.readFile('static.xml', (err, data) => {
        if(err) {
            response.sendStatus("500")
        } else {
            response.type("xml")
            response.send(data)
        }
    })
});

app.get('/me', (request, response) => {
    const me = {
        firstName: "Daniel",
        lastName: "Boulter",
        age: "21",
        place: "Wollerau"
    }
    response.json(me)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

