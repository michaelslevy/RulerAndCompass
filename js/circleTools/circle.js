;(function ( $, window, document, undefined ) {
    
$.fn.Circle = function(settings){
  
    var plugin=this;
    
    var win_height=$('#frame').height();
    var win_width=$('#frame').width();

   var config = {
        "radius": 100,
        "cx": win_width/2,
        "cy":win_height/2,
        "css_class":'guide'
        //onSomeEvent: function() {}
    }

    if (settings) {
        $.extend(config, settings);
    }
    
    var init = function() {
        plugin.settings = $.extend({}, config, settings);
        plugin.draw_circle();
    }

    plugin.draw_circle=function(){

        var svgNS = "http://www.w3.org/2000/svg"; 
        var mLine = document.createElementNS(svgNS,"circle"); 
        mLine.setAttributeNS(null,"class",config.css_class);
        mLine.setAttributeNS(null,"r",config.radius);
        mLine.setAttributeNS(null,"cx",config.cx);
        mLine.setAttributeNS(null,"cy",config.cy);

        document.getElementById("guidecircles").appendChild(mLine); 

    }
    
    init();

}

})( jQuery, window, document );
 /* 
  	var myCircle="<g class='circleGroup'>"+
		"<circle cx='"+xPos+"' cy='"+yPos+"' r='"+Radius+"' class='principal' />"+
		"<line x1="50%" y1="0" x2="50%" y2="100%" class='guideline' />"+
		"<line x1="0" y1="50%" x2="100%" y2="50%" class='guideline' />"+
		"<circle cx='"+xPos+"' cy='"+yPos+"' r="2"  class='centerpoint'/>"+
	"</g>";
    
 */