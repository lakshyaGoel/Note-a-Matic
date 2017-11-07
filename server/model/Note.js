/**
 * Created by reiven on 2017/11/07.
 */

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URL);

var note = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    content: text,// main content of note
    title: text,// content title
    tags: [Schema.Types.ObjectId],
    share: {Boolean, default: false}, // if enable to share, set true, else this note could not share
    shareUser: [{// item added in share user's schema is below.
        userId: {type: Schema.Types.ObjectId},
        r: {type: Boolean, default: true},// read authority, if true, note can read only, else, note can't see whether share flag is true, default is true.
        w: {type: Boolean, default: false},// write authority, if true, note can edit, else note cannot edit, default: false
        x: {type: Boolean, default: false}// execute authority, if true, note can delete item, else note cannot delete, default false
    }],
    description: String,// TODO: what is that?
    type: {type: String, default: "note"},// put note type: [note | code], default: note
    codeSetting: {
        mode: {type: String},
        theme: {type: String},
        autoComplete: {type: Boolean, default: false},
        lineNumber: {type: Boolean, default: false},
    },
    like: [
        {
            userId: {type: Schema.Types.ObjectId},
            createdAt: {type: Date, default: Date.now}//TODO: need to check.  timestamp, (intended working: when added note here, then automatically add this param, end after that, never updated until remove)
        }
    ],
    dislike: [
        {
            userId: {type: Schema.Types.ObjectId},
            createdAt: {type: Date, default: Date.now}//TODO: need to check.  timestamp, (intended working: when added note here, then automatically add this param, end after that, never updated until remove)
        }
    ]
});

module.exports = mongoose.model("Note", note);