/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("TrabajadoresController",['$http','$location','$window','$timeout','$scope','$localStorage',function($http,$location,$window,$timeout,$scope,$localStorage){
        //$window.localStorage.clear();
        var self=this; //to access scope within callbacks
        this.separator = ";";
        this.encoding = "ISO-8859-1";
        this.newWorker = new Object();
       // this.values = [];
        this.worker = [];
        this.values = [];
	    this.csvCheck = false;
        self.importOrder = [];

        this.importSelected = function(){
            console.log('selected' + trabajadores.importSelected)
        };
        this.importWorkers = function(order){
            var newImportWorker = {};
              self.csv.result.forEach(function(csv){
                  order.forEach(function(property){
                      csv[property[order]] = newImportWorker[property[value]];
                  });
              self.addWorker(newImportWorker);
              newImportWorker = {};
              });
        };

        this.getParams = function(){
            self.values=$localStorage.WorkerParams;
        };



        //HTTP GET PARAMS COMMENTED TEMPROALY OUT
        /*this.getParams = function(){
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
        */

        //GET WORKERS TEMPORALY COMMENTED OUT, TEMPORALY REPLACED BY LOCAL STORAGE UNTIL FINAL SOLUTION
        /*
        this.getWorkers = function(){
            $http({
                method:'GET',
                url:'http://128.199.62.16:8080/api/trabajadores/get'
            }).success(function(data){
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
        */
        this.getWorkers = function(){
            self.worker = $localStorage.workers;
        };
        this.addWorker = function(workerToAdd){
            $localStorage.workers.push(workerToAdd);
            self.getWorkers();
        };
        this.deleteWorker = function(workerToDelete){
            console.log("deleting");
            console.log(workerToDelete);
            var tempArray = [];
            self.worker.forEach(function(worker){
                console.log(worker);
                if (worker != workerToDelete){
                    tempArray.push(worker);
                }
            });
            $localStorage.workers = tempArray;
            self.getWorkers();
        };
        this.updateWorkers = function(){
            $localStorage.workers = self.worker;
        };

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
