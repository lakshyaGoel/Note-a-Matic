var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

// api trigger for generating dummy meaningless demo data,
// router.get("/generate-data", checkJwt, function(req, res, next){
//     var generateDemo = require("../util/generate_demodata");
//     generateDemo();
//     res.send("");
// });

// get api to show all note in main panel.
router.get('/all-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userId = "5a04a14dcd7960f3a1206183";
    getContent("all", userId).then(function(result){
        console.log("before sending: ", result);
        res.send(result);
    }).catch(function(err){
        console.log("something wrong:" + err);
        res.send("wrong flg");
    });
});// END: router.get('/all-note', checkJwt, function(req, res, next)

// get api to show share note in main panel.
router.get('/share-note', checkJwt, function(req, res, next){

});// END: router.get('/share-note', checkJwt, function(req, res, next)

// get api to show my note in main panel.
router.get('/my-note', checkJwt, function(req, res, next){

});// END: router.get('/my-note', checkJwt, function(req, res, next)

router.post('/add-note', checkJwt, function(req, res, next){
    console.log(req.body);
});
// test db connection and something like that. not production;
router.get('/test', checkJwt, function(req, res, next){
    // TODO: generate random data and more topic focus Note data adding(20~40 note, 10~20tags, 10~20dummy user)
    //    console.log("run here in route/db-api/test");
    var result = {"result": "Hello from server"};
    // console.log("send:msg", result);
    res.json({"result": "Hello from server"});

    // BEGIN: add note data to Note database
    function addNote(tagsList, shareUserList, likeUserList, dislikeUserList){
        const Note = require("../model/Note");
        var note = new Note();
        note.title = "db connection test";
        note.content = "main content string";
        note.description = "save data from api call";
        note.tags = tagsList;
        note.share = true;
        note.shareUser = shareUserList;
        note.like = likeUserList;
        note.dislike = dislikeUserList;
        note.type = "code";
        note.codeSetting.mode = "JavaScript"; // example codeSetting
        note.codeSetting.theme = "github"; // example codeSetting
        note.codeSetting.autoComplete = true; //default is false, so change true
        note.codeSetting.lineNumber = true;  //default is false, so change true
        note.save(function(err){
            if(err){
                console.log("something else");
            }else{
                console.log("save all note data correctly");
            }
        })
    }

    const TagModel = require("../model/Tag");
    var tagPromise = TagModel.find().select("_id");//.exec();// get Promise Object
    const UserModel = require("../model/User");
    var userPromise = UserModel.find().select("_id");
    Promise.all([tagPromise, userPromise]).then(
        function(result){
            var tagsIdList = result[0].map(function(col){
                return col._id;
            });
            addNote(tagsIdList, result[1], result[1], result[1]);
        },
        function(error){
            console.log("error: ", error);
        }
    );

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
    // END: add note data to Note database


    // BEGIN: add user information to user database.
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
    // END: add user information to user database.


    // BEGIN: Tag Database functionality
    // add tag data to Tags Database
    const Tags = require("../model/Tag");
    var tag = new Tags();
    var tagName = "tag name!";// add tagName
    tag.tagName = tagName;
    tag.save(function(err){
        if(err){
            // console.log("problem tehre");
        }else{
            // console.log("success saving");
        }
    });

    // add Note's id to Tag database.
    const NoteModel = require("../model/Note");
    var noteQuery = NoteModel.find();
    var notePromise = noteQuery.exec();
    var tagQuery = Tags.where({"tagName": tagName});
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
    // END: Tag Database functionality


});// END: router.get('/test', checkJwt,function(req, res, next){

module.exports = router;
