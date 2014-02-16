var chartOptions = {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false
	},
	title: {
		text: 'Distribution of amount'
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
				enabled: true,
				color: '#000000',
				connectorColor: '#000000',
				formatter: function() {
					return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
				}
			}
		}
	},
	series: [{
		type: 'pie',
		name: 'Bill Distribution'
	}]
};

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
				share = Math.round(item.price / item.persons.length);
			}
			console.log(share);

			$scope.persons.forEach(function (person, pIndex, pArray) {
				if(item.persons.indexOf(pIndex) >= 0)
					person.amount += share;
			});
		});

		$scope.updateChart();
		
	}

	$scope.updateChart = function () {
		//Charting Code

		var data= [];
		var totalCounted = 0;
		var totalAmount = 0;
		$scope.persons.forEach(function (person, index, array) {
			data.push([person.name, person.amount]);
			totalCounted += person.amount;
		});

		$scope.items.forEach(function (item, index, array) {
			totalAmount += item.price;
		});

		data.push({name: 'Remaining', y: totalAmount - totalCounted, sliced: true, selected: true});

		var browser_chart = chartOptions
		browser_chart.series[0].data = data
		$scope.piechart = browser_chart
	}

	$scope.updateChart();
}]);

myApp.controller('AboutCtrl', ['$scope', function ($scope) {

}]);


myApp.directive('chart',function(){
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            chartData: "=chartId"
        },
        transclude:true,
        replace: true,

        link: function (scope, element, attrs) {
            var chartsDefaults = {
                chart: {
                    renderTo: element[0],
                    type: attrs.type || null,
                    height: attrs.height,
                    width: attrs.width
                },
//                colors: [attrs.color]
            };
            var chart;
            //Update when charts data changes
            scope.$watch(function() { return scope.chartData; }, function(value) {
                if(!value) return;
                var deepCopy = true;
                var newSettings = {};
                $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
                if (!chart) {
                    chart = new Highcharts.Chart(newSettings);

                } else {
                    for (var i = 0; i < chart.series.length; i++) {
                        chart.series[i].setData(scope.chartData.series[i].data)
                    }
                }
            }, true);
        }
    };
})