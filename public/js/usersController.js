angular.module('dojoBooks')
  .controller('UsersController', UsersController)

UsersController.$inject = ['$state', 'authFactory', '$rootScope', '$window']

function UsersController($state, authFactory, $rootScope, $window) {
  var vm = this
  vm.user = {}
  vm.loggedIn = authFactory.isLoggedIn()
  vm.signup = signup
  vm.login = login
  vm.logout = logout
  vm.getUser = getUser
  vm.error = null
  // vm.authFactory = authFactory
  // vm.authFactory.index()
  // .then(function(response) {
  //   vm.user = response.data
  // })

  $rootScope.$on('$stateChangeStart', function() {
    console.log('state changed')
    vm.loggedIn = authFactory.isLoggedIn(); 
    vm.getUser()
    vm.error = null
  }); 

  function logout(){
    $state.go('loggedOut')
    authFactory.logout();
    vm.loggedIn = authFactory.isLoggedIn();
    // $window.location.reload();
  }

  getUser()
  
  function getUser(){
    authFactory.getUser()
    .then(function(response){
      console.log(response)
      vm.user = response.data
    })
  }

  function signup(){
    authFactory.signup(vm.user.username, vm.user.password, vm.user.mark)
    .then(function(response){
      if(response.data.success){
        vm.login()
      } else {
        vm.error = response.data.message
      }
    })
  }

  function login(){
    authFactory.login(vm.user.username, vm.user.password)
    .then(function(response){
      if(response.data.success){
        $state.go("home")
      } else {
        vm.error = response.data.message
      }
    })
  }
}