if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/page');

app.use(express.urlencoded({
    extended: false
  }));
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);

app.get('/', (req, res) => {
    res.render('layouts/form');
});

app.post('/catimage', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let data = [];
    data.push(name, age);
    console.log(data);
    res.render('layouts/other-page', {name : data[0], age: data[1]});
});

mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
        console.log("My database is connected");
    }
);

app.listen(PORT, () => {
    console.log("Tiny electronic ears are listening on port " + PORT);
});