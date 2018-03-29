const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, dbo) => {
        const db = dbo.db('medohelp');
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

// Get user
router.get('/user/:id?', (req, res) => {

    const searchCriteria = req.params.id ? { "_id": new ObjectID(req.params.id) } : {};
    connection((db) => {
        db.collection('users')
            .find(searchCriteria)
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    })
});

// Save user
router.post('/user', (req, res) => {

    connection((db) => {
        db.collection('users')
            .insert(req.body)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    })
});

// Update user
router.put('/user/:id', (req, res) => {

    console.log(req.body);

    connection((db) => {
        db.collection('users')
            .updateOne({ "_id": new ObjectID(req.params.id) }, { $set: req.body }, { upsert: true })
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    })
});

// Delete user
router.delete('/user/:id', (req, res) => {

    connection((db) => {
        db.collection('users')
            .deleteOne({ "_id": new ObjectID(req.params.id) })
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    })
});

module.exports = router;

