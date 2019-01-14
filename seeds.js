var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest",
        image: "https://www.photosforclass.com/download/pixabay-839807?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe136b80728f31c22d2524518b7444795ea76e5d004b0144592f0c670a0ebb2_960.jpg&user=Free-Photos",
        description: "It's quite nice. Shiny moon. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Hot Cocoa",
        image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f7c17eaeeab3bf_340.jpg",
        description: "Get your fire going and have some chocolate drank! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Boring Camp",
        image: "https://www.photosforclass.com/download/flickr-1430198323",
        description: "Pretty much campging as usual. Some green stuff. A hill. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Desert Life",
        image: "https://pixabay.com/get/ea3db60d2df1053ed1584d05fb1d4e97e07ee3d21cac104491f7c17eaeeab3bf_340.jpg",
        description: "Go camping in the desert and possibly have a heatstroke. Good times. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
    // Delete campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("Removed campgrounds.")
        }

        // // Add campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("Added a campground.")
        //             // Create a comment
        //             Comment.create(
        //             {
        //                 text: "This place is great, but I wish there was internet",
        //                 author: "Homer"
        //             }, function(err,comment){
        //                 if(err){
        //                     console.log(err)
        //                 } else {
        //                     campground.comments.push(comment)
        //                     campground.save()
        //                     console.log("Created new comment")
        //                 }
        //             });
        //         };
        //     });
        // });
    });

    // Add comments

}

module.exports = seedDB;
