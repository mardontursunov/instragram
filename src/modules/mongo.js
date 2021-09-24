const mongoose = require('mongoose');

async function client () {
    return await await mongoose.connect('mongodb://localhost/instagram');
}

module.exports = client