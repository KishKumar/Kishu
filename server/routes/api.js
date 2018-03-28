const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, dbo) => {
        const db = dbo.db('dev');
        if (err) {
            console.log(err)
            db.close();
            return;
        }
        else
            closure(db);
    })
}

// Response object
let response = {
    status: 200,
    data: [],
    message: null
}

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

// Get employees
router.get('/employees', (req, res) => {
    connection((db) => {
        db.collection('persons')
            .findOne()
            .toArray()
            .then((employees) => {
                response.data = employees;
                res.join(response);
            })
            .catch((err) => {
                sendError(err,res);
            });
    })
});

module.exports = router;

