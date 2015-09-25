# ngStorage
angular module for simply use browser local storage 

## Add module on your angular app
var app = angular.module('app', ['ngStorage']);

## Using it in controller
Inject service in controller and interact with local storage

```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){
  // Single Value
  $localStorage.set('key', 'Hello');
  alert($localStorage.get('key'));
  
  // Object
  $localStorage.setObj('key', {title: 'Hello'});
  var obj = $localStorage.getObj('key');
  alert(obj.title);
}
```
