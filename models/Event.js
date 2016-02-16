var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var eventSchema = new Schema({
  date: String,
  category: String,
  amount: Number,
  paid: Boolean,
  invoice: String
})

var Event = mongoose.model('Event', eventSchema)

module.exports = Event