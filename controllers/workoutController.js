const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get All Workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({ teslim_tarihi: 1 });

  res.status(200).json(workouts);
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Böyle bir işlem bulunmamaktadır." });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Böyle bir işlem bulunmamaktadır." });
  }

  res.status(200).json(workout);
};

// Create a workout

const createWorkout = async (req, res) => {
  const { musteri, islem, teslim_tarihi } = req.body;

  let emptyFields = []

  if(!musteri){
    emptyFields.push('musteri')
  }
  if(!islem){
    emptyFields.push('islem')
  }
  if(!teslim_tarihi){
    emptyFields.push('teslim_tarihi')
  }

  if(emptyFields.length > 0){
    return res.status(400).json({ error: 'Lütfen tüm alanları doldurunuz.', emptyFields})
  }

  if(musteri.length > 25){
    emptyFields.push('musteri')
    return res.status(400).json({error:'Müşteri alanı en fazla 25 karakter olmalıdır.', emptyFields })
  }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({ musteri, islem, teslim_tarihi, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Böyle bir işlem bulunmamaktadır." });
  }

  //const workout = await Workout.findByIdAndDelete(id)
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Böyle bir işlem bulunmamaktadır." });
  }

  res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Böyle bir işlem bulunmamaktadır." });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "Böyle bir işlem bulunmamaktadır." });
  }

  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
