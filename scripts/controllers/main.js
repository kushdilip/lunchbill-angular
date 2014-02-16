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


myApp.controller('EnterBillInfoCtrl', ['$scope', function ($scope) {
	
	$scope.persons = [
		{id:1, name:"Rahul", done: false},
		{id:2, name:"Ramesh", done: false},
		{id:3, name:"Amresh", done: false}
	];

	$scope.delete = function(index){
	      $scope.surveys.splice(index,1);
	}

	$scope.addPerson = function () {
	    $scope.persons.push({text:$scope.person, done:false});
	    $scope.formTodoText = '';
  	};
  
}]);