const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    contact: String,
    email: String,
    address: String,
    password: String
});

module.exports = mongoose.model("user", userSchema);