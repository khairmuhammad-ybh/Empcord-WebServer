var mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    email: {type: String, required: true},
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companie'
    },
    officerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    worker: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    { strict: false }
)
module.exports = mongoose.model('User', user);