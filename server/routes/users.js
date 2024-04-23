const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getUsers);

router.post('/', (req, res, next) => {
    if (!req.body) {
        res.status(400).send('Request body is missing');
    } else {
        next();
    }
}, usersController.createUser);

router.delete('/', usersController.deleteUsers);

module.exports = router;
