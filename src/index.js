const express = require('express');
const connectToMongo = require('./db/mongoose');
const userRouter = require('./routers/user');
const recordRouter = require('./routers/record');

connectToMongo()

const app = express();

const port = process.env.PORT || 5000

app.use(express.json())

// User Router
app.use(userRouter)

// Record Router
app.use(recordRouter)

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('hospital_front/build'))
}

app.listen(port, () => {
    console.log('Server running at ', port)
})
