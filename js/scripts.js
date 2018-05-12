function createCircles() {
    // These height/width measurements represent the height/width of the SVG viewport
    var w = 500;
    var h = 200;
    var data = [40, 50, 10, 30, 10];
    
    var svg = d3.select('#d3-circles')
        .append('svg')
        .attr('width', w)
        .attr('height', h);
        
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d, i) {
            return 50 + (i * 100);
        })
        .attr('cy', h / 2)
        .attr('r', function(d) {
            return d;
        });    
}

function createBarChart() {
    // These height/width measurements represent the height/width of the SVG viewport
    var w = 500;
    var h = 500;
    var barPadding = 1;
    var dataset = [
        450, 100, 100, 279, 500, 25, 350, 120, 80, 130,
        110, 102, 375, 200, 175, 168, 180, 230, 205,
    ];
    
    var colWidth = w/dataset.length;
    var barWidth = colWidth - barPadding;
    
    var svg = d3.select("#d3-barchart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr('fill', 'darkred')
        .attr("x", function(d, i) {
            return i * colWidth;
        })
        .attr("y", function(d) {
            return h - d;
        })
        .attr("width", barWidth)
        .attr("height", function(d) {
            return d;
        });
        
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return i * colWidth + barWidth / 2;
        })
        .attr("y", function(d) {
            return h - d + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
}

$(document).ready(function() {
    createCircles();
    createBarChart();
});

