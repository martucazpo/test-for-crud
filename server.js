const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(PORT, () => {
    console.log("Tiny electronic ears are listening on port " + PORT);
});