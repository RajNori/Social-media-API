const { Schema, model } = require('mongoose');
const Thought = require("./Thought")

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: function() {
            const regexForEmail = /^[a-zA-Z\d_\.-]+@[\da-zA-Z\.-]+\.[a-zA-Z\.]{2,6}$/;
            return regexForEmail.exec(this.email) !== null;
        },
        unique: true,
        trim: true
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, 
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema); 

module.exports = User;