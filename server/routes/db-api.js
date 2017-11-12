var express = require('express');
var router = express.Router();
const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');
var ObjectId = require('mongoose').Types.ObjectId;
// api trigger for generating dummy meaningless demo data,
// router.get("/generate-data", checkJwt, function(req, res, next){
//     var generateDemo = require("../util/generate_demodata");
//     generateDemo();
//     res.send("");
// });

// send user data in every login time.
router.post('/user-info', checkJwt, function(req, res, next){
    // var generateDemo = require("../util/generate_demodata");
    //     generateDemo();
    // console.log("connectStatus: ",req.body.name, req.body.nickname, req.body.picture);
    var User = require("../model/User");
    User.find({name: req.body.name, nickname: req.body.nickname, img: req.body.picture}).then(
        function(result){
            if(result.length == 0){
                console.log("there is no data. Time to add data!");
                var user = new User();
                user.name = req.body.name;
                user.nickname = req.body.nickname;
                user.img = req.body.picture;
                user.save(function(err){
                    if(err){
                        res.send({"result": false, "content": "error occur while saving data"});
                    }
                })
            }else{
                console.log("exist user", {"result": true, "userId": String(result[0]._id)});
                res.send({"result": true, "userId": String(result[0]._id)});
            }
        }
    ).catch(function(err){
        console.log("something wrong happen: ", err);
        res.send({"result": false});
    });
});// END: router.get('/all-note', checkJwt, function(req, res, next)


// // get api to show share note in main panel.
// router.post('/share-note', checkJwt, function(req, res, next){
//     var getContent = require("../util/getContent");
//     var userExist = require("../util/checkUserExist");
//     userExist(req.body).then(function(userId){
//         if(userId){// user exist
//             getContent("share", userId.toString()).then(
//                 function(result){
//                     // console.log("check data before send: ", result);

//                     res.send({content:result, currentUserId: userId});
//                 }
//             ).catch(function(err){
//                 console.log("something wrong:" + err);
//                 res.send("wrong flg");
//             });
//         }else{
//             res.send("wrong flg");
//         }
//     });
// });// END: router.get('/share-note', checkJwt, function(req, res, next)

// delete note by id
router.post("/delete", checkJwt, function(req, res, next){// TODO: check functionality.
    var mongoose = require("mongoose");
    var noteId = req.body.noteId;
    console.log("detect delete" ,noteId);
    // var userId = mongoose.Types.ObjectId(req.body.userId);//
    var Note = require("../model/Note");
    Note.findOneAndRemove({_id: noteId}, (err, db) =>{
        // console.log("find it",db);


        let response = {
            message: "successfully deleted"
        };
        res.status(200).send(response);
    });
});

