var mongoose = require('mongoose');

const companie = mongoose.Schema({
    company: String
})
module.exports = mongoose.model('Companie', companie);