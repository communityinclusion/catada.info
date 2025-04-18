google.charts.load('current', { 'packages': ['corechart', 'table'] });
jQuery.noConflict();
var statenametext = null;
var stringContent = null;
var yearstext = null;
var reportType = null;
var chartTitle = null;
var formatVAxis = null;
var tableStringContent = [];
var numtableStringContent = [];
var tableInsertContent = [];
var useRawNum = false;
var sheetName = [];
var query = null;
var tableDiv = null;
var reportHeading = [];
var formURL = [];
var formSheetname = [];
var formTitles = [];
var typeCount = null;
var countStates = null;
var countYears = null;
var countCats = null;
var clearAll = false;

jQuery(document).ready(function() {
    var summaryCheck = summReportChecked();
    // var updateSelections = readSelections();
    var checkState = countChecks('state');
    var checkYears = countChecks('year');
    var checkCats = countChecks('category');
    if (countChecks('state') == 0 && countChecks('year') == 0 && countChecks('category') == 0) {
        jQuery('.selectWarn').hide();
        var sumType = summReportChecked();
        if(sumType == 'summary') { jQuery('#chart_intro .customChart,#chart_intro .rawData').hide(); jQuery('#chart_intro .keySumm').show();

        } else if (sumType == 'download') { jQuery('#chart_intro .customChart,#chart_intro .keySumm').hide(); jQuery('#chart_intro .rawData').show();

        } else { jQuery('#chart_intro .rawData,#chart_intro .keySumm').hide(); jQuery('#chart_intro .customChart').show();

        }

        /*
        jQuery('#chart_intro').prepend(sumType == 'summary' ? '<p class="selectWarn clearable lead"><strong>Key Summary Tables</strong> display pre-selected data points from key AT activities in a standardized report that provides a general overview of an activity by state AT Program.<br />  To begin, simply choose an AT activity and year(s) on the left.</p>': (sumType == 'download'?'<p class="selectWarn clearable lead"><strong>The Raw Data Files</strong> tool enables users to download all AT activity data into an excel file. Raw data includes only what is available to users through custom charts and tables.<br />To begin, simply choose a state(s) and year(s) on the left.</p>' : '<h1 class="selectWarn clearable lead"><i class="fas fa-arrow-left"></i>Choose Your Data <br><i class="fas fa-arrow-down"></i>Chart, Explore, Download Data</h1><p class="selectWarn clearable lead"><strong>The Custom Charts and Tables</strong> tool enables users to generate customized charts and tables that summarize AT Program data. Users can run trend analyses and compare individual AT programs. Hover your cursor over any of the options under each AT Activity for explanatory text. <br />To begin, simply choose an AT activity, one or more individual states or all state, and year(s) on the left.</p>'));
        */
        jQuery('#chart_div > div').remove();
       // jQuery('button#spreadDL').hide();
       //  jQuery('button#printButton').hide();
    }
    jQuery("#chartRedraw").click(function() {
        jQuery('html, body').animate({
            scrollTop: jQuery("#chartTitle").offset().top
        }, 500);
    });

    //if(useRawNum == true) { if(!jQuery('.percOn').hasClass('toggleHide')) jQuery('.percOn').addClass('toggleHide'); if(jQuery('.numOn').hasClass('toggleHide')) jQuery('.numOn').removeClass('toggleHide');} else { if(!jQuery('.numOn').hasClass('toggleHide')) jQuery('.numOn').addClass('toggleHide'); if(jQuery('.percOn').hasClass('toggleHide')) jQuery('.percOn').removeClass('toggleHide');}

    jQuery('.switchNum button').on('click', function() {
        useRawNum =  useRawNum == true ? false : true;
        //console.log(useRawNum);
        if(useRawNum == true) { 
            if(!jQuery('.percOn').hasClass('toggleHide')) jQuery('.percOn').addClass('toggleHide'); if(jQuery('.numOn').hasClass('toggleHide')) jQuery('.numOn').removeClass('toggleHide'); jQuery('.numOn').addClass('toggleShow');
        } else 
        {
             if(!jQuery('.numOn').hasClass('toggleHide')) jQuery('.numOn').addClass('toggleHide'); if(jQuery('.percOn').hasClass('toggleHide')) jQuery('.percOn').removeClass('toggleHide'); jQuery('.percOn').addClass('toggleShow');
        }
        var redraw = drawSheetName();
    });

    jQuery('input[name="dlChoose"]').on('click', function() {
        var dlType = jQuery('input[name="dlChoose"]:checked').val();
        useRawNum = dlType == 'Rawnumber' ? true : false;
        var redraw = drawSheetName();

    });

    jQuery("#clearForm").click(function() {
        jQuery('html, body').animate({
            scrollTop: jQuery("#chartTitle").offset().top
        }, 500);
    });

    jQuery('input.checkAll').click(function() {
        parentID = jQuery(this).closest('div.collapse').attr('id');
        // console.log(parentID);

        var checked = jQuery(this).prop('checked');
        jQuery('#' + parentID).find('.col input:checkbox').prop('checked', checked);
    });

    jQuery('select').change(countChecks);

    jQuery('select').change(countChecks);
    jQuery('#accordion label').accessibleSimpleTooltipAria({
        // simpletooltipText: 'title'
    });
    jQuery("#chartSelector").submit(function(event) {
        event.preventDefault(); // cancel default behavior


    });
    updateSelectCount('state');
    updateSelectCount('year');

    jQuery('#chartRedraw').click(function() {
        var newChart = drawSheetName();
    });

    jQuery('#printButton').click(function() {
    window.print();
    });

    jQuery('input[name="reportChoose"]').click(function(event) {

        checkit = summReportChecked();
    });

    jQuery('#clearForm').click(function() {
        jQuery('input[name="reportChoose"]').prop('checked', false);
        jQuery('input[name="regionStates[]"]').prop('checked', false);
        jQuery('input[name="regionYear[]"]').prop('checked', false);
        jQuery('input[name="summChoose"]').prop('checked', false);
        jQuery('input[name="summYear"]').prop('checked', false);
        jQuery('input[name="summCategory"]').prop('checked', false);
        jQuery('#stateCountText').empty();
        jQuery('#yearCountText').empty();
        jQuery('#summyearCountText').empty();
        clearAll = true;
        var redraw = drawSheetName();

    });
    jQuery('#collapseSeven input').click(function(event) {
        updateSelectCount('state');

    });
    jQuery('#collapseEight input').click(function(event) {
        updateSelectCount('year');

    });
    jQuery('#collapseNine input').click(function(event) {
        updateSelectCount('year');

    });

    jQuery('#accordion .chartselection input').click(function() {
        jQuery("input[type='radio']:checked").each(function() {
            var catIdValue = jQuery(this).attr("id");
            updateCatNameText(catIdValue);
        });
    });

    if (checkState != 0 && checkYears != 0 && checkCats != 0) google.charts.setOnLoadCallback(drawSheetName);
    var reportType = getUrlString('report');
    // end of document.ready functions

});

