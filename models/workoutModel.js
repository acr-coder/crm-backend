const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    musteri: {
        type: String,
        required: true, 
           
    },
    islem: {
        type: String,
        required: true,
    },
    teslim_tarihi: {
        type: Date,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)