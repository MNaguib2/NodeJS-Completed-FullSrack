const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();
// /feed/POST
router.get('/POST', feedController.getPost);

router.post('/post' , feedController.createPost);

router.delete('/post/:id' , feedController.deletePOst);

module.exports = router;