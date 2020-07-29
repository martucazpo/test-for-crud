const router = require('express').Router();
const CatFancier = require('../models/CatFancier');


router.get('/', (req, res) => {
    res.render('layouts/form');
});

router.post('/catimage', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let catFancier = new CatFancier({ name, age });
    catFancier.save((err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let age = data.age;
            let id = data._id;
            res.render('layouts/other-page', {
                name,
                age,
                id 
            });
        }
    });
});

router.get('/third-page/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findById({ _id : id }, (err, data) => {
        if (err){
            console.log(err);
        }else{
            let name = data.name;
            let age = data.age;
            let id = data._id;
            res.json({ name, age, id });
        }
    });
});


module.exports = router;