if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT;
const routes = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/page');

app.use(express.urlencoded({
    extended: false
  }));
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.use(routes);

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