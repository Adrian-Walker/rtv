const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issue.js');
const jwt = require("jsonwebtoken")

function checkAuthToken(req, res, next) {
    const token = req.headers.authorization;
    if(!token) return res.status(400).send("No token provided")
    const bearerToken = token.split("Bearer ")[1]
    if(!bearerToken) return res.status(400).send("Token must be a Bearer Token")
    const decodedToken = jwt.verify(bearerToken, process.env.SECRET)
    req.user = decodedToken
    console.log(decodedToken)
    next()
}

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
issueRouter.put('/upvote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate({ _id: req.params.issueId },
        {
            $inc: { upvote: 1 },
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
