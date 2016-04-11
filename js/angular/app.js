var documentateApp = angular.module('documentateApp',['ngRoute','documentateControllers']);

documentateApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when("/register", {
		templateUrl: "register.html",
		controller: "RegisterController"
	})
}])