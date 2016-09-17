"use strict" ;

/**
 * webStorage - Manage data (single values, object, array) in browser local storage for web and mobile app.
 * @author: Valerio Barbera - valerio@aventuresrl.com
 * @version v0.1.2
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('webStorage', [])

.provider('$localStorage', function(){
	/**
	 * Retrieve $log service instance to use logging service in provider
	 */
	var $log =  angular.injector(['ng']).get('$log');
	
	/**
	 * PREFIX identify a namespace for local storage params stored by service
	 */
	var prefix = '';
	
	var _setPrefix = function(p){
		if(typeof p === 'string'){
			prefix = p;
			console.log("localStorage namespace = "+prefix);
			return this;
		}
		return false;
	};
	
	/**
	 * private method
	 */
	var _composeKey = function(key){
		return prefix+key;
	}
	
	var _getItem = function(key){
		try{
			//Verifico se un oggetto
			var value = JSON.parse(window.localStorage.getItem(_composeKey(key)));
			if(value === null)
				return false;
			else
				return value;
			
		}catch(e){ //Altrimenti stringa semplice
			if(window.localStorage.getItem(_composeKey(key)) === null)
				return false;
			else
				return window.localStorage.getItem(_composeKey(key));
		}
	};
	
	var _set = function(key, obj){
		if(typeof obj === "object" || Array.isArray(obj))
			return window.localStorage.setItem(_composeKey(key), JSON.stringify(obj));
		else
			return window.localStorage.setItem(_composeKey(key), obj);
	};
	
	/**
	 * Return array key=>value defined under your namespace.
	 * If you don't declare namespace the method return all local storage
	 */
	var _getAll = function(){
		if(prefix == '')
			return window.localStorage;
		else{
			var result = [];
			for(key in window.localStorage){
				if(key.indexOf(prefix)!=-1)
					result[key] = window.localStorage[key];
			}
			return result;
		}
	};
	
	/**
	 * Retrieve all keys in your namespace.
	 * If you don't declare namespace the method return all local storage keys
	 */
	var _getKeys = function(){
		var result = [], key='';
		for(key in window.localStorage){
			if(prefix=='')
				result.push(key);
			else if(key.indexOf(prefix)!=-1)
				result.push(key);
		}
		$log.debug(result);
		return result;
	};
	
	/**
	 * You can inject single keys in simple String format, or array of string 
	 * to delete multiple keys at the same time 
	 */
	var _remove = function(key){
		if(Array.isArray(key)){
			$log.debug("Deleting array of Keys");
			for(var i=0; i<key.length; i++){
				if(typeof key[i] === 'string')
					window.localStorage.removeItem(key[i]);
				else
					$log.warn('Found a no string element in array');
			}
		}else if(typeof key === 'string'){
			$log.debug("Deleting single Key");
			window.localStorage.removeItem(_composeKey(key));
		}
		else
			$log.error("Local storage KEY isn't valid");

		return this;
	};
	
	/**
	 * Remove all object under your namespace.
	 * If you don't declare namespace the method clear entire local storage.
	 */
	var _clear = function(){
		$log.warn("Called Clear()");
		this.remove(this.getKeys());
		return this;
	};
	
	
	return {
		/** start: Provider ($localStorageProvider) */
		setPrefix: _setPrefix,
		get: _getItem,
		/** end: Provider */
		
		
		/** start: Service ($localStorage) */
		$get: function(){
			return {
				set: _set,
				get: _getItem,
				getAll: _getAll,
				getKeys: _getKeys,
				remove: _remove,
				clear: _clear
			};
		}
		/** end: Service */
	}
})

.factory('$dataBridge', function ($localStorage) {

	var _data = {};

	var _persistance = false;

	var _configure = function (config) {
		_persistance = config.persistance;
	};

	var _set = function (key, obj, persistance) {
		if(_persistance || persistance)
			$localStorage.set(key, obj);
		else
			_data[key] = obj;
		return _data;
	};

	var _get = function (key, remove) {

	    var obj = null;

		if(_data[key]){
		    obj = _data[key];
            if(remove)
                delete _data[key];
        } else {
            obj = $localStorage.get(key);
            if(remove)
                $localStorage.remove(key);
        }

        return obj;
	};

	return {
		configure: _configure,
		get: _get,
		set: _set
	};
});
