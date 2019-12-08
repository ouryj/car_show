let User    = require('../models/user'),
    Car     = require('../models/car'),
    Comment = require('../models/comment');

    let check = {};

    check.isAuth = function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/login');
        }
    }
    
    check.carOwner = function(req,res,next){
        if(req.isAuthenticated()){
            Car.findById(req.params.id,(err,car)=>{
                if(err){
                    console.log(err);
                    req.flash('error',err.message)
                    res.redirect('back');
                }else if(car.owner.id.equals(req.user._id)){
                    return next();
                }else{
                    req.flash('error','permission denied');
                    res.redirect('back');
                }
            })

        }else{
            res.redirect('/login')
        }
    }
    //comment owner
    check.commentOwner = function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,(err,comment)=>{
                if(err){
                    req.flash('error',err.message);
                    res.redirect('back');
                }else if(comment.author.id.equals(req.user._id)){
                    return next();
                    
                }else{
                    req.flash('error','you dont own that comment')
                    res.redirect('back');
                }
            })

        }else{
            res.redirect('/login')
        }
    }

    module.exports = check;