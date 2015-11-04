/**
 * webStorage - save data (single values, object, array) into browser local storage for web and mobile app.
 * @author: Valerio Barbera - valerio@aventuresrl.com
 * @version v0.1.2
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */



angular.module('webStorage', [])

.provider('$localStorage', function(){
	var prefix = '';
	
	return {
		setPrefix: function(p){
			if(typeof p === 'string'){
				prefix = p;
				console.log("Setted localStorage prefix = "+prefix);
				return this;
			}
			return false;
		},
		
		getItem: function(key){
			try{
				//Verifico se un oggetto
				var value = JSON.parse(window.localStorage.getItem(prefix+key));
				if(value === null)
					return false;
				else
					return value;
				
			}catch(e){ //Altrimenti stringa semplice
				if(window.localStorage.getItem(prefix+key) === null)
					return false;
				else
					return window.localStorage.getItem(prefix+key);
			}
		},
		
		$get: function($log){
			return {
				set: function(key, obj){
					if(typeof obj === "object" || Array.isArray(obj))
						return window.localStorage.setItem(this.composeKey(key), JSON.stringify(obj));
					else
						return window.localStorage.setItem(this.composeKey(key), obj);
				},
				
				get: this.getItem,
				
				getAll: function(){
					if(prefix == '')
						return window.localStorage;
					else{
						var result = [];
						for(key in window.localStorage){
							if(key.indexOf(this.prefix)!=-1)
								result[key] = window.localStorage[key];
						}
						return result;
					}
				},
				
				getKeys: function(){
					var result = [];
					for(key in window.localStorage){
						if(prefix=='')
							result.push(key);
						
						if(prefix!='' && key.indexOf(prefix)!=-1)
							result.push(key);
					}
					return result;
				},

				remove: function(key){
					if(Array.isArray(key)){
						$log.debug("local Storage Key is ARRAY");
						for(var i=0; i<key.length; i++){
							if(typeof key[i] === 'string')
								window.localStorage.removeItem(key[i]);
							else
								$log.warn('Found a no string element in array');
						}
					}else if(typeof key === 'string'){
						$log.debug("local Storage Key is STRING");
						window.localStorage.removeItem(this.composeKey(key));
					}
					else
						$log.error("Local storage KEY isn't valid");

					return this;
				},
				
				clear: function(){
					$log.warn(this.getKeys());
					this.remove(this.getKeys());
					return this;
				},
				
				/**
				 * private method
				 */
				composeKey: function(key){
					return prefix+key;
				}
			};
		}
	}
});
