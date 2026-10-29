"use strict";
// Q3 – Library Management System (Classes + Objects)
// Run: node q3_library_system.js            (prompts for an ISBN)
//      node q3_library_system.js 978-0-596-51774-8   (ISBN as argument)
// When no terminal is attached it runs a built-in demo instead.

const readline = require("readline"); // built-in Node module, not an external library

class Book {
  constructor(title, author, isbn, isIssued = false) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = isIssued;
  }

  issueBook() {
    if (this.isIssued) return { ok: false, message: `"${this.title}" is already issued.` };
    this.isIssued = true;
    return { ok: true, message: `"${this.title}" has been issued.` };
  }

  returnBook() {
    if (!this.isIssued) return { ok: false, message: `"${this.title}" was not issued.` };
    this.isIssued = false;
    return { ok: true, message: `"${this.title}" has been returned.` };
  }
}

const books = [
  new Book("JavaScript: The Good Parts", "Douglas Crockford", "978-0-596-51774-8"),
  new Book("Eloquent JavaScript", "Marijn Haverbeke", "978-1-59327-950-9"),
  new Book("You Don't Know JS", "Kyle Simpson", "978-1-4919-0418-9", true),
  new Book("Clean Code", "Robert C. Martin", "978-0-13-235088-4")
];

function showAvailableBooks() {
  console.log("\n=== Available books ===");
  books.filter((b) => !b.isIssued)
    .forEach((b) => console.log(`${b.isbn} | ${b.title} – ${b.author}`));
}

function issueByIsbn(isbn) {
  const book = books.find((b) => b.isbn === isbn.trim());
  if (!book) return console.log(`No book found with ISBN "${isbn}".`);
  console.log(book.issueBook().message);
}

showAvailableBooks();

const argIsbn = process.argv[2];
if (argIsbn) {
  issueByIsbn(argIsbn);
  showAvailableBooks();
} else if (process.stdin.isTTY) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("\nEnter ISBN to issue: ", (isbn) => {
    issueByIsbn(isbn);
    showAvailableBooks();
    rl.close();
  });
} else {
  console.log("\n--- Demo (no terminal input) ---");
  issueByIsbn("978-0-596-51774-8"); // succeeds
  issueByIsbn("978-0-596-51774-8"); // already issued
  issueByIsbn("000-0-00-000000-0"); // not found
  console.log(books[0].returnBook().message);
  showAvailableBooks();
}