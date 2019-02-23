var mongoose = require('mongoose');

const zone = mongoose.Schema({
    area: Number
})
module.exports = mongoose.model('Zone', zone);