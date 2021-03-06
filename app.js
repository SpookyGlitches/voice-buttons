require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const passport = require("./config/passport");
const flash = require("connect-flash");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const svboardsRouter = require("./routes/savedBoards");
const sboardsRouter = require("./routes/soundBoards");
const accountsRouter = require("./routes/accounts");

const handleError = require("./middlewares/handleError");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//not sure what i'm doing here
app.use(cors({ origin: true }));
app.use(
	helmet({
		contentSecurityPolicy: {
			useDefaults: true,
			directives: {
				"script-src": ["'self'", "https://cdn.jsdelivr.net"],

				"style-src": ["'self'", "https://cdn.jsdelivr.net"],
				"media-src": ["data:", "'self'"],
			},
		},
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(
	fileUpload({
		safeFileNames: false,
	})
);

app.use(function (req, res, next) {
	res.locals.success = req.flash("success");
	res.locals.errors = req.flash("errors");
	next();
});

app.get("/", (req, res) => res.redirect("/home"));

app.use("/static", express.static("public"));
app.use("/auth", authRouter);
app.use("/account", accountsRouter);
app.use("/home", homeRouter);
app.use("/savedboards", svboardsRouter);
app.use("/soundboards", sboardsRouter);

app.use(handleError);

app.listen(port, () => {
	console.log(`App listening in http://localhost:${port}`);
});
