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
google.setOnLoadCallback(drawChart4);
google.setOnLoadCallback(drawChart5);
google.setOnLoadCallback(drawChart6);
google.setOnLoadCallback(drawChart7);
google.setOnLoadCallback(drawChart8);
google.setOnLoadCallback(drawChart9);
google.setOnLoadCallback(drawChart10);
google.setOnLoadCallback(drawChart11);
var visualization;
function drawChart1() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=841955333&headers=2&usp=sharing');
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
    var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tbl1hed1" colspan="3">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tbl1hed2" colspan="2">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted blankhed"></th><th class="google-visualization-table-th gradient unsorted blankhed"></th></tr>';
    var tackon = jQuery('#table1').find('thead').prepend(tablehead);
}
function drawChart2() {
  var visualization;
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=293649242&headers=2&usp=sharing');
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
    var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tbl2hed1" colspan="3">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tbl2hed2" colspan="2">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted blankhed"></th><th class="google-visualization-table-th gradient unsorted blankhed"></th></tr>';
    var stuff = jQuery('#table2').find('thead').prepend(tablehead);

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
function drawChart4() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=796274859&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H, I');
    query.send(handleQueryResponse4);
}

function handleQueryResponse4(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table4'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}
function drawChart5() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1476775117&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H, I, J label A "State", B "Telecom EDP", C "DB Telecom EDP", D "Last Resort Fund", E "Home Mod Program", F "Other w Description", G "Cooperative Buying Program", H "AT Leasing Program", I "AT Fabrication Program", J "Other w Description" ');
    query.send(handleQueryResponse5);
}

function handleQueryResponse5(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table5'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}

function drawChart6() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=174046287&usp=sharing');
    query.setQuery('SELECT A label A "No data"');
    query.send(handleQueryResponse6);
}

function handleQueryResponse6(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table6'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}

function drawChart7() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1608376186&usp=sharing');
    query.setQuery('SELECT A, B, C label A "State", B "Drop/Ship", C "Pick-up/deliver"');
    query.send(handleQueryResponse7);
}

function handleQueryResponse7(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table7'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}

function drawChart8() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=245703250&usp=sharing');
    query.setQuery('SELECT A label A "No data"');
    query.send(handleQueryResponse8);
}

function handleQueryResponse8(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table8'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}

function drawChart9() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=414645865&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H, I, J label A "State", B "Home", C "Cash Loan", D "SFA-Provide", E "SFA-Savings", F "Exchange", G "Refurbish", H "Device Loan", I "Demo", J "Training"');
    query.send(handleQueryResponse9);
}

function handleQueryResponse9(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table9'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}

function drawChart10() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1968385764&usp=sharing');
    query.setQuery('SELECT A, B, C label A "State", B "Implementing State AT Program", C "Lead Agency (if different)"');
    query.send(handleQueryResponse10);
}

function handleQueryResponse10(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table10'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}

function drawChart11() {

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=0&usp=sharing');
    query.setQuery('SELECT A, B, C, D, E, F, G, H, I, J label A "", B "State", C "Other", D "Both", E "", F "Central", G "Regional", H "Both", I "", J "Training"');
    query.send(handleQueryResponse11);
}

function handleQueryResponse11(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table11'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom'
    });
}
