/**
 * Save in local storage single variable or JSON object
 */

angular.module('ngStorage', [])
.factory('$localStorage', ['$window', function($window){
	return {
		set: function(key, obj){
			return $window.localStorage[key] = obj;
		},
		get: function(key){
			if($window.localStorage[key]===null)
				return false;
			else
				return $window.localStorage[key];
		},
		setObj: function(key, obj){
			return $window.localStorage.setItem(key, JSON.stringify(obj));
		},
		getObj: function(key){
			if($window.localStorage.getItem(key)===null)
				return false;
			else
				return JSON.parse($window.localStorage.getItem(key));
		},
		remove: function(key){
			return $window.localStorage.removeItem(key);
		}
	};
}]);
