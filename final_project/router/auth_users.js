const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
    }

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

regd_users.use(session({secret:"fingerpint"},resave=true,saveUninitialized=true));

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 120 * 120 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
  });
  

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        let reviews = req.body.reviews;
        if(reviews) {
            book["reviews"] = reviews
        }
        books[isbn]=book;
        res.send(`Book with ISBN - ${isbn} updated.`);
    }
    else{
        res.send("Unable to find book!");
    }
  });


    regd_users.delete("/auth/review/:isbn", (req, res) => {
        const isbn = req.params.isbn;
        if (isbn){
            delete books[isbn].reviews
        }
        res.send(`Book with ISBN-${isbn} reviews deleted.`);
      });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
