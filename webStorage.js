/**
 * webStorage - save data (single values, object, array) into browser local storage for web and mobile app.
 * @author: Valerio Barbera - valerio@aventuresrl.com
 * @version v0.1.2
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('webStorage', [])
.factory('$localStorage', ['$window', function($window){
	return {
		set: function(key, obj){
			if(typeof obj === "object" || Array.isArray(obj))
				return $window.localStorage.setItem(this.getKey(key), JSON.stringify(obj));
			else
				return $window.localStorage.setItem(this.getKey(key), obj);
		},
		
		get: function(key){
			try{
				//Verifico se un oggetto
				var value = JSON.parse($window.localStorage.getItem(this.getKey(key)));
				if(value === null)
					return false;
				else
					return value;
				
			}catch(e){ //Altrimenti stringa semplice
				if($window.localStorage.getItem(this.getKey(key)) === null)
					return false;
				else
					return $window.localStorage.getItem(this.getKey(key));
			}
		},

		remove: function(key){
			if(Array.isArray(key)){
				angular.forEach(key, function(item){
					if(typeof item === 'string')
						$window.localStorage.removeItem(this.getKey(item));
				});
				return true;
			}
			else
				return $window.localStorage.removeItem(this.getKey(key));
		},
		
		/**
		 * Gestione prefisso comune per tutte le variabili
		 * In questo modo se si sviluppano più applicazioni non si rischia
		 * di sovrapporre (e quindi sovrascrivere) delle variabili local Storage esistenti.
		 */
		prefix: '',
		
		setPrefix: function(p){
			if(typeof p === 'string'){
				return this.prefix = p;
			}
			return false;
		},
		
		getKey: function(key){
			return this.prefix+key;
		}
	};
}]);
