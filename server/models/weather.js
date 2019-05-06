const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    weather: { type: Number }
});

module.exports = mongoose.model('Weather', weatherSchema);