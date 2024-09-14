const express = require('express');
let books = require("./booksdb.js");
//let isValid = require("./auth_users.js").isValid;
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!doesExist(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res.send(JSON.stringify(books,null,4)))
    }, 2000);
  })
  
  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const isbn = req.params.isbn;
      res.send(books[isbn]);
    }, 2000);
  })

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

  

 });
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let author = req.params.author
  let result = {
      "booksByAuthor": []
  }
  let keys = Object.keys(books)
  for(let key of keys) {
      let book = books[key]
      if(book.author == author) {
          result['booksByAuthor'].push(book)
      }
  }
  res.send(result)
    }, 2000);
  })
  
});



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let title = req.params.title
      let result = {
       "booksByTitle": []
       }
      let keys = Object.keys(books)
      for(let key of keys) {
          let book = books[key]
          if(book.title == title) {
          result['booksByTitle'].push(book)
      }
  }
  res.send(result)
    }, 2000);
  })
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
