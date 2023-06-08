const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let books = [
    {isbn: 1, title: "Titanic", year: 1932, author: "Hans Peter"},
    {isbn: 2, title: "The last Day on Earth", year: 2021, author: "Joe Biden"},
    {isbn: 3, title: "Success of Facebook", year: 2012, author: "Mark Zuckerberg"},
    {isbn: 4, title: "Sending my Tesla to the moon", year: 2020, author: "Elon Musk"},
    {isbn: 5, title: "Workman is the worst keyboard layout", year: 2023, author: "Bill Gates"}
];

let lends = [
    {id: 1, customer_id: 1, isbn: 1, borrowed_at: new Date().toLocaleDateString("de-CH"), returned_at: null},
    {id: 2, customer_id: 2, isbn: 2, borrowed_at: new Date().toLocaleDateString("de-CH"), returned_at: null},
    {id: 3, customer_id: 3, isbn: 3, borrowed_at: new Date().toLocaleDateString("de-CH"), returned_at: null},
    {id: 4, customer_id: 4, isbn: 4, borrowed_at: new Date().toLocaleDateString("de-CH"), returned_at: null},
    {id: 5, customer_id: 5, isbn: 5, borrowed_at: new Date().toLocaleDateString("de-CH"), returned_at: null}
]

app.get('/books', (req, res) => {
    res.json(books)
});

app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find((book) => book.isbn === parseInt(isbn));

    if (book) {
        return res.json(book);
    } else {
        return res.status(404).send("Book not found.");
    }
});

app.post('/books', (req, res) => {
    const book = req.body;

  if (book && book.isbn && book.title && book.year && book.author) {
    books.push(book);
    res.status(201).json(book);
  } else {
    res.statusCode(422)
  }
});

app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex((book) => book.isbn === parseInt(isbn));

    if (bookIndex !== -1) {
        books[bookIndex] = {...books[bookIndex], ...req.body };
        res.json(books[bookIndex]);
    } else {
        res.status(404).send("Book not found");
    }
});

app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex((book) => book.isbn === parseInt(isbn));

    if (bookIndex !== -1){
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook[0]);
    } else {
        res.status(404).send("Book not found.")
    }
});


app.get('/lends', (req, res) => {
    res.json(lends)
});

app.get('/lends/:id', (req, res) => {
    const id = req.params.id;
    const lend = lends.find((lend) => lend.id === parseInt(id));

    if (lend) {
        return res.json(lend);
    } else {
        return res.status(404).send("Lend not found.");
    }
});

app.post('/lends', (req, res) => {

});

app.patch('/lends/:id', (req, res) => {

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});