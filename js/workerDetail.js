var app = angular.module("Balance");
app.controller('WorkerController', ['$scope', '$routeParams','Worker','Parameter',
  function($scope, $routeParams, Worker, Parameter) {
    var workerID = $routeParams.workerID;
    
     Worker.get({},{'id':workerID},function(data){
	console.log(data);
	var w = data.trabajador;
	w.id = data._id;
	$scope.worker = w;
     });
  }]);
