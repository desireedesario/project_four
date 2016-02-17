angular.module('dojoBooks', ['ui.router'])
  .directive('navBar', navBar)
  .directive('eventForm', eventForm)

function navBar(){
  var directive = {
    restrict: 'E',
    templateUrl: '/partials/nav.html',
    transclude: true
  }
  return directive
}

function eventForm(){
  var directive = {
    restrict: 'E',
    templateUrl: '/partials/event-form.html'
  }
  return directive
}