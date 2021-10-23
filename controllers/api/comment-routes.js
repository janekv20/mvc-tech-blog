const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ["id", "comment_text", "user_id", "post_id", "created_at"]
    })
    .then(commentData => res.json(commentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a comment
router.post('/', withAuth, (req, res) => {
    // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
      
    })
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  };
});

// update a comment by id
router.put('/:id', withAuth, (req, res) => {
    
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }   
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json({ message: 'Update was successfull!' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a comment by id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        },
    })
    .then(commentData => {
        if(!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json({ message: 'Comment successfully deleted!' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;