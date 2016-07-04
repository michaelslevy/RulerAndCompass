;(function ( $, window, document, undefined ) {
	$.fn.LineEquation = function(settings){
	  
		 var self=this;
    
		  var config = {
			slope:"nan",
			y_intercept:"nan",
			x1:"nan",
			y1:"nan",
			x2:"nan",
			y2:"nan",
			known_x:'nan',
			known_y:'nan',
			magnitude:'nan',
        }
		  
		if (settings) {
            $.extend(config, settings);
        }
        			        
		var init = function() {
		  self.settings = $.extend({}, config, settings);
		  
		  	config.x1=$(self).attr('x1');
			config.y1=$(self).attr('y1');
			config.x2=$(self).attr('x2');
			config.y2=$(self).attr('y2');
			find_slope();
			find_y_intercept();
			find_magnitude();
			make_coords();
		  	
		  	//console.log(config);
		  
		  	return self;
		}          
         
		function find_slope(){
			config.slope=(config.y2-config.y1)/(config.x2-config.x1);
		}
		
		self.getSlope=function(){
			find_slope();
			return config.slope;
		}

		function find_y_intercept(){
			config.y_intercept=config.y1-(config.slope*config.x1);
		}
		
		self.getYintercept=function(){
			find_y_intercept();
			return config.y_intercept;
		}
		
		function find_magnitude(){
			
			//find x and y
			var x=config.x1-config.x2;
			var y=config.y1-config.y2;
			
			//Pythagorean Theorem
			config.magnitude=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
		}
		
		function make_coords(){
			
		}
		
		//x=(y-y_intercept)/slope
		self.x_from_y=function(){
			var ky=config.known_y;
			var slope=config.slope;
			var yi=config.y_intercept;
			
			config.known_x=(ky-yi)/slope;
			//console.log("("+kx+ ", "+config.known_y+")");
			
			return config.known_x;
		}
		
		//y=slope*x+y-intercept
		self.y_from_x=function(){
			var kx=config.known_x;
			var slope=config.slope;
			var yi=config.y_intercept;
			
			if(isNaN(kx)){
				console.log("Error:known_x is not defined");
			}
			if(isNaN(slope)){ 
				console.log("Error:slope is not defined");
			}
			if(isNaN(yi)){ 
				console.log("Error:y-intercept is not defined");
			}
			
			config.known_y=slope*kx+yi;
			//console.log("("+kx+ ", "+config.known_y+")");
			
			return config.known_y;
		}
		
		init();
		return self;
	}
})(jQuery, window, document);
	