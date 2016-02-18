/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("TrabajadoresController",['$http','$location','$window','$timeout','$scope','$localStorage',function($http,$location,$window,$timeout,$scope,$localStorage){
        var self=this; //to access scope within callbacks
	console.log("trabajadores controller");
	//this.getParams();
        //this.getWorkers();

        //$window.localStorage.clear();


        //MARK: CSV IMPORT PROPERTIES METHODS
        this.separator = ";";
        this.encoding = "ISO-8859-1";
        this.csvCheck = false;
        self.importOrder = [];


        //METHODS
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
        //END




        //WORKER PROPERTIES
        // this.values = [];
        this.newWorker = new Object();
        this.workers = [];
        this.values = [];

        //WORKER METHODS
        this.getParams = function(){
            self.values=$localStorage.WorkerParams;
        };

        this.getWorkers = function(){
            if ($localStorage.workers == undefined){
                $localStorage.workers = [];
            }
            self.workers = $localStorage.workers;
        };

        this.addWorker = function(workerToAdd){
            $localStorage.workers.push(workerToAdd);
            self.newWorker = [];
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
        };

        var init = function () {
	    console.log("init called");
            self.getParams();
            self.getWorkers();
            // check if there is query in url
            // and fire search in case its value is not empty
        };
// and fire it
        init();
    }]);
})();
