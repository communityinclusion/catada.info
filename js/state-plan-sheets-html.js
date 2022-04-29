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
      if(!jQuery('#tableDiv > ' + url + 'container').hasClass("tableDisplay")) jQuery('#tableDiv > ' + url + 'container').addClass("tableDisplay");
      if(!jQuery('#tableSelector button' + url + '_jump').hasClass('active')) jQuery('#tableSelector button' + url + '_jump').addClass('active');

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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3" scope="colgroup">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2" scope="colgroup">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted tanHed" rowspan="2" scope="col">Device Loan Activities</th><th class="google-visualization-table-th gradient unsorted dkBlueHed" scope="col" rowspan="2">Device Demo Activities</th></tr><tr><th class="google-visualization-table-th gradient row2odd" scope="col">Cash Loan</th><th class="google-visualization-table-th gradient row2even" scope="col">Other Provider</th><th class="google-visualization-table-th gradient row2odd" scope="col">Other Save</th><th class="google-visualization-table-th gradient row2even" scope="col">Exchange</th><th class="google-visualization-table-th gradient row2odd" scope="col">Refurbish</th></tr>';
        var capon = jQuery('#table01').find('table').prepend('<caption>Who conducts activities<p class="notesLink"><a href="#table01legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="3"></colgroup><colgroup span="2"></colgroup><col><col>');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3" scope="colgroup">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2" scope="colgroup">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted tanHed" rowspan="2" scope="col">Device Loan Activities</th><th class="google-visualization-table-th gradient unsorted dkBlueHed" scope="col" rowspan="2">Device Demo Activities</th></tr><tr><th class="google-visualization-table-th gradient row2odd" scope="col">Cash Loan</th><th class="google-visualization-table-th gradient row2even" scope="col">Other Provider</th><th class="google-visualization-table-th gradient row2odd" scope="col">Other Save</th><th class="google-visualization-table-th gradient row2even" scope="col">Exchange</th><th class="google-visualization-table-th gradient row2odd" scope="col">Refurbish</th></tr>';
        var capon = jQuery('#table02').find('table').prepend('<caption>Where are activities conducted<p class="notesLink"><a href="#table02legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="3"></colgroup><colgroup span="2"></colgroup><col><col>');
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
            legend: { position: 'top', alignment: 'start' }

        });

        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" scope="col" rowspan="2">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3" scope="colgroup">State Financing Activities</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2" scope="colgroup">Reuse Activities</th><th class="google-visualization-table-th gradient unsorted tanHed" scope="col" rowspan="2">Device Loan Activities</th><th class="google-visualization-table-th gradient unsorted dkBlueHed" scope="col" rowspan="2">Device Demo Activities</th></tr><tr><th class="google-visualization-table-th gradient row2odd" scope="col">Cash Loan</th><th class="google-visualization-table-th gradient row2even" scope="col">Other Provider</th><th class="google-visualization-table-th gradient row2odd" scope="col">Other Save</th><th class="google-visualization-table-th gradient row2even" scope="col">Exchange</th><th class="google-visualization-table-th gradient row2odd" scope="col">Refurbish</th></tr>';
        var capon = jQuery('#table03').find('table').prepend('<caption>Fee charged<p class="notesLink"><a href="#table03legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="3"></colgroup><colgroup span="2"></colgroup><col><col>');
        var stuff = jQuery('#table03').find('thead').prepend(tablehead);
    }
    function drawChart4() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=796274859&headers=2&usp=sharing');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2" scope="col">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="4" scope="colgroup">Loan Type(s)</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2" scope="colgroup">Interest Policy</th><th class="google-visualization-table-th gradient unsorted tblhed3" colspan="2" scope="colgroup">Amount Policy</th></tr><tr><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Revolving</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Guarantee</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Buy Down</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Both</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Lowest</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Highest</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Lowest</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Highest</th></th></tr>';
        var capon = jQuery('#table04').find('table').prepend('<caption>Cash loan operations<p class="notesLink"><a href="#table04legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="4"></colgroup><colgroup span="2"></colgroup><colgroup span="2"></colgroup>');
        var insertit = jQuery('#table04').find('thead').prepend(tablehead);
    }
    function drawChart5() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&headers=2&gid=1476775117&usp=sharing');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2" scope="col">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="5" scope="colgroup">State Financing Activities Directly Providing AT</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="4" scope="colgroup">State Financing Activities Create Savings</th></tr><tr><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Telecom Equipment Distribution Program</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Deaf-Blind Telecom Equipment Distribution Program</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Last Resort Fund</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Home Mod Program</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Other w/ Description</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Cooperative Buying Program</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">AT Leasing Program</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">AT Fabrication Program</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Other w/ Description</th></tr>';
        var capon = jQuery('#table05').find('table').prepend('<caption>Other state financing<p class="notesLink"><a href="#table05legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="5"></colgroup><colgroup span="4"></colgroup>');
        var insert = jQuery('#table05').find('thead').prepend(tablehead);
    }

    function drawChart6() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=174046287&headers=2&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E label A "State", B "Consumer to Consumer", C "AT Program Involved", D "Reassign Ownership", E "Open-ended Loan"');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2" scope="col">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="2" scope="colgroup">Exchange</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="2" scope="colgroup">Refurbishment</th></tr><tr><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Consumer to Consumer</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">AT Program Involved</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Reassign Ownership</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Open-ended Loan</th></tr>';
        var capon = jQuery('#table06').find('table').prepend('<caption>Reuse operations<p class="notesLink"><a href="#table06legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="2"></colgroup><colgroup span="2"></colgroup>');
        var insert = jQuery('#table06').find('thead').prepend(tablehead);
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2" scope="col">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="2" scope="colgroup">Device Loan</th></tr><tr><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Drop/Ship</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Pick-up/Deliver</th></tr>';
        var insert = jQuery('#table07').find('thead').prepend(tablehead);
        var capon = jQuery('#table07').find('table').prepend('<caption>Device loan operations<p class="notesLink"><a href="#table07legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="2"></colgroup>');
    }

    function drawChart8() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=245703250&usp=sharing');
        query.setQuery('SELECT A, B, C, D label A "State", B "State Level", C "State Leadership", D "Transition"');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted redHed" rowspan="2" scope="col">State</th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3" scope="colgroup">Percentage of Total Award</th></tr><tr><th class="google-visualization-table-th gradient unsorted row2even" scope="col">State Level</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">State Leadership</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Transition</th></tr>';
        var insert = jQuery('#table08').find('thead').prepend(tablehead);
        var capon = jQuery('#table08').find('table').prepend('<caption>Closeout expenditures<p class="notesLink"><a href="#table08legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="3"></colgroup>');
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

