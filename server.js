if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index');
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