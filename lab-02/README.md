# Lab 2: SQLite database and CRUD routes

- **Name:** Ganta Chaitanya Vardhan
- **Registration Number:** 252U1R5047
- **Section:** CSE (AI & DE)
- **Course:** Backend Development Fundamentals
- **Lab:** Lab 2 – SQLite database and CRUD routes

## Live Link
- **Public Deployment URL:** Not applicable (Local file-based SQLite database server)

## How to Run

### Prerequisites
- Node.js installed
- npm installed

### Environment Variables
- `PORT`: (Optional) Port number for server listening (default: 3000). No secret keys required.

### Installation & Start Commands
1. Navigate to the `lab-02` directory:
   ```bash
   cd lab-02
##  Install dependencies:

Bash


npm install
## Run with nodemon:

Bash


npm run dev
## Endpoints Table
Method	Path	Description	Expected Status
GET	/books/	Retrieves all books from SQLite database.	200 OK
GET	/books/:bookId/	Retrieves a single book by ID.	200 OK / 404 Not Found
POST	/books/	Adds a new book using parameterized query.	201 Created
PUT	/books/:bookId/	Updates book details for a specific ID.	200 OK / 404 Not Found
DELETE	/books/:bookId/	Deletes a book record by ID.	200 OK / 404 Not Found

## Screenshots
1. GET /books/ - Retrieve All Books
2. GET /books/:bookId/ - Retrieve Single Book
3. POST /books/ - Add New Book
4. PUT /books/:bookId/ - Update Book
5. DELETE /books/:bookId/ - Delete Book
## Viva Questions & Answers
Why await the database call?

Database queries are asynchronous operations. Using await pauses function execution until the operation completes, ensuring data is ready before sending the response.

What is SQL injection and how do placeholders prevent it?

SQL injection is a security flaw where attacker input alters SQL commands. Placeholders (?) safely parameterize input, handling strings purely as values rather than executable SQL.

When is PUT used instead of POST?

POST creates a new resource, while PUT updates or overwrites an existing resource identified by a specific URL endpoint.

## Notes: Problems Faced and How Solved
Asynchronous Initialization: Handled database creation and seeding inside an async initializeDBAndServer() function so the Express app listens only after the DB connection is established.

SQL Injection Prevention: Used ? placeholders for all dynamic parameters in SQL queries across all routes.