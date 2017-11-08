/**
 * Created by reiven on 2017/11/08.
 */

function generateDemoUser(){
    var User = require("../model/User");
    var userName = ["Demo Nakamachi", "Pico Taro", "Kosaka Daimaou", "Ninja Slayer", "Serval Chan", "One-Punch man", "Saitama", "Lil Wayne", "Kanye West", "Ty Dolla Sign", "Tinashe"];
    var errorCount = 0;
    for(var i = 0; i < userName.length; i++){
        var user = new User();
        user.img = "./religious_otter.jpg";// dummy image url
        user.name = userName[i];
        user.nickname = userName[i].split(" ")[0];
        user.save(function(err){
            if(err){
                errorCount += 1;
            }
        });
    }
    console.log("error while generateDemoUser: " + errorCount);
}

function generateDemoTag(){
    var Tag = require("../model/Tag");
    var tagList = ["PPAP", "Comedian", "Anime", "Addictive", "Sing", "Rap", "Hip-Hop", "Homecoming Concert", "Strong", "Hero"];
    var errorCount = 0;
    for(var i = 0; i < tagList.length; i++){
        var tag = new Tag();
        tag.tagName = tagList[i];
        tag.save(function(err){
            if(err){
                errorCount += 1;
            }
        });
    }
    console.log("error while generateDemoTag: ", errorCount);
}

function generateNote(){
    /**
     * first, get Tag data
     * second, get User data
     * then, generate note data with Tag data and User data.
     * when I need Tag and User data?
     *      - userId, tags, shareUser, like, dislike
     */
    var Tag = require("../model/Tag");
    var User = require("../model/User");
    var tagPromise = Promise.resolve(Tag.find());
    var userPromise = Promise.resolve(User.find());
    Promise.all([tagPromise, userPromise]).then(
        function(result){
            var tagList = result[0];
            var userList = result[1];
            function findTagByTagName(tagName){
                return tagList.filter(function(tagObject){
                    var result = false;
                    if(tagObject.tagName.indexOf(tagName) != 0){
                        result = true;
                    }
                    return result;
                });
            }

            function findUserByUserName(userName){
                return userList.filter(function(userObject){
                    var result = false;
                    if(userObject.name.indexOf(userName) != -1){
                        result = true;
                    }
                    return result;
                });
            }


        }
    );// END: Promise.all([tagPromise, userPromise])
}

function generateDemoData(){
    var generateUserPromise = Promise.resolve(generateDemoUser());
    var generateTagPromise = Promise.resolve(generateDemoTag());
    Promise.all([generateUserPromise, generateUserPromise]).then(
        generateNote()
    );
}