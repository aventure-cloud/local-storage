# webStorage
angular module for simply save data (single values, object, array) into browser local storage for web and mobile app.

## Add module on your angular app
```javascript
var app = angular.module('myAppName', ['webStorage']);
```

## Using prefix
You can use prefix before each variable name to distinguish same variable name between more apps.

```javascript
app.run(['$localStorage', function($localStorage){
  $localStorage.setPrefix('myAppName_');
}]);
```

## Using it in controller
Inject service in controller and save single values, object or array in local storage

```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){
  // Single Value
  $localStorage.set('key1', 'Hello');
  console.log($localStorage.get('key1'));
  
  // JSON Object
  $localStorage.set('key2', {title: 'Hello'});
  console.log($localStorage.get('key2'));
  
  // Array of Objects
  $localStorage.set('key3', [{title: 'Hello'}, {title: 'World'}]);
  console.log($localStorage.get('key3'));
  
  // Remove single key
  $localStorage.remove('key1');
  
  // Remove multiple keys at the same time
  $localStorage.remove(['key2', 'key3']);
}
```
