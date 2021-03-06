angular
  .module('dojoBooks')
  .factory('eventsFactory', eventsFactory)

eventsFactory.$inject = ['$http']

function eventsFactory($http){
  var eventsUrl = 'https://dojo-books.herokuapp.com/api/events'
  var events = {}

  events.list = function(){
    console.log("event list")
    return $http.get(eventsUrl)
  }

  events.show = function(eventId){
    return $http.get(eventsUrl + '/' + eventId)
  }

  events.addEvent = function(data){
    return $http.post(eventsUrl, data)
  }

  events.updateEvent = function(eventId,data){
    return $http.patch(eventsUrl + '/' + eventId, data)
  }

  events.removeEvent = function(eventId){
    return $http.delete(eventsUrl + '/' + eventId)
  }
  
  return events
}