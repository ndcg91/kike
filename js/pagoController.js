/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("PagoController",['$http','$location','$window','$timeout','$scope','$localStorage',function($http,$location,$window,$timeout,$scope,$localStorage){
        //$window.localStorage.clear();
        var self = this; //to access scope within callbacks
        this.separator = ";";
        this.encoding = "ISO-8859-1";
        this.worker = [];
        this.values = [];
        this.nominas = [];
        this.valuesToShow = [];
	    this.csvCheck = false;
        this.editingWorker = false;
        this.pendingPayments = [];

        this.selectedWorker = $localStorage.selectedWorker;

        this.selectSection = function(section){
            self.pageSections.forEach(function(sec){
                if (sec != section){
                    sec.active = false;
                }
                else{
                    sec.active = true;
                }
                self.actualSection = section;
                self.actualSection.active = true;
            })

        };

        this.getPendingPayments = function(){
            var pending = [];
            self.worker.forEach(function(work){
                if (work.nomina.length != 0 || work.nomina.length == 0 && work.payedNomina.length == 0 ){
                    pending.push(work);
                }
            });
            self.pendingPayments = pending;
        };

        this.pageSections = [
            {
                name:"Trabajadores",
                active:true
            },
            {
                name:"Pagos Pendientes",
                active:false
            },
            {
                name:"Pagos Realizados",
                active:false
            },
            {
                name:"Resumen del Mes",
                active:false
            }
        ];
        this.actualSection = this.pageSections[0];
        this.getParams = function(){
            self.values=$localStorage.WorkerParams;
            this.values.forEach(function(element){
                element.valueadded = false;
            });
            console.log(this.values);
        };



        this.getWorkers = function(){
            console.log("getting workers");
            self.worker = $localStorage.workers;
            self.worker.forEach(function(element){
                if (element.nomina == undefined ){
                    element.nomina = [];
                }
                if (element.payedNomina == undefined){
                    element.payedNomina = [];
                }
            });
        };

        this.selectWorker = function(worker){
            self.editingWorker = true;
            self.selectedWorker = worker;
            $localStorage.selectedWorker = worker;
            console.log($localStorage.selectedWorker);
        };

        this.updateWorkers = function(){
            $localStorage.workers = self.worker;
            self.worker.forEach(function(element){
                if (element.nomina == undefined ){
                    element.nomina = [];
                }

            });
        };


        this.getNominaTypes = function(){
          self.nominas = $localStorage.nominas;
        };


        this.toggleValue = function(value){
            console.log(value.valueadded);
            if (value.valueadded == undefined){
                value.valueadded = false
            }
            if (!value.valueadded){
                value.valueadded = true;
                self.valuesToShow.push(value);
            }
            else{
                value.valueadded = false;
                newArray = [];
                self.valuesToShow.forEach(function(element){
                    if (element.value != value.value){
                        newArray.push(element);
                    }
                });
                self.valuesToShow = newArray;
            }
            self.values.forEach(function(val){
                if (val.value == value.value){
                    val = value;
                }
            })
        };









        this.nominaExist = false;
        if ($localStorage.nominas == undefined){
            $localStorage.nominas = [];
        }
        this.nominas = $localStorage.nominas;

        //nominas array final result should look like this
        //nominas=[{name:"nombre",payments:[{type:"tipo",price:"precio", editing=false}],discounts:[{type:"tipo",price:"precio",percent:"porciento", editing=false}],editing=false},{},{},{}];
        //get will only get the nominas info without the editing value.

        this.editedNomina = "";


        //CRUD OPERATION

        //CREATE
        this.addNomina=function(nomina){
            console.log("add Nomina");
            self.checkNomina(nomina);
            console.log("finish checking");
            self.worker.forEach(function(work) {
                if (work.uniqueValue == self.selectedWorker.uniqueValue) {
                    console.log("finded worker");
                    if (!self.nominaExist){
                        var object = {name:nomina,payments:[],discounts:[],editing:false};
                        work.nomina.push(object);
                        console.log(work);
                        self.selectedWorker = work;
                        self.newNomina = "";
                        self.addingNomina = false;
                        self.updateWorkers();
                    }
                    else{
                        $window.alert("error");
                        self.addingNomina = false;
                    }
                }
            });

        };

        this.checkNomina = function(name){
            console.log("chechking" + name);
            if (name == "" || name == undefined){
                console.log("null content");
                self.nominaExist=true;
                self.addingNomina = false;
            }
            else {
                console.log(name + "algo");
                self.nominaExist = false;
                self.selectedWorker.nomina.forEach(function (element) {
                    if (element.name == name) {
                        self.nominaExist = true;
                        $window.alert("ya existe una nomina con el mismo nombre");
                    }
                });
            }
        };


        //RETURN
        this.getNominas = function(){
            //get nominas from database $http.get operation
        };


        //UPDATE
        this.editNominaToggle = function(nomina){

        };


        this.editNomina = function(nomina){
            self.worker.forEach(function(work){
                if (work == self.selectedWorker){
                    work.nomina.forEach(function(element){
                        if(element.name===nomina.name){
                            element.editing = !element.editing;
                            if (!element.editing){
                                self.checkNomina(self.editedNomina);
                            }
                            if (!self.nominaExist) {
                                if (self.editedNomina != "") {
                                    console.log(self.editedNomina);
                                    element.name = self.editedNomina;
                                    self.updateWorkers();
                                    self.selectedWorker = work;
                                }
                                self.editedNomina = "";
                            }
                        }
                    });
                }
            });
        };

        //REMOVE
        this.removeNomina = function(nomina){
            self.worker.forEach(function(work) {
                if (work.uniqueValue == self.selectedWorker.uniqueValue) {
                   work.nomina.forEach(function(nomina){
                       if (nomina == self.selectedNomina ){
                           self.nominaClicked = false;
                           self.selectedNomina = "";
                       }
                       var newArray=[];
                       work.nomina.forEach(function(element){
                           if (element!=nomina){
                               newArray.push(element);
                           }
                       });
                       work.nomina=[];
                       work.nomina=newArray;
                       self.selectedWorker = work;
                       self.updateWorkers();
                   });
                }
            });
        };

        //Update payment type
        this.addPayment = function(payment){
            self.worker.forEach(function(work) {
                if (work.uniqueValue == self.selectedWorker.uniqueValue) {
                    var add = true;
                    work.nomina.forEach(function(workNomina){
                       if (workNomina == self.selectedNomina){
                           workNomina.payments.forEach(function(element){
                               if (element.type == payment.type){
                                   $window.alert("Ya existe un pago con el mismo nombre");
                                   add = false;
                               }
                           });
                           if (add) {
                               workNomina.payments.push(payment);
                               self.selectedWorker = work;
                               self.updateWorkers();
                           }
                       }
                    });
                }
            });
        };



        this.updatePayment = function(){
            if (!selectedPayment.editing){
                console.log("finish editing");
                //$http post stored payment.
            }
        };

        this.addDiscount = function(discount){
            self.worker.forEach(function(work) {
                if (work.uniqueValue == self.selectedWorker.uniqueValue) {
                    var add = true;
                    work.nomina.forEach(function(workNomina){
                        if (self.selectedNomina == workNomina){
                            workNomina.discounts.forEach(function(element){
                                if (element.type == discount.type){
                                    $window.alert("ya existe un descuento con el mismo nombre");
                                    add = false;
                                }
                            });
                            if (add){
                                workNomina.discounts.push(discount);
                                self.selectedWorker = work;
                                self.updateWorkers();
                            }
                        }
                    });
                }
            });
            self.selectedWorker = work;
            self.updateWorkers();
        };








        var init = function () {
            self.selectedWorker = $localStorage.selectedWorker;
            self.getParams();
            self.getWorkers();
            // check if there is query in url
            // and fire search in case its value is not empty
        };
// and fire it after definition
        init();
    }]);
    app.directive('editNominaValues',function(){
        return{
            restrict:'E',
            templateUrl: "templates/Pagonominas.html",
            controller: "PagoController",
            controllerAs: "pago"
        }
    });
})();
