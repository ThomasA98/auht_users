const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true},
    pass: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);