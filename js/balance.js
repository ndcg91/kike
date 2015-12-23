(function(){
    var app = angular.module("Balance",['ngCsvImport','ngStorage']);

    //Added for CORS Support
    app.config(['$httpProvider',function($httpProvider){
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);


    //Balance Controller
    app.controller("BalanceMainController",['$http','$location','$window','$timeout','$scope','$localStorage',function($http,$location,$window,$timeout,$scope,$localStorage){
        //$window.localStorage.clear();
        var self=this; //to access scope within callbacks


    }]);
    app.directive('testDirective',function(){
        return{
            restrict: 'E',
            templateUrl: "templates/testDirective.html",
            controller: "BalanceController",
            controllerAs: "balance"
        }
    });
})();