angular.module('dojoBooks')
  .factory('authTokenFactory', authTokenFactory)

authTokenFactory.$inject = ['$window']

function authTokenFactory($window){
  var authTokenFactory = {}
  // get the token
  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token')
  }
  // set the token
  authTokenFactory.setToken = function(token){
    if(token){
      $window.localStorage.setItem('token', token)
    } else {
      $window.localStorage.removeItem('token')
    }
  }
  return authTokenFactory
}

// ================================================

angular.module('dojoBooks')
.factory('authInterceptorFactory', authInterceptorFactory)
authInterceptorFactory.$inject = ['$q', '$location', 'authTokenFactory']
function authInterceptorFactory($q, $location, authTokenFactory){
  var authInterceptorFactory = {}
  // attach the token to every request
  authInterceptorFactory.request = function(config){
    var token = authTokenFactory.getToken()
    if(token){
      config.headers['x-access-token'] = token;
    }
    return config
  }
  authInterceptorFactory.responseError = function(response){
    if(response.status == 403){
      $location.path('/login')
    }
    return $q.reject(response)
  }
  // redirect if the token doesn't authenticate
  return authInterceptorFactory
}

// ==============================================

angular.module('dojoBooks')
.factory('authFactory', authFactory)
authFactory.$inject = ['$http', '$q', 'authTokenFactory', '$window']
function authFactory($http, $q, authTokenFactory, $window){
  var authFactory = {}
  var url = 'https://dojo-books.herokuapp.com'
  authFactory.index = function(){
    return $http.get(url + '/api/users')
  }
  // handle login
  authFactory.login = function(username, password){
    return $http.post(url + '/api/authenticate', {
      username: username,
      password: password
    }).then(function(response){
      authTokenFactory.setToken(response.data.token)
      return response
    })
  }
  authFactory.signup = function(username, password, mark){
    return $http.post(url + '/api/users', {
      username: username,
      password: password,
      mark: mark
    })
  }
  // handle logout
  authFactory.logout = function(){
    authTokenFactory.setToken()
  }
  // check if a user is logged in
  authFactory.isLoggedIn = function(){
    if(authTokenFactory.getToken()){
      return true
    } else {
      return false
    }
  }
  // get that user's info
  authFactory.getUser = function(){
    if(authTokenFactory.getToken()){
      console.log("helloooo")
      return $http.get(url + '/api/me?token=' + $window.localStorage.getItem('token') )
    } else {
      return $q.reject({message: 'User has no token'})
    }
  }
  return authFactory
}