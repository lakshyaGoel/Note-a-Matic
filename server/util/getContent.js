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

function getContent(param, userId){
    const Note = require("../model/Note");
    var query = {};
    if(param === "share"){
        query.share = true;
        query.shareUser = {$in: [{userId: userId, r: true, w: false}, {userId: userId, r: true, w: true}]};
    }else if(param === "my"){
        query.userId = userId;
    }
    return Note.find(query);
}

module.exports = getContent;