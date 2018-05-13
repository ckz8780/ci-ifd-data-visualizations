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

function createBarChartWithScale() {
    // These height/width measurements represent the height/width of the SVG viewport
    var w = 500;
    var h = 500;
    var barPadding = 1;
    var dataset = [
        450, 100, 100, 750, 500, 25, 350, 120, 80, 130,
        110, 102, 375, 200, 175, 168, 180, 230, 205,
    ];
    
    // Here we set a scale to allow values that expand outside the viewport.
    var scale = d3.scaleLinear()
                        .domain([0, d3.max(dataset)])
                        .range([0, h]);
                        
    var colWidth = w/dataset.length;
    var barWidth = colWidth - barPadding;
    
    var svg = d3.select("#d3-scale-barchart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr('fill', 'purple')
        .attr("x", function(d, i) {
            return i * colWidth;
        })
        .attr("y", function(d) {
            return h - scale(d);
        })
        .attr("width", barWidth)
        .attr("height", function(d) {
            return scale(d);
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
            return h - scale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
}

function createBarChartSquashed() {
    // These height/width measurements represent the height/width of the SVG viewport
    var w = 500;
    var h = 200;
    var barPadding = 1;
    var dataset = [
        450, 100, 100, 750, 500, 25, 350, 120, 80, 130,
        110, 102, 375, 200, 175, 168, 180, 230, 205,
    ];
    
    // Here we set a scale to allow values that expand outside the viewport.
    var scale = d3.scaleLinear()
                        .domain([0, d3.max(dataset)])
                        .range([0, h]);
                        
    var colWidth = w/dataset.length;
    var barWidth = colWidth - barPadding;
    
    var svg = d3.select("#d3-scale-barchart-squashed")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr('fill', 'darkgreen')
        .attr("x", function(d, i) {
            return i * colWidth;
        })
        .attr("y", function(d) {
            return h - scale(d);
        })
        .attr("width", barWidth)
        .attr("height", function(d) {
            return scale(d);
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
            return h - scale(d) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");
}

/*------------------------------------------------INTERACTIVE CHART FUNCTIONALITY:*/

function createInteractiveChart() {
    
    // Chart setup:
    var w = 500;
    var h = 500;
    var barPadding = 1;
    var numberOfBars = 19;
    
    var colWidth = w/numberOfBars;
    var barWidth = colWidth - barPadding;
    
    var svg = d3.select('#d3-interactive')
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .attr('fill', 'blue');
                
    // Plot the initial chart
    change_data();
    
    // Generate a random set of data for the first chart
    function change_data() {
        var data = generate_random_data(numberOfBars);
        plot_data(data);
    }
    
    change_data(); // Why does this need to be here twice???
    
    // Generate random data and then filter it before plotting
    function filter_data() {
        var data = generate_random_data(numberOfBars);
        data = data.filter(function(d) {
            return d >= get_filter_value();
        });
        plot_data(data);
    }
    
    // Plot the actual data
    function plot_data(data) {
        // Bind the data to the collections of rectangles and text in the svg element
        var bars = svg.selectAll("rect")
                    .data(data);
        var labels = svg.selectAll("text")
                    .data(data);
        
        // Remove any unneeded rectangles and labels (if new data has less items than the existing chart)
        bars.exit().remove();
        labels.exit().remove();
        
        // Append any new rectangles and labels that are needed (if new data has more items than existing chart)
        create_bars(bars);
        create_labels(labels);
        
        // There should now be the right number of rectangles and labels. 
        // Resize and position each one according to the new data items.
        resize_bars(bars, data);
        position_labels(labels, data);        
    }
    
    // Append the bars to the SVG viewport
    function create_bars(bars) {
        bars.enter()
            .append('rect');
    }
    
    // For bar resizing 
    function resize_bars(bars, data) {
        bars.transition()
            .duration(500)
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
    } 
    
    // Create bar labels
    function create_labels(labels) {
        labels.enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");
    }
    
    // Position the labels on the bars
    function position_labels(labels, data) {
        labels.transition()
            .duration(500)
            .text(function(d) {
                return d;
            })
            .attr("x", function(d, i) {
                return i * colWidth + barWidth / 2;
            })
            .attr("y", function(d) {
                return h - d + 14;
            });
    }
    
    // Randomly generate some data for the chart
    function generate_random_data(n) {
        var data = [];
        for(var i=0; i<n; i++) {
            var value = Math.floor((Math.random() * 500) + 1);
            data.push(value);
        }
        return data;
    }
    
    // Get the value for filtering the data
    function get_filter_value() {
        var value = null;
        var x = $('#filter_value').value;
        value = parseInt(x);
        if(isNaN(value)) {
            value=100;
        }
        return value;
    }
    
    // Button functionality
    $('#change_data').click(function() {
        change_data();
    });
    
    $('#filter_data').click(function() {
        filter_data();
    });
}

$(document).ready(function() {
    createCircles();
    createBarChart();
    createBarChartWithScale();
    createBarChartSquashed();
    createInteractiveChart();
});

