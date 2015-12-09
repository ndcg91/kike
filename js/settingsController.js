/**
 * Created by noel on 07/12/2015.
 */
(function(){
    var app = angular.module("Balance");
    app.controller("SettingController",['$http','$location','$window','$timeout','$scope',function($http,$location,$window,$timeout,$scope){
        //$window.localStorage.clear();
        var self=this; //to access scope within callbacks
        this.selected = false;
        this.name = false;
        this.nameFields = [{value:"Nombre",decoration:"perm_identity",editing:false},
            {value:"Apellidos",decoration:"perm_identity",editing:false},
            {value:"DNI",decoration:"perm_identity",editing:false}
        ];
        this.editName = function(field){
            this.nameFields.forEach(function(element){
                if (element == field){
                    if (element.editing == false){
                        element.editing = true;
                    }
                    else{
                        element.editing = false;
                    }
                }
            });
        };

        this.deleteName = function(name){
            console.log("deleting");
        }
    }]);
    app.directive('editTrabajadoresValues',function(){
        return{
            restrict: 'E',
            templateUrl: "templates/editTrabajadores.html",
            controller: "SettingController",
            controllerAs: "settings"
        }
    });
})();