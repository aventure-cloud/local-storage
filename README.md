# Local Storage
Javascript class to save data (scalar values, object, array) into browser local storage for web and mobile app.

Native local storage allow you to store only primitive data type. This module allow you to store JSON objects and Array also using just one method. 

## Install
```
npm install --save local-storage-bridge
```

### Use
```javascript
import LocalStorage from 'LocalStorage';

const storage = new LocalStorage();
```

### Using prefix
You can set prefix that will be added before each key 
to distinguish same key between more apps. 

```javascript
const storage = new LocalStorage({ prefix: 'myapp_name_' });
```
Add prefix is similar to create a "namespace" for your app. 
If you set prefix, all subsequent operation (get, set, remove) 
will take effect on local storage params created under this prefix namespace.
Into more apps you can use the same local storage params names but 
with different prefix they do not overwrite.

### Single value
Classic usage of local storage.
```javascript
storage.set('key1', 'Simple string');
storage.set('key2', 3);

console.log(storage.all());
```

### JSON Object
When you put JSON object into set method, webStorage recognizes input and it serialize object. When you call get, webStorage return your original object.
```javascript
storage.set('key3', {title: 'JSON Object'});

console.log(storage.all());
```

### Array 
```javascript
storage.set('key4', [{title: 'Array of objects'}, {title: 'Array of objects'}]);

console.log(storage.all());
```

## Remove
Remove a single value:
```javascript
storage.remove('key1');

console.log(storage.all());
```


Clean all storage content:
```javascript
storage.clean();

console.log(storage.all());
```
Attention when using clear() without set prefix. 
It is very likely that you will lose data of others applications.


