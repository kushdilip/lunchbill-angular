myApp.controller('SurveyListcontroller', ['$scope', 'surveys', function ($scope, surveys) {
	$scope.surveys = surveys.get();

	$scope.delete = function(index){
		$scope.surveys.splice(index,1);
	}
}]);

myApp.controller('SurveyController',['$scope','$routeParams','$location', 'surveys',
	function($scope, $routeParams, $location, surveys){
		var surveyId = +$routeParams.id ;

		$scope.survey = surveys.getById(surveyId);			

		$scope.categories = [
		{id:1, name:"eMail Based"},
		{id:2, name:"Online"},
		{id:3, name:"SMS Based"}
		];

		$scope.save = function(){
			surveys.save($scope.survey);
			$location.path('/surveys');
		}

		$scope.cancel = function(){
			$location.path('/surveys');
		}
	}])


myApp.controller('EnterBillInfoCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$scope.persons = [];
	$scope.items = [];
	$rootScope.persons = $scope.persons;
	$rootScope.items = $scope.items;

	//Person methods
	$scope.addPerson = function () {
		$scope.persons.push({name:$scope.person, amount: 0});
		$scope.person = '';
	};  

	$scope.deletePerson = function(index){
		$scope.persons.splice(index,1);
	}

	//Food Item methods
	$scope.addItem = function () {
		$scope.items.push({name:$scope.item});
		$scope.item = '';
	};  

	$scope.deleteItem = function(index){
		$scope.items.splice(index,1);
	}
}]);

myApp.controller('EditdetailsCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	console.log($scope.persons);

	$scope.changeTotal = function (action, i, j) {
		console.log(action, i, j);
		
	}
}]);

myApp.controller('AboutCtrl', ['$scope', function ($scope) {
	
}]);
