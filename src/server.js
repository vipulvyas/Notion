var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var Users = require('./models/register');
var admin = require('./models/admin');
var art = require('./models/article');
var com = require('./models/comment');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/Notion',{useNewUrlParser:true},(err)=>{

  if(err) { console.log('Can not connect to the database'+ err);}
  else{
    console.log('======= connection established to the database==========');
  }
});

mongoose.set('useCreateIndex',true);

// const app = express();
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());
const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('ACCESS_Control-Allow-Headers','*');
 
  if('OPTIONS' === req.method)
  {
    return res.sendStatus(200);
  }
  next();
});
  
app.get('/',function(req,res){
  res.json({
    status:false
  }); 
});

console.log("\ninside server.js file\n");
app.post('/users/create',function (req, res) {
  console.log(req.body.admin)
          if(req.body.admin!=null){
            console.log('inside admin login');
            admin.find({password:req.body.admin},function(err,data){
                if(err){
                  console.log('in')
                  console.log(err,'err');
                  console.log('out')
                  res.send({status:0});
                }
                console.log(data.length,'data.len');
              if(data.length >0){
                admin.create({
                  fname:req.body.fname,
                  lname:req.body.lname,
                  username:req.body.username,
                  password:req.body.password,
                },function(err) {
                  if(err)
                  {
                    localStorage.setItem('status','false');
                    console.log(err,'err');
                    console.log('res from upload');
                  }
                  else{
                    console.log('setting status true');
                    localStorage.setItem('status','true');
                  }
                });
                console.log(' runnig after setting before local storage');
                    console.log(localStorage.getItem('status'),'local storage');
                    if(localStorage.getItem('status')=='true')
                    {
                      localStorage.removeItem('status');
                      res.send({status:1,mess:'registered successfully'});
                    }
                    else{
                      localStorage.removeItem('status');
                      res.send({status:0,mess:'server not responding or try useing differ uasername'});

                    }
              }
              else{
                res.send({status:0,mess:'invalide admin password'});
              }
            });
            
          }
            else{
                      Users.insertMany({
                            fname:req.body.fname,
                            lname:req.body.lname,
                            follower: '17',
                            following: '15',
                            username:req.body.username,
                            password:req.body.password,
                          },function(err, res) {
                            if(err)
                            {
                              localStorage.setItem('status','false');
                              console.log(err);
                              console.log('res from upload');
                            }
                            else{
                              localStorage.setItem('status','true');
                            }
                          });
              console.log(localStorage.getItem('status'));
                if(localStorage.getItem('status')=='true')
                {
                  localStorage.removeItem('status');
                  res.send({status:1,mess:'mess from user success'});
                }
                else{
                  localStorage.removeItem('status');
                  res.send({status:0,mess:'mess from user fails'});

                }
              }
});


