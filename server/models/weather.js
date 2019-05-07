// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const weatherSchema = new Schema({
//     temperature: { type: Number },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Temperature', weatherSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    temperature: { type: Number },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Temperature', temperatureSchema);