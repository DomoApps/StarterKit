require('normalize.css/normalize.css');
require('./styles/index.scss');
const DomoPhoenix = require('@domoinc/domo-phoenix');

function chartIt(chartType, data, options){
    // Create the Phoenix Chart
    const chart = new DomoPhoenix.Chart(chartType, data, options);

    // Append the canvas element to your app
    document.getElementById('phoenix-chart').appendChild(chart.canvas);

    // Render the chart when you're ready for the user to see it
    chart.render();

    return chart;
}

//// Start Sample Chart
const data = {
    // This is the data you get back from the Domo Data API
    rows: [
        ['Low', 'Corporate', 8582.8875],
        ['High', 'Home Office', 14415.941],
        ['Low', 'Consumer', 1264.8215],
        ['Medium', 'Small Business', 21478.799],
        ['Critical', 'Consumer', 2621.97],
        ['Not Specified', 'Consumer', 2211.31],
        ['Critical', 'Corporate', 10087.1315],
        ['Not Specified', 'Corporate', 4407.138],
        ['High', 'Consumer', 11667.366],
        ['High', 'Corporate', 19503.323],
        ['Low', 'Small Business', 1735.3715],
        ['Low', 'Home Office', 10057.42],
        ['Medium', 'Home Office', 7691.02],
        ['Critical', 'Small Business', 4036.064],
        ['Not Specified', 'Small Business', 84.99],
        ['High', 'Small Business', 689.74],
        ['Critical', 'Home Office', 7416.828],
        ['Not Specified', 'Home Office', 1839.26],
        ['Medium', 'Consumer', 4280.034],
        ['Medium', 'Corporate', 7965.238]
    ],
    // You provide the names, types, and mappings of your ordered columns
    columns: [
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
    ]
};
const chartType = DomoPhoenix.CHART_TYPE.BAR;
const options = {
    width: 660,
    height: 450
}
chartIt(chartType, data, options);
//// End Sample Chart