// like and dislike
router.post("/like-dislike", checkJwt, function(req, res, next){
    var mongoose = require("mongoose");
    var noteId = mongoose.Types.ObjectId(req.body.noteId);
    var userId = mongoose.Types.ObjectId(req.body.userId);
    var operation = req.body.operation;

    var Note = require("../model/Note");
    Note.findOne({_id: noteId}, function(err, database){
        var likeListExist = false;
        var dislikeListExist = false;
        for(var i = 0; i < database.like.length; i++){
            likeListExist = database.like[i].userId == String(userId);
            if(likeListExist){
                break;
            }
        }

        for(var i = 0; i <database.dislike.length; i++){
            dislikeListExist = String(database.dislike[i].userId) == String(userId);
            if(dislikeListExist){
                break;
            }
        }

        if(operation == "like"){
            // FIXME: more conditional(e.g. if already there, remove it), if already there in dislike, could not run)
            /**
             * TODO: make function to remove id if existed,
             */
            if(!likeListExist){
                database.like.push({userId: userId});
            }else{
                for(i=0; i<database.like.length; i++){
                    if(String(database.like[i]._id) == String(userId)){
                        database.like.splice(i--, 1);
                    }
                }
                var last = 0;
                for(var i = 0; i < database.like.length; i++){
                    if(String(database.like[i]._id) == String(userId)){
                        last = i;
                        break;
                    }
                }
                database.like.splice(last, 1);
            }

            if(dislikeListExist){// if user put dislike while clicking "like", remove user id from dislike
                for(i=0; i<database.dislike.length; i++){
                    if(String(database.dislike[i]._id) == String(userId)){
                        database.dislike.splice(i--, 1);
                    }
                }
                var last = 0;
                for(var i = 0; i < database.dislike.length; i++){
                    if(String(database.dislike[i]._id) == String(userId)){
                        last = i;
                        break;
                    }
                }
                database.dislike.splice(last, 1);
            }
        }else if(operation == "dislike"){
            // FIXME: more conditional(e.g. if already there, remove it), if already there in like, could not run)
            if(!dislikeListExist){
                database.dislike.push({userId: userId});
            }else{
                for(i=0; i<database.dislike.length; i++){
                    if(String(database.dislike[i]._id) == String(userId)){
                        database.dislike.splice(i--, 1);
                    }
                }
                var last = 0;
                for(var i = 0; i < database.dislike.length; i++){
                    if(String(database.dislike[i]._id) == String(userId)){
                        last = i;
                        break;
                    }
                }
                database.dislike.splice(last, 1);
            }

            if(likeListExist){// if user put like while clicking "dislike", remove user id from like
                for(i=0; i<database.like.length; i++){
                    if(String(database.like[i]._id) == String(userId)){
                        database.like.splice(i--, 1);
                    }
                }
                var last = 0;
                for(var i = 0; i < database.like.length; i++){
                    if(String(database.like[i]._id) == String(userId)){
                        last = i;
                        break;
                    }
                }
                database.like.splice(last, 1);
            }
        }
        // TODO: send data to re-render
        database.save(function(err){});
    }).then(function(dummy){
        Note.findOne({_id: noteId},function(err, database){
            var likeCount = 0;
            var dislikeCount = 0;
            for(var i = 0; i < database.like.length; i++){
                likeCount ++;
            }

            for(var i = 0; i <database.dislike.length; i++){
                dislikeCount ++;
            }
            res.send({"status": 200, result:{like: likeCount, dislike:dislikeCount}});
        });
    }).catch(function(err){
        res.send({"status": 500});
    });
});

// get api to show all note in main panel.
router.post('/all-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body).then(function(userId){
        if(userId){// user exist
            getContent("all", userId.toString()).then(
                function(result){
                    // console.log("check data before send: ", result);

                    res.send({content:result, currentUserId: userId});
                }
            ).catch(function(err){
                console.log("something wrong:" + err);
                res.send("wrong flg");
            });
        }else{
            res.send("wrong flg");
        }
    });
});// END: router.get('/all-note', checkJwt, function(req, res, next)

// get api to show share note in main panel.
router.post('/share-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body).then(function(userId){
        if(userId){// user exist
            getContent("share", userId.toString()).then(
                function(result){
                    // console.log("check data before send: ", result);

                    res.send({content:result, currentUserId: userId});
                }
            ).catch(function(err){
                console.log("something wrong:" + err);
                res.send("wrong flg");
            });
        }else{
            res.send("wrong flg");
        }
    });
});// END: router.get('/share-note', checkJwt, function(req, res, next)

// get api to show my note in main panel.
router.post('/my-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body).then(function(userId){
        if(userId){// user exist
            getContent("my", userId.toString()).then(
                function(result){
                    // console.log("check data before send: ", result);

                    res.send({content:result, currentUserId: userId});
                }
            ).catch(function(err){
                console.log("something wrong:" + err);
                res.send("wrong flg");
            });
        }else{
            res.send("wrong flg");
        }
    });
});// END: router.get('/my-note', checkJwt, function(req, res, next)

