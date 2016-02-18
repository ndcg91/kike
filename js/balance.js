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

    app.factory("Worker",function($resource){
        return $resource("http://128.199.62.16:8080/api/workers/:id",{id:'@id'},{
            update: {method: 'PUT'},
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true},
            get: {method: 'GET', isArray: false},
            delete: {method: 'DELETE'}
        });
    });
    app.factory("Parameter",function($resource){
        return $resource("http://128.199.62.16:8080/api/values/:id",{id:'@_id'},{
            update: {method: 'PUT'},
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true},
            get: {method: 'GET'},
            delete: {method: 'DELETE',params:{id:'@_id'}}
        });
    });

    app.config(function($routeProvider) {
    $routeProvider.
      when('/trabajadores', {
        templateUrl: 'partials/Trabajadores.html',
        controller: 'TrabajadoresController as trabajadores'
      }).
      when('/settings', {
        templateUrl: 'partials/Settings.html',
        controller: 'SettingController as settings'
      }).

      when('/worker/:workerID', {
        templateUrl: 'partials/worker.html',
        controller: 'WorkerController'
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

