var mongoose = require('mongoose');

const agenda = mongoose.Schema({
    user: {
        name: { type: String, required: true },
        officerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    directory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block_directorie'
    }],
    done: { type: Array, required: true }
},
    { strict: false }
)
module.exports = mongoose.model('Agenda', agenda);
