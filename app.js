let express                 = require('express'),
    app                     = express(),
    User                    = require('./models/user'),
    flash                   = require('connect-flash'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    carsRoute               = require('./routes/cars'),
    userRoute               = require('./routes/user'),
    bodyParser              = require('body-parser'),
    commentRoute            = require('./routes/comments'),
    localPassport           = require('passport-local'),
    mehthodOverRide         = require('method-override');
    //connet mongoose
    mongoose.connect('mongodb://localhost:27017/car_show',{useNewUrlParser:true,useUnifiedTopology: true});
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    //set express
    app.set('view engine','ejs');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(mehthodOverRide('_method'));
    app.use(express.static('public'));
    app.use(flash());
    //config passport
    app.use(require('express-session')({
        secret: "show your ride if your not ashamed of it",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localPassport(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //midleware function
    app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error       = req.flash('error');
        res.locals.success     = req.flash('success');
        next();
    })

    
    //routes
   
    app.use(userRoute);
    app.use(carsRoute);
    app.use(commentRoute);

    //fire up server
    app.listen(3000,function(){
        console.log('there is a car show going on on ave 3000');
    })
    
    