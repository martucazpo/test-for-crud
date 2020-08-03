const router = require('express').Router();
const CatFancier = require('../models/CatFancier');

router.get('/name/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let name = data.name;
            res.render('layouts/updates/name.ejs', { name, id });
        }
    });
});

router.get('/age/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id
            let age = data.age;
            res.render('layouts/updates/age.ejs', { age, id });
        }
    });
});

router.get('/fci/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let fci = data.favoriteCatImg;
            res.render('layouts/updates/fci.ejs', { fci, id });
        }
    });
});


module.exports = router;