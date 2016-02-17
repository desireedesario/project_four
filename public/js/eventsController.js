angular
  .module('dojoBooks')
  .controller('EventsController', EventsController)

EventsController.$inject = ['eventsFactory']

function EventsController (eventsFactory){
  var vm = this;
  vm.api = eventsFactory
  vm.events = []
  vm.newEvent = {}
  vm.myDate = new Date()
  vm.api.list()
    .success(function(res){
      vm.events = res
    })
  vm.addEvent = function(date, category, amount, paid, invoice){
    console.log('events controller hut')
    var data = {date:date, category:category, amount:amount, paid:paid, invoice:invoice}
    vm.api.addEvent(data)
      .then(function success(res){
        vm.events.push(res.data.event)
        vm.newEvent = {}
      })
  }
}

// ================================================

angular
  .module('dojoBooks')
  .controller('EventDetailsController', EventDetailsController)

EventDetailsController.$inject = ['eventsFactory','$stateParams','$location']

function EventDetailsController(eventsFactory,$stateParams,$location){
  var vm = this
  vm.name = 'Event Detail'
  vm.api = eventsFactory
  vm.event = null
  vm.editing = false
  vm.showEvent = function(eventId){
    vm.api.show(eventId).success(function(response){
      vm.event = response
      console.log(response)
    })
  }
  vm.showEvent($stateParams.eventId)

  vm.updateEvent = function(eventId, date, category, amount, paid, invoice){
    var data = {date:date, category:category, amount:amount, paid:paid, invoice:invoice}
    vm.api.updateEvent(eventId,data).success(function(response){
      console.log(response)
      vm.event = response
      vm.editing = false
    })
  }

  vm.removeEvent = function(eventId){
    vm.api.removeEvent(eventId).success(function(response){
      console.log(response)
      $location.path('/events')
    })
  }
}