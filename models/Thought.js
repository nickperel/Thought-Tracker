const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [
        ReactionSchema
      ],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  // create the Pizza model using the PizzaSchema
const Thought = model('Thought', ThoughtSchema);

// export the Pizza model
module.exports = Thought;