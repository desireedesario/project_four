var Event = require('../models/Event.js');

function getAllEvents(req,res){
  Event.find({}, function(err, events){
    res.json(events)  
  })
}

function createEvent(req,res){
  console.log('eventcontorller')
  var newEvent = new Event
  newEvent.date = req.body.date
  newEvent.category = req.body.category
  newEvent.amount = req.body.amount
  newEvent.paid = req.body.paid
  newEvent.invoice = req.body.invoice
  
  newEvent.save(function(err, event){
    if(err) throw err
    res.json({message: "Event Saved!", event: event})
  })
}

function getOneEvent(req,res){
  Event.findById(req.params.id, function(err,event){
    if(err) throw err
    res.json(event)
  })
}

function updateEvent(req,res){
  Event.findOneAndUpdate({_id: req.params.id}, req.body, function(err,event){
    if(err) throw err
    Event.findById(req.params.id, function(err,updatedEvent){
      res.json(updatedEvent)
    })
  })
}

function deleteEvent(req,res){
  Event.findOneAndRemove({_id: req.params.id}, req.body, function(err,event){
    if(err) throw err
    res.json({message:"event deleted!"})
  })
}


module.exports = {
  getAllEvents : getAllEvents,
  createEvent : createEvent,
  getOneEvent : getOneEvent,
  updateEvent : updateEvent,
  deleteEvent : deleteEvent

}