var 
  express          = require('express'),
  apiRouter        = express.Router(),
  mongoose         = require('mongoose'),
  eventsController = require('../controllers/eventsController.js'),
  usersController  = require('../controllers/usersController.js'),
  User = require('../models/User.js')
  
// Non-Authenticated routes ===========

apiRouter.route('/users')
  .post(usersController.create)

//login
apiRouter.route('/authenticate')
  .post(usersController.authenticate)

// Authenticated routes  ==============
//config middleware for auth
apiRouter.use(usersController.checkUser)

//api test
apiRouter.get('/', function(req,res){
  res.json({message: "Api routes are working."})
})

//users index
apiRouter.route('/users')
  .get(usersController.index)

//logged in user detail
apiRouter.route('/me')
  .get(function(req, res){
    res.send(req.decoded)
  })

//user CRUD
apiRouter.route('/users/:user_id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.destroy)

//event CRUD
apiRouter.route('/events')
  .get(eventsController.getAllEvents)
  .post(eventsController.createEvent)

apiRouter.route('/events/:id')
  .get(eventsController.getOneEvent)
  .patch(eventsController.updateEvent)
  .delete(eventsController.deleteEvent)

module.exports = apiRouter