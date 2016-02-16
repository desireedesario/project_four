var 
  express          = require('express'),
  apiRouter        = express.Router(),
  mongoose         = require('mongoose'),
  eventsController = require('../controllers/eventsController.js'),
  usersController  = require('../controllers/usersController.js')
  

apiRouter.route('/users')
  .post(usersController.create)

apiRouter.route('/users')
  .get(usersController.index)

apiRouter.route('/users/:user_id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.destroy)

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