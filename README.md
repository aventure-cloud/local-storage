# ngStorage
angular module for simply use browser local storage in web and mobile app.

## Add module on your angular app
```javascript
var app = angular.module('app', ['ngStorage']);
```

## Using it in controller
Inject service in controller and interact with local storage

```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){
  // Single Value
  $localStorage.set('key', 'Hello');
  alert($localStorage.get('key'));
  
  // JSON Object
  $localStorage.setObj('key', {title: 'Hello'});
  var obj = $localStorage.getObj('key');
  alert(obj.title);
}
```
