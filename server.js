// you will have a lot of routes - you can break them into a separate routes folder if you want

// need to have the public static thing

// VIEWS /////////////////////////////////////
// this is a good place to start - just get the buttons working to link up the HTML pages
// router.get('/exercise') --> exercise.html
// router.get('/stats') --> stats.html

// API ROUTES ///////////////////////////////
// look at the front end api.js in the public folder and write the back end code to match the front end requests

// router.post('/api/workouts') --> create a new workout
// workout.create({})

// router.put('/api/workouts/:id') - find the workouts and push exercises into an array
// you're not creating new exercises, youre pushing an exercise into array of workout above

// router.get('/api/workouts') - get all workouts

// router.get('/api/workouts/range') - last 7 combined weights, last 7 combined duration

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
