const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
    })
    .then((userData) => res.json(userData))
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });
});

//GET /api/users/1
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'created_att'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title'],
                },
            },
         ],
    })
    .then((userData) => {
        if (!userData) {
            res.status(404).json({message: 'No user found with this id!'});
            return;
        }
        res.json(userData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST api/users
router.post('/', (req,res) => {});

//PUT /api/users/1
router.put('/:id', (req,res) => {});

//DELETE /api/users/1
router.delete('/:id', (req,res) => {});

module.exports = router;