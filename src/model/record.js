const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    affectedDate: {
        type: String,
        required: true
    },
    recoveredDate: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Record = mongoose.model('record', recordSchema)

module.exports = Record