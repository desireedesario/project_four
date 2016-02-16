angular.module('dojoBooks', ['ui.router'])
  .directive('navBar', navBar)

function navBar(){
  var directive = {
    restrict: 'E',
    templateUrl: '/partials/nav.html',
    transclude: true
  }
  return directive
}