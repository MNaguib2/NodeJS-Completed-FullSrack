const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');

const router = express.Router();
// /feed/POST
router.post('/post' ,[
    body('title').trim().isLength({min : 5}),
    body('content').trim().isLength({min: 5})
] , feedController.createPost);

router.delete('/post/:id' , feedController.deletePOst);

router.get('/post/:id' , feedController.getPOstByID);

router.get('/POSTAll', feedController.getPost);

router.put('/post', feedController.PutEditPost );

module.exports = router;