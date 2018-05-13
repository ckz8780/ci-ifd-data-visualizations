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

$(document).ready(function() {
    transDataBasic();
    transDataSeparated();
});