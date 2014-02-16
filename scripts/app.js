'use strict';

var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider',function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/EnterBillInfo.html',
			controller: 'EnterBillInfoCtrl'
		})
		.when('/surveys', {
			templateUrl: 'views/SurveyList.html',
			controller: 'SurveyListcontroller'
		})
		.when('/survey/:id',{
			templateUrl: 'views/Survey.html',
			controller: 'SurveyController'
		})
		.otherwise({
			redirectTo: '/surveys'
		});
}]);

