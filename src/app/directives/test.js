angular.module('app.test', [])
  .directive('test', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        var margin = parseInt(attrs.margin, 10) || 20;
        var barHeight = parseInt(attrs.barHeight, 10) || 20;
        var barPadding = parseInt(attrs.barPadding, 10) || 5;

        var svg = d3.select(element[0])
          .append('svg')
          .style('width', '100%');

          // hard-code data
          scope.data = [
            {name: "Greg", score: 98},
            {name: "Ari", score: 96},
            {name: 'Q', score: 75},
            {name: "Loser", score: 48}
          ];

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.render = function(data) {
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) {
              return;
            }

            // setup variables
            var width = d3.select(element[0]).node().offsetWidth - margin,
                // calculate the height
                height = scope.data.length * (barHeight + barPadding),
                // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
                // our xScale
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.score;
                  })])
                  .range([0, width]);

            // set the height based on the calculations above
            svg.attr('height', height);

            var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
              { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
              { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

            var lineData2 = [ {x: 1, y: 1}, {x: 50, y: 50} ];
                  
            var lineFunction = d3.svg.line()
              .x(function(d) { return d.x; })
              .y(function(d) { return d.y; })
              .interpolate("basis");

            var lineGraph = svg.append("path")
              .attr("d", lineFunction(lineData2))
              .attr("stroke", "blue")
              .attr("stroke-width", 2)
              .attr("fill", "none");


        };
      });
    }};
  }]);
