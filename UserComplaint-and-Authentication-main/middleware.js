// middleware.js
module.exports.saveRedirectUrl = (req, res, next) => {
    // Example: store where to redirect after login
    if (req.session && req.session.returnTo) {
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};

// simple isLoggedIn for your EJS routes (if you need)
module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    req.flash("error", "You must be signed in");
    res.redirect('/users/login');
};
