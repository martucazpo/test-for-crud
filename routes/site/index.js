const router = require('express').Router();
const CatFancier = require('../../models/CatFancier');

router.post('/', (req, res) => {
    let id = req.body.id;
    CatFancier.findById({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ data });
        }
    });
});

module.exports = router;