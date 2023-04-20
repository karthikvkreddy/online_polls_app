const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    status: { 
      type: Boolean,
      default: false
    },
    type: {
        type: String
    }
  },{
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;