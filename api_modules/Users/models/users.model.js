const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uid : {type : String, require : true},
    firstname : {type: String, require : true},
    lastname : {type : String, require : true},
    mobile : {type : String, required : true},
    companyId : {type : String, required : true},
    accountType : {type : String, required : true}

})

module.exports = mongoose.model('User', User, 'Users');