const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	if (req.body.username == "" || req.body.password == "") {
		return res
			.status(400)
			.json({ message: "Username or Password is not provided" });
	}
	const currentUser = users.filter(
		(user) => user[username] == req.body.username
	);
	if (currentUser.length > 0) {
		return res.status(409).json({ message: "Username already registered" });
	}
	users.push({ username: req.body.username, password: req.body.password });
	return res
		.status(201)
		.json({ message: "Customer successfully registered. Now you can login" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
	return res.status(300).json({ books: books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	return res.status(300).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
	let byAuthor = {};
	for (let key in books) {
		if (
			req.params.author.split(" ").join("") ==
			books[key]["author"].split(" ").join("")
		) {
			byAuthor = books[key];
		}
	}
	return res.status(300).json({ booksbyauthor: [byAuthor] });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	let byTitle = {};
	for (let key in books) {
		if (
			req.params.title.split(" ").join("") ==
			books[key]["title"].split(" ").join("")
		) {
			byTitle = books[key];
		}
	}
	return res.status(300).json({ booksbytitle: byTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	return res.status(300).json(books[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
