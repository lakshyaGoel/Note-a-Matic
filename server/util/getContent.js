/**
 * Created by reiven on 2017/11/08.
 * This file is to write the function
 * which help to get the note content for main page.
 */

/**
 * what I need
 *
 * connect Note,
 * - manage flag(all/share/my)
 * - query that.
 */

var mongoose = require("mongoose");
function getContent(param, userId){
    // console.log("find user ",userId);
    var result = [];
    var dbPromise = [];
    const Note = require("../model/Note");
    var query = {};
    userId = mongoose.Types.ObjectId(userId);

    if(param === "share"){
        query =  {
            "share": true,
            shareUser: {$elemMatch: {userId: userId, r: true, w: true}}
        };
    }else if(param === "my"){
        query = {userId: userId};
    }else if(param === "all"){
        query = {
            $or: [
                {"share": true, shareUser: {$elemMatch: {userId: userId, r: true, w: true}}},
                {"userId": userId}
            ]
        }
    }
    // console.log(query);

    return Note.find(query);
}

module.exports = getContent;