//student login check
app.post('/users/login',function (req, res) {
  if(req.body.admin==true){
      admin.findOne({"username":req.body.username},function(err,users){
        console.log("data is fetching from "+ req.body.username);
        console.log("user is "+users);
        if(!err && users && users.password==req.body.password){
          return res.send({status:1,des:'admin'});
        }
        else{
          console.log(err);
          return res.send({status:0});
        }
      })
    }
    else{
      Users.findOne({"username":req.body.username},function(err,users){
        console.log("data is fetching from "+ req.body.username);
        console.log("user is "+users);
        if(!err && users && users.password==req.body.password){
          return res.send({status:1,des:'user'});
        }
        else{
          console.log(err);
          return res.send({status:0});
        }
      })}
    });
    

 app.post('/admin',function(req,res){
  admin.insertMany({
    fname:req.body.fname,
    lname:req.body.lname,
    username:req.body.username,
    password:req.body.password,
    Available_interest:req.body.interest,
  });
 });

 app.post('/upload',function(req,res){
   console.log('author is '+req.body.author);
    art.insertMany({
      author:req.body.author,
      articles:{
        title:req.body.title,
        author:req.body.author,
        content:req.body.content,
        interest:req.body.interest,
        imagePath:req.body.imagePath,
      } 
    },function(err,res){
      if(err)
      {
        localStorage.setItem('status','false');
        console.log(err);
        console.log('res from upload');
        console.log(res);
      }
      else{
        localStorage.setItem('status','true');
      }
    });
    console.log(localStorage.getItem('status'));
    if(localStorage.getItem('status')=='true')
    {
      localStorage.removeItem('status');
      res.send({status:1});
    }
    else{
      localStorage.removeItem('status');
      res.send({status:0});

    }

 });

 app.post('/loadArticle',function(req,res){

  art.find({},function(err,data){
    if(err)
    {
      res.send({status:0});
    }
    else{
      res.send({status:1,article:data});
    }

  })


 });

 app.post('/loadComments',function(req,res){
   com.find({ Article_id:req.body.id  },function(err,data){
    if(err)
    {
      console.log(err);
      res.send({status:0});
    }
    else{
      console.log("Comment data is ");
      console.log(data);
      res.send({status:1,article:data});
    }
   });
 });
 

 app.post('/addComment',function(req,res){
  console.log('author is : '+req.body.author);
  com.insertMany({
    Article_id:req.body.id,
    comment:{
      text:req.body.comment,
      author:req.body.author,
      
    } 
  },function(err,res){
    if(err)
    {
      localStorage.setItem('status','false');
      console.log(err);
      console.log('res from upload');
      console.log(res);
    }
    else{
      localStorage.setItem('status','true');
    }
  });
  console.log(localStorage.getItem('status'));
  if(localStorage.getItem('status')=='true')
  {
    localStorage.removeItem('status');
    res.send({status:1});
  }
  else{
    localStorage.removeItem('status');
    res.send({status:0});

  }
  
 });

 app.post('/adminSearch',function(req,res){
  Users.find({ "username" : { $regex: req.body.username, $options: 'i' } },
  function (err, person) {
         if (err) 
         {
           res.send({status:0});
         }
         else{
          console.log(person);
          res.send({status:1,user:person});
         }
        
        
   });
 });

 app.post('/doMess',function(req,res){
   
    admin.update(
      { username:req.body.user },
      { $push : { message: { title: req.body.title , content: req.body.des } } },
      function(err,data){
        if(err){
          console.log(err,'do mess error');
          res.send({status:0,mess:'fail to message'});
        }
        else{
          console.log('running')
          res.send({status:1,mess: 'Message send Sucessfully'});

        }
      }
      )
 });
  
 app.post('/addCategory',function(req,res){
   console.log(req.body.user)
   
   admin.find({username:req.body.user},{_id:0,Available_interest:1},function(err,data){
    console.log(err)
    // console.log(data[0].Available_interest,'data')
    // console.log(reqCate,'reqsted   ');
    // console.log(data[0].Available_interest.indexOf(reqCate),'index in array')
    if(data[0].Available_interest.indexOf(req.body.Category)>-1){
      console.log('inside checck methos await')
      res.send({status:0,'mess':'Category Already Available'})

    } 
    else{
      admin.update(
        {username: req.body.user},
          { $push: { Available_interest: req.body.Category}},
          function(err,result){
            if(err || result.n==0){
             console.log(err)
             res.send({status:0,mess:'server not responding or category must be available  all ready'});
           }
           else{
             console.log(result);
             res.send({status:1,mess:'added sucessfully'});
   
           }
          }
       );
    }
   });
    
 });
 app.post('/deleteCategory',function(req,res){
   
  admin.update(
    { username:req.body.user },
    { $pull: { Available_interest: { $in: req.body.Category } } },
    { multi: true },
    function(err,result){
      if(err ){
        console.log(err)
        res.send({status:0,mess:'server not responding or category Not available to delete'});
      }
      else{
        console.log(result.nModified)
        if(result.nModified==0){
          res.send({status:1,mess:'Category not available to delete'});
        }
        else{
        res.send({status:1,mess:'Deleted sucessfully'});
      }

      }
    })
  
 });
 app.post('/deleteInterest',function(req,res)
 {
  users.update(
    { username:req.body.user },
    { $pull: { interest: { $in: req.body.Category } } },
    { multi: true },
    function(err,result){
      if(err ){
        console.log(err)
        
      }
      else{
        console.log(result.nModified)
        if(result.nModified==0){
          console.log('interest not deleted');
         
        }
        else{
          console.log('interest Deleted');
        
        }

      }
    })
 
 });
 app.post('/fetchInterest',function(req,res){
  console.log(req.body.user)
  
  admin.find({username:'admin'},{_id:0,Available_interest:1},function(err,data){
   console.log(err)
   // console.log(data[0].Available_interest,'data')
   // console.log(reqCate,'reqsted   ');
   // console.log(data[0].Available_interest.indexOf(reqCate),'index in array')
   if(err){
    
    res.send({status:0});

   }
   else{
     console.log(data[0].Available_interest);
    res.send({status:1,mess:data[0].Available_interest});
   }
   
  });
   
});
app.post('/deleteAl',function(req,res){
  Users.update({ username:req.body.user },
    {$unset: {interest: 1 }},
    function(err,result){
      console.log(err)
      console.log(result)
      res.send({status:'done'});
    }
    )
})
app.post('/editInterest',function(req,res)
 {
  
  Users.update(
    { username:req.body.user },
    {$push:{ interest:req.body.interest } },
   
    function(err,result){
      if(err ){
        console.log(err)
        res.send({status:0,mess:'Interest Not Added'});
      }
      else{
        res.send({status:1,mess:'Interest Added sucessfully'});

      }
      
    })
 
 });



 app.post('/fatchUserInt',function(req,res){
  Users.find({ username:req.body.user },
    {_id:0,interest:1,following:1,follower:1},
    function(err,result){
      if(err){
        console.log(err)
        res.send({status:0});
      }
      else
      {
        console.log(result[0]);
        res.send({status:1,mess:result[0]});

      }
    }
    )
});

