const express = require('express');
const router = new express.Router();
const Poll = require('../models/polls');


// Create a new poll
router.post('/polls', async (req, res) => {
    const { question, options, event } = req.body;
    const poll = new Poll({ question, options, event });
    try {
        await poll.save();
        res.status(201).send(poll);
    }catch(err) {
        res.status(400).send(err);
    }
  });

// Get all polls
router.get('/polls', async (req, res) => {
    try {
        const polls = await Poll.find();
        res.send(polls);
    } catch(err) {
        res.status(400).send(err);
    }
  });


// Get a poll by event ID
router.get('/polls/:id', async (req, res) => {
    const event = req.params.id;
    try {
        const poll = await Poll.find({event});
        if(!poll) {
            return res.send(404).send();
        }
        res.status(200).send(poll);
    } catch(err) {
        res.status(500).send(err);
    }
    
  });

// Vote on a poll option
router.post('/polls/:id/vote', async (req, res) => {
    try {
        const poll = await Poll.findOne({_id: req.params.id});
        const options = poll.options;
        for (let i=0; i<options.length ;i++) {
            if(options[i]._id == req.body._id) {
                poll.options[i].votes+=1;
            }
        }
        await poll.save();
        res.status(200).send(poll);
    }catch(err) {
        res.status(500).send(err);
    }     
  
  });
  
// add question to t
router.post('/polls/:id', async (req, res) => {
    try {
        const poll = await Poll.findOne({_id: req.params.id});
        poll.options = [...poll.options,req.body]
        await poll.save();
        res.status(200).send(poll);
    }catch(err) {
        res.status(500).send(err);
    }     
  
  });
module.exports = router;