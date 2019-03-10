var mongoose = require('mongoose');

const blockDirectorie = mongoose.Schema({
    block: String,
    address: String,
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    }
})
module.exports = mongoose.model('Block_directorie', blockDirectorie);