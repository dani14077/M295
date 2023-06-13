const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.get('/', function (request, response, _) {
    
    request.session.views = (request.session.views | 0) + 1
    console.log(request.session)
    response.end(request.session.views + ' views')
});
app.get('/name', (request, response) => {
    const name = request.session.name;

    if (name) {
        response.send(name);
    } else {
        response.send("Couldn't find requested name").status(404);
    }
});

app.post('/name', (request, response) => {
    const name = request.query.name;

    request.session.name = name

    response.send("Success").status(200);
});

app.delete('/name', (request, response) => {
    delete request.session.name;
    response.send("Successfully Deleted").status(204);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});