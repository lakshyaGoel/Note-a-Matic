var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');


// test db connection and something like that. not production;
router.get('/test', checkJwt,function(req, res, next){
  // TODO: make insert, select command here and check it work correctly...
  //    console.log("run here in route/db-api/test");
  var result = {"result" : "Hello from server"};
  // console.log("send:msg", result);
    res.json({"result" : "Hello from server"});
  const Note = require('../model/Note');
  var note = new Note();
  note.title = "db connection test";
  note.content = "main content string data goes here like this sentence.";
  note.description = "save data from api call";
  // note.tags.push(tag); // there is no tag database now, so comment out
  note.share = true;// default is false, so change true.
  // note.shareUser.push({userId: user, w: true});// there is not user id yet, so comment out
  note.type = "code"; // default is "note", so change"code"
  note.codeSetting.mode = "JavaScript"; // example codeSetting
  note.codeSetting.theme = "github"; // example codeSetting
  note.codeSetting.autoComplete = true; //default is false, so change true
  note.codeSetting.lineNumber = true;  //default is false, so change true
  // note.like.push({userId: user});// comment out now because there is no user id
  // note.dislike.push({userId: user});// comment out now because there is no user id
  // console.log("save data: ",note);
  note.save(function(err){
    if(err){
      // console.log("eror detect: ", err);
      return false;
    }else{
      // console.log("saved correctly");
      return true;
    }
  });

  // add basic information to user database.
  const User = require("../model/User");
  var user = new User();
  user.img = "/path/to/img.jpg";
  user.name = "Demo Taro";
  user.nickname = "PPAP";
  user.save(function(err){
    if(err){
      // console.log("problem tehre");
    }else{
      // console.log("success saving");
    }
  });


  // add tag data to Tags Database
  const Tags = require("../model/Tags");
  var tag = new Tags();
  tag.tagName = "tag1";
  // tags.noteId.push()
  tag.save(function(err){
    if(err){
      // console.log("problem tehre");
    }else{
      // console.log("success saving");
    }
  });
  // add Note's id to Tag database.
  var noteQuery = Note.find();
  var notePromise = noteQuery.exec();
  var tagQuery = Tags.where({"tagName": "tag8"});
  var tagPromise = tagQuery.findOne().exec();
  notePromise.then(function(result){
    // console.log("ID: ", result);
    var idList = [];
    for(var i = 0; i < result.length; i++){
      idList.push(result[i]._id);
    }
    tagPromise.then(function(result){
      result.noteId = idList;
      result.save(function(err){
        if(err){
          // console.log("errro");
        }else{
          // console.log("done");
        }
      });
    })
  });
});


// simple API call, no authentication or user info
router.get('/unprotected', function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });
});

// checkJwt middleware will enforce valid authorization token
router.get('/protected', checkJwt, function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

  // the auth0 user identifier for connecting users with data
  console.log('auth0 user id:', req.user.sub);

  // fetch info about the user (this isn't useful here, just for demo)
  const userInfoUrl = req.user.aud[1];
  const bearer = req.headers.authorization;
  fetch(userInfoUrl, {
  	headers: { 'authorization': bearer },
  })
    .then(res => res.json())
    .then(userInfoRes => console.log('user info res', userInfoRes))
    .catch(e => console.error('error fetching userinfo from auth0'));

});

module.exports = router;
