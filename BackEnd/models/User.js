const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, min:5, unique: true},
    password: {type: String, required: true},
    height: {type: String},
    weight: {type: String},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;