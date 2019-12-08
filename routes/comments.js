let express = require('express'),
    router  = express.Router(),
    Comment = require('../models/comment'),
    Car    = require('../models/car'),
    mid    =  require('../midlewares/mid');

    //new route
    router.get('/cars/:id/comments/new',mid.isAuth,function(req,res){
        Car.findById(req.params.id,function(err,car){
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');
            }else{
                res.render('../views/comments/new',{car:car});
            }
        })
    })
    //create route
    router.post('/cars/:id/comments',mid.isAuth,function(req,res){
        Car.findById(req.params.id,function(err,car){
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');
            }else{
                let author = {id:req.user._id,username:req.user.username};
                let newComment = new Comment({text: req.body.text, author:author});
                Comment.create(newComment,function(err,comment){
                    if(err){
                        console.log(err);
                        req.flash('error',err.message);
                        res.redirect('back');

                    }else{
                        car.comments.push(comment);
                        car.save();
                        res.redirect('/cars/'+req.params.id);
                    }
                })
            }
        })
    })
    //edit route
    router.get('/cars/:id/comments/:comment_id/edit',mid.commentOwner,function(req,res){
        Car.findById(req.params.id,(err,car)=>{
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');

            }else{
                Comment.findById(req.params.comment_id,(err,comment)=>{
                    if(err){
                        console.log(err);
                        req.flash('error',err.message);
                        res.redirect('back');
                    }else{
                        res.render('../views/comments/edit',{car:car,comment:comment});
                    }
                })
            }
        })
    })
    //update route
    router.put('/cars/:id/comments/:comment_id',mid.commentOwner,function(req,res){
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');

            }else{
                res.redirect('/cars/'+req.params.id);
            }
        })
    })
    //delete route
    router.delete('/cars/:id/comments/:comment_id',mid.commentOwner,function(req,res){
        Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');

            }else{
                res.redirect('/cars');
            }
        })
    })

    module.exports = router;