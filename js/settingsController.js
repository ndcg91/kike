/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("SettingController",['$http','$location','$window','$timeout','$scope','$localStorage','Worker','Parameter',function($http,$location,$window,$timeout,$scope,$localStorage,Worker,Parameter){
        //$window.localStorage.clear();


        //Variable definition
        /*
            Elements to edit:
                Workers
                    Edit Value and types of values
                Payments
                    Add new payment type, edit payment types, discounts and percents
                Hires
                    Edit text and variables that will be included on hire time
         */


        var self=this; //to access scope within callbacks

        //Control variable
        this.selected = false;
        this.hireShow = false;
        this.name = false;
        this.nominasShow=false;


        /*#################################
        Edit worker section     ~##########
        ################################*/


        this.nameFields = []; // Empty initial fields
        //CRUD Operation

        //CREATE
        this.addWorkerValue = function(value){
            console.log("add param");
            self.selectedInput = null;
            self.addValue = null;
            var newObject = {value:value.value,editing:false,type:value.type};
            self.nameFields.push(newObject);
            Parameter.save(newObject,function(data){
                self.updateParams();
            });
        };


        //RETRIEVE HTTP RETRIEVE TEMPORALLY COMMENTED OUT
        this.getParams = function(){
            console.log("getParamenters");
            Parameter.query(function(data){
                self.nameFields = [];
                console.log(data);
                data.forEach(function(object){
                    self.nameFields.push(object);
                });
                self.nameFields.forEach(function(element){
                    element.editing = false;
                })
            })
        };




        //UPDATE
        this.editName = function(field){
            this.nameFields.forEach(function(element){
                if (element == field){
                    console.log(element.editing);
                    if (element.editing == false){

                        element.editing = true;
                    }
                    else{
                        element.editing = false;
                        Parameter.update(element, function (data) {
                            self.updateParams();
                        });
                    }
                }
            });
        };


        //UPDATE PARAMS TEMPORALLY COMMENTED OUT
        this.updateParams = function(){
            console.log("updating");
            console.log($localStorage.WorkerParams);
            $localStorage.WorkerParams = self.nameFields;
        };
       /* this.updateParams = function(){
            var params=[];
            self.nameFields.forEach(function(field){
                params.push(field.value);
            });
            var parameters={params:params.join("__")};
            $http({
                method:'POST',
                url:'http://128.199.62.16:8080/api/trabajadores/setParams',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: $.param(parameters)
            }).success(function(data){
                self.getParams();
                console.log(data);
            }).error(function(data){
                console.log(data);
            });
        };
        */

        //DELETE HTTP DELETE TEMPORALLY COMMENTED OUT
        this.deleteName = function(name){
            var array = [];
            self.nameFields.forEach(function(element){
                if (element != name){
                    array.push(element);
                }
            });
            self.nameFields = array;
            Parameter.delete({},name,function(data){
                self.updateParams();
            });
        };



        this.inputType = ["text","number","checkbox","date"];


        /*#################################
          END Edit worker section     ~####
         ################################*/

//#########################################################################################
        /*#################################
          Edit Hire section           ~####
         ################################*/

        if ($localStorage.hire == undefined){
            $localStorage.hire = {};
        }
        this.hire= $localStorage.hire;
        this.hire.mode = "Preview";
        this.hire.preview = true;
        this.hire.editing = false;
        this.toggleEdit = function(){
            if (this.hire.mode == "Preview") {
                console.log("changing");
                this.hire.mode = "Editing";
                this.hire.editing = true;
                this.hire.preview = false;
            }
            else{
                this.hire.mode = "Preview";
                this.hire.editing = false;
                this.hire.preview = true;
            }
        };

        this.updateHire = function(){
            self.hire = $localStorage.hire;
            console.log($localStorage.hire);

        };
        this.updateLocalHire = function(){
            $localStorage.hire = self.hire;
            console.log($localStorage.hire);
        };

        this.addHireSection = function(section){

            $localStorage.hire.sections.push(section);
            self.updateHire();
        };

        this.addHireVariable = function(variable){
            if ($localStorage.hire.sections == undefined){
                console.log("section undefined");
                $localStorage.hire.sections == [{variables:[{variable:variable,text:""}]}];
                self.updateHire();
            }
            else{
                console.log("section defined");
                console.log($localStorage.hire);
                var last = $localStorage.hire.sections.length - 1;
                $localStorage.hire.sections[last].variables.push({variable:variable,text:""});
                self.updateHire();
            }

        };

        this.removeHireVariable = function(variable){
            $localStorage.hire.sections.forEach(function(section){
                var sectionArray=[];
               section.variables.forEach(function(element){
                   if (element.variable != variable){
                       sectionArray.push(element);
                   }
               });
                section.variables = sectionArray;
            });
            self.updateHire();
            self.checkEmptySections();
        };

        this.checkEmptySections = function(){
          var array = [];
            $localStorage.hire.sections.forEach(function(element){
                if (element != {variables:[]}){
                    array.push(element);
                }
            });
            $localStorage.hire.sections = array;
            self.updateHire();
        };

        this.checkSection = function(){
          if ($localStorage.hire.sections == undefined){
              $localStorage.hire.sections = [{number:0,name:"Contenedor",variables:[]}];
              self.updateHire();
          }
        };

        this.addVariable = function(value) {
            console.log("adding"  + value.value);
            console.log(self.selectedSession);
            self.hire.sections[self.selectedSession].variables.push({
                variable: value.value,
                text: '',
                centered: false,
                justify: false,
                right: false,
                left: false
            });
            self.sectionSelected = false;
            $localStorage.hire = self.hire;
        };

   //##############################################################################
        /*#################################
         Edit Nomina section           ~####
         ################################*/


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
            self.checkNomina(nomina);
            if (!self.nominaExist){
                var object = {name:nomina,payments:[],discounts:[],editing:false};
                self.nominas.push(object);
                self.newNomina = "";
                self.addingNomina = false;
                self.updateNominas();
            }
        };

        this.checkNomina = function(name){
            if (name==""){
                self.nominaExist=true;
                self.addingNomina = false;
            }
            else {
                self.nominaExist = false;
                self.nominas.forEach(function (element) {
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

        this.updateNominas = function(){
            $localStorage.nominas = self.nominas;
          //http post operation with all data to update remotely the content of self.nominas
        };

        this.editNomina = function(nomina){
          self.nominas.forEach(function(element){
              if(element.name===nomina.name){
                  element.editing = !element.editing;
                  if (!element.editing){
                      self.checkNomina(self.editedNomina);
                  }
                  if (!self.nominaExist) {
                      if (self.editedNomina != "") {
                          console.log(self.editedNomina);
                          element.name = self.editedNomina;
                          self.updateNominas();
                      }
                      self.editedNomina = "";
                  }
              }
          })
        };

        //REMOVE
        this.removeNomina = function(nomina){
            if (nomina == self.selectedNomina ){
                self.nominaClicked = false;
                self.selectedNomina = "";
            }
            var newArray=[];
            self.nominas.forEach(function(element){
                if (element!=nomina){
                    newArray.push(element);
                }
            });
            self.nominas=[];
            self.nominas=newArray;
            self.updateNominas();
        };

        //Update payment type
        this.addPayment = function(payment){
            var add = true;
            self.selectedNomina.payments.forEach(function(element){
               if (element.type == payment.type){
                   $window.alert("Ya existe un pago con el mismo nombre");
                   add = false
               }
            });
            if (add) {
                this.selectedNomina.payments.push(payment);
                self.updateNominas();
            }
        };



        this.updatePayment = function(){
            if (!selectedPayment.editing){
                console.log("finish editing");
                //$http post stored payment.
            }
        };

        this.addDiscount = function(discount){
            var add = true;
            self.selectedNomina.discounts.forEach(function(element){
                if (element.type == discount.type){
                    $window.alert("ya existe un descuento con el mismo nombre");
                    add = false;
                }
            });
            if (add){
                this.selectedNomina.discounts.push(discount);
                self.updateNominas();
            }
        };




        //INITIALIZATION
        var init = function () {
            self.getParams();
            // check if there is query in url
            // and fire search in case its value is not empty
        };
        init();
    }]);
    app.directive('editTrabajadoresValues',function(){
        return{
            restrict: 'E',
            templateUrl: "templates/editTrabajadores.html",
            controller: "SettingController",
            controllerAs: "settings"
        }
    });

    app.directive('editHireValues',function(){
        return{
            restrict:'E',
            templateUrl: "templates/editHire.html",
            controller: "SettingController",
            controllerAs: "settings"
        }
    });
    app.directive('editNominaValues',function(){
        return{
            restrict:'E',
            templateUrl: "templates/nominas.html",
            controller: "SettingController",
            controllerAs: "settings"
        }
    });

})();