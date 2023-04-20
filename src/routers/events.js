const express = require('express');
const router = new express.Router();
const Event = require('../models/events');

// Create a new event
router.post('/events', async (req, res) => {
    const { name, status, type } = req.body;
    const event = new Event({
      name,
      status,
      type
    });
    try {
        await event.save();
        res.status(201).send(event);
    } catch(err) {
        res.status(500).send(err);
    }
  });

// Get all events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.send(events);
    } catch(err) {
        res.status(500).send(err);
    }
  });

// Get a event by ID
router.get('/events/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const event = await Event.findOne({_id});
        if(!event) {
            return res.send(404).send();
        }
        res.status(201).send(event);
    } catch(err) {
        res.status(500).send(err);
    }
  });


/**
 * Update Event based on ID
 */
router.patch('/events/:id', async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','status','type'];
    const isValidateOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidateOperation) {
        return res.status(400).send({err: 'Invalid operation'});
    }
    try {
        const event = await Event.findOne({_id: req.params.id});
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true});
        if(!event) {
            return res.status(400).send();
        }

        // here we are trying to updating the user data which we returned from DB.
        updates.forEach((update) => event[update] = req.body[update]);

        // so we are not updating anything directly to db, instead getting the data and then applying the changes and then saving.
        await event.save();

        res.send(event);
    } catch(err) {
        res.status(500).send();
    }
});

/**
 * Remove event based on ID
 */
router.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({_id: req.params.id});
        if(!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch(err) {
        res.status(500).send(err);
    }
})

  
module.exports = router;