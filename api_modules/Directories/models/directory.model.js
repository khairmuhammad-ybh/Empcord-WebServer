const mongoose = require('mongoose');

const Directory = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uid : {type : String, require : true},
    block : {type: String, require : true},
    streetName : {type: String, required : true},
    postalCode : {type: String, required : true},
    long : {type : String},
    lat : {type : String}

})

module.exports = mongoose.model('Directory', Directory, 'Directories');