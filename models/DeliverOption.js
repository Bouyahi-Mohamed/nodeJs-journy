// import mongoose to define a schema and model
const mongoose = require('mongoose');

// create the schema for delivery options

const deliverOptionSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  priceCents: { type: Number, required: true, min: 0 },
  estimatedDays: { type: Number, required: true, min: 1, max: 30 },

}, { timestamps: true });

// create the model for delivery options

const DeliverOption = mongoose.model('DeliverOption', deliverOptionSchema);

// export the model

module.exports = DeliverOption;
