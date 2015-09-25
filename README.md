# ngStorage
angular module for simply use browser local storage 

# Add module on your angular app
var app = angular.module('app', ['ngStorage']);

# Using it in controller
Inject service in controller and interact with local storage

app.controller('ExampleCtrl', ['$localStorage', function($localStorage){
  $localStorage.set('key', 'Hello');
  
  alert($localStorage.get('key));
}
