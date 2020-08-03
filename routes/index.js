const router = require('express').Router();
const updateRoutes = require('./update');
const siteRoutes = require('./site');
const CatFancier = require('../models/CatFancier');

router.use('/update', updateRoutes);
router.use('/restOfSite', siteRoutes);

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

router.post('/third-page/:id', (req, res) => {
    let src = req.body.src;
    let id = req.params.id;
    CatFancier.findByIdAndUpdate({ _id : id}, { $set: { favoriteCatImg : src } }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data.id;
            CatFancier.findById({ _id : id }, (err, data) => {
                if (err){
                    console.log(err);
                }else{
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    let id = data._id;
                    res.render('layouts/third-page', { name, age, fci, id });
                }
            });
        }
    });
    
});

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findByIdAndRemove({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            res.render('layouts/delete.ejs', { name });
        }
    });
});


module.exports = router;