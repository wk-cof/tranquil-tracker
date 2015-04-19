'use strict';

angular.module('frontendApp')
  .controller('AnalyzeCtrl',  [ 'd3Service', function (d3Service) {
    d3Service.d3().then(function(d3) {
		var x = d3;
	});
  } ] );
