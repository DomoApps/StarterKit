require('normalize.css/normalize.css');
require('./styles/index.scss');
const DomoPhoenix = require('@domoinc/domo-phoenix');
const domo = require('ryuu.js');

function chartIt(chartType, data, options){
    // Create the Phoenix Chart
    const chart = new DomoPhoenix.Chart(chartType, data, options);

    // Append the canvas element to your app
    document.getElementById('phoenix-chart').appendChild(chart.canvas);

    // Render the chart when you're ready for the user to see it
    chart.render();

    return chart;
}

// Step 1. Set datasetAlias to use the same name in your manifest
const datasetAlias = 'sales';

// Step 2. Set the column "name" and "type" below to columns in your dataset
const columns = [
    {
        type: DomoPhoenix.DATA_TYPE.STRING,
        name: 'Order Priority',
        mapping: DomoPhoenix.MAPPING.SERIES
    },
    {
        type: DomoPhoenix.DATA_TYPE.STRING,
        name: 'Customer Segment',
        mapping: DomoPhoenix.MAPPING.ITEM
    },
    {
        type: DomoPhoenix.DATA_TYPE.DOUBLE,
        name: 'Sales',
        mapping: DomoPhoenix.MAPPING.VALUE
    }
];



// Get and chart the data
let myChart = null;
getData(datasetAlias, columns).catch(displayError).then((data) => {
    if(data){
        // Step 3. Set a chart type using the correct enum: https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties
        const chartType = DomoPhoenix.CHART_TYPE.BAR;

        // Step 4. Set your "Chart Options": https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api
        const options = {
            width: 660,
            height: 450
        }

        const phoenixData = { columns: columns, rows: data };
        myChart = chartIt(chartType, phoenixData, options);
    }
});



// Refresh data on a 15 second interval
const interval = 15000; //15 seconds
setInterval(() => {
    if(myChart && myChart.update){
        getData(datasetAlias, columns).catch(displayError).then((data) => {
            data && myChart.update({ columns: columns, rows: data });
        });
    }
}, interval);




/*/////////////////////////////////////////////////// 
Below are helper functions to make querying and 
charting data with DomoPhoenix easier
///////////////////////////////////////////////////*/
function getData(datasetAlias, columns){
    // Create a query object
    // For a full list of "query operators" see: https://developer.domo.com/docs/dev-studio-references/data-api
    var query = {
        "fields": getColumnNames(columns)
    };

    // Some DataSets are massive and will bring any web browser to its knees if you
    // try to load the entire thing. To keep your app performing optimally, take
    // advantage of filtering, aggregations, and group by's to bring down just the
    // data your app needs. Do not include all columns in your data mapping file,
    // just the ones you need. Setting the limit to 1000 will prevent enormous result
    // sets while you are experimenting.
    return domo.get(makeQueryString(datasetAlias, columns, query) + '&limit=1000');
}

function makeQueryString(datasetAlias, columns, queryObject){
    var query = '/data/v1/' + datasetAlias + '?';

    // Handle date grains
    processGrains(columns, queryObject);

    for(var key in queryObject){
        if (queryObject.hasOwnProperty(key)) {
            var value = queryObject[key];
            if(typeof value === "object" && value.join != null){
                value = value.join(",");
            }
            query += "&" + key + "=" + value;
        }
    }

    return query;
}

function getColumnNames(cols){
    return cols && cols.map(c => c.name);
}

function processGrains(cols, query) {
    const grainColumn = cols && cols.find(c => c.dateGrain != null);
    if(grainColumn){
        query.dategrain = "'" + grainColumn.name + "' by " + grainColumn.dateGrain;
        const groupBys = cols && 
            cols.filter(c => c.type === DomoPhoenix.DATA_TYPE.STRING)
                .map(c => `'${c.name}'`);

        if(groupBys && groupBys.length > 0){
            if(query.groupby != null){
                typeof query.groupby === "string" && (query.groupby = query.groupby.split(","));
                groupBys.forEach(gB => {
                    const withoutParens = gB.replace(/'/g, "");
                    if(query.groupby.indexOf(gB) === -1 && query.groupby.indexOf(withoutParens) === -1){
                        query.groupby.push(gB);
                    }
                });
            }
            else{
                query.groupby = groupBys;
            }
        }
    }
}

function displayError(){
    document.body.appendChild(document.createTextNode('Error getting data'));
}
