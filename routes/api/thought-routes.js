const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
    
  } = require('../../controllers/thought-contoller');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts);

// Set up POST for creating new thought at /api/thoughts/:userId
router
.route('/:userId')
.post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up POST and DELETE at /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
