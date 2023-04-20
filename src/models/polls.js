const mongoose = require('mongoose');



const pollSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true
    },
    options: {
        type: [
          {
            value: { type: String, required: true, unique: true },
            votes: { type: Number, default: 0 }
          }
        ],
        validate: [
          {
            validator: function (options) {
              const values = options.map((option) => option.value);
                if(new Set(values).size !== values.length) {
                    throw new Error('Option values must be unique');
                };
            }
          }
        ]
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // it creates a reference to the another collection 1:1 relation
        ref: 'Event'
    }
  });

  
  const Poll = mongoose.model('Poll', pollSchema);

  module.exports = Poll;