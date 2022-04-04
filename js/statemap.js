jQuery.noConflict();
 jQuery(document).ready(function() {
    jQuery("#jumpState").submit(function(event){
        event.preventDefault();
    });
        if (window.location.href.indexOf("state.html") > -1) {
        var stateHash = window.location.hash.substr(1) ? window.location.hash.substr(1) : '' ;
        console.log('State page');

        if(stateHash.length > 0) {
            console.log(stateHash);
        var url = '#' + stateHash;
        window.location = url;
        jQuery('#stateHolder > div').removeClass("stateDisplay");
        jQuery('#stateHolder > div').addClass("phpfix");
        jQuery('#stateHolder ' + url).addClass("stateDisplay");
        jQuery('#stateHolder ' + url).removeClass("phpfix");
        jQuery('html, body').animate({
                    scrollTop: jQuery("#stateHolder").offset().top
                    }, 200);
                }




        }



     jQuery(".stateGroup").mouseenter(function() {
                jQuery(this).find('*').not("text").css('fill','#bec3c6');
                })
     jQuery(".stateGroup").mouseleave(function() {
               jQuery(this).children().css('fill','');
     });



    jQuery(".stateGroup").click(

    function()
    {
        var stateId = jQuery(this).attr('id').substring(4);
        var url = '#' + stateId;
         window.location = url;
        jQuery('#stateHolder > div').removeClass("stateDisplay");
        jQuery('#stateHolder > div').addClass("phpfix");
        jQuery('#stateHolder #' + stateId).addClass("stateDisplay");
        jQuery('#stateHolder #' + stateId).removeClass("phpfix");
        jQuery('html, body').animate({
                        scrollTop: jQuery("#stateHolder").offset().top
                    }, 200);
        return false;
    });

    jQuery("#chooseState").click(function(){




        var selectState = jQuery('#jumpState #stateSelect').find(":selected").val();
        console.log('selected: ' + selectState);
        var stateId = selectState;
        var url = '#' + stateId;
         window.location = url;
        jQuery('#stateHolder > div').removeClass("stateDisplay");
        jQuery('#stateHolder > div').addClass("phpfix");
        jQuery('#stateHolder #' + stateId).addClass("stateDisplay");
        jQuery('#stateHolder #' + stateId).removeClass("phpfix");
        jQuery('html, body').animate({
                        scrollTop: jQuery("#stateHolder").offset().top
                    }, 200);
        return false;

    });

});
