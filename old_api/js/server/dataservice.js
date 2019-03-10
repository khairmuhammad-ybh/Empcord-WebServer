const mongoose = require('mongoose');
const Event = require('../server/event.model');
const Agenda = require('../server/agenda.model');
const User = require('../server/user.model');
const Companies = require('../server/companie.model');
const BlockDir = require('../server/block_directorie.model');
var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/empcord', { useNewUrlParser: true }, function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                var connection = mongoose.connection;
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    getAllUsers: (callback) => {
        User.find({}, callback);
    },
    getUserByName: (name, callback) => {
        User.find({ name: name }, callback);
    },
    registerUser: (user, callback) => {
        User.find({ email: user.email })
            .then(result => {
                if (result.length >= 1) {
                    //user exist
                    callback(null, {
                        error: null,
                        message: 'User already registered'
                    })
                } else {
                    var newUser = new User({
                        name: user.name,
                        password: user.password,
                        type: "Officer",
                        email: user.email,
                        worker: []
                    });
                    newUser.save()
                        .then(result => {
                            callback(null, {
                                error: null,
                                message: "success",
                                user: result
                            });
                        })
                        .catch(err => {
                            callback(err, null);
                        })
                }

            })
            .catch(err => {
                callback(err, null);
            })
    },
    loginUser: (user, callback) => {
        User.findOne({ email: user.email, password: user.password })
            .then(result => {
                console.log(result);
                if (result) {
                    //user exist
                    callback(null, {
                        error: null,
                        message: 'success',
                        user: result
                    });
                } else {
                    callback(null, {
                        error: null,
                        message: 'Authentication error'
                    })
                }
            })
            .catch(err => {
                callback(err, null);
            })
    },
    registerWorker: (user, callback) => {
        User.find({ email: user.email })
            .then(result => {
                if (result.length >= 1) {
                    //user exist
                    callback(null, {
                        error: null,
                        message: 'User already registered'
                    })
                } else {
                    var newWorker = new User({
                        name: user.name,
                        password: user.password,
                        type: "Worker",
                        email: user.email,
                        companyId: user.companyId,
                        officerId: user.officerId
                    });
                    newWorker.save()
                        .then(result => {
                            callback(null, {
                                error: null,
                                message: "success",
                                user: result
                            });
                        })
                        .catch(err => {
                            callback(err, null);
                        })
                }

            })
            .catch(err => {
                callback(err, null);
            })
    },
    getAllCompanies: (callback) => {
        Companies.find({})
            .then(result => {
                callback(null, {
                    error: null,
                    message: "success",
                    companies: result
                });
            })
            .catch(err => {
                callback(err, null);
            })
    },
    getWorkers: (id, callback) => {
        User.find({ type: "Worker", officerId: id })
            .populate('officerId', 'name')
            .populate('companyId', 'company')
            .then(result => {
                callback(null, {
                    error: null,
                    message: "success",
                    users: result
                });
            })
            .catch(err => {
                callback(err, null);
            })
    },
    updateWorkerEmail: (id, email, callback) => {
        User.findByIdAndUpdate(id, { email: email }, { new: true })
            .populate('officerId', 'name')
            .populate('companyId', 'company')
            .then(result => {
                callback(null, {
                    error: null,
                    message: "success",
                    users: result
                });
            })
            .catch(err => {
                callback(err, null);
            })
    },
    removeWorker: (id, callback) => {
        User.findByIdAndDelete(id)
            .then(result => {
                callback(null, {
                    error: null,
                    message: "success",
                    users: result
                });
            })
            .catch(err => {
                callback(err, null);
            })
    },
    getDirId: (block, address, callback) => {
        BlockDir.findOne({ block: block, address: address })
            .select('_id')
            .then(result => {
                callback(null, {
                    error: null,
                    message: "success",
                    blockId: result
                });
            })
            .catch(err => {
                callback(err, null);
                // console.log(err);
            })
    },
    storeEvent: (userId, directoryId, callback) => {
        var date = Date(Date.now());
        dateToString = date.toString()

        Event.find({ user: userId, directory: directoryId, timestamp: dateToString })
            .then(result => {
                console.log(result)
                if (result.length) {
                    callback({
                        error: "Duplicate",
                        message: "Duplicate record"
                    }, null)
                } else {
                    //create new event
                    var newEvent = new Event({
                        user: userId,
                        directory: directoryId,
                        timestamp: dateToString
                    })

                    //save new event into database
                    newEvent.save()
                        .then(result => {
                            callback(null, {
                                error: null,
                                message: "success"
                            });
                        })
                        .catch(err => {
                            callback(err, null);
                        })
                }

            })
            .catch(err => {
                callback(err, null);
            })
    },
    getAgendaById: (officerId, callback) => {
        console.log(officerId);
        Agenda.find({ 'user.officerId': officerId })
            .populate('user.officerId', 'name email type')
            .populate('directory')
            .then(result => {
                console.log('result: ' + result);
                callback(null, result);
            })
            .catch(err => {
                callback(err, null);
            })
    },
    addAgenda: (name, officerId, directoryId, done, callback) => {
        var newAgenda = new Agenda({
            user: {
                name: name,
                officerId: officerId,
            },
            directory: directoryId,
            done: done
        })

        newAgenda.save()
            .then(result => {
                callback(null, {
                    error: null,
                    message: "success"
                });
            })
            .catch(err => {
                callback(err, null);
            })
    }

};

module.exports = database;