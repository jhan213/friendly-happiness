const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/subscriptions');
// Creates a new database in MongoDB

module.exports = mongoose.connection;

// Database can be manually viewed on MongoDB Compass - a MongoDB tool