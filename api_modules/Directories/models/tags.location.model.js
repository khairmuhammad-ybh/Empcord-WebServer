const mongoose = require('mongoose');

const LocationTag = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    uid: {type: String, required: true},
    QRCode: {type: String},
    location: {type: String, required: true},
    directory: {type: String, required: true},
    NFCCode: {type: String}

})

module.exports = mongoose.model('LocationTag', LocationTag, 'LocationTags');