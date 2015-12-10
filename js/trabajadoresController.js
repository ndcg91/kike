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
        this.newWorker = new Object();
       // this.values = [];
        this.worker = [];
	this.csvCheck = false;

        this.getParams = function(){
          $http({
              method:'GET',
              url:'http://128.199.62.16:8080/api/trabajadores/getParams'
          }).success(function(data){
              console.log(data.parameters);
              var parameters = data.parameters;
              self.values = [];
              var array = parameters.split("__");
              array.forEach(function(param){
                  self.values.push(param);
              });
	     angular.element(document).ready(function () {
                console.log("document ready");
                $('select').material_select();
            });

              self.getWorkers();
          }).error(function (err) {
              console.log(JSON.stringify(err));
          });
        };

        this.getWorkers = function(){
            $http({
                method:'GET',
                url:'http://128.199.62.16:8080/api/trabajadores/get'
            }).success(function(data){
		//console.log(data);
                self.worker = [];
                data.forEach(function(element){
                    var object = JSON.parse(element);
                   self.worker.push(object);
                });
		console.log(self.worker);
            }).error(function (err) {
                console.log(err);
            });
        };

        this.addWorker = function(addedworker){
            var workerToAdd = {trabajador:JSON.stringify(addedworker)};

            //self.worker.push(addedworker);
            $http({
                method: 'POST',
                data: $.param(workerToAdd),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: 'http://128.199.62.16:8080/api/trabajadores/add'
            }).success(function (data) {
                self.getWorkers();
                return true;
            }).error(function(){
                return false;
            });
        };

        //this.values = ["nombre","apellidos","direccion"];
        //this.worker =[{nombre:"noel",apellidos:"carcases Gomez",direccion:"desconocida"},{nombre:"lysandra",apellidos:"garcia grave de peralta",direccion:"con noel"}];
        this.editingWorker = false;
        this.toggleEditing = function(worker){
            if (worker.editingWorker){
                worker.editingWorker = false;
            }
            else {
                worker.editingWorker = true;
            }
        }

        var init = function () {
            self.getParams();
            self.getWorkers();
            // check if there is query in url
            // and fire search in case its value is not empty
        };
// and fire it after definition
        init();
    }]);
})();
