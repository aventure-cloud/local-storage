/**
 * webStorage - save data (single values, object, array) into browser local storage for web and mobile app.
 * @author: Valerio Barbera - valerio@aventuresrl.com
 * @version v0.1.2
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('webStorage', [])
.factory('$localStorage', ['$window', '$log', function($window, $log){
	return {
		set: function(key, obj){
			if(typeof obj === "object" || Array.isArray(obj))
				return $window.localStorage.setItem(this.composeKey(key), JSON.stringify(obj));
			else
				return $window.localStorage.setItem(this.composeKey(key), obj);
		},
		
		get: function(key){
			try{
				//Verifico se un oggetto
				var value = JSON.parse($window.localStorage.getItem(this.composeKey(key)));
				if(value === null)
					return false;
				else
					return value;
				
			}catch(e){ //Altrimenti stringa semplice
				if($window.localStorage.getItem(this.composeKey(key)) === null)
					return false;
				else
					return $window.localStorage.getItem(this.composeKey(key));
			}
		},
		
		getAll: function(){
			if(this.prefix == '')
				return $window.localStorage;
			else{
				var result = [];
				for(key in $window.localStorage){
					if(key.indexOf(this.prefix)!=-1)
						result[key] = $window.localStorage[key];
				}
				return result;
			}
		},
		
		getKeys: function(){
			var result = [];
			for(key in $window.localStorage){
				if(key.indexOf(this.prefix)!=-1)
					result.push(key);
			}
			return result;
		},

		remove: function(key){
			if(Array.isArray(key)){
				angular.forEach(key, function(item){
					if(typeof item === 'string')
						$window.localStorage.removeItem(this.composeKey(item));
					else
						$log.warn('Found a no string element in array');
				});
			}
			
			if(typeof key === 'string')
				$window.localStorage.removeItem(this.composeKey(key));
			else
				$log.error("Local storage KEY isn't valid");

			return this;
		},
		
		clear: function(){
			this.remove(this.getKeys());
			return this;
		},
		
		/**
		 * Gestione prefisso comune per tutte le variabili
		 * In questo modo se si sviluppano più applicazioni non si rischia
		 * di sovrapporre (e quindi sovrascrivere) delle variabili local Storage esistenti.
		 */
		prefix: '',
		
		setPrefix: function(p){
			if(typeof p === 'string'){
				this.prefix = p;
				$log.debug("Setted localStorage prefix = "+this.prefix);
				return this;
			}
			return false;
		},
		
		/**
		 * private method
		 */
		composeKey: function(key){
			return this.prefix+key;
		}
	};
}]);
