require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workoutsRoutes')
const userRoutes = require('./routes/user')

// express app
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
    console.log('Listenning on port:',process.env.PORT);
    
})
    })
    .catch((error) => {
        console.log(error)
    })

