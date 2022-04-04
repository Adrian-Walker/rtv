const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    upVote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    },
    votedUsers: [{
        type: String
    }]
});

module.exports = mongoose.model("Issue", IssueSchema)
