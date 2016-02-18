(function(){
    var app = angular.module("Balance",['ngCsvImport','ngStorage','xeditable','ngResource','ngRoute']);
	
	app.run(function(editableOptions) {
		editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
	});
    //Added for CORS Support
    app.config(['$httpProvider',function($httpProvider){
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);


    //Balance Controller
    app.controller("BalanceMainController",['$http','$location','$window','$timeout','$scope','$localStorage',function($http,$location,$window,$timeout,$scope,$localStorage){
        //$window.localStorage.clear();
        var self=this; //to access scope within callbacks
	console.log("balance controller");

    }]);
    app.directive('testDirective',function(){
        return{
            restrict: 'E',
            templateUrl: "templates/testDirective.html",
            controller: "BalanceController",
            controllerAs: "balance"
        }
    });
    app.config(function($routeProvider) {
    $routeProvider.
      when('/trabajadores', {
        templateUrl: 'partials/Trabajadores.html',
        controller: 'TrabajadoresController'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
       when('/home', {
        templateUrl: 'partials/indexPage.html',
        controller: 'BalanceMainController'
      }).

      otherwise({
        redirectTo: '/home'
      });
  });
    
})();
