/*!
 *
 * Google Sheets To HTML v0.9b
 *
 * To use, simply replace the "tq?key=" value in the
 * URL below with your own unique Google document ID
 *
 * The Google document's sharing must be set to public
 *
 */

google.charts.load('current', {packages: ['table']});


google.setOnLoadCallback(drawChart1);
google.setOnLoadCallback(drawChart2);
google.setOnLoadCallback(drawChart3);
var visualization;
function drawChart1() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=841955333&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H label A "State", B "Cash Loan", C "Other Provider", D "Other Save", E "Exchange", F "Refurbish", G "Device Loan Activities", H "Device Demo Activities"');
    query.send(handleQueryResponse1);
}

function handleQueryResponse1(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table1'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}
function drawChart2() {
  var visualization;
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=293649242&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H label A "State", B "Cash Loan", C "Other Provider", D "Other Save", E "Exchange", F "Refurbish", G "Device Loan Activities", H "Device Demo Activities"');
    query.send(handleQueryResponse2);
}

function handleQueryResponse2(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table2'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}
function drawChart3() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1512482700&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H label A "State", B "Cash Loan", C "Other Provider", D "Other Save", E "Exchange", F "Refurbish", G "Device Loan Activities", H "Device Demo Activities"');
    query.send(handleQueryResponse3);
}

function handleQueryResponse3(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table3'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}
