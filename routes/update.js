const router = require('express').Router();
const CatFancier = require('../models/CatFancier');

router.get('/name/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            res.json({ name });
        }
    });
});

router.get('/age/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let age = data.age;
            res.json({ age });
        }
    });
});

router.get('/fci/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let fci = data.favoriteCatImg;
            res.json({ fci });
        }
    });
});


module.exports = router;