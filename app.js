var express         = require('express'),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index"),
    methodOverride    = require('method-override'),
    flash             = require('connect-flash')

//mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
mongoose.connect("mongodb://delewis:delewis13@ds155864.mlab.com:55864/yelpcamp", {useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride('_method'))
app.use(flash())
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My First Express App",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Provide variables to all pages through res.locals
app.use(function(req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
});

// Get all our routes from our route js files
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use(indexRoutes);

app.listen(9991, process.env.IP, function(){
    console.log("YelpCamp server started");
});
