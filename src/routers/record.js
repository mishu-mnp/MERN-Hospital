const express = require('express');
const Record = require('../model/record');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create Record
router.post('/record', auth, async (req, res) => {
    const record = new Record({
        ...req.body,
        patient: req.user._id
    })

    try {
        await record.save()
        res.send(record)
    } catch (e) {
        res.status(404).send({ error: 'Please enter valid details' })
    }
})

// Read Records
router.get('/records/me', auth, async (req, res) => {
    try {
        const record = await Record.find({ patient: req.user._id })
        res.send(record)
    } catch (e) {
        res.status(501).send({ error: 'Please Authenticate or Try again' })
    }

})

module.exports = router