app.post('/fatchUser',function(req,res){
  art.find({ author:req.body.user },
    {_id:0,articles:1},
    function(err,result){
      if(err){
        console.log(err)
        res.send({status:0});
      }
      else
      {
        if(result.length==0){
            res.send({status:1,mess:0});
        }
        else{
        console.log(result[0].articles.length,'length of arti');
        res.send({status:1,mess:result[0].articles.length});
        }
      }
    }
    )
});

app.post('/messDo',function(req,res){
   console.log('inside')
   admin.find({ username:'admin' },
     {_id:0,message:1},
    function(err,result){
       if(err){
        console.log(err)
        res.send({status:0});
      }
      else
      {
        console.log(result[0] ,'message');
        res.send({status:1,mess:result[0].message});

      }
    }
    )
});

app.post('/fetchArt',function(req,res){
  console.log(req.body.user);
  
  art.find({author:req.body.user,'articles.author':req.body.user},{_id:0,articles:1},function(err,data){
    if(err)
    {
      res.send({status:0});
    }
    else{
      console.log(data,'author data');
      res.send({status:1,mess:data});
    }

  })


 });

 /*
 art.insertMany({
    comment:{
      author:req.body.author, 
      text:req.body.comment,
      Article_id:req.body.id
    } 
  },function(err,res){
    if(err)
    {
      localStorage.setItem('status','false');
      console.log(err);
      console.log('res from upload');
      console.log(res);
    }
    else{
      localStorage.setItem('status','true');
    }
  });
  console.log(localStorage.getItem('status'));
  if(localStorage.getItem('status')=='true')
  {
    localStorage.removeItem('status');
    res.send({status:1});
  }
  else{
    localStorage.removeItem('status');
    res.send({status:0});

  }
 */
app.post('/upload2',function(req,res){
  console.log('author is '+req.body.author);
  console.log('id is '+req.body.id);

  art.update(
    {'articles._id': req.body.id}, 
    {'$set': {
      'articles.$.title': req.body.title,
      'articles.$.author': req.body.author,
      'articles.$.content': req.body.content,
      'articles.$.interest': req.body.interest,
      'articles.$.imagePath': req.body.imagePath,

  }},
  function(err,result){
    console.log(err);
    console.log(result);
    
    
  }
    );
    res.send({done:'done'});

});