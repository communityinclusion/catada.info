jQuery.noConflict();
 jQuery(document).ready(function() {
    

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

});