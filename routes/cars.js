let express  = require('express'),
   router    = express.Router(),
   Car       = require('../models/car'),
   mid       = require('../midlewares/mid');


   //routes
   router.get('/cars',mid.isAuth,(req,res)=>{
       Car.find({},function(err,cars){
           if(err){
               console.log(err);
               res.redirect('back');
           }else{
               res.render('../views/cars/index',{cars:cars});
           }
       })
   })
   //new route
   router.get('/cars/new',function(req,res){
       res.render('../views/cars/new');
   })
   //create route
   router.post('/cars',function(req,res){
       let owner = {
           id: req.user._id, username: req.user.username
       };
       let newCar = new Car({
           carname: req.body.carname,image:req.body.image,model:req.body.model,
           make:req.body.make,year:req.body.year,owner:owner
       });
       Car.create(newCar,function(err,car){
           if(err){
               console.log(err);
               req.flash('error',err.message);
               res.redirect('back');
           }else{
               res.redirect('/cars');
           }
       })
   })
   //show route
   router.get('/cars/:id',(req,res)=>{
       Car.findById(req.params.id).populate('comments').exec(function(err,car){
           if(err){
               console.log(err);
               req.flash('error',err.message);
               res.redirect('back');
           }else{
               res.render('../views/cars/show',{car:car});
           }
       })
   })
   //edit route
   router.get('/cars/:id/edit',mid.carOwner,function(req,res){
       Car.findById(req.params.id,(err,car)=>{
           if(err){
               console.log(err);
               req.flash('error',err.message);
               res.redirect('back');
           }else{
               res.render('../views/cars/edit',{car:car});
           }
       })
   })
   //update route
   router.put('/cars/:id',mid.carOwner,function(req,res){
       Car.findByIdAndUpdate(req.params.id,req.body.car,function(err){
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
   router.delete('/cars/:id',mid.carOwner,function(req,res){
       Car.findByIdAndDelete(req.params.id,function(err){
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