var documentateApp = angular.module('documentateApp',[]);


documentateApp.controller('AuthorizationController', ['$scope', function($scope) {
	$scope.auth = user.checkAuth();
	if (user.checkAuth()) {
		$scope.uid = user.userData.uid;
		$scope.name = user.getName(user.userData.uid);
		$scope.icon = user.getGravatar();
	}
}]);

documentateApp.controller('ModalController',function($scope) {
	$scope.foo = 'hi';
});
documentateApp.controller('ModalController2',function($scope) {

});

documentateApp.controller('DatePicker', function($scope) {
	$scope.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	$scope.days = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
	$scope.years = getYears();
})



function getYears() {
	var years = [];
	var date = new Date()
	var currYear = date.getFullYear();
	for (var i = currYear; i > currYear - 100; i--) {
		years.push(i);
	}
	return years;
}