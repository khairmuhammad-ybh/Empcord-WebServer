var bodyParser = require('body-parser');
var db = require('./js/server/dataservice.js');
var loggedInUser = undefined;
db.connect();

var routes = function () {
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + req.originalUrl);
    });

    router.get('/users/:name', (req,res) => {
        var name = req.params.name;
        db.getUserByName(name, (err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                res.status(200).json(result);
            }
        });

    });

    router.post('/users/register', (req, res) => {
        var body = req.body;
        db.registerUser(body, (err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(result);
            }
        });

    });

    router.post('/users/login', (req, res) => {
        var body = req.body;
        console.log(body.email);
        console.log(body.password);
        db.loginUser(body, (err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(result);
            }
        });
    });

    router.get('/users/', (req, res) => {
        db.getAllUsers((err, users) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(users);
            }
        });
    });

    router.post('/users/register/worker', (req, res) => {
        body = req.body;
        db.registerWorker(body, (err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(result);
            }
        });
    });

    router.get('/companies', (req, res) => {
        db.getAllCompanies((err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(result);
            }
        });
    });

    router.post('/users/worker/', (req, res) => {
        id = req.body.id;
        db.getWorkers(id, (err, users) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(users);
            }
        });
    });

    router.post('/users/update', (req, res) => {
        id = req.body.id;
        email = req.body.email;
        db.updateWorkerEmail(id, email, (err, updatedUser) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(updatedUser);
            }
        });
    });

    router.post('/users/remove', (req, res) => {
        id = req.body.id;
        db.removeWorker(id, (err, removedUser) => {
            if(err){
                //error
                res.status(500).json({
                    error: err
                })
            }else{
                //success
                res.status(200).json(removedUser);
            }
        });
    });

    router.post('/events/store', (req, res) => {
        id = req.body.id;
        block = req.body.block;
        address = req.body.address;

        //get directory ID
        db.getDirId(block, address, (err, dirID) => {
            if(err){
                //error
                console.log("get Error")
                res.status(500).json({
                    error : err
                })
            }else{
                //success
                if(dirID != null){
                    console.log("id: " + id + " dirID: " + dirID.blockId._id)
                    //store data to event
                    db.storeEvent(id, dirID.blockId._id, (err, result) => {
                        if(err){
                            //error
                            res.status(500).json({
                                error : err
                            })
                        }else{
                            //success
                            res.status(200).json({
                                error : null,
                                response : "OK"
                            })
                        }
                    })
                }
            }
        })
    })

    router.post('/agenda', (req, res) => {
        officerId = req.body.officerId;

        //get agenda by user id
        db.getAgendaById(officerId, (err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error : err
                })
            }else{
                //success
                if(result != null){
                    res.status(200).json(result);
                }else{
                    res.status(200).json("No record found");
                }
            }
        })
    })

    router.post('/addAgenda', (req, res) => {
        var name = req.body.name;
        var officerId = req.body.officerId;
        var directoryId = req.body.directoryId;
        var done = req.body.done;

        db.addAgenda(name, officerId, directoryId, done, (err, result) => {
            if(err){
                //error
                res.status(500).json({
                    error : err
                })
            }else{
                //success
                res.status(200).json({
                    error : null,
                    response : "Agenda added"
                })
            }
        })
    })

    return router;
};

module.exports = routes();
