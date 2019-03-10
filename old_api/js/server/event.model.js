var mongoose = require('mongoose');

const event = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    directory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block_directorie'
    },
    timestamp: String
})

module.exports = mongoose.model('Event', event);