var formatter = new google.visualization.PatternFormat(
    '<a href="https://{1}">{1}</a>');
// Apply formatter and set the formatted value of the first column.
formatter.format(data, [1,1]);

var view = new google.visualization.DataView(data);
view.setColumns([0,1,2,3,4,5,6,7,8,9]); // Create a view with the first column only.


                visualization.draw(view, {
                    allowHtml: true,
                    legend: { position: 'top', alignment: 'start' }

                });
                var capon = jQuery('#table09').find('table').prepend('<caption>Activity web links<p class="notesLink"><a href="#table09legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption>');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var capon = jQuery('#table10').find('table').prepend('<caption>Agency implementing<p class="notesLink"><a href="#table10legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption>');
    }

    function drawChart11() {

        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YZJ-ki12fU9nRZZ0S4Nclnhks92uYGuifS3nSBXmOmQ/gviz/tq?output=html&gid=1179168944&headers=2&usp=sharing');
        query.setQuery('SELECT A, B, C, D, E, F, G, H label A " ", B "State", C "Other", D "Both", E "Central", F "Regional", G "Both", H " "');
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
            legend: { position: 'top', alignment: 'start' }

        });
        var tablehead ='<tr><th class="google-visualization-table-th gradient unsorted blankhed" scope="col" rowspan="2"> </th><th class="google-visualization-table-th gradient unsorted tblhed1" colspan="3" scope="colgroup">Percent of Grantees who conduct this activity themselves or via others</th><th class="google-visualization-table-th gradient unsorted tblhed2" colspan="3" scope="colgroup">Percent grantees who operate activity in different locations</th><th class="google-visualization-table-th gradient unsorted tblhed3" scope="col" rowspan="2">Percent who charge fee for activity</th></tr><tr><th class="google-visualization-table-th gradient unsorted row2even" scope="col">State</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Other</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Both</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Central</th><th class="google-visualization-table-th gradient unsorted row2even" scope="col">Regional</th><th class="google-visualization-table-th gradient unsorted row2odd" scope="col">Both</th></tr>';
        var capon = jQuery('#table11').find('table').prepend('<caption>National activity summary<p class="notesLink"><a href="#table11legend"><i class="fas fa-file-alt"></i> Table notes</a></p></caption><col><colgroup span="3"></colgroup><colgroup span="3"></colgroup><col>');
        var insert = jQuery('#table11').find('thead').prepend(tablehead);
    }
    jQuery(".tableChanger").click(

      function()
      {
          var tableId = jQuery(this).attr('id').substring(0,7);
          var url = '#' + tableId;
           window.location = url;

          jQuery('#tableSelector button').removeClass('active');
          if(!jQuery('#' + tableId + '_jump').hasClass('active')) jQuery('#' + tableId + '_jump').addClass('active');
          jQuery('#tableDiv > div.displayToggle').removeClass("tableDisplay");
          //jQuery('#stateHolder > div').addClass("phpfix");
          jQuery('#tableDiv #' + tableId + 'container.displayToggle').addClass("tableDisplay");


          // jQuery('#stateHolder #' + stateId).removeClass("phpfix");
          jQuery('html, body').animate({
                          scrollTop: jQuery("#tableDiv").offset().top
                      }, 200);
                        document.getElementById('tableDiv').focus();
          return false;
      }
    );
    jQuery("#clearForm").click(

      function()
      {
        jQuery('#tableDiv > div.displayToggle').removeClass("tableDisplay");
        jQuery('#tableSelector button').removeClass('active');
        if(!jQuery("#introDiv").hasClass('tableDisplay'))jQuery("#introDiv").addClass('tableDisplay');


      }
    )
});
