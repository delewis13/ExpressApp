var express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middleware = require('../middleware')

// ================
// Comments routes
// ================

// Create new comment form

router.get('/new', middleware.isLoggedIn, function (req, res) {
  // Find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})

// Create new comment

router.post('/', middleware.isLoggedIn, function (req, res){
    // Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // Create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                } else {
                    // Add username and id to the comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()

                    // Connect comment with campground
                    campground.comments.push(comment);
                    campground.save();

                    // Redirect to campground showpage
                    redirect_url = "/campgrounds/" + campground._id
                    req.flash('success', 'Created Comment!')
                    res.redirect(redirect_url);
                }
            });
        }
    });
});

// Comments edit route

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err || !foundCampground){
      req.flash('error', 'No campground found')
      return res.redirect('back')
    } else {
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment) {
          req.flash('error', 'Comment not found.')
          res.redirect('back')
        } else{
            res.render('comments/edit', {campground_id: foundCampground.id, comment: foundComment})
        }
    })
    }
  })
})

// Comments update

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect('back')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

// Comment destroy route

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect('back')
    } else {
      req.flash('success', 'Comment Deleted')
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

module.exports = router;
