var app = angular.module("Balance");
app.controller('WorkerController', ['$scope', '$routeParams', 'Worker', 'Parameter',
  function($scope, $routeParams, Worker, Parameter) {
    var workerID = $routeParams.workerID;
    $scope.filas = [{number:1,columnas:[{value:1},{value:2}]},{number:2,columnas:[{value:1},{value:2}]}]
    Worker.get({},{'id':workerID},function(data){
	   console.log(data);
	   var w = data.trabajador;
	   w.id = data._id;
	   $scope.worker = w;
    });
    Parameter.query(function(data){
        $scope.parameters = data;
    })
  }]);