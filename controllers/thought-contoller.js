const { Thought, User } = require('../models');

const thoughtController = {
    // get all Thoughts
    getAllThoughts(req, res) {
      Thought.find()
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one Thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
          // If no Thought is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // createThought
    createThought({ params, body }, res) {
      Thought.create(body)
      .then(({ _id }) => {
          return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id }},
              { new: true }
          );
      })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'})
                return;
            } 
        res.json(dbUserData);
    })
        .catch(err => res.status(400).json(err));
    },

    // update Thought by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete Thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {
            $addToSet: {
                reactions: body
            }
        }, { new: true })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },

    // delete reaction by id
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, {
            $pull: {
                reactions: {reactionId: params.reactionId }
            }
        }, { new: true })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({ message: 'No Thought found with this id!' });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },
  }

module.exports = thoughtController;