/**
 * Created by reiven on 2017/11/07.
 */

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var user = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    img: String, // img url
    name: String, // note name
    nickname: String // note nickname
});


mongoose.connect(process.env.DB_URL);

module.exports = mongoose.model("User", user);