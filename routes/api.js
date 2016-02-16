var 
  express        = require('express'),
  apiRouter      = express.Router(),
  mongoose       = require('mongoose')
  eventsController = require('../controllers/eventsController.js');
  

apiRouter.get('/', function(req,res){
  res.json({message: "Api routes are working."})
})

apiRouter.route('/events')
  //.get(carsController.getAllCars)
  //.post(carsController.createCar)

apiRouter.route('/events/:id')
  //.get(carsController.getOneCar)
  //.patch(carsController.updateCar)
  //.delete(carsController.deleteCar)

module.exports = apiRouter