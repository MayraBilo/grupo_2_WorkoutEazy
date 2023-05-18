const express = require('express');

const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/user/login', userControllers.getLogin);
router.get('/user/register', userControllers.getRegister);

module.exports = router;