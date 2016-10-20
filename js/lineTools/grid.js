;(function ( $, window, document, undefined ) {
	$.fn.Grid = function(settings){
	  
		 var plugin=this;
		  
		  var config = {
            unit:10
            //onSomeEvent: function() {}
        }
		  
		if (settings) {
            $.extend(config, settings);
        }
			        
		  var init = function() {
		  	plugin.settings = $.extend({}, config, settings);
           	plugin.draw_grid();
           
		  }
		  
		plugin.draw_grid=function(){
						
			var unit=config.unit;
			console.log('unit '+config.unit );
				
			frame_height=$(this).height();
			frame_width=$(this).width();

		
			for(y=0;y<frame_height;y=y+unit){	
				draw_line('0%','100%',y, y,'gridline y');
			}
						
			for(x=0;x<frame_width;x=x+unit){	
				draw_line(x, x,'0%','100%','gridline x');
			}
		
		}
		
		
		var draw_line=function(x1,x2 ,y1, y2, css_class ){
			var svgNS = "http://www.w3.org/2000/svg"; 
			var mLine = document.createElementNS(svgNS,"line"); 
		    mLine.setAttributeNS(null,"class",css_class);
		    mLine.setAttributeNS(null,"x1",x1);
		    mLine.setAttributeNS(null,"x2",x2);
		    mLine.setAttributeNS(null,"y1",y1);
		    mLine.setAttributeNS(null,"y2",y2);
		    
		    document.getElementById("grid").appendChild(mLine);
		}

		init();
		
	}
	
})(jQuery, window, document);	
	