router.post('/add-note', checkJwt, function(req, res, next){
    var title = req.body.noteTitle;
    var content = req.body.noteCont;
    var desc = req.body.noteDesc;
    var tags = req.body.tags;
    tags = tags.split(", ").map(function(b){
        return b.substr(1);
    });
    var bIsTagEmpty = false;
    if(tags.length === 1 && tags[tags.length-1].length === 0){
        bIsTagEmpty = true;
    }
    var share = req.body.private === "No";// share message is string "Yes"/"No" not Boolean: true/false. it cause problem
    var type = req.body.noteType;
    var shareUser = req.body.shared;
    shareUser = shareUser.split(", ").map(function(b){
        return b;
    });
    var bIsSharedListEmpty;
    if(shareUser.length === 1 && shareUser[shareUser.length-1].length === 0){
        bIsSharedListEmpty = true;
        share = false;
    }else{
        bIsSharedListEmpty = false;
        share = true;
    }
    var shareUserIdList = [];
    var userId = req.body.userID;
    var lastEditId = req.body.userID;
    var mode = req.body.mode;
    var theme = req.body.theme;
    var auto = req.body.autoComplete;
    var line = req.body.lineNumber;

    var Tag = require("../model/Tag");
    var User = require("../model/User");
    var tagPromise = Promise.resolve(Tag.find());
    var userPromise = Promise.resolve(User.find());
    Promise.all([tagPromise, userPromise]).then(
        function(result){
            var tagList = result[0];
            var userList = result[1];
            function findTagByTagName(tagName){
                var result = tagList.filter(function(tagObject){
                    var result = false;
                    if(tagObject.tagName.indexOf(tagName) != -1){
                        result = true;
                    }
                    return result;
                });
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = {_id: undefined};
                }
                return result;
            }

            function findUserByUserName(userName){
                var result = userList.filter(function(userObject){
                    var result = false;
                    if(userObject.name.indexOf(userName) != -1){
                        result = true;
                    }
                    return result;
                });

                if(result.length > 0){
                    result = result[0];
                }else{
                    result = {};
                    result._id = undefined;
                }
                return result;
            }

            function findUserByNickName(userName){
                var result = userList.filter(function(userObject){
                    var result = false;
                    if(userObject.nickname.indexOf(userName) != -1){
                        result = true;
                    }
                    return result;
                });
                if(result.length > 0){
                    result = result[0];
                }else{
                    result = {};
                    result._id = undefined;
                }
                return result;
            }

            function getTagIdList(tagList){
                var result = [];
                for(var i = 0; i < tagList.length; i++){
                    result.push({tagName: tagList[i], saveState: getTagId(tagList[i])});
                }
                var newIds = saveNewTag(result);
                result = result.filter(o => o.saveState !== null);
                result = result.concat(newIds);
                return result;
            }

            var isSet = require("../util/isSet");

            function getTagId(tagName){
                return isSet(findTagByTagName(tagName)._id, null);
            }
            function saveNewTag(tagsIdList){
                var newIds = [];
                var newPromise = []
                for(var i = 0; i < tagsIdList.length; i++){
                    var tag = new Tag();
                    if(tagsIdList[i].saveState == null){
                        newIds.push({tagName: tagsIdList[i].tagName, saveState: tag._id});
                        tag.tagName = tagsIdList[i].tagName;
                        tag.save(function(err){});
                    }
                }
                return newIds;
            }
            if(!bIsTagEmpty){
                var tagsIdList = getTagIdList(tags);
                var tagSaveList = tagsIdList.map(function(col){
                    return col.saveState;
                });
            }else{
                tagSaveList = [];
            }
            userId = findUserByUserName(userId)._id;
            if(!bIsSharedListEmpty){
                shareUser.forEach(element =>{
                    shareUserIdList.push({userId: findUserByNickName(element)._id, r: true, w: false});
                });
            }else{
                shareUserIdList = [];
            }
            var newNoteId = addNote(tagSaveList, shareUserIdList, title, content, desc, share, type, mode, theme, auto, line, userId, userId);
            
            if(!bIsTagEmpty){
                for(var i = 0; i < tagSaveList.length; i ++){
                    Tag.update({"_id": ObjectId(tagSaveList[i])}, { $push: { noteId: newNoteId } }, function(err){
                        if(err){
                            console.log("Something gone wrong");
                        }else{
                            console.log("Success!!");
                        }
                    });
                }
            }
            res.send(JSON.stringify({s:"Success"}));
        });

});

function addNote(tagsList, shareUserList, title, content, desc, share, type, mode, theme, autoComplete, lineNumber, userId, lastEdit){
    const Note = require("../model/Note");
    var note = new Note();
    note.userId = userId;
    note.finalEditUserId = lastEdit;
    note.title = title;
    note.content = content;
    note.description = desc;
    note.tags = tagsList;
    note.share = share;
    note.shareUser = shareUserList;
    // note.like = likeUserList;
    // note.dislike = dislikeUserList;
    note.type = type;
    note.codeSetting.mode = mode; // example codeSetting
    note.codeSetting.theme = theme; // example codeSetting
    note.codeSetting.autoComplete = autoComplete; //default is false, so change true
    note.codeSetting.lineNumber = lineNumber;  //default is false, so change true
    note.save(function(err){
        if(err){
            console.log("something else");
            console.log(err);
        }else{
            console.log("save all note data correctly");
        }
    });
    return note._id;
}

module.exports = router;
