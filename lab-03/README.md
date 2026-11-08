# Lab 3 – REST API, Query Parameters, Validation and Debugging

## Project Details

- **Name:** Ganta Chaitanya Vardhan
- **Registration Number:** 252U1R5065
- **Section:** CSE (AI & DE)
- **Course:** Backend Development Fundamentals
- **Lab:** Lab 3 – REST API, Query Parameters, Validation and Debugging
- **Institution:** Aurora Deemed to be University

## Deployment URL

**Render URL:** https://chaithu-lab-3.onrender.com/books

## Project Description

This project implements RESTful API operations using Node.js, Express.js, and SQLite. It provides endpoints to create, retrieve, update, and delete book records.

It also supports searching, sorting, pagination, price filtering, input validation, and proper HTTP status codes.

The database contains book records with details such as book ID, title, author, price, and number of pages.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript
- Postman
- Visual Studio Code
- Render

## Project Structure

```text
lab-03/
│
├── server.js
├── goodreads.db
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
│
└── screenshots/
    ├── delete.png
    ├── get-all-books.png
    ├── get-book-by-id.png
    ├── not-found-error.png
    ├── post-success.png
    ├── post-validation-error.png
    ├── price-filter.png
    ├── sorting-ascending.png
    ├── sorting-descending.png
    └── update.png

Installation and Setup
1. Clone the repository
Bash


git clone [https://github.com/chaithu-m10-eng/chaithu-BDF.git](https://github.com/chaithu-m10-eng/chaithu-BDF.git)
2. Open the project folder
Bash


cd chaithu-BDF/lab-03
3. Install dependencies
Bash


npm install
4. Start the development server
Bash


npm run dev
The server runs at:

Plaintext


http://localhost:3000
API Endpoints
HTTP Method	Endpoint	Description
GET	/books	Retrieve all books
GET	/books/:bookId	Retrieve a specific book
POST	/books	Add a new book
PUT	/books/:bookId	Update a book
DELETE	/books/:bookId	Delete a book

Query Parameters
1. Search Books
Plaintext


GET /books?search_q=The
Searches for books using a partial title match.

2. Sorting
Ascending order:

Plaintext


GET /books?order_by=price&order=ASC
Sorts books by price from lowest to highest.

Descending order:

Plaintext


GET /books?order_by=price&order=DESC
Sorts books by price from highest to lowest.

3. Pagination
First five books:

Plaintext


GET /books?limit=5&offset=0
Returns five records starting from the first record.

Next five books:

Plaintext


GET /books?limit=5&offset=5
Returns the next five records.

4. Price Filtering
Plaintext


GET /books?min_price=200&max_price=500
Retrieves books within the specified price range.

5. Combined Query
Plaintext


GET /books?search_q=The&min_price=200&max_price=500&order_by=price&order=ASC&limit=3&offset=0
Combines searching, price filtering, sorting, and pagination.

Request Body for POST and PUT
Select Body → raw → JSON in Postman.

POST – Add a New Book
JSON


{
  "title": "Dune",
  "author": "Frank Herbert",
  "price": 450,
  "pages": 412
}
Expected status code: 201 Created

PUT – Update an Existing Book
JSON


{
  "title": "The Great Gatsby (Special Edition)",
  "author": "F. Scott Fitzgerald",
  "price": 599,
  "pages": 192
}
Use:

Plaintext


PUT /books/1
Expected status code: 200 OK

HTTP Status Codes
Status Code	Description
200	Request successful
201	Book created successfully
400	Invalid input or query parameters
404	Book or route not found
500	Internal server error

Input Validation
The application validates:

Book title must not be empty and must be a string.

Author name must not be empty and must be a string.

Price must be a valid non-negative number.

Book ID must be a valid positive integer.

Sorting order must be ASC or DESC.

Sorting column must be valid.

Pagination values must be valid integers.

Postman Testing
All API endpoints are tested using Postman.

The tests include:

Retrieve all books using GET.

Retrieve a specific book using its ID.

Sort books by price in ascending order.

Sort books by price in descending order.

Filter books using minimum and maximum prices.

Test invalid input validation using POST.

Add a new book using POST.

Update a book using PUT.

Delete a book using DELETE.

Test invalid IDs and missing records using GET.

Negative Testing Queries
Book not found:

Plaintext


GET /books/999
Expected: 404 Not Found.

Invalid POST input:

JSON


{
  "title": "Test Book",
  "author": "Test Author",
  "price": "invalid"
}
Expected: 400 Bad Request.

Screenshots
1. GET All Books
2. GET Book by ID
3. Sorting Ascending
4. Sorting Descending
5. Price Filtering
6. POST Validation Error
7. POST Successful Request
8. PUT Update Request
9. DELETE Request
10. GET Book 404 Not Found
Debugging & Troubleshooting
During the development and deployment of the REST API, several common errors were identified and resolved.

1. Port Already in Use (EADDRINUSE)
Error:

Plaintext


Error: listen EADDRINUSE: address already in use :::3000
Cause:
Another application or previously running Node.js server is already using port 3000.

Solution:

Stop the process using port 3000 in PowerShell:

PowerShell


Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
Alternatively, use dynamic port binding in server.js:

JavaScript


const PORT = process.env.PORT || 3000;
2. Wrong Import Path / Syntax
Error:

Plaintext


Error: Cannot find module '../database'
Cause:
The required file path, filename, or package destructuring syntax is incorrect.

Solution:

Correct the relative import path and destructuring syntax:

JavaScript


const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
3. SQLite Table Not Found
Error:

Plaintext


SQLITE_ERROR: no such table: books
Cause:
The requested table does not exist in the connected SQLite database, or the query targets books instead of book.

Solution:

Verify table initialization and standardize table name in SQL queries:

SQL


CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    price INTEGER,
    pages INTEGER
);
4. Missing Await in Asynchronous Operations
Problem:

Database operations return Promises. If await is missing, the response may return an unresolved Promise.

Incorrect Code:

JavaScript


const books = db.all("SELECT * FROM book");
res.json(books);
Correct Code:

JavaScript


const books = await db.all("SELECT * FROM book");
res.json(books);
Solution:

Use async/await for database operations within try/catch blocks.

5. Missing Module (MODULE_NOT_FOUND)
Error:

Plaintext


Error: Cannot find module 'sqlite'
Cause:
The required npm package is not installed or missing from node_modules.

Solution:

Install missing dependencies:

Bash


npm install sqlite sqlite3
Verify installed packages:

Bash


npm ls sqlite sqlite3
6. Missing Dev Script in package.json
Error:

Plaintext


npm error Missing script: "dev"
Cause:
The dev script is missing from package.json.

Solution:

Add standard scripts to package.json:

JSON


"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
7. Render Deployment Error (SQLite GLIBC Compatibility)
Error:

Plaintext


GLIBC_2.38 not found
Cause:
Native SQLite binary mismatch between local environment and Linux runtime on Render.

Solution:

Rebuild native modules in build phase:

Bash


npm ci && npm rebuild sqlite3 --build-from-source
8. SQLite3 Native Binding Not Found
Error:

Plaintext


Error: Could not locate the bindings file
Cause:
Native bindings incomplete during package installation.

Solution:

Rebuild native modules:

Bash


npm rebuild sqlite3 --build-from-source
Debugging Summary
Error	Solution
EADDRINUSE	Stop process using port or use process.env.PORT
Wrong import path	Correct require path and package destructuring
No such table	Standardize SQL query table name to book
Missing await	Wrap async calls with await and try/catch
MODULE_NOT_FOUND	Install missing dependencies using npm install
Missing dev script	Configure start and dev scripts in package.json
GLIBC compatibility	Rebuild sqlite3 for Render runtime
Native binding not found	Execute npm rebuild sqlite3 --build-from-source

Result: Common backend issues were systematically identified, debugged, and resolved through proper package setup, dynamic port configuration, SQL schema alignment, and deployment configuration.

Conclusion
This lab provided hands-on experience in building a production-grade REST API using Node.js, Express.js, and SQLite. I implemented CRUD operations, query parameter filtering (search, sort, price range, pagination), input validation, status code handling, and debugging techniques.

All endpoints were validated using Postman and deployed live on Render.

End of Lab 3