angular.module('dojoBooks')
  .config(MainRouter)
  .config(interceptor)

function interceptor($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorFactory')
}

function MainRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login')

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'UsersController as usersCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'UsersController as usersCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      controller: 'UsersController as usersCtrl'
    })
    .state('loggedOut', {
      url: '/loggedOut',
      templateUrl: 'partials/home.html',
      controller: 'UsersController as usersCtrl'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'partials/event-list.html',
      controller: 'EventsController as eventsCtrl'
    })
    .state('detail', {
      url: '/events/:eventId',
      templateUrl: 'partials/event-detail.html',
      controller: 'EventDetailsController as eventDetailsCtrl'
    })
}