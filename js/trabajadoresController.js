/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("TrabajadoresController",['$http','$location','$window','$timeout','$scope',function($http,$location,$window,$timeout,$scope){
        //$window.localStorage.clear();
        var self=this; //to access scope within callbacks
        this.separator = ";";
        this.encoding = "ISO-8859-1";
    }]);
})();