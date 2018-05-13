function transDataBasic() {
    var transactionsData = [
        {"name": "Tom", "store": "Acme", "state": "NY", "spend": 100},
        {"name": "Tom", "store": "Big Co.", "state": "NY", "spend": 200},
        {"name": "Bob", "store": "Acme", "state": "FL", "spend": 150},
        {"name": "Bob", "store": "Acme", "state": "NY", "spend": 200},
        {"name": "Bob", "store": "Big Co.", "state": "FL", "spend": 50},
        {"name": "Bob", "store": "Big Co.", "state": "NY", "spend": 75},
        {"name": "Alice", "store": "Acme", "state": "FL", "spend": 200},
        {"name": "Alice", "store": "Big Co.", "state": "NY", "spend": 350},
    ];
    var ndx = crossfilter(transactionsData);
    
    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('spend'));
    
    dc.barChart("#chart-here")
        .width(300)
        .height(150)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(name_dim)
        .group(total_spend_per_person)
        .transitionDuration(500)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Person")
        .yAxis().ticks(4);
    dc.renderAll();
}

function transDataSeparated() {
    var transactionsData = [
        {"name": "Tom", "store": "Acme", "state": "NY", "spend": 100},
        {"name": "Tom", "store": "Big Co.", "state": "NY", "spend": 200},
        {"name": "Bob", "store": "Acme", "state": "FL", "spend": 150},
        {"name": "Bob", "store": "Acme", "state": "NY", "spend": 200},
        {"name": "Bob", "store": "Big Co.", "state": "FL", "spend": 50},
        {"name": "Bob", "store": "Big Co.", "state": "NY", "spend": 75},
        {"name": "Alice", "store": "Acme", "state": "FL", "spend": 200},
        {"name": "Alice", "store": "Big Co.", "state": "NY", "spend": 350},
    ];
    var ndx = crossfilter(transactionsData);
    
    var name_dim = ndx.dimension(dc.pluck('name'));
    var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('spend'));
    
    dc.barChart("#per-person-chart")
        .width(300)
        .height(150)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(name_dim)
        .group(total_spend_per_person)
        .transitionDuration(500)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Person")
        .yAxis().ticks(4);
        
    var store_dim = ndx.dimension(dc.pluck('store'));
    var total_spend_per_store = store_dim.group().reduceSum(dc.pluck('spend'));
    
    dc.barChart("#per-store-chart")
        .width(300)
        .height(150)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(store_dim)
        .group(total_spend_per_store)
        .transitionDuration(500)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Store")
        .yAxis().ticks(4);
        
    var state_dim = ndx.dimension(dc.pluck('state'));
    var total_spend_per_state = state_dim.group().reduceSum(dc.pluck('spend'));
    
    dc.barChart("#per-state-chart")
        .width(300)
        .height(150)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(state_dim)
        .group(total_spend_per_state)
        .transitionDuration(500)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("State")
        .yAxis().ticks(4);
    dc.renderAll();
}

function delayedExternalCharts() {
    queue()
        .defer(d3.json, 'data/transactions.json')
        .await(makeGraphs);
        
    function makeGraphs(error, tdata) {
        var ndx = crossfilter(tdata);
        var name_dim = ndx.dimension(dc.pluck('name'));
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('spend'));
        
        dc.barChart("#delayed-external-chart")
            .width(300)
            .height(150)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(name_dim)
            .group(total_spend_per_person)
            .transitionDuration(500)
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Person")
            .yAxis().ticks(4);
            
        dc.renderAll();
    }
}

