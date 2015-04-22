'use strict';

angular.module('frontendApp')
	.directive('analyze', ['$window', '$timeout',
		function($window, $timeout) {
			return {
				restrict: 'E',
				replace: true,
				controller: 'AnalyzeCtrl',
				link: function(scope, ele, attrs) { 
	      			scope.chartType = 'Stacked';

					var margin = {top: 10, right: 10, bottom: 30, left: 10},
					    width = 760 - margin.left - margin.right,
					    height = 300 - margin.top - margin.bottom;

					var x = d3.scale.ordinal()
					    .domain(d3.range(scope.tableData.m))
					    .rangeRoundBands([0, width], .1);

					scope.y = d3.scale.linear()
					    .domain([0, scope.tableData.yStackMax])
					    .range([height, 0]);

					var color = d3.scale.category20();
						// d3.scale.linear()
					 //    .domain([0, scope.tableData.n - 1])
					 //    .range(["#1ad", "#a56"]);

					var xAxis = d3.svg.axis()
					    .scale(x)
					    .tickSize(0)
					    .tickPadding(6)
					    .orient("bottom");

			      	var svg = d3.select(ele[0])
			      		.append("svg")
					    .attr("width", width + margin.left + margin.right)
					    .attr("height", height + margin.top + margin.bottom)
					    .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					var layer = svg.selectAll(".layer")
					    .data( scope.tableData.layers )
						.enter()
						.append("g")
					    .attr("class", "layer")
					    .style("fill", function(d, i) { return color(i); });


					scope.rect = layer.selectAll("rect")
					    .data(function(d) {
					    	return d;
					    })
						.enter()
						.append("rect")
					    .attr("x", function(d) {
					    	return x(d.x);
					    })
					    .attr("y", height)
					    .attr("width", x.rangeBand())
					    .attr("height", 0);

					scope.rect.transition()
					    .delay(function(d, i) { return i * 10; })
					    .attr("y", function(d) { return scope.y(d.y0 + d.y); })
					    .attr("height", function(d) { return scope.y(d.y0) - scope.y(d.y0 + d.y); });

				    // TODO: add timestamp here instead
					svg.append("g")
					    .attr("class", "x axis")
					    .attr("transform", "translate(0," + height + ")")
					    .call(xAxis);
					
					function transitionGrouped() {
						scope.y.domain([0, scope.tableData.yGroupMax]);

						scope.rect.transition()
						.duration(500)
						.delay(function(d, i) { return i * 10; })
						.attr("x", function(d, i, j) { return x(d.x) + 
							x.rangeBand() / scope.tableData.n * j; })
						.attr("width", x.rangeBand() / scope.tableData.n)
						.transition()
						.attr("y", function(d) { return scope.y(d.y); })
						.attr("height", function(d) { return height - scope.y(d.y); });
					}

					function transitionStacked() {
						scope.y.domain([0, scope.tableData.yStackMax]);

						scope.rect.transition()
							.duration(500)
							.delay(function(d, i) { return i * 10; })
							.attr("y", function(d) { return scope.y(d.y0 + d.y); })
							.attr("height", function(d) { return scope.y(d.y0) - scope.y(d.y0 + d.y); })
							.transition()
							.attr("x", function(d) { return x(d.x); })
							.attr("width", x.rangeBand());
					}

					scope.$watch( 'chartType', function( newVal ) {
						if (newVal == 'Grouped') {
							transitionGrouped();
						} else {
							transitionStacked();
						}
					} );
					function todo (argument) {
				// d3.selectAll("input").on("change", change);

				

			}
				
	      $window.onresize = function() {
	        scope.$apply();
	      };

	      scope.$watch(function() {
	        return angular.element($window)[0].innerWidth;
	      }, function() {
	        scope.render(scope.data);
	      });

	      scope.$watch('data', function(newData) {
	        scope.render(newData);
	      }, true);

	    scope.render = function(data) {
        }
      }}
}])