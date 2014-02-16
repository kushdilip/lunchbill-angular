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
		if($scope.person.length > 0 && $scope.person.length < 20)
			$scope.persons.push({name:$scope.person, amount: 0});
		else
			alert("Please enter name of max length 20");

		$scope.person = '';
	};  

	$scope.deletePerson = function(index){
		$scope.persons.splice(index,1);
	}

	//Food Item methods
	$scope.addItem = function () {
		var temp = $scope.item.split(',');
		var item = {name: temp[0], price: parseInt(temp[1])};
		if(typeof item.name === 'string' && item.price >= 0)
			$scope.items.push({name:item.name, price: item.price, persons: []});
		else
			alert("Please enter item and price in correct format");

		$scope.item = '';
	};  

	$scope.deleteItem = function(index){
		$scope.items.splice(index,1);
	}
}]);

myApp.controller('EditdetailsCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	console.log($scope.persons);
	$scope.changeTotal = function (action, i, j) {
		if(action)
		{
			$scope.items[i].persons.push(j);

		}
		else
		{
			var d = $scope.items[i].persons.indexOf(j);
			$scope.items[i].persons.splice(d, 1);
		}

		$scope.persons.forEach(function (person, index, array) {
			person.amount = 0;
		});

		$scope.items.forEach(function (item, index, array) {
			var share = 0;
			if(item.persons.length > 0)
			{
				share = item.price / item.persons.length;
			}
			console.log(share);

			$scope.persons.forEach(function (person, pIndex, pArray) {
				if(item.persons.indexOf(pIndex) >= 0)
					person.amount += share;
			});
		})
	}
}]);

myApp.controller('AboutCtrl', ['$scope', function ($scope) {
	
}]);
