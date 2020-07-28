if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const PORT = process.env.PORT;


app.use(express.urlencoded({
    extended: false
  }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index');
});

app.get('/catimage', (req, res) => {
    res.sendFile(__dirname + '/public/other-page.html');
});

app.post('/catimage', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let data = [];
    data.push(name, age);
    console.log(data);
    res.json(data);
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