function delayedExternalPieCharts() {
    queue()
        .defer(d3.json, 'data/transactions.json')
        .await(makePies);
        
    function makePies(error, tdata) {
        var ndx = crossfilter(tdata);
        var name_dim = ndx.dimension(dc.pluck('name'));
        var total_spend_per_person = name_dim.group().reduceSum(dc.pluck('spend'));
        
        dc.pieChart("#per-person-pie-chart")
            .height(150)
            .radius(90)
            .transitionDuration(500)
            .dimension(name_dim)
            .group(total_spend_per_person);
            
        var store_dim = ndx.dimension(dc.pluck('store'));
        var total_spend_per_store = store_dim.group().reduceSum(dc.pluck('spend'));
        
        dc.pieChart("#per-store-pie-chart")
            .height(150)
            .radius(90)
            .transitionDuration(500)
            .dimension(store_dim)
            .group(total_spend_per_store);
            
        var state_dim = ndx.dimension(dc.pluck('state'));
        var total_spend_per_state = state_dim.group().reduceSum(dc.pluck('spend'));
        
        dc.pieChart("#per-state-pie-chart")
            .height(150)
            .radius(90)
            .transitionDuration(500)
            .dimension(state_dim)
            .group(total_spend_per_state);
            
        dc.renderAll();
    }
}

function delayedExternalLineCharts() {
    queue()
        .defer(d3.json, "data/transactions.json")
        .await(makeGraphs);
        
    function makeGraphs(error, tdata) {
        var ndx = crossfilter(tdata);
        var parseDate = d3.timeParse("%d/%m/%Y");
        
        tdata.forEach(function(d){
            d.date = parseDate(d.date);
        });
        
        var date_dim = ndx.dimension(dc.pluck('date'));
        var total_spend_per_date = date_dim.group().reduceSum(dc.pluck('spend'));
        var minDate = date_dim.bottom(1)[0].date;
        var maxDate = date_dim.top(1)[0].date;
        
        dc.lineChart("#spend-per-month")
            .width(1000)
            .height(300)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(date_dim)
            .group(total_spend_per_date)
            .transitionDuration(500)
            .x(d3.scaleTime().domain([minDate,maxDate]))
            .xAxisLabel("Month")
            .yAxis().ticks(4);
            
        dc.renderAll();
    }
}

function delayedExternalCompositeCharts() {
    queue()
        .defer(d3.json, "data/transactions.json")
        .await(makeGraphs);
        
    function makeGraphs(error, tdata) {
        var ndx = crossfilter(tdata);
        var parseDate = d3.timeParse("%d/%m/%Y");
        
        tdata.forEach(function(d){
            d.date = parseDate(d.date);
        });
        
        var date_dim = ndx.dimension(dc.pluck('date'));
        var minDate = date_dim.bottom(1)[0].date;
        var maxDate = date_dim.top(1)[0].date;
        
        var tomSpendByMonth = date_dim.group().reduceSum(function (d) {
                if (d.name === 'Tom') {
                    return +d.spend;
                } else {
                    return 0;
                }
            });
        var bobSpendByMonth = date_dim.group().reduceSum(function (d) {
            if (d.name === 'Bob') {
                return +d.spend;
            } else {
                return 0;
            }
        });
        var aliceSpendByMonth = date_dim.group().reduceSum(function (d) {
            if (d.name === 'Alice') {
                return +d.spend;
            } else {
                return 0;
            }
        });
        var compositeChart = dc.compositeChart('#composite-line-chart');
        compositeChart
            .width(1000)
            .height(300)
            .dimension(date_dim)
            .x(d3.scaleTime().domain([minDate, maxDate]))
            .yAxisLabel("Spend")
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .renderHorizontalGridLines(true)
            .compose([
                dc.lineChart(compositeChart)
                    .colors('green')
                    .group(tomSpendByMonth, 'Tom'),
                dc.lineChart(compositeChart)
                    .colors('red')
                    .group(bobSpendByMonth, 'Bob'),
                dc.lineChart(compositeChart)
                    .colors('blue')
                    .group(aliceSpendByMonth, 'Alice')
            ])
            .brushOn(false)
            .render();
            
        dc.renderAll();
    }
}

$(document).ready(function() {
    transDataBasic();
    transDataSeparated();
    delayedExternalCharts();
    delayedExternalPieCharts();
    delayedExternalLineCharts();
    delayedExternalCompositeCharts();
});