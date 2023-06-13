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
    {isbn: 5, title: "Workman is the worst keyboard layout", year: 2023, author: "Bill Gates"},
    {isbn: 6, title: "Why Swiss Education sucks", year: 2021, author: "Alain Berset"},
    {isbn: 7, title: "My English is the best", year: 2017, author: "Jörg Jaggi"},
    {isbn: 8, title: "How to boss everyone and not follow the rules", year: 2022, author: "Adrian Gfeller"},
    {isbn: 9, title: "Apple is better than Samsung", year: 2010, author: "Steve Jobs"}
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


// Get all lends
app.get('/lends', (req, res) => {
  res.json(lends);
});

// Get a specific lend by ID
app.get('/lends/:id', (req, res) => {
  const lendId = req.params.id;
  const lend = lends.find((l) => l.id === parseInt(lendId));

  if (lend) {
    res.json(lend);
  } else {
    res.status(404).send('Lend not found.');
  }
});

// Create a new lend
app.post('/lends', (req, res) => {
  const lendData = req.body;
  const book = books.find((b) => b.isbn === lendData.isbn);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  const isBookAlreadyLent = lends.some((l) => l.isbn === lendData.isbn && !l.returned_at);
  if (isBookAlreadyLent) {
    res.status(422).json({ error: 'The book is already borrowed' });
    return;
  }

  const customerLendsCount = lends.filter((l) => l.customer_id === lendData.customer_id && !l.returned_at).length;
  if (customerLendsCount >= 3) {
    res.status(422).json({ error: 'The customer already has 3 borrowed books' });
    return;
  }

  const newLend = {
    id: lends.length + 1,
    customer_id: lendData.customer_id,
    isbn: lendData.isbn,
    borrowed_at: new Date().toLocaleDateString('de-CH'),
    returned_at: null,
  };

  lends.push(newLend);
  res.status(201).json(newLend);
});

// Update a lend by ID
app.patch('/lends/:id', (req, res) => {
  const lendId = req.params.id;
  const lendUpdates = req.body;
  const lend = lends.find((l) => l.id === parseInt(lendId));

  if (!lend) {
    res.status(404).json({ error: 'Lend not found' });
    return;
  }

  lend.customer_id = lendUpdates.customer_id || lend.customer_id;
  lend.isbn = lendUpdates.isbn || lend.isbn;
  lend.returned_at = lendUpdates.returned_at || lend.returned_at;

  res.json(lend);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});