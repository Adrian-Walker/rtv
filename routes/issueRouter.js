const express = require('express');
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
issueRouter.get('/user', (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, issue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

// Add new Issue
issueRouter.post("/", (req, res, next) => {
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
