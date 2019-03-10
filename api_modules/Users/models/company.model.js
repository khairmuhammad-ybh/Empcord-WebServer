const mongoose = require('mongoose');

const Company = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uid : {type : String, require : true},
    name : {type: String, require : true},
    code : {type: String, required : true}

})

module.exports = mongoose.model('Company', Company, 'Companies');