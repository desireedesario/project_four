angular
  .module('dojoBooks')
  .controller('PieController', PieController)

PieController.$inject = ['eventsFactory', '$rootScope']

function PieController(eventsFactory, $rootScope) {
  var vm = this
  var newArr = []
  vm.api = eventsFactory
  vm.events = []
  vm.labels = ["Design/UX", "Development", "Marketing", "Supplies", "Legal", "Admin"]
  vm.data = []
  vm.type = 'Doughnut'
  vm.myDate = new Date()

  vm.getEvents = function() {
    vm.api.list()
      .then(function(res){
        console.log('success back',res)
        res = res.data
        for(var i = 0; i < res.length; i++){
          res[i].date = new Date(res[i].date)
        }
        vm.events = res
        vm.data = vm.getData(vm.events)
    })  
  }
  vm.getEvents()
  
  vm.getData = function(arr) {
    var des = 0
    var dev = 0
    var mar = 0
    var sup = 0
    var leg = 0
    var adm = 0
    newArr = []

    for(var j = 0; j < arr.length; j++){
      if (arr[j].date.getMonth() == vm.myDate.getMonth()){
        if (arr[j].category == "Design/UX"){
          des += arr[j].amount
        } else if (arr[j].category == "Development"){
          dev += arr[j].amount
        } else if (arr[j].category == "Marketing"){
          mar += arr[j].amount
        } else if (arr[j].category == "Supplies"){
          sup += arr[j].amount
        } else if (arr[j].category == "Legal"){
          leg += arr[j].amount
        } else if (arr[j].category == "Admin"){
          adm += arr[j].amount
        }
      }
    }
    newArr.push(des, dev, mar, sup, leg, adm)
    console.log(newArr)
    return newArr
  }

  vm.toggle = function() {
    vm.type = vm.type === 'Doughnut' ? 'PolarArea' : 'Doughnut';
  }

  vm.chartParams = {
    colours: ["#14cfd9", "#00D39E", "#02ff13", "#232527", "#ff4949", "#62686D"]
  }

  $rootScope.$on('addEvent', function() {
    vm.getEvents()
  })
  $rootScope.$on('deleteEvent', function() {
    vm.getEvents()
  })
}

