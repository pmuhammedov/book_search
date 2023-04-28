const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();
var session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
let users = [];

const isValid = (username) => {
	//returns boolean
	//write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
	//returns boolean
	//write code to check if username and password match the one we have in records.
};

function generateAccessToken(username) {
	return jwt.sign(username, process.env.TOKEN_SECRET);
}

//only registered users can login
regd_users.post("/login", (req, res) => {
	console.log("users", users);
	const registeredUser = users.filter(
		(user) => user.username == req.body.username
	);
	if (registeredUser.length == 0) {
		return res.status(401).json({ message: "User is not registered" });
	}

	req.session.user = {
		username: registeredUser[0].username,
		token: generateAccessToken(registeredUser[0]["username"]),
	};

	return res.status(200).json({ message: "Customer successfully logged in" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
	books[req.params.isbn]["reviews"][req.session.user.username] =
		req.query.review;

	return res.status(300).json({
		message:
			"The review for the book with ISBN " +
			req.params.isbn +
			" has been added/updated",
	});
});

// delete review

regd_users.delete("/auth/review/:isbn", (req, res) => {
	delete books[req.params.isbn]["reviews"][req.session.user.username];

	return res.status(300).json({
		message:
			"Reviews for the ISBN " +
			req.params.isbn +
			" posted by the user " +
			req.session.user.username +
			" deleted",
	});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
