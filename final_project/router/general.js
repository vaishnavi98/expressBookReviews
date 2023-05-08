const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books))
    },6000)})

myPromise1.then((successMessage) => {
        console.log("From Callback list of books:" + successMessage)
      })

let myPromise2 = new Promise((resolve,reject) => {
        setTimeout(() => {
        let isbn = 1;
          resolve(JSON.stringify(books[isbn]))
        },6000)})
    
myPromise2.then((successMessage) => {
            console.log("From Callback book details based on ISBN:" + successMessage)
          })
let myPromise3 = new Promise((resolve,reject) => {
            setTimeout(() => {
            let isbn = 3;
            resolve(JSON.stringify(books[isbn].author))
            },6000)})
        
myPromise3.then((successMessage) => {
                console.log("From Callback book details based on author:" + successMessage)
              })
let myPromise4 = new Promise((resolve,reject) => {
            setTimeout(() => {
            let isbn = 3;
            resolve(JSON.stringify(books[isbn].title))
            },6000)})
        
    myPromise4.then((successMessage) => {
                console.log("From Callback book details based on title:" + successMessage)
              })          
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
