var Campground = require('../models/campground')
var Comment = require('../models/comment')

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  // Is user logged in
  if (req.isAuthenticated()) {
    // Does the user own the campground
    // Note that the !foundCampground handles the situation where a user enters a valid ID but mongo returns foundCampground=null
    // !null = True, meaning it will go and handle the error.
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err || !foundCampground) {
        req.flash('error', 'Campground not found')
        res.redirect('back')
      } else {
          // Does the user own the campground?
          // Note we have to use the built in equals method because LHS is an object and RHS is a string
          if (foundCampground.author.id.equals(req.user._id)) {
            next()
          } else {
            req.flash('error', 'You don\' have permission to do that')
            res.redirect('back')
          }
      }
    })
  } else {
    req.flash('error', 'You need to be logged in to do that!')
    res.redirect('back')
  }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
  // Is user logged in
  if (req.isAuthenticated()) {
    // Does the user own the campground
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        console.log(err)
        res.redirect('back')
      } else {
          // Does the user own the campground?
          // Note we have to use the built in equals method because LHS is an object and RHS is a string
          if (foundComment.author.id.equals(req.user._id)) {
            next()
          } else {
            req.flash('error', 'You Don\'t Have Permission To Do That!')
            res.redirect('back')
          }
      }
    })
  } else {
    req.flash('error', 'You Need To Be Logged In!')
    res.redirect('back')
  }
}

middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!")
    res.redirect("/login")
}

module.exports = middlewareObj
