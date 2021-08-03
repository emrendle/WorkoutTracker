const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({}, (error, data) => {
    // loops through each workout in the response data and sets the total duration to the duration of each exercise so that it can be appropriately displayed on the page, otherwise total duration is left blank
    data.forEach((workout) => {
      let exerciseDuration = 0;
      workout.exercises.forEach((exercise) => {
        exerciseDuration += exercise.duration;
      });
      workout.totalDuration = exerciseDuration;
    });
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

router.post("/api/workouts", (req, res) => {
  Workout.create({ req }, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}, (error, data) => {
    data.forEach((workout) => {
      let lastExerciseDuration = 0;
      workout.exercises.forEach((exercise) => {
        lastExerciseDuration += exercise.duration;
      });
      workout.totalDuration = lastExerciseDuration;
    });
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
