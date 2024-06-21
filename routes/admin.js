// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");



router.get("/user.ejs", adminController.renderUser);
router.get("/plan.ejs", adminController.renderPlan);
router.get("/signout.ejs", adminController.renderSignout);


router.get('/AddUsers', adminController.renderAddUsers);
router.get('/EditUsers', adminController.renderEditUsers);
router.get('/DeleteUsers', adminController.renderDeleteUsers);

router.post('/AddUsers', adminController.createUser);
router.put('/EditUsers', adminController.editUser);
router.delete('/DeleteUsers', adminController.deleteUser);



router.get('/AddPlans', adminController.renderAddPlans);
router.get('/EditPlans', adminController.renderEditPlans);
router.get('/DeletePlans', adminController.renderDeletePlans);

router.post('/AddPlans', adminController.createPlan);
router.put('/EditPlans', adminController.editPlan);
router.delete('/DeletePlans', adminController.deleteUser);

module.exports = router;
