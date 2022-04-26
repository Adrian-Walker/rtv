const express = require('express');
const { json } = require('express/lib/response');
const { checkAuthToken } = require('../middleware/checkAuth.js');
const issueRouter = express.Router();
const Issue = require('../models/issue.js');




// Get All Issues
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, issue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

// Get Issue by user id
issueRouter.get('/user', checkAuthToken, (req, res, next) => {
    console.log(req.headers, "issue")
    Issue.find({ user: req.user._id }, (err, issue) => {
        if (err) {
            console.log(req.user, "req.user")
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

// Add new Issue
issueRouter.post("/", checkAuthToken, (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId },
        (err, deletedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`${deletedIssue.title} has been deleted`)
        }
    )
})

// Upvote Issue
issueRouter.put('/vote/:issueId', checkAuthToken, async (req, res, next) => {
    const voteType = req.query.voteType;
    const issue = await Issue.findById(req.params.issueId)
    if(!voteType) return res.status(400).json({messages: "Query of voteType must be added"})
    if(issue.votedUsers.includes(req.user.username)) return res.status(400).json({message: "user already voted"})
    Issue.findOneAndUpdate({ _id: req.params.issueId },
        {
            $inc: { [voteType]: 1 },
            $push: {
                votedUsers:
                    { $each: [req.user.username] }
            }
        },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

module.exports = issueRouter
