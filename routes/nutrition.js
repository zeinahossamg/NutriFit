const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
//const authController = require('../controllers/authController');

router.get("/CreateNP", nutritionController.getCreateNP);
router.get("/CNPP", nutritionController.getCNPP);

router.get('/user', nutritionController.getUser);
router.post('/addPerson', nutritionController.addPerson);



router.post('/login', nutritionController.login);
router.get('/logout', nutritionController.logout);


//router.post('/login', authController.login);
//router.get('/logout', authController.logout);

module.exports = router;