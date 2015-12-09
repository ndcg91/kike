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


        this.getValues = function(){
          $http({
              method:'GET',
              url:'http://128.199.62.16:8080/api/trabajadores/getParams'
          }).success(function(data){
              self.values = data;
          }).error(function (err) {
              console.log(err);
          })
        };

        this.getWorkers = function(){
            $http({
                method:'GET',
                url:'http://128.199.62.16:8080/api/trabajadores/get'
            }).success(function(data){
                self.worker = data;
            }).error(function (err) {
                console.log(err);
            });
        };

        this.addWorker = function(worker){
            var workerToAdd = {trabajador:JSON.stringify(worker)};

            self.worker.push(worker);
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

        this.values = ["nombre","apellidos","direccion"];
        this.worker =[{nombre:"noel",apellidos:"carcases Gomez",direccion:"desconocida"},{nombre:"lysandra",apellidos:"garcia grave de peralta",direccion:"con noel"}];
        this.editingWorker = false;
        this.toggleEditing = function(worker){
            if (worker.editingWorker){
                worker.editingWorker = false;
            }
            else {
                worker.editingWorker = true;
            }
        }
    }]);
})();