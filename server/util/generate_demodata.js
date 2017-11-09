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
    var tagList = ["PPAP", "Comedian", "Anime", "Addictive", "Song", "Rap", "Hip-Hop", "Homecoming Concert", "Strong", "Hero"];
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

            function generateNoteParts(title, content, currentCallNumber){
                var result = {};
                result.content = content;
                result.title = title;
                var tempContent = result.content.split(" ");
                result.description = (tempContent.length > 5)? tempContent.slice(0,5).join(" "): tempContent.join(" ");
                result.share = (currentCallNumber%2 == 1);
                result.type = (currentCallNumber %3 == 0)? "code": "note";
                result.codeSetting = {mode: "JavaScript", theme: "Github", autoComplete: true, lineNumber: true};
                result.tags = [];
                result.shareUser = [];
                result.like = [];
                result.dislike = [];
                return result;
            }

            var isSet = require("./isSet");

            function getTagId(tagName){
                return isSet(findTagByTagName(tagName)._id, null);
            }

            function getTagIdList(tagList){
                var result = [];
                for(var i = 0; i < tagList.length; i++){
                    result.push(getTagId(tagList[i]));
                }
                return result;
            }

            function getSharedUserItem(userName, editAuth){
                result = {};
            }

            var note1 = generateNoteParts("PPAP", "I have a pen, I have an apple, Oh! Apple Pen. I have a pen, I have pinnaple. Oh! Pinnaple Pen, Apple Pen. Pineapple Pen! Oh! Pen Pineapple Apple Pen!", 0);
            var note2 = generateNoteParts("One Punch", "My name is Saitama. I'm a hero. I could kill every bad guys with only one punch.", 1);
            var note3 = generateNoteParts("The important thing", "Ninja were...merciless demi-gods, ruling Japan with their karate in the age of ninja tranquility.But, “some” committed a forbidden form of hara-kiri storing their souls at Kinkaku Temple for future resurrection.Their lost history was falsified and concealed and the truth about these ninja was long forgotten..", 2);
            var note4 = generateNoteParts("Welcome to Japari-park", "Tanoshiiii! Sugoo! Servel Chan!", 3);
            var note5 = generateNoteParts("or nah", "Is you really 'bout your money or nah? Can you really take dick or nah? Can I bring another bitch or nah? Is you with the shits or nah?", 4);
            var note6 = generateNoteParts("Sucker for Pain", "I torture you Take my hand through the flames I torture you ", 5);
            var note7 = generateNoteParts("2 On", "Man, I love to get on I love to get 2 on When the drink be too strong When the tree be way too strong", 6);
            var note8 = generateNoteParts("From Time", "Cause I love me, I love me enough for the both of us That's why you trust me, I know you've been through more than most of us So what are you? What are you, what are you so afraid of? Darling you, you give but you cannot take love", 7);
            var note9 = generateNoteParts("Low Life", "I just took some molly, what else?Got some bitch from Follies with us She gonna fuck the squad, what else? I'mma fuck her broads, what else? ", 8);

            note1.tags = getTagIdList(["PPAP", "Comedian", "Addictive", "Song"]);
            note2.tags = getTagIdList(["Anime", "Strong", "Hero"]);
            note3.tags = getTagIdList(["Anime", "Addictive", "Hero"]);
            note4.tags = getTagIdList(["Anime", "Addictive"]);
            note5.tags = getTagIdList(["Song", "Addictive", "Hip-Hop", "Homecoming Concert"]);
            note6.tags = getTagIdList(["Song", "Addictive", "Hip-Hop"]);
            note7.tags = getTagIdList(["Song", "Addictive", "Homecoming Concert"]);
            note8.tags = getTagIdList(["Song", "Addictive", "Hio-Hop"]);
            note9.tags = getTagIdList(["Song", "Addictive", "Hio-Hop"]);


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