/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("TrabajadoresController",['$http','$location','$window','$timeout','$scope','$localStorage','Worker','Parameter',function($http,$location,$window,$timeout,$scope,$localStorage,Worker,Parameter){
        var self=this; //to access scope within callbacks

        this.workers = [];
        this.values = [];


	console.log("trabajadores controller");


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
       
        this.newWorker = {};
        this.editingWorker = false;

        Worker.query(function(data){
            data.forEach(function(object){
                var id = object._id;
                var worker = object.trabajador
                worker.id = id;
                self.workers.push(worker);
            });
	    console.log(self.workers);
        });
        Parameter.query(function(data){
            data.forEach(function(object){
                self.values.push(object);
            });
            console.log(self.values);
        });

        //WORKER METHODS
        this.getParams = function(){
            Parameter.query(function(data){
                data.forEach(function(object){
                    self.values.push(object);
                });
                console.log(self.values);
            });
        };

        this.getWorkers = function(){
            Worker.query(function(data){
                self.workers = [];
                data.forEach(function(object){
                    var id = object._id;
                    var worker = object.trabajador;
                    worker.id = id;
                    self.workers.push(worker);
                });
                $('.collapsible').collapsible({});
            });
        };
        this.addWorker = function(workerToAdd){
            console.log(workerToAdd);
            Worker.save({trabajador:workerToAdd},function(data){
                self.getWorkers();
            });
            self.newWorker = {};
        };
        this.deleteWorker = function(workerToDelete){
            console.log("deleting");
            console.log(workerToDelete);
            var tempArray = [];
            self.workers.forEach(function(worker){
                console.log(worker);
                if (worker != workerToDelete){
                    tempArray.push(worker);
                }
            });
            workers = tempArray;
            Worker.delete(workerToDelete,function(data){
                self.getWorkers();
            });
        };


        this.toggleEditing = function(worker){
            if (worker.editingWorker){
                worker.editingWorker = false;
                Worker.update(worker);
            }
            else {
                worker.editingWorker = true;
            }
        };
        this.csvOrganize = function(){
            console.log("changed");
        };
        var init = function () {
	    console.log("init called");
            //self.getParams();
            //self.getWorkers();
            // check if there is query in url
            // and fire search in case its value is not empty
        };
// and fire it after definition
       // init();
    }]);
})();
