var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var sql = 'select*from mygoals';
  db.query(sql,function(err,data,fields){
  if (err) throw err;
  res.render('form',{goals:data});
  });
  
});

router.post('/add', function(req,res,next){
  // store user input data
  const userDetails=req.body;
  // insert user goals into the mygoals table
  db.query("INSERT INTO mygoals (Category,text,goalComplete,goalDate) VALUES(? ,?,?,?)",[userDetails.cat ,userDetails.text,userDetails.complete,userDetails.goaldate],function(err,data){
    if (err) throw err;
    console.log("user data is inserted successfully");
  });
  // redirect to /
  res.redirect('/goals')
});

router.get('/delete/:goalID',function(req,res,next){
  var id = req.params.goalID;
  console.log("-----opppppp");
  var query = `DELETE FROM mygoals  WHERE goalID = ${id}`;

  db.query(query,function(error,data){
    if(error){
      throw error;
    }
    else{
      res.redirect('/goals');
    }

  });

});

module.exports = router;


