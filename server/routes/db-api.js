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
                console.log("there is data already.");
            }
            res.send({"result": true, "content": "done correclty"});
        }
    ).catch(function(err){
        console.log("something wrong happen: ", err);
        res.send({"result": false});
    });
});// END: router.get('/all-note', checkJwt, function(req, res, next)


// get api to show all note in main panel.
router.post('/all-note', checkJwt, function(req, res, next){
    var getContent = require("../util/getContent");
    var userExist = require("../util/checkUserExist");
    userExist(req.body).then(function(result){
        if(result){// user exist
            getContent("all", result.toString()).then(
                function(result){
                    // console.log("check data before send: ",result.length);
                    res.send(result);
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
    userExist(req.body).then(function(result){
        if(result){// user exist
            getContent("share", result.toString()).then(
                function(result){
                    res.send(result);
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
    userExist(req.body).then(function(result){
        if(result){// user exist
            getContent("my", result.toString()).then(
                function(result){
                    res.send(result);
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
    console.log(req.body);
});

module.exports = router;
