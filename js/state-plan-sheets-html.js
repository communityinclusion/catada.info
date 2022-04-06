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
jQuery.noConflict();
jQuery(document).ready(function() {
  if(!jQuery("#introDiv").hasClass('tableDisplay'))jQuery("#introDiv").addClass('tableDisplay');

  if (window.location.href.indexOf("state-plan-data/") > -1) {
  var tableHash = window.location.hash.substr(1) ? window.location.hash.substr(1) : '' ;


    if(tableHash.length > 0) {

      var url = '#' + tableHash;
      window.location = url;
      jQuery('#tableDiv > div.displayToggle').removeClass("tableDisplay");
      jQuery('#tableDiv > ' + url + 'container').addClass("tableDisplay");

    }
  }
    jQuery("#tableSelector").submit(function(event){
        event.preventDefault();
    });
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
        visualization = new google.visualization.Table(document.getElementById('table01'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted blankhed"></th><th class="google-visualization-table-th gradient unsorted blankhed"></th></tr>';
        var tackon = jQuery('#table01').find('thead').prepend(tablehead);
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
        visualization = new google.visualization.Table(document.getElementById('table02'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted blankhed"></th><th class="google-visualization-table-th gradient unsorted blankhed"></th></tr>';
        var stuff = jQuery('#table02').find('thead').prepend(tablehead);

    }
    function drawChart3() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1512482700&headers=2&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E, F, G, H label A "State", B "Cash Loan", C "Other Provider", D "Other Save", E "Exchange", F "Refurbish", G "Device Loan Activities", H "Device Demo Activities"');
        query.send(handleQueryResponse3);
    }

    function handleQueryResponse3(response) {
        if (response.isError()) {
            alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        var data = response.getDataTable();
        visualization = new google.visualization.Table(document.getElementById('table03'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });

        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted blankhed"></th><th class="google-visualization-table-th gradient unsorted blankhed"></th></tr>';
        var stuff = jQuery('#table03').find('thead').prepend(tablehead);
    }
    function drawChart4() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=796274859&headers=3&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E, F, G, H, I label A "data field type", B "check mark or NA", C "check mark or NA", D "check mark or NA", E "check mark or NA", F "XX.XX percent", G "XX.XX percent", H "dollar amount", I "dollar amount"');
        query.send(handleQueryResponse4);
    }

    function handleQueryResponse4(response) {
        if (response.isError()) {
            alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        var data = response.getDataTable();
        visualization = new google.visualization.Table(document.getElementById('table04'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="4">Loan Type(s)</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2">Interest Policy</th><th class="google-visualization-table-th gradient unsorted tblhed3" colspan="2">Amount Policy</th></tr><tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted row2odd" >State</th><th class="google-visualization-table-th gradient unsorted row2even" >Revolving</th><th class="google-visualization-table-th gradient unsorted row2odd" >Guarantee</th><th class="google-visualization-table-th gradient unsorted row2even" >Buy Down</th><th class="google-visualization-table-th gradient unsorted row2odd" >Both</th><th class="google-visualization-table-th gradient unsorted row2even" >Low</th><th class="google-visualization-table-th gradient unsorted row2odd" >High</th><th class="google-visualization-table-th gradient unsorted row2even" >Low</th><th class="google-visualization-table-th gradient unsorted row2odd" >High</th></th><</tr>';
        var insertit = jQuery('#table04').find('thead').prepend(tablehead);
    }
    function drawChart5() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1476775117&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E, F, G, H, I, J label A " ", B "Telecom EDP", C "DB Telecom EDP", D "Last Resort Fund", E "Home Mod Program", F "Other w Description", G "Cooperative Buying Program", H "AT Leasing Program", I "AT Fabrication Program", J "Other w Description" ');
        query.send(handleQueryResponse5);
    }

    function handleQueryResponse5(response) {
        if (response.isError()) {
            alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        var data = response.getDataTable();
        visualization = new google.visualization.Table(document.getElementById('table05'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted tblhed1" >State</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="5">State Financing Activities Directly Providing AT</th><th class="google-visualization-table-th gradient unsorted tblhed3" colspan="4">State Financing Activities Create Savings</th></tr>';
        var insert = jQuery('#table05').find('thead').prepend(tablehead);
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
        visualization = new google.visualization.Table(document.getElementById('table06'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
    }

    function drawChart7() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1608376186&headers=2&usp=sharing');
        query.setQuery('SELECT A, B, C label A "State", B "Drop/Ship", C "Pick-up/deliver"');
        query.send(handleQueryResponse7);
    }

    function handleQueryResponse7(response) {
        if (response.isError()) {
            alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        var data = response.getDataTable();
        visualization = new google.visualization.Table(document.getElementById('table07'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="2">Device Loan</th></tr>';
        var insert = jQuery('#table07').find('thead').prepend(tablehead);
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
        visualization = new google.visualization.Table(document.getElementById('table08'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
    }

    function drawChart9() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=414645865&headers=1&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E, F, G, H, I, J label A "State", B "Home", C "Cash Loan", D "SFA-Provide", E "SFA-Savings", F "Exchange", G "Refurbish", H "Device Loan", I "Demo", J "Training"');
        query.send(handleQueryResponse9);
    }

    function handleQueryResponse9(response) {
        if (response.isError()) {
            alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        var data = response.getDataTable();
        visualization = new google.visualization.Table(document.getElementById('table09'));
        visualization.draw(data, {
            allowHtml: true,
            legend: 'bottom'
        });
    }

    function drawChart10() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1968385764&headers=1&usp=sharing');
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

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1179168944&headers=2&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E, F, G, H, I, J label A " ", B "State", C "Other", D "Both", E " ", F "Central", G "Regional", H "Both", I " ", J " "');
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
        var tablehead ='<tr class="google-visualization-table-tr-head"><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3" >Percent of Grantees who conduct this activity themselves or via others</th><th class="google-visualization-table-th gradient unsorted blankhed" ></th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="3">% grantees who operate activity in different locations</th><th class="google-visualization-table-th gradient unsorted blankhed"></th><th class="google-visualization-table-th gradient unsorted tblhed3">Percent who charge fee for activity</th></tr>';
        var insert = jQuery('#table11').find('thead').prepend(tablehead);
    }
    jQuery(".tableChanger").click(

      function()
      {
          var tableId = jQuery(this).attr('id').substring(0,7);
          var url = '#' + tableId;
           window.location = url;
          jQuery('#tableDiv > div.displayToggle').removeClass("tableDisplay");
          //jQuery('#stateHolder > div').addClass("phpfix");
          jQuery('#tableDiv #' + tableId + 'container.displayToggle').addClass("tableDisplay");

          // jQuery('#stateHolder #' + stateId).removeClass("phpfix");
          jQuery('html, body').animate({
                          scrollTop: jQuery("#tableDiv").offset().top
                      }, 200);
          return false;
      }
    );
    jQuery("#clearForm").click(

      function()
      {
        jQuery('#tableDiv > div.displayToggle').removeClass("tableDisplay");
        if(!jQuery("#introDiv").hasClass('tableDisplay'))jQuery("#introDiv").addClass('tableDisplay');


      }
    )
});
