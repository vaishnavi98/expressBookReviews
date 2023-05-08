const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booksbytitle.push({"isbn":isbn,
                            "author":books[isbn]["author"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify(booksbytitle, null, 4));
  });
  
  //  Get book review
  public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"]);
    
  });
  public_users.get('/books',function (req, res) {
  
      const get_books = new Promise((resolve, reject) => {
          resolve(res.send(JSON.stringify({books}, null, 4)));
        });
  
        get_books.then(() => console.log(" Resolving Promise for Task 10"));
  
    });
    public_users.get('/books/isbn/:isbn',function (req, res) {
      //Write your code here
      const isbn = req.params.isbn;
      const get_books = new Promise((resolve, reject) => {
          resolve(res.send(books[isbn]));
        });
  
        get_books.then(() => console.log("Resolving Promise for Task 11"));
     });
     public_users.get('/books/author/:author',function (req, res) {
      //Write your code here  
      let booksbyauthor = [];
      let isbns = Object.keys(books);
      const get_books = new Promise((resolve, reject) => {
          resolve(isbns.forEach((isbn) => {
            if(books[isbn]["author"] === req.params.author) {
              booksbyauthor.push({"isbn":isbn,
                                  "title":books[isbn]["title"],
                                  "reviews":books[isbn]["reviews"]});
            }
          }));
        });
        const output = new Promise((resolve, reject) =>{resolve(res.send(JSON.stringify(booksbyauthor, null, 4)))});
        get_books.then(()=>console.log("Result of Task 12"));
        output.then(()=>console.log("Resolving Promise for Task 12"));
    });
    public_users.get('/books/title/:title',function (req, res) {
      //Write your code here
      let booksbytitle = [];
      let isbns = Object.keys(books);
      const get_books = new Promise((resolve, reject) => {
          resolve(isbns.forEach((isbn) => {
            if(books[isbn]["title"] === req.params.title) {
              booksbytitle.push({"isbn":isbn,
                                  "author":books[isbn]["author"],
                                  "reviews":books[isbn]["reviews"]});
            }
          }));
        });
        const output = new Promise((resolve, reject) =>{resolve(res.send(JSON.stringify(booksbytitle, null, 4)))});
        get_books.then(()=>console.log("Result of Task 13"));
        output.then(()=>console.log("Resolving Promise for Task 13"));
    });        
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  
public_users.post("/register", (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username + "..." + password)
        if (username && password) {
          if (!doesExist(username)) {
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
          } else {
            return res.status(404).json({message: "User already exists!"});
          }
        }
        return res.status(404).json({message: "Unable to register user."});
      });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,5));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    res.send(books[author])  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    res.send(books[title])  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn; 
    res.send(books[isbn].reviews)  
});

module.exports.general = public_users;
