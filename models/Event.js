var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var eventSchema = new Schema({
  date: Date,
  category: { type: String, required: true},
  amount: Number,
  paid: Boolean,
  invoice: String
})

var Event = mongoose.model('Event', eventSchema)

module.exports = Event