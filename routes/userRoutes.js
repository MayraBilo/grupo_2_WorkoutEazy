const express = require('express');

const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/login', userControllers.getLogin);
router.get('/register', userControllers.getRegister);
router.get('/registerAliados', userControllers.getRegisterAliados);
router.get('/profileAliados', userControllers.getProfileAliados);

module.exports = router;