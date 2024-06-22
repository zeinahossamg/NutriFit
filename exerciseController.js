const Exercise = require("../models/exercise");
// const { validationResult } = require('express-validator');

const getALLExercises = async (req, res) => {
  if (req.session.authenticated) {
    try {
      const exercises = await Exercise.find({ user: req.session.userID });
      res.json(exercises);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const createExercise = async (req, res) => {
  if (req.session.authenticated) {
    try {
      const exercise = new Exercise({ user: req.session.userID, ...req.body });
      await exercise.save();
      res.status(201).json({
        status: "success",
        message: "Exercise successfully added.",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
};

const updateExercise = async (req, res) => {
  if (req.session.authenticated) {
    try {
      const exercise = await Exercise.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!exercise) {
        return res.status(404).json({
          status: "fail",
          message: "Exercise not found.",
        });
      }
      res.status(201).json({
        status: "success",
        data: {
          exercise,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
};

const deleteExercise = async (req, res) => {
  if (req.session.authenticated) {
    try {
      const exercise = await Exercise.findByIdAndDelete(req.params.id);
      if (!exercise) {
        return res.status(404).json({
          status: "fail",
          message: "Exercise not found.",
        });
      }
      res.status(201).json({
        status: "success",
        message: "Exercise successfully deleted.",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
};

module.exports = {
  getALLExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};
