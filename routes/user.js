let express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/user');

    //routes config
    router.get('/',function(req,res){
        res.render('../views/cars/home');
    })
    //register route
    router.get('/register', function(req,res){
        res.render('../views/users/register');
    })
    //register logics
    router.post('/register',function(req,res){
        User.register(new User({username: req.body.username}),req.body.password,function(err,user){
            if(err){
                console.log(err);
                req.flash('error',err.message);
                res.redirect('back');
            }else{
                passport.authenticate('local')(req,res,function(){
                    req.flash('success','you are successfully registered');
                    res.redirect('/cars');
                })
            }
        })
    })
    //login route 
    router.get('/login',function(req,res){
        res.render('../views/users/login');
    })
    //login logic
    router.post('/login',passport.authenticate('local',{
        successRedirect:'/cars',
        failureRedirect: '/login'
    }),function(req,res){});
    //logout logic
    router.get('/logout',function(req,res){
        req.logOut();
        res.redirect('/');
        req.flash('success','you are successfully logedout')
    })

    module.exports = router