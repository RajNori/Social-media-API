const { Schema, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: function() {
            return this.reactionBody.length <= 200;
        }
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(createdAt) {
            return moment(createdAt).format("m/d/YYYY HH:MM:SS");
        }
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
    _id: false
});

module.exports = ReactionSchema;