function getUrlString(reportVars) {
    var reportURL = decodeURIComponent(window.location.search.substring(1)),
        reportVariables = reportURL.split('&'),
        reportName,
        i;

    for (i = 0; i < reportVariables.length; i++) {
        reportName = reportVariables[i].split('=');

        if (reportName[0] === reportVars) {
            return reportName[1] === undefined ? true : reportName[1];
        }
    }
}

// checkbox count
function countChecks(typeCount) {
    if (!typeCount) typeCount = false;
    countStates = jQuery('input[name="regionStates[]"]:checked').length;
    countYears = jQuery('input[name="regionYear[]"]:checked').length;
    checkCount = countStates * countYears;
    catCount = jQuery('input[name="reportChoose"]:checked').val() ? 1 : 0;

    // console.log('count states: ' + countStates + ' count year: ' + countYears);
    return !typeCount ? checkCount : (typeCount == 'state' ? countStates : (typeCount == 'year' ? countYears : catCount));
}
// counting states and years
function updateSelectCount(checkType) {
    if (checkType == 'year') {
        yeararray1 = getStateYearArray('year');
        if (yeararray1.length < 1 && summReportChecked() == 'summary') return;
        var years1 = summReportChecked() == 'summary' ? jQuery('input[name="summChoose"]:checked').val() : yeararray1;
        yearstext = summReportChecked() != 'summary' ? yeararray1.length < 1 ? '' : yeararray1.join(', ') : years1;
        console.log(years1);
        jQuery('#yearCountText').empty();
        jQuery('#summyearCountText').empty();
        var yrsSelect = yearstext;
        if (yearstext.length > 20) {
            yrsSelect = "Selected: (" + countChecks('year') + ") ";
        }
        yrsSelectText = yrsSelect;
        jQuery('#yearCountText').append(yrsSelectText);
        jQuery('#summyearCountText').append(yrsSelectText);

    }
    if (checkType == 'state') {
        statearray1 = getStateYearArray('state');

        statenametext = statearray1.length < 1 ? ' ' : statearray1.join(", ");
        // if (statearray1.length < 1) return;
        jQuery('#stateCountText').empty();
        var staSelect = statenametext;
        if (statenametext.length > 14) {
            staSelect = "Selected: (" + countChecks('state') + ") ";
        }
        staSelectText = staSelect;
        jQuery('#stateCountText').append(staSelectText);
    }

}

function updateCatNameText() {
    jQuery('#catChecked').empty();


}

function getStateYearArray(choiceType) {
    statearray1 = [];
    yeararray1 = [];
    var statename1 = jQuery('input:checkbox[name="regionStates[]"]:checked').each(function() {
        statearray1.push(jQuery(this).val());
    });


    var years1 = summReportChecked() == 'summary' ? jQuery('input[name="summChoose"]:checked').each(function() {
        yeararray1.push(jQuery(this).val());
    }) : jQuery('input:checkbox[name="regionYear[]"]:checked').each(function() {
        yeararray1.push(jQuery(this).val());
    });


    return choiceType == 'year' ? yeararray1 : statearray1;

}



function summReportChecked() {
    // console.log('It is checked');
    var summYes = getUrlString('report');

    if (summYes == 'summary') {
        jQuery('nav#sidebar').removeClass('sideActivity sideDown');
        jQuery('nav#sidebar').addClass('sideSumm');
        jQuery('h1#chartTitle').text('Key Summary Tables');
        jQuery('button#chartRedraw').html('GENERATE <br /> Key Summary Tables');
        jQuery('#summYear').show();
        jQuery('#summCat').show();
        jQuery('#accordion > fieldset').hide();
        jQuery('#accordion .groupYear').hide();
        jQuery('#accordion .groupState').hide();
        jQuery('#sidebar h4.p-2').hide();
        jQuery('#sidebar h4.p-2.activityStates').parent().hide();
        jQuery('#sidebar h4.p-2.activityYears').parent().hide();
        jQuery('#sidebar #otherOpts h4.p-2').show();
        jQuery('#sidebar h4.p-2.summCatHed').show();
        jQuery('#sidebar h4.p-2.summYearHed').show();

        jQuery('#sidebar h4.p-2.summCatHed').parent().show();
        jQuery('#sidebar h4.p-2.summYearHed').parent().show();


        //jQuery('button.multiselect.dropdown-toggle').prop('disabled',true);
        jQuery('#stateDrop').hide();
        jQuery('#yearDrop').hide();
        jQuery('#otherOpts a#otherDown').show();
        jQuery('#otherOpts a#otherSumm').hide();
        jQuery('#otherOpts a#otherActiv').show();

        return 'summary';



    } else if (summYes == 'download') {
        jQuery('nav#sidebar').removeClass('sideActivity sideSumm');
        jQuery('nav#sidebar').addClass('sideDown');
        //jQuery('button.multiselect.dropdown-toggle').removeAttr('disabled');
        //jQuery('#stateDrop').show(); jQuery('#yearDrop').show();

        jQuery('h1#chartTitle').text('Raw Data Files');
        jQuery('button#chartRedraw').html('GENERATE<br />Raw Data for Download');
        jQuery('#summYear').hide();
        jQuery('#summCat').hide();
        jQuery('#accordion > fieldset').hide();
        jQuery('#accordion .groupYear').show();
        jQuery('#accordion .groupState').show();
        jQuery('#sidebar h4.p-2').hide();
        jQuery('#sidebar #otherOpts h4.p-2').show();
        jQuery('#sidebar h4.p-2.downloadStates').show();
        jQuery('#sidebar h4.p-2.downloadYears').show();
        jQuery('#sidebar h4.p-2.summCatHed').hide();
        jQuery('#sidebar h4.p-2.summYearHed').hide();
        jQuery('#sidebar h4#categoryRadios.p-2').hide();
        jQuery('#otherOpts a#otherDown').hide();
        jQuery('#otherOpts a#otherSumm').show();
        jQuery('#otherOpts a#otherActiv').show();
        jQuery('#sidebar h4.p-2.summCatHed').parent().hide();
        jQuery('#sidebar h4.p-2.summYearHed').parent().hide();
        return 'download';

    } else {
        jQuery('nav#sidebar').removeClass('sideDown sideSumm');
        jQuery('nav#sidebar').addClass('sideActivity');
        jQuery('h1#chartTitle').text('Custom Charts and Tables');
        jQuery('button#chartRedraw').html('GENERATE<br />Charts &amp; Tables');
        jQuery('#summYear').hide();
        jQuery('#summCat').hide();
        jQuery('#accordion > fieldset').show();
        jQuery('#accordion .groupYear').show();
        jQuery('#accordion .groupState').show();
        jQuery('#sidebar h4.p-2').hide();
        jQuery('#sidebar #otherOpts h4.p-2').show();
        jQuery('#sidebar h4.p-2.activityStates').show();

        jQuery('#sidebar h4.p-2.activityStates').parent().show();

        jQuery('#sidebar h4.p-2.activityYears').parent().show();
        jQuery('#sidebar h4.p-2.activityYears').show();
        jQuery('#sidebar h4.p-2.summCatHed').hide();
        jQuery('#sidebar h4.p-2.summYearHed').hide();
        jQuery('#sidebar h4.p-2.summCatHed').parent().hide();
        jQuery('#sidebar h4.p-2.summYearHed').parent().hide();

        jQuery('#sidebar h4#categoryRadios.p-2').show();

        jQuery('#otherOpts a#otherDown').show();
        jQuery('#otherOpts a#otherSumm').show();
        jQuery('#otherOpts a#otherActiv').hide();
        return 'activity';
    }



}


var legends = [
    ['Vision', 'Hearing', 'Speech', 'Learning', 'Mobility', 'Daily living', 'Environmental', 'Vehicle', 'Computers', 'Recreation'],
    ['Indivs. w/ disabilities', 'Family members', 'Reps. of education', 'Reps. of employment', 'Reps. of health', 'Reps. of community living', 'Reps. of technology'],
    ['Highly satisfied', 'Satisfied', 'Satisfied somewhat', 'Not satisfied'],
    ['Assist in decision-making', 'Serve as loaner', 'Provide accommodation', 'Training'],
    ['Products', 'Funding', 'Technology', 'Combination', 'Transition']

];

function legendBuild(legendNum) {
    var legendOut = [];
    arraySub = legends[legendNum];
    var numCount = arraySub.length;
    if (numCount < 1) return;
    //legendStruct = '<div class="legendElem"><div class="legendColorBlock legendNum' + legendNum + '"></div>' + legNumText + '</div>';
    for (i = 0; i < numCount; i++) {
        legendOut.push('<div class="legendElem"><div class="legendColorBlock legendNum' + i + '"><img src="/assets/legend' + i + '.png" /></div><div class="legendText">' + arraySub[i] + '</div></div>');

    }
    return legendOut;
}

function drawSheetName() {
    

    if ((countChecks('state') != 0 && countChecks('year') != 0 && summReportChecked() != 'summary') || (summReportChecked() == 'summary' && jQuery('input[name="summCategory"]:checked').val()) || clearAll) {

        tableStringContent = [];
        numtableStringContent = [];
        legendHTML = null;

        tableDiv = 0;
        statearray1 = getStateYearArray('state');
        yeararray1 = getStateYearArray('year');


        statenames = statearray1.join("' OR D = '");
        statenametext = statearray1.length < 1 ? ' ' : statearray1.join(", ");
        var years1 = summReportChecked() == 'summary' ? jQuery('input[name="summChoose"]:checked').val() : yeararray1;

        years = summReportChecked() != 'summary' ? yeararray1.length < 1 ? '' : yeararray1.join(' OR E = ') : years1;
        yearstext = summReportChecked() != 'summary' ? yeararray1.length < 1 ? '' : yeararray1.join(', ') : years1;
        var reportchoice = summReportChecked() != 'summary' ? (summReportChecked() == 'download' ? '30' : jQuery('input[name="reportChoose"]:checked').val()) : jQuery('input[name="summCategory"]:radio:checked').val();
        console.log(reportchoice);

        reporttitle = summReportChecked() != 'summary' ? jQuery('input[name="reportChoose"]:checked').parent('label').text() : 'Summary Report' + ': ' + jQuery('input[name="summCategory"]:radio:checked').parent('label').text();
        var statesFilenm = statenametext;
        if (statenametext.length > 14) {
            statesFilenm = statenametext.substring(0, 14);
        }
        var yrsFilenm = yearstext;
        // var yrsSelect = yearstext;
        if (yearstext && yearstext.length > 14) {
            yrsFilenm = yearstext.substring(0, 14);
            //   yrsSelect = yearstext.substring(0,14) + "...";
        }
        // yrsSelectText = "Selected: (" + countChecks('year') + ") " + yrsSelect;
        // jQuery('#yearCountText').append(yrsSelectText);

        sheetName = [];
        chartURL = 'https://docs.google.com/spreadsheets/d/1Zutzmq6IFxyHqOpwwjKqUeRhPt8WxY3a5TpvYdQYYf8';
        switch (reportchoice) {
            case '1':
                stringContent = "SELECT B,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Q > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '2':
                stringContent = "SELECT B,AQ,AR,AS,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Z > 0 ORDER BY E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,Z,R,S,T,U,V,W,X,Y WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Z,AQ,AR,AS,AT,AU,AV,AW,AX WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations: Participants";
                legendHTML = legendBuild(1);
                break;

            case '3':
                stringContent = "SELECT B,AY,AZ,BA,BB WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AE > 0 ORDER BY  E DESC, A LIMIT 8";
                 numtableStringContent[0] = "SELECT A,E,AE,AA,AB,AC,AD WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AE,AY,AZ,BA,BB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations: Customer Satisfaction";
                legendHTML = legendBuild(2);
                break;

            case '4':
                stringContent = "SELECT B,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") AND T > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,T,F,G,H,I,J WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,T,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dl_export_full&';
                reportHeading[0] = "Device Loans: Purpose of Loans";
                legendHTML = legendBuild(3);
                break;
            case '5':
                stringContent = "SELECT B,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ WHERE (D = '" + statenames + "') AND (E = " + years + ") AND W > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,W,K,L,M,N,O,P,Q,R,S,U,V WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,W,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ,BA WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dl_export_full&';
                reportHeading[0] = "Device Loans: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '6':
                stringContent = "SELECT B,BB,BC,BD,BE,BF,BG,BH WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AF > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AF,X,Y,Z,AA,AB,AC,AD,AE WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AF,BB,BC,BD,BE,BF,BG,BH,BI WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dl_export_full&';
                reportHeading[0] = "Device Loans: Device Borrowers";
                legendHTML = legendBuild(1);
                break;

            case '7':
                stringContent = "SELECT B,BJ,BK,BL,BM WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AK > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AK,AG,AH,AI,AJ WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AK,BJ,BK,BL,BM WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dl_export_full&';
                reportHeading[0] = "Device Loans: Customer Satisfaction";
                legendHTML = legendBuild(2);
                break;

            case '8':
                stringContent = "SELECT B,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Q > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_de_export_full&';
                reportHeading[0] = "Device Exchange: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '9':
                stringContent = null;
                //stringContent = "SELECT B,R,S,T,U,V,W,X,Y,Z,AA WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AC > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_de_export_full&';
                reportHeading[0] = "Device Exchange: Savings";
                legendHTML = legendBuild(0);
                break;

            case '10':
                stringContent = "SELECT B,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Q > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[0] = "Device Refurbishment: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '11':
                stringContent = null;
                //stringContent = "SELECT B,R,S,T,U,V,W,X,Y,Z,AA WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AC > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[0] = "Device Refurbishment: Savings";
                legendHTML = legendBuild(0);
                break;

            case '12':
                stringContent = "SELECT B,AP,AQ,AR,AS WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AX > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AX,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AX,AP,AQ,AR,AS WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[0] = "Device Reutilization: Customer Satisfaction";
                legendHTML = legendBuild(2);
                break;

            case '13':
                stringContent = "SELECT B,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Q > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_fl_export_full&';
                reportHeading[0] = "Financial Loans: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '14':
                stringContent = null;
                //stringContent = "SELECT B,R,S,T,U,V,W,X,Y,Z,AA WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AC > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_fl_export_full&';
                reportHeading[0] = "Financial Loans: Loan Value";
                legendHTML = legendBuild(0);
                break;

            case '15':
                stringContent = "SELECT B,AD,AF,AG,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Q > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_sf_export_full&';
                reportHeading[0] = "Other Financing: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '16':
                stringContent = null;
                //stringContent = "SELECT B,R,S,T,U,V,W,X,Y,Z,AA WHERE (D = '" + statenames + "') AND (E = " + years + ") AND AC > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_sf_export_full&';
                reportHeading[0] = "Other Financing: Dollar Value";
                legendHTML = legendBuild(0);
                break;

            case '17':
                stringContent = "SELECT B,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") AND J > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,J,F,G,H,I WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,J,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_fa_sat_export_and_summaries&';
                reportHeading[0] = "State Financing Activities: Customer Satisfaction";
                legendHTML = legendBuild(2);
                break;

            case '18':
                stringContent = "SELECT B,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") AND N > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,N,F,G,H,I,J,K,L,M WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,N,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_ia_export_full&';
                reportHeading[0] = "Information and Assistance: Recipients of AT Device/Service Content";
                legendHTML = legendBuild(1);
                break;

            case '19':
                stringContent = "SELECT B,AP,AQ,AR,AS,AT,AU,AV WHERE (D = '" + statenames + "') AND (E = " + years + ") AND W > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,W,O,P,Q,R,S,T,U,V WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,W,AP,AQ,AR,AS,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_ia_export_full&';
                reportHeading[0] = "Information and Assistance: Recipients of AT Funding Content";
                legendHTML = legendBuild(1);
                break;
            case '20':
                stringContent = "SELECT B,W,X,Y,Z,AA,AB,AC,AD,AE WHERE (D = '" + statenames + "') AND (E = " + years + ") AND O > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT A,E,O,F,G,H,I,J,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,O,W,X,Y,Z,AA,AB,AC,AD WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_tp_export_full&';
                reportHeading[0] = "Training: Participants";
                legendHTML = legendBuild(1);
                break;

            case '21':
                stringContent = "SELECT B,AF,AG,AH,AI,AJ WHERE (D = '" + statenames + "') AND (E = " + years + ") AND V > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT  A,E,V,P,Q,R,S,T,U WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT  A,E,V,AF,AG,AH,AI,AJ,AK WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_tp_export_full&';
                reportHeading[0] = "Training: Topics";

                break;

            case '22':
                stringContent = "SELECT B,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM WHERE (D = '" + statenames + "') AND (E = " + years + ") AND Q > 0 ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[0] = "SELECT  A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT  A,E,Q,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_rc_export_full&';
                reportHeading[0] = "Financing that Reduces Cost: Type of AT";
                legendHTML = legendBuild(0);
                break;

            case '23':
                stringContent = null;
                // stringContent = "SELECT B,R,S,T,U,V,W,X,Y,Z,AA WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY  E DESC, A LIMIT 8";
                numtableStringContent[5] = "SELECT  A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT  A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_rc_export_full&';
                reportHeading[0] = "Financing that Reduces Cost: Dollar Value of Savings";
                legendHTML = legendBuild(0);
                break;

            case '24':
                //item 1
                stringContent = null;
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations: Type of AT";
                //item 2
                numtableStringContent[1] = "SELECT A,E,Z,R,S,T,U,V,W,X,Y WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT A,E,Z,AQ,AR,AS,AT,AU,AV,AW,AX WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_dd_export_full&';
                reportHeading[1] = "Device Demonstrations: Participants";
                // item 3
                 numtableStringContent[2] = "SELECT A,E,AE,AA,AB,AC,AD WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[2] = "SELECT A,E,AE,AY,AZ,BA,BB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[2] = 'sheet=x_dd_export_full&';
                reportHeading[2] = "Device Demonstrations: Customer Satisfaction";
                break;

            case '25':
                stringContent = null;
                // item 4
                numtableStringContent[0] = "SELECT A,E,T,F,G,H,I,J WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,T,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dl_export_full&';
                reportHeading[0] = "Device Loans: Purpose of Loans";
                // item 5
                numtableStringContent[1] = "SELECT A,E,W,L,M,N,O,P,Q,R,S,U,V WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT A,E,W,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ,BA WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_dl_export_full&';
                reportHeading[1] = "Device Loans: Type of AT";
                // item 6
                numtableStringContent[2] = "SELECT A,E,AF,X,Y,Z,AA,AB,AC,AD,AE WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[2] = "SELECT A,E,AF,BB,BC,BD,BE,BF,BG,BH,BI WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[2] = 'sheet=x_dl_export_full&';
                reportHeading[2] = "Device Loans: Device Borrowers";
                // item 7
                numtableStringContent[3] = "SELECT A,E,AK,AG,AH,AI,AJ WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[3] = "SELECT A,E,AK,BJ,BK,BL,BM WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[3] = 'sheet=x_dl_export_full&';
                reportHeading[3] = "Device Loans: Customer Satisfaction";
                break;

            case '26':
                stringContent = null;
                // item 8
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_de_export_full&';
                reportHeading[0] = "Device Exchange: Type of AT";
                // item 9
                numtableStringContent[1] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_de_export_full&';
                reportHeading[1] = "Device Exchange: Savings";
                // item 10
                numtableStringContent[2] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[2] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[2] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[2] = "Device Refurbishment: Type of AT";
                // item 11
                numtableStringContent[3] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[3] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[3] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[3] = "Device Refurbishment: Savings";
                // item 12
                numtableStringContent[4] = "SELECT A,E,AX,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[4] = "SELECT A,E,AX,AP,AQ,AR,AS WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[4] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[4] = "Device Reutilization: Customer Satisfaction";
                break;

            case '27':
                stringContent = null;
                // item 13
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_fl_export_full&';
                reportHeading[0] = "Financial Loans: Type of AT";
                //item 14
                numtableStringContent[1] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_fl_export_full&';
                reportHeading[1] = "Financial Loans: Loan Value";
                // item 15
                numtableStringContent[2] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[2] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[2] = 'sheet=x_sf_export_full&';
                reportHeading[2] = "Other Financing: Type of AT";
                //item 16
                numtableStringContent[3] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[3] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[3] = 'sheet=x_sf_export_full&';
                reportHeading[3] = "Other Financing: Dollar Value";
                
                
                //item 22
                numtableStringContent[4] = "SELECT  A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[4] = "SELECT  A,E,Q,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[4] = 'sheet=x_rc_export_full&';
                reportHeading[4] = "Financing that Reduces Cost: Type of AT";
                //item 23
                numtableStringContent[5] = "SELECT  A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[5] = "SELECT  A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[5] = 'sheet=x_rc_export_full&';
                reportHeading[5] = "Financing that Reduces Cost: Dollar Value of Savings";
                //item 17

                numtableStringContent[6] = "SELECT A,E,J,F,G,H,I WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[6] = "SELECT A,E,J,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[6] = 'sheet=x_fa_sat_export_and_summaries&';
                reportHeading[6] = "State Financing Activities: Customer Satisfaction";
                break;

            case '28':
            
                
                stringContent = null;
                //item 18
                numtableStringContent[0] = "SELECT A,E,N,F,G,H,I,J,K,L,M WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,N,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_ia_export_full&';
                reportHeading[0] = "Information and Assistance: Recipients of AT Device/Service Content";

                //item 19
                numtableStringContent[1] = "SELECT A,E,W,O,P,Q,R,S,T,U,V WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT A,E,W,AP,AQ,AR,AS,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_ia_export_full&';
                reportHeading[1] = "Information and Assistance: Recipients of AT Funding Content";
                break;

            case '29':
                stringContent = null;
                //item 20
                numtableStringContent[0] = "SELECT A,E,O,F,G,H,I,J,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,O,W,X,Y,Z,AA,AB,AC,AD,AE WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_tp_export_full&';
                reportHeading[0] = "Training: Participants";

                //item 21
                numtableStringContent[1] = "SELECT  A,E,V,P,Q,R,S,T,U WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT  A,E,V,AF,AG,AH,AI,AJ,AK WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_tp_export_full&';
                reportHeading[1] = "Training: Topics";
                break;


            // Download data

            case '30':
                stringContent = null;
                //item 1
                numtableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[0] = "SELECT A,E,Q,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations: Type of AT";
                //item 2
                numtableStringContent[1] = "SELECT A,E,Z,R,S,T,U,V,W,X,Y WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[1] = "SELECT A,E,Z,AQ,AR,AS,AT,AU,AV,AW,AX WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[1] = 'sheet=x_dd_export_full&';
                reportHeading[1] = "Device Demonstrations: Participants";
                // item 3
                numtableStringContent[2] = "SELECT A,E,AE,AA,AB,AC,AD WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[2] = "SELECT A,E,AE,AY,AZ,BA,BB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[2] = 'sheet=x_dd_export_full&';
                reportHeading[2] = "Device Demonstrations: Customer Satisfaction";
                // item 4
                numtableStringContent[3] = "SELECT A,E,K,F,G,H,I,J WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[3] = "SELECT A,E,K,AL,AM,AN,AO,AP WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[3] = 'sheet=x_dl_export_full&';
                reportHeading[3] = "Device Loans: Purpose of Loans";
                // item 5
                numtableStringContent[4] = "SELECT A,E,W,L,M,N,O,P,Q,R,S,T,U,V WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[4] = "SELECT A,E,W,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ,BA WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[4] = 'sheet=x_dl_export_full&';
                reportHeading[4] = "Device Loans: Type of AT";
                // item 6
                numtableStringContent[5] = "SELECT A,E,AF,X,Y,Z,AA,AB,AC,AD,AE WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[5] = "SELECT A,E,AF,BB,BC,BD,BE,BF,BG,BH,BI WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[5] = 'sheet=x_dl_export_full&';
                reportHeading[5] = "Device Loans: Device Borrowers";
                // item 7
                numtableStringContent[6] = "SELECT A,E,AK,AG,AH,AI,AJ WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[6] = "SELECT A,E,AK,BJ,BK,BL,BM WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[6] = 'sheet=x_dl_export_full&';
                reportHeading[6] = "Device Loans: Customer Satisfaction";
                // item 8
                numtableStringContent[7] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[7] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[7] = 'sheet=x_de_export_full&';
                reportHeading[7] = "Device Exchange: Type of AT";
                // item 9
                numtableStringContent[8] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[8] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[8] = 'sheet=x_de_export_full&';
                reportHeading[8] = "Device Exchange: Savings";
                // item 10
                numtableStringContent[9] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[9] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[9] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[9] = "Device Refurbishment: Type of AT";
                // item 11
                numtableStringContent[10] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[10] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[10] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[10] = "Device Refurbishment: Savings";
                // item 12
                numtableStringContent[11] = "SELECT A,E,AX,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[11] = "SELECT A,E,AX,AP,AQ,AR,AS WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[11] = 'sheet=x_rrr_and_x_dr_sat_export_full&';
                reportHeading[11] = "Device Reutilization: Customer Satisfaction";
                // item 13
                numtableStringContent[12] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[12] = "SELECT A,E,Q,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[12] = 'sheet=x_fl_export_full&';
                reportHeading[12] = "Financial Loans: Type of AT";
                //item 14
                numtableStringContent[13] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[13] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[13] = 'sheet=x_fl_export_full&';
                reportHeading[13] = "Financial Loans: Loan Value";
                // item 15
                numtableStringContent[14] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[14] = "SELECT A,E,Q,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[14] = 'sheet=x_sf_export_full&';
                reportHeading[14] = "Other Financing: Type of AT";
                //item 16
                numtableStringContent[15] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[15] = "SELECT A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[15] = 'sheet=x_sf_export_full&';
                reportHeading[15] = "Other Financing: Dollar Value";
                //item 22
                numtableStringContent[16] = "SELECT  A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[16] = "SELECT  A,E,Q,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[16] = 'sheet=x_rc_export_full&';
                reportHeading[16] = "Financing that Reduces Cost: Type of AT";
                //item 23
                numtableStringContent[17] = "SELECT  A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + " ORDER BY A, E";
                tableStringContent[17] = "SELECT  A,E,AC,R,S,T,U,V,W,X,Y,Z,AA,AB WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[17] = 'sheet=x_rc_export_full&';
                reportHeading[17] = "Financing that Reduces Cost: Dollar Value of Savings";
                //item 17
                numtableStringContent[18] = "SELECT A,E,J,F,G,H,I WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[18] = "SELECT A,E,J,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[18] = 'sheet=x_fa_sat_export_and_summaries&';
                reportHeading[18] = "State Financing Activities: Customer Satisfaction";
                //item 18
                numtableStringContent[19] = "SELECT A,E,N,F,G,H,I,J,K,L,M WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[19] = "SELECT A,E,N,AH,AI,AJ,AK,AL,AM,AN,AO WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[19] = 'sheet=x_ia_export_full&';
                reportHeading[19] = "Information and Assistance: Recipients of AT Device/Service Content";

                //item 19
                numtableStringContent[20] = "SELECT A,E,W,O,P,Q,R,S,T,U,V WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[20] = "SELECT A,E,W,AP,AQ,AR,AS,AT,AU,AV,AW WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[20] = 'sheet=x_ia_export_full&';
                reportHeading[20] = "Information and Assistance: Recipients of AT Funding Content";
                //item 20
                numtableStringContent[21] = "SELECT A,E,O,F,G,H,I,J,K,L,M,N WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[21] = "SELECT A,E,O,W,X,Y,Z,AA,AB,AC,AD WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[21] = 'sheet=x_tp_export_full&';
                reportHeading[21] = "Training: Participants";

                //item 21
                numtableStringContent[22] = "SELECT  A,E,V,P,Q,R,S,T,U WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                tableStringContent[22] = "SELECT  A,E,V,AF,AG,AH,AI,AJ,AK WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[22] = 'sheet=x_tp_export_full&';
                reportHeading[22] = "Training: Topics";
                break;




                // Summary tables
            case '31':
                stringContent = null;
                // device demonstrations
                tableStringContent[0] = "SELECT A,Q,Z,BC WHERE E = " + years + " ORDER BY C, A";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations Summary";
                break;
            case '32':
                // device loans
                tableStringContent[0] = "SELECT A,T,W,BN WHERE E = " + years + " ORDER BY C, A";
                sheetName[0] = 'sheet=x_dl_export_full&';
                reportHeading[0] = "Device Loans Summary";
                break;
            case '33':
                // device reutilization
                tableStringContent[0] = "SELECT A,O,P,Q,R,S WHERE E = " + years + " ORDER BY C, A";
                sheetName[0] = 'sheet=x_fa_sat_export_and_summaries&';
                reportHeading[0] = "Device Reutilization Programs Summary";
                break;
            case '34':
                //state financing
                tableStringContent[0] = "SELECT A,V,W,X,Y,Z,AA,AB WHERE E = " + years + " ORDER BY C, A";
                sheetName[0] = 'sheet=x_fa_sat_export_and_summaries&';
                reportHeading[0] = "State Financing Programs Summary";
                break;
            case '35':
                // state leadership
                tableStringContent[0] = "SELECT A,T,U WHERE E = " + years + " ORDER BY C, A";
                sheetName[0] = 'sheet=x_fa_sat_export_and_summaries&';
                reportHeading[0] = "State Leadership Activities Summary";
                break;
            case '36':
                //federal and leveraged funding
                tableStringContent[0] = "SELECT A,F,G WHERE E = " + years + " ORDER BY C, A";
                sheetName[0] = 'sheet=x_ga_and_x_lf_export&';
                reportHeading[0] = "Federal and Leveraged Funding Summary";
                break;



            default:

                stringContent = null;
                clearAll = true;
                tableStringContent[0] = "SELECT A,E,Q,F,G,H,I,J,K,L,M,N,O,P WHERE (D = '" + statenames + "') AND (E = " + years + ") ORDER BY A, E";
                sheetName[0] = 'sheet=x_dd_export_full&';
                reportHeading[0] = "Device Demonstrations: Type of AT";

                break;
        }
        tableInsertContent = !useRawNum ? tableStringContent : numtableStringContent;
        var csvFileName = summReportChecked() == 'summary' ? reporttitle + '_for_' + yrsFilenm : reporttitle + '_in_' + statesFilenm + '_for_' + yrsFilenm;
        csvFileName = csvFileName.replace(/ /g, "_").replace(/,/g, "");



        if (stringContent) {
            var queryString = encodeURIComponent(stringContent);
            query = new google.visualization.Query(chartURL + '/gviz/tq?' + sheetName[0] + 'headers=1&tq=' + queryString);
            query.send(handleChartDataQueryResponse);

        } else {
            jQuery('#chart_div').empty();
        }
        jQuery('.downloadButton h5.dlHeading').remove();
        if (jQuery('.clearable').hasClass('card-header')) jQuery('.clearable').removeClass('card-header');
        jQuery('.clearable').empty();
        if(!jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').addClass('toggleShow');
        if(reportchoice < 30 && ( reportchoice != 9 && reportchoice != 11 && reportchoice != 14 && reportchoice != 16 && reportchoice != 23)) 
        {
            if (useRawNum) {
                if(!jQuery('.switchNum.numOn').hasClass('toggleShow')) jQuery('.switchNum.numOn').addClass('toggleShow')
                if(jQuery('.switchNum.percOn').hasClass('toggleShow'))jQuery('.switchNum.percOn').removeClass('toggleShow');
            } else 
            {  if(!jQuery('.switchNum.percOn').hasClass('toggleShow')) jQuery('.switchNum.percOn').addClass('toggleShow')
               if(jQuery('.switchNum.numOn').hasClass('toggleShow'))jQuery('.switchNum.numOn').removeClass('toggleShow');
            }
        } else if(reportchoice == 30)
        {    if(jQuery('.switchNum.percOn').hasClass('toggleShow'))jQuery('.switchNum.percOn').removeClass('toggleShow');
             if(jQuery('.switchNum.numOn').hasClass('toggleShow'))jQuery('.switchNum.numOn').removeClass('toggleShow');
             if(!jQuery('.switchNum.dlChoice').hasClass('toggleShow')) jQuery('.switchNum.dlChoice').addClass('toggleShow')
             
        }
        else 
         { 
             if(jQuery('.switchNum.percOn').hasClass('toggleShow'))jQuery('.switchNum.percOn').removeClass('toggleShow');
             if(jQuery('.switchNum.numOn').hasClass('toggleShow'))jQuery('.switchNum.numOn').removeClass('toggleShow');
             if(jQuery('.switchNum.dlChoice').hasClass('toggleShow'))jQuery('.switchNum.dlChoice').removeClass('toggleShow');
         }
        if (summReportChecked() != 'download')  { if(!jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').addClass('toggleShow'); }
        if (reportchoice == '30') jQuery('.downloadButton').prepend("<h5 class=\"dlHeading clearable\">Download a spreadsheet with all categories for " + statenametext + " for " + yearstext + "</h5>");
        else if(reportchoice >= '31' && reportchoice <= '36') jQuery('.downloadButton').prepend("<h5 class=\"dlHeading clearable\">Download a summary spreadsheet" + " for " + yearstext + "</h5>");
        else if (clearAll) {jQuery('#body_div').empty(); jQuery('.downloadButton').empty(); jQuery('.downloadButton').prepend("<h5 class=\"dlHeading clearable\">Choose variables at left for another search</h5>"); if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow'); }
        else jQuery('.downloadButton').prepend("<h5 class=\"dlHeading clearable\">Download results for " + statenametext + " for " + yearstext + "</h5>");
        updateSelectCount('state');
        updateSelectCount('year');

        for (i = 0; i < tableInsertContent.length; i++) {


            queryStringTable = encodeURIComponent(tableInsertContent[i]);
            queryTable = new google.visualization.Query(chartURL + '/gviz/tq?' + sheetName[i] + 'headers=1&tq=' + queryStringTable);



           if (!clearAll) doQuery(queryTable, i, reportHeading[i], reportchoice);

            jQuery('#csvDL #urlInputs').append('<input type="hidden" name="sendString[]" value="' + queryStringTable + '" />');
            jQuery('#csvDL #titleInputs').append((summReportChecked() == 'summary' ? '<input type="hidden" name="sendTitle[]" value="' + reportHeading[i] + ' for ' + yearstext + '" />' : '<input type="hidden" name="sendTitle[]" value="' + reportHeading[i] + ' in ' + statenametext + ' for ' + yearstext + '" />'));
            jQuery('#csvDL #sheetnameInputs').append('<input type="hidden" name="sendSheetname[]" value="' + sheetName[i] + '" />');
        }


        //var toolbarChart = handleToolbarDataQueryResponse(chartURL + '/gviz/tq?' +  sheetName + 'headers=1&tq=' + queryString);
        var csvReqString = '&tqx=reqId:1;out:csv;outFileName:' + csvFileName + '.csv';
        //jQuery("a#chartCSVlink").attr("href", chartURL + '/gviz/tq?' +  sheetName[i] + 'headers=1&tq=' + queryString + csvReqString);
        jQuery("a#tableCSVlink").attr("href", chartURL + '/gviz/tq?' + sheetName[i] + 'headers=1&tq=' + queryStringTable + csvReqString);
        clearAll = false;
    } else if (countChecks('state') == 0 && countChecks('year') != 0 && summReportChecked() != 'summary') {
        jQuery('.clearable').empty();
        jQuery('#chart_div > div').remove();
        jQuery('#legend_div').empty();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
        jQuery('.selectWarn').remove();
        jQuery('#chart_div').prepend('<h5 class="clearable selectWarn">Please choose one or more states at left.</h5>');
        jQuery('#chart_div > div').remove();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
    } else if (countChecks('state') != 0 && countChecks('year') == 0 && summReportChecked() != 'summary') {
        jQuery('.clearable').empty();
        jQuery('#chart_div > div').remove();
        jQuery('#legend_div').empty();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
        jQuery('.selectWarn').remove();
        jQuery('#chart_div').prepend('<h5 class="clearable selectWarn">Please choose one or more years at left.</h5>');
        jQuery('#chart_div > div').remove();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
    } else if (countChecks('state') == 0 && countChecks('year') == 0 && summReportChecked() == 'summary') {
        jQuery('.clearable').empty();
        jQuery('#chart_div > div').remove();
        jQuery('#legend_div').empty();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
        if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow');
        jQuery('.selectWarn').remove();
        jQuery('#chart_div').prepend('<h5 class="clearable selectWarn">Please choose an activity, state(s) and year(s) at left to begin.</h5>');
        jQuery('#chart_div > div').remove();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
    } else if (summReportChecked() == 'summary' && !jQuery('input[name="summChoose"]:checked').val()) {
        jQuery('.clearable').empty();
        jQuery('#chart_div > div').remove();
        jQuery('#legend_div').empty();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        jQuery('.selectWarn').remove();
        if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow');
        jQuery('#chart_div').prepend('<h5 class="clearable selectWarn">Please a year at left for your summary report.</h5>');
        jQuery('#chart_div > div').remove();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
    }
    else if (clearAll) {
        jQuery('.clearable').empty();
        jQuery('#chart_div > div').remove();
        jQuery('#chart_div').empty();
        jQuery('#legend_div').empty();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
        jQuery('.selectWarn').remove();
        jQuery('.downloadButton').empty();
        jQuery('#chart_div > div').remove();
        if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
        if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
        clearAll = false;
    }


}

function handleChartDataQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    checkCount = countChecks();
    //if(checkCount > 10) {
    //jQuery('#chart_div').empty();
   // return; 
   // }
    chartHeight = checkCount > 3 ? (checkCount > 5 ? '500' : '450') : '175';
    areaHeight = checkCount > 3 ? (checkCount > 5 ? '650' : '600') : '300';
    var groupWid = checkCount > 3 ? (checkCount > 5 ? '22' : '32') : '22';
    reportchoice = summReportChecked() != 'summary' ? jQuery('input[name="reportChoose"]:checked').val() : jQuery('input[name="summCategory"]:radio:checked').val();
    var container = document.getElementById('chart_div');
    formatVAxis = reportchoice != '14' && reportchoice != '16' && reportchoice != '9' && reportchoice != '11' && reportchoice != '23' ? "#%" : "$#,###";
    var chart = new google.visualization.BarChart(container);
    var observer = new MutationObserver(function(mutations) {

        jQuery('rect[fill="#006e82"],rect[fill="#fae6be"],rect[fill="#00a0fa"],rect[fill="#8214a0"],rect[fill="#a0fa82"],rect[fill="#fa7850"],rect[fill="#005ac8"],rect[fill="#f0f032"], rect[fill="#0ab45a"],rect[fill="#000000"]').each(function(i, obj) {

            rectWid = jQuery(this).attr('width');
            rectHeight = jQuery(this).attr('height');

            jQuery(this).attr('stroke-dasharray', rectWid + ',' + rectHeight);

        });

        jQuery('rect[fill="#006e82"]').attr('stroke', '#006e82');
        jQuery('rect[fill="#006e82"]').attr('stroke-width', '4');
        jQuery('rect[fill="#fae6be"]').attr('stroke', '#000000');
        jQuery('rect[fill="#fae6be"]').attr('stroke-width', '4');
        jQuery('rect[fill="#00a0fa"]').attr('stroke', '#00a0fa');
        jQuery('rect[fill="#00a0fa"]').attr('stroke-width', '4');
        jQuery('rect[fill="#8214a0"]').attr('stroke', '#cccccc');
        jQuery('rect[fill="#8214a0"]').attr('stroke-width', '4');
        jQuery('rect[fill="#a0fa82"]').attr('stroke', '#a0fa82');
        jQuery('rect[fill="#a0fa82"]').attr('stroke-width', '4');
        jQuery('rect[fill="#fa7850"]').attr('stroke', '#000000');
        jQuery('rect[fill="#fa7850"]').attr('stroke-width', '4');
        jQuery('rect[fill="#005ac8"]').attr('stroke', '#005ac8');
        jQuery('rect[fill="#005ac8"]').attr('stroke-width', '4');
        jQuery('rect[fill="#f0f032"]').attr('stroke', '#000000');
        jQuery('rect[fill="#f0f032"]').attr('stroke-width', '4');
        jQuery('rect[fill="#0ab45a"]').attr('stroke', '#0ab45a');
        jQuery('rect[fill="#0ab45a"]').attr('stroke-width', '4');
        jQuery('rect[fill="#000000"]').attr('stroke', '#000000');
        jQuery('rect[fill="#000000"]').attr('stroke-width', '4');
    });
    observer.observe(container, {
        childList: true,
        subtree: true
    });


    if(reportchoice != '14' && reportchoice != '16' && reportchoice != '9' && reportchoice != '11' && reportchoice != '23') 
    {
        chart.draw(data, {
            hAxis: { format: formatVAxis,
            viewWindow:{
                    max:1,
                    min:0
                },
                ticks: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
                },
            chartArea: { left: 160, /*width:1000,*/ height: chartHeight, top: 75 },
            legend: {
                maxLines: 2,
                position: "none",
                textStyle: {
                    fontSize: 13
                }
            },
            'height': areaHeight,
            /*'width': 1400,*/ 'title': reportHeading[0] + ' in ' + statenametext + ' for ' + yearstext,
            bar: { groupWidth: groupWid },
            isStacked: true,
            colors: ['#006e82', '#fae6be', '#00a0fa', '#8214a0', '#a0fa82', '#fa7850', '#005ac8', '#f0f032', '#0ab45a', '#000000']
        });
    } else 
    
    {
        chart.draw(data, {
            hAxis: { format: formatVAxis,

                },
            chartArea: { left: 160, /*width:1000,*/ height: chartHeight, top: 75 },
            legend: {
                maxLines: 2,
                position: "none",
                textStyle: {
                    fontSize: 13
                }
            },
            'height': areaHeight,
            /*'width': 1400,*/ 'title': reportHeading[0] + ' in ' + statenametext + ' for ' + yearstext,
            bar: { groupWidth: groupWid },
            isStacked: true,
            colors: ['#006e82', '#fae6be', '#00a0fa', '#8214a0', '#a0fa82', '#fa7850', '#005ac8', '#f0f032', '#0ab45a', '#000000']
        });

    }

    jQuery('#legend_div').append(legendHTML);
}

function doQuery(q, i, reportHeader, reportchoice) {

    var tableTarget = 'table_div_' + i;
    var tableTitleTarget = 'table_div_' + i + '_title';
    
    /* if(summReportChecked()) {
        jQuery('#' + tableTitleTarget).attr('data-target',tableTarget).addClass('card-header clearable').append('<h5><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#' + tableTarget + '" aria-expanded="false" aria-controls="' + tableTarget + '"><strong>' + reportHeader + (reportchoice == '30' ?' in ' + statenametext : '') + ' for ' + yearstext + '</strong></button></h5>' );
        if(!jQuery('#' + tableTarget).hasClass('collapse'))jQuery('#' + tableTarget).addClass('collapse'); jQuery('#' + tableTarget).attr('aria-labelledby',tableTitleTarget).attr('data-parent','#summ_accordion').attr('aria-expanded',false);

    } else */
    if (reportchoice == '30') {
        return;
    } else if (reportchoice >= '31' && reportchoice <= '36') {
        jQuery('#' + tableTitleTarget).append('<h5><strong>' + reportHeader + ' ' + yearstext + '</strong></h5><p class="tableInstruct"><em>Select the table headings to sort table data</em></p>');
        if (jQuery('#' + tableTarget).hasClass('collapse')) jQuery('#' + tableTarget).removeClass('collapse');
        jQuery('#' + tableTarget).attr('aria-labelledby', tableTitleTarget).attr('data-parent', '#summ_accordion').attr('aria-expanded', true);

    }
     else {
        jQuery('#' + tableTitleTarget).append('<h5><strong>' + reportHeader + ' in ' + statenametext + ' for ' + yearstext + '</strong></h5><p class="tableInstruct"><em>Select the table headings to sort table data</em></p>');
        if (jQuery('#' + tableTarget).hasClass('collapse')) jQuery('#' + tableTarget).removeClass('collapse');
        jQuery('#' + tableTarget).attr('aria-labelledby', tableTitleTarget).attr('data-parent', '#summ_accordion').attr('aria-expanded', true);

    }
    q.send(function(response) {
        var data = response.getDataTable();
        var dataView = new google.visualization.DataView(data);
        var numrows = dataView.getNumberOfRows();
        if (numrows === 0 && i === 0 && !clearAll) {
            jQuery('#chart_div').prepend('<h5>Your query produced no results.  Try again.</h5>');
            jQuery('#' + tableTitleTarget + ' h5').remove();
            jQuery('#chart_div > div').remove();
            jQuery('#legend_div').empty();
            if(jQuery('button#spreadDL').hasClass('toggleShow')) jQuery('button#spreadDL').removeClass('toggleShow');
            if(jQuery('.switchNum').hasClass('toggleShow'))jQuery('.switchNum').removeClass('toggleShow');
            jQuery('.dlHeading').hide();
            if(jQuery('button#printButton').hasClass('toggleShow')) jQuery('button#printButton').removeClass('toggleShow');
            return;
        }
        data.setProperty(0, 0, 'style', 'width:100px');

        if (reportchoice != '30') {
            var container = document.getElementById(tableTarget);
            var table = new google.visualization.Table(
                container);
            table.draw(data, {
                showRowNumber: false,
                allowHtml: true
            });
        }



    });




}

/* not doing anything
$(window).resize(function(){
  drawChart();
}); */
