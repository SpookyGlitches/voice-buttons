const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { compare } = require("bcrypt");

const User = require("../models/db").users;

const customFields = {
	usernameField: "email_address",
	passwordField: "password",
};

passport.use(
	new LocalStrategy(customFields, async function (email, password, done) {
		try {
			let user = await User.findOne({
				where: {
					email_address: email,
				},
			});
			let result = false;
			if (user) {
				result = await compare(password, user.password);
			}
			if (!result) {
				return done(null, false, {
					message:
						"No account associated with that email address or the password is incorrect.",
				});
			} else {
				return done(null, user);
			}
		} catch (err) {
			done(err);
		}
	})
);

passport.serializeUser(function (user, done) {
	done(null, {
		user_id: user.user_id,
		display_name: user.display_name,
		email_address: user.email_address,
		verified_at: user.verified_at,
	});
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

module.exports = passport;
