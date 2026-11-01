const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, 'goodreads.db');
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        price INTEGER,
        pages INTEGER
      );
    `);

    const count = await db.get(`SELECT COUNT(*) as count FROM book;`);
    if (count.count === 0) {
      await db.exec(`
        INSERT INTO book (title, author, price, pages) VALUES
        ('To Kill a Mockingbird', 'Harper Lee', 499, 281),
        ('1984', 'George Orwell', 399, 328),
        ('The Great Gatsby', 'F. Scott Fitzgerald', 299, 180),
        ('Pride and Prejudice', 'Jane Austen', 350, 279),
        ('The Catcher in the Rye', 'J.D. Salinger', 450, 234),
        ('The Hobbit', 'J.R.R. Tolkien', 599, 310),
        ('Fahrenheit 451', 'Ray Bradbury', 320, 256),
        ('Jane Eyre', 'Charlotte Brontë', 380, 500),
        ('Animal Farm', 'George Orwell', 250, 112),
        ('Brave New World', 'Aldous Huxley', 420, 288);
      `);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// 1. GET /books/ - Get all books
app.get('/books/', async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY id;`;
  const booksArray = await db.all(getBooksQuery);
  response.status(200).send(booksArray);
});

// 2. GET /books/:bookId/ - Get single book
app.get('/books/:bookId/', async (request, response) => {
  const { bookId } = request.params;
  const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
  const book = await db.get(getBookQuery, [bookId]);

  if (book === undefined) {
    response.status(404).send({ error: 'Book Not Found' });
  } else {
    response.status(200).send(book);
  }
});

// 3. POST /books/ - Add book
app.post('/books/', async (request, response) => {
  const { title, author, price, pages } = request.body;
  const addBookQuery = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?);
  `;
  const dbResponse = await db.run(addBookQuery, [title, author, price, pages]);
  response.status(201).send({
    bookId: dbResponse.lastID,
    message: 'Book Added Successfully',
  });
});

// 4. PUT /books/:bookId/ - Update book
app.put('/books/:bookId/', async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
  const existingBook = await db.get(getBookQuery, [bookId]);

  if (existingBook === undefined) {
    response.status(404).send({ error: 'Book Not Found' });
  } else {
    const updateBookQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;
    await db.run(updateBookQuery, [title, author, price, pages, bookId]);
    response.status(200).send({ message: 'Book Updated Successfully' });
  }
});

// 5. DELETE /books/:bookId/ - Delete book
app.delete('/books/:bookId/', async (request, response) => {
  const { bookId } = request.params;

  const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
  const existingBook = await db.get(getBookQuery, [bookId]);

  if (existingBook === undefined) {
    response.status(404).send({ error: 'Book Not Found' });
  } else {
    const deleteBookQuery = `DELETE FROM book WHERE id = ?;`;
    await db.run(deleteBookQuery, [bookId]);
    response.status(200).send({ message: 'Book Deleted Successfully' });
  }
});