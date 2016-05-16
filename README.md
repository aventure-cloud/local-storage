# webStorage
For an introduction see this article: http://developerdynamo.it/2016/04/05/una-libreria-per-gestire-il-localstorage-delle-tue-applicazioni-in-modo-intelligente/

Angular module for simply save data (single values, object, array) into browser local storage for web and mobile app.

Local storage allow you to store only primitive data type. This module allow you to store JSON objects and Array also using just one method. 

### Link module in your HTML
```html
<script src="[path]/webStorage.js"></script>
```

### Add module on your angular app
```javascript
var app = angular.module('myApp', ['webStorage']);
```

### Using prefix
You can set prefix that will be added before each variable name to distinguish same variable name between more apps.

You can perform this task using Provider in Angular config method. In this way you are sure that your namespace is configured when app start. 

```javascript
app.config(['$localStorageProvider', function($localStorageProvider){

	/*
	 * Set local storage Namespace
	 */
  	$localStorageProvider.setPrefix('myApp_');

}]);
```
Add prefix is similar to create a "namespace" for your app. If you set prefix, all subsequent operation (get, set, remove) will take effect on local storage params created under this prefix namespace.
Into more apps you can use the same local storage params names but with different prefix they do not overwrite.

# Get & Set
Inject service in controller and use it.

### Single value
Classic usage of local storage.
```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){

  $localStorage.set('key1', 'Single value');
  console.log($localStorage.get('key1'));

}]);
```

### JSON Object
When you put JSON object into set method, webStorage recognizes input and it serialize object. When you call get, webStorage return your original object.
```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){

  // JSON Object
  $localStorage.set('key2', {title: 'JSON Object'});
  console.log($localStorage.get('key2'));
  
}
```

### Array 
```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){

  // Array of Objects
  $localStorage.set('key3', [{title: 'Array of objects'}, {title: 'Array of objects'}]);
  console.log($localStorage.get('key3'));
  
}
```

# Remove
```javascript
app.controller('ExampleCtrl', ['$localStorage', function($localStorage){

  // Remove single key
  $localStorage.remove('key1');
  
  // Remove multiple keys at the same time
  $localStorage.remove(['key2', 'key3']);
  
  // Remove all keys in your "prefix namespace"
  //if you don't declare your personal "prefix" this call will delete all local storage
  $localStorage.clear();
}
```
Attention when using clear() without set prefix namespace. It is very likely that you will lose data of others applications.
