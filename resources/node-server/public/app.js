//defino el modulo
var myModule = angular.module('AgularModule',['ngRoute']);

//configuro las rutas
myModule.config(function($routeProvider){
	//Ruta principal
	$routeProvider
    .when('/',{
		templateUrl:'main.html',
        controller: 'maincontroller'
	})
    .when('/add',{
        templateUrl:'Partials/add.html',
        controller: 'maincontroller',
    })
    .otherwise({
        redirectTo: '/'
    });
});

myModule.factory('cityFactory', function(){
	var cities = [
		{name:'Buenos Aires', country:'Argentina'},
        {name:'Barcelona', country: 'España'},
        {name: 'Lima', country: 'Perú'}
    ];

    return {
    	getAll : function() {
    		return cities;
    	},
    	addCity : function(city) {
    		cities.push(city);
    	}
    }
})

myModule.controller('maincontroller', ['$scope', 'cityFactory', maincontroller]);

function maincontroller($scope, cityFactory) {

	$scope.cities = cityFactory.getAll();
    $scope.addCity = function() {
    	var newCity = {
    			name: $scope.newCity,
    			country: $scope.newCountry
    		}
    	
    	cityFactory.addCity(newCity);
    	$scope.newCity= '';
    	$scope.newCountry= '';
    }
}
