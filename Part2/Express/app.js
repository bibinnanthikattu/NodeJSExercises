const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ user: 'bibin' })
});
module.exports = app;