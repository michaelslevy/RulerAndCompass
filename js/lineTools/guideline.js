;(function ( $, window, document, undefined ) {
	$.fn.Guideline = function(settings){
	  
		 var plugin=this;
         var groupID=$(this).attr('id');
		 var line_id="l"+$("svg line").length+1;
    
		  var config = {
		  	"x":"nan",
		  	"y":"nan",
            "x1":"nan",
            "x2":"nan",
            "y1":"nan", 
            "y2":"nan",
            "lineWidth":1,  //Variable remembers  value at scale 1. Line width will change according to zoom. 
            "css_class":"guideline"
          }
		  
		if (settings) {
            $.extend(config, settings);
        }
          			        
		  var init = function() {
		  	plugin.settings = $.extend({}, config, settings);
		  	return plugin;
		  }          
        
        plugin.log= function() { 
            console.log('logging works'); 
        }

        plugin.draw_guideline_vertical=function(){
        	config.x1=config.x;
        	config.x2=config.x;
            config.y1=0;
            config.y2='100%';
            draw_line();
        }

        plugin.draw_guideline_horizontal=function(){
            config.y1=config.y;
            config.y2=config.y;
            config.x1=0;
            config.x2='100%';
            draw_line();
        }
        
        plugin.draw=function(){ 
            draw_line(); 
        }      
		
       var draw_line=function(){
            
            if(config.x1=='nan' ||  config.x2=="nan" ||  config.y1=="nan" || config.y2=="nan"){
                console.log('GUIDELINE PLUGIN: missing parameter - x1, x2, y1, y2 are required');
                return;
            }   
            
            var scaleAttr=$("#nest").attr('data-scale');
            var scale=1/parseFloat(scaleAttr);
         
			var svgNS = "http://www.w3.org/2000/svg"; 
			var mLine = document.createElementNS(svgNS,"line"); 
		    mLine.setAttributeNS(null,"class",config.css_class);
		    mLine.setAttributeNS(null,"data-identifier",line_id); 
		    mLine.setAttributeNS(null,"data-lineWidth",config.lineWidth); //set absolute line width
		    mLine.setAttributeNS(null,"x1",config.x1);
		    mLine.setAttributeNS(null,"x2",config.x2);
		    mLine.setAttributeNS(null,"y1",config.y1);
		    mLine.setAttributeNS(null,"y2",config.y2);
		    mLine.setAttributeNS(null,"style","stroke-width:"+scale);
		  /*  mLine.setAttributeNS(null,"y2",config.y2);*/ 
		    
		    document.getElementById(groupID).appendChild(mLine);
		    return plugin;
		}

		init();
		return plugin;
	}
	
})(jQuery, window, document);
	