const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({}, (error, data) => {
    // loops through each workout and sums the duration of each individual exercise to create a total duration for the entire workout - need this to display the total duration on the home page
    data.forEach((workout) => {
      let totalDuration = 0;
      workout.exercises.forEach((exercise) => {
        totalDuration += exercise.duration;
      });
      workout.totalDuration = totalDuration;
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
