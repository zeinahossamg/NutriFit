const express = require('express');
const { getALLExercises, createExercise, updateExercise, deleteExercise } = require("../controllers/exerciseController");

const router = express.Router();

router.post("/createExercise", createExercise);

router.get("/allExercises", getALLExercises);

router.patch("/updateExercise/:id", updateExercise);

router.delete("/deleteExercise/:id", deleteExercise);

module.exports = router;
