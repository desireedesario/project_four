var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var eventSchema = new Schema({
  model: String,
  make: String,
  year: Number
})

var Event = mongoose.model('Event', eventSchema)

module.exports = Event