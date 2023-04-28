const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

app.use(
	"/customer",
	session({
		secret: "fingerprint_customer",
		resave: true,
		saveUninitialized: true,
	})
);

app.use("/customer/auth/*", function auth(req, res, next) {
	if (req.session.user.username) {
		if (
			jwt.verify(req.session.user.token, process.env.TOKEN_SECRET) ==
			req.session.user.username
		) {
			next();
		}
	}
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
