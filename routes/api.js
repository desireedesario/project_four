var 
  express          = require('express'),
  apiRouter        = express.Router(),
  mongoose         = require('mongoose'),
  eventsController = require('../controllers/eventsController.js');
  

apiRouter.get('/', function(req,res){
  res.json({message: "Api routes are working."})
})

apiRouter.route('/events')
  .get(eventsController.getAllEvents)
  .post(eventsController.createEvent)

apiRouter.route('/events/:id')
  .get(eventsController.getOneEvent)
  .patch(eventsController.updateEvent)
  .delete(eventsController.deleteEvent)

module.exports = apiRouter