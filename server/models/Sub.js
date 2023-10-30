const { Schema } = require('mongoose');

// Subdocument schema
const subSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
  },
  cycle: {
    type: String,
  },
});

module.exports = subSchema;
