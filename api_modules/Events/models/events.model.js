const mongoose = require('mongoose');

const Event = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uid: {type: String, require: true},
    timestamp: {type: String, required: true},
    location: {type: String, required: true}

})

module.exports = mongoose.model('Event', Event, 'Events');