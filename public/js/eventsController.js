angular
  .module('dojoBooks')
  .controller('EventsController', EventsController)

EventsController.$inject = ['eventsFactory', '$window']

function EventsController (eventsFactory, $window){
  var vm = this
  vm.api = eventsFactory
  vm.myDate = new Date()
  vm.events = []
  vm.newEvent = {}
  vm.api.list()
    .success(function(res){
      for(var i = 0; i < res.length; i++){
        res[i].date = new Date(res[i].date)
      }
      vm.events = res
    })
  vm.addEvent = function(date, category, amount, paid, invoice){
    var data = {date:date, category:category, amount:amount, paid:paid, invoice:invoice}
    vm.api.addEvent(data)
      .then(function success(res){
        res.data.event.date = new Date(res.data.event.date)
        vm.events.push(res.data.event)
        vm.newEvent = {}
      })
  }

  vm.monthlyTotal = function(arr){
    var total = 0
    for(var j = 0; j < arr.length; j++){
      if (arr[j].date.getMonth() == vm.myDate.getMonth()){
        total += arr[j].amount
      }
    }
    return total
  }

  vm.sthree = function(){
     /*
          Function to carry out the actual PUT request to S3 using the signed request from the app.
      */
    function upload_file(file, signed_request, url){
      console.log(file)
      console.log(signed_request)
      console.log(url)
      $window.localStorage.setItem('url', url)
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById("preview").src = url;            
            document.getElementById("invoice").value = url;
            vm.newEvent.invoice = url
        }
      };
      xhr.onerror = function() {
          console.log("vanilla AJax call : " + JSON.stringify(xhr))
          alert("Could not upload file."); 
      };
      xhr.send(file);
    }
    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function get_signed_request(file){
      console.log("getting signed request")
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:3000/sign_s3?file_name="+file.name+"&file_type="+file.type);
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            var response = JSON.parse(xhr.responseText);
            upload_file(file, response.signed_request, response.url);
          }
          else{
            alert("Could not get signed URL.");
          }
        }
      };
      xhr.send();
      }
    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    function init_upload(){
      console.log("here");
      var files = document.getElementById("file_input").files;
      var file = files[0];
      if(file == null){
        alert("No file selected.");
        return;
      }
      get_signed_request(file);
      }
    /*
     Bind listeners when the page loads.
    */
    (function() {
          window.document.querySelector("#file_input").addEventListener('change', init_upload)
    })();

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
      response.date = new Date(response.date)
      vm.event = response
      console.log(response.date.getMonth())
    })
  }
  vm.showEvent($stateParams.eventId)

  vm.updateEvent = function(eventId, date, category, amount, paid, invoice){
    var data = {date:date, category:category, amount:amount, paid:paid, invoice:invoice}
    vm.api.updateEvent(eventId,data).success(function(response){
      response.date = new Date(response.date)
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