# Take catFancier app and Achieve CRUD, Part IV, Final CRUD - Last Routes

## In routes/update.js

* For get'/name/:id and get'/age/:id' , copy and paste each of the get '/fieldName/:id' routes and change the copied route to a post route. (post fci already exists in routes/index.js post'/third-page/:id)
* In the post route change Model.findById() to Model.findByIdAndUpdate().
* update.js should look like this:

````
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

router.post('/name/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findByIdAndUpdate({ _id: id }, (err, data) => {
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

router.post('/age/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findByIdAndUpdate({ _id: id }, (err, data) => {
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

````

* IMPORTANT: Make sure to only work in the POST routes, the GET routes are fine!
* IMPORTANT: There is already a post route for fci. See above.
* Set name and age equal to req.body.name and req.body.age, respectfully.
* Within the Model.findByIdAndUpdate add the $set object of the field being updated and the { new : true } object.
* Here is how that looks with the /name/:id route:

````
router.post('/name/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {name: name} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            let name = data.name;
            res.render('layouts/updates/name.ejs', { name, id });
        }
    });
});

````

* Do for age using the corresponding age field in the $set object. 
* In the data part of the post route, instead of rendering, and while still letting id = data._id ; copy and paste the findById() part of the get route like so:

````
router.post('/age/:id', (req, res) => {
    let id = req.params.id;
    let age = req.body.age;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {age: age} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = data._id
                    let age = data.age;
                    res.render('layouts/updates/age.ejs', { age, id });
                }
            }); 
        }
    });
});

````

* It is important to get the id this way (as a callback ), because if there were multiple users on a host server, another user might have updated a millisecond before and the server might update the wrong user.
* Next get all variables from the updated data, in order to render layouts/third-page.ejs.

````

router.post('/name/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {name: name} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = data._id;
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/updates/name.ejs', { name, id });
                }
            });
        }
    });
});


````

* FINALLY, instead of rendering 'layouts/updates/name' or '/age' render layouts/third-page.ejs, passing in all variables:

````

router.post('/age/:id', (req, res) => {
    let id = req.params.id;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {age: age} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let name = data.name;
                    let age = data.age;
                    let id = data._id;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/third-page.ejs', { age, id, name, fci });
                }
            }); 
        }
    });
});


````

* The final routes/updates.js file should look as follows:

````
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

router.post('/name/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {name: name} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = data._id;
                    let name = data.name;
                    let age = data.age;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/third-page.ejs', { name, id, age, fci });
                }
            });
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

router.post('/age/:id', (req, res) => {
    let id = req.params.id;
    let age = req.body.age;
    CatFancier.findByIdAndUpdate({ _id: id }, { $set: {age: age} }, { new: true }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let id = data._id;
            CatFancier.findById({ _id: id }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let name = data.name;
                    let age = data.age;
                    let id = data._id;
                    let fci = data.favoriteCatImg;
                    res.render('layouts/third-page.ejs', { age, id, name, fci });
                }
            }); 
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


````

* When everything is rendering and works, push up to gitHub

