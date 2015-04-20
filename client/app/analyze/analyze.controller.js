'use strict';

angular.module('frontendApp')
  .controller('AnalyzeCtrl',  [ '$scope', function ($scope) {
      	// Inspired by Lee Byron's test data generator.
		var  bumpLayer = function (n, o) {

		  function bump(a) {
		    var x = 1 / (.1 + Math.random()),
		        y = 2 * Math.random() - .5,
		        z = 10 / (.1 + Math.random());
		    for (var i = 0; i < n; i++) {
		      var w = (i / n - y) * z;
		      a[i] += x * Math.exp(-w * w);
		    }
		  }

		  var a = [], i;
		  for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
		  for (i = 0; i < 5; ++i) bump(a);
		  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
		};

      	// $scope.greeting = "Resize the page to see the re-rendering";
	    var n = 4, // number of layers
		    m = 58, // number of samples per layer
		    stack = d3.layout.stack(),
		    layers = stack(d3.range(n).map( function() { 
		    	return bumpLayer(m, .1); 
		    })),
		    yGroupMax = d3.max(layers, function(layer) {
		    	return d3.max(layer, function(d) {
		    		return d.y;
		    	});
		    }),
		    yStackMax = d3.max(layers, function(layer) {
		    	return d3.max(layer, function(d) {
		    		return d.y0 + d.y;
		    	});
		    });
		$scope.tableData = {
			n: n,
			m: m,
			stack: stack,
			layers: layers,
			yGroupMax: yGroupMax,
			yStackMax: yStackMax
		};
  } ] );
