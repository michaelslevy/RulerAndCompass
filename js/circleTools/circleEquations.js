/* algorithm adapted from csharphelper:
 * http://csharphelper.com/blog/2014/09/determine-where-two-circles-intersect-in-c/
 * http://csharphelper.com/blog/2014/09/determine-where-a-line-intersects-a-circle-in-c/
 * */
;(function ( $, window, document, undefined ) {
	$.fn.CircleEquation = function(settings){
		 var self=this;  	
    		
    	var circle1=new Circle(0,0,0);
		var circle2=new Circle(0,0,0);
		var line=new Line(0,0,0,0);
    		
		 var config = {
			circleToTest:'', //svg circle node to test against
			lineToTest:''
        }
		  
		if (settings) {
            $.extend(config, settings);
        }
        			        
		var init = function() {
		  self.settings = $.extend({}, config, settings);
		  			  	
		  	if(typeof config.circleToTest==="undefined"){
		  		console.log("circleToTest is undefined");
		  		return false;
		  	}
		  
		  	circle1.cx=Number($(self).attr('cx'));
			circle1.cy=Number($(self).attr('cy'));
			circle1.radius=Number($(self).attr('r')); 
			
			if(typeof config.circleToTest != "undefined"){
				circle2.cx=Number($(config.circleToTest).attr('cx'));
				circle2.cy=Number($(config.circleToTest).attr('cy'));
				circle2.radius=Number($(config.circleToTest).attr('r')); 
			}
			
			if(typeof config.lineToTest != "undefined"){
				var x1=Number($(config.lineToTest).attr('x1'));
				var y1=Number($(config.lineToTest).attr('y1'));
				var x2=Number($(config.lineToTest).attr('x2'));
				var y2=Number($(config.lineToTest).attr('y2'));
				
				line=new Line(x1,y1,x2,y2);
			}
					  			  
		  	return self;
		}             
        
        // Find the points where the two circles intersect.
       self.FindCircleCircleIntersections=function(){
                      
			var cx0=circle1.cx;
			var cy0=circle1.cy;
			var radius0=circle1.radius;
			
			var cx1=circle2.cx;
			var cy1=circle2.cy;
			var radius1=circle2.radius;
			           
			var intersection1;
			var intersection2;
		
	   		// Find the distance between the centers.
	    	var dx = cx0 - cx1;
	    	var dy = cy0 - cy1;
	    	var dist = Math.sqrt(dx * dx + dy * dy);
	
	    	// See how many solutions there are.
	    	if (dist > radius0 + radius1){
		        return false;
		    }
		    else if (dist < Math.abs(radius0 - radius1))
		    {
		        // No solutions, one circle contains the other.
		        return false;
		    }
		    else if ((dist == 0) && (radius0 == radius1))
		    {
		        // No solutions, the circles coincide.
		        return false;
		    }
		    else
		    {
		        // Find a and h.
		        var a = (radius0 * radius0 -
		            radius1 * radius1 + dist * dist) / (2 * dist);
		        var h = Math.sqrt(radius0 * radius0 - a * a);
		
		        // Find P2.
		        var cx2 = cx0 + a * (cx1 - cx0) / dist;
		        var cy2 = cy0 + a * (cy1 - cy0) / dist;
		
		        // Get the points P3.
		        intersection1 = new Coords(
		            (cx2 + h * (cy1 - cy0) / dist),
		            (cy2 - h * (cx1 - cx0) / dist));
		        intersection2 = new Coords(
		            (cx2 - h * (cy1 - cy0) / dist),
		            (cy2 + h * (cx1 - cx0) / dist));
		
				var intersections=[intersection1, intersection2];
		       return intersections;
	        
	   		}
		}
		
		self.findCircleLineIntersection=function(){
		
			if(typeof circle1 ==="undefined"){
				console.log("circle 1 is not defined.");
				return false;	
			}	
			
			if(typeof line === "undefined"){
				console.log("line is not defined.");
				return false;	
			}	
				
			// Find the points of intersection.
		    	var cx=circle1.cx;
		    	var cy=circle1.cy;
		    	var radius=circle1.radius;
		        var point1=new Coords(line.x1,line.y1);
		        var point2=new Coords(line.x2,line.y2);
		        var intersection1="";
		        var intersection2="";

		        var dx="";
		        var dy="";
		        var A="";
		        var B="";
		        var C="";
		        var det="";
		        var t="";
		
		
		        dx = point2.x - point1.x;
		        dy = point2.y - point1.y;
		        		
		        A = dx * dx + dy * dy;
		        B = 2 * (dx * (point1.x - cx) + dy * (point1.y - cy));
		        C = (point1.x - cx) * (point1.x - cx) + (point1.y - cy) * (point1.y - cy) - radius * radius;
		
		        det = B * B - 4 * A * C;
		        if ((A <= 0.0000001) || (det < 0))
		        {
		            // No real solutions.
		            return false;
		        }
		        else if (det == 0)
		        {
		            // One solution.
		            t = -B / (2 * A);
		            var x=lineXintercept(point1.x,t,dx);
		            var y=lineYintercept(point1.y,t,dy);
		            
		            if(pointOK(x,y)==true){
		            	intersection1 = new Coords(x,y);
		            } else {
		            	intersection1 = false;
		            }
		            
		            intersection2 = false;
		            var intersections=[intersection1,intersection2];
		            return intersections;
		        }
		        else
		        {
		            // Two solutions.
		            t = ((-B + Math.sqrt(det)) / (2 * A));
		            var x=lineXintercept(point1.x,t,dx);
		            var y=lineYintercept(point1.y,t,dy);
		            if(pointOK(x,y)==true){
		            	intersection1 = new Coords(x,y);
		            } else {
		            	intersection1 = false;
		            }
		            
		            t = ((-B - Math.sqrt(det)) / (2 * A));
		            var x=lineXintercept(point1.x,t,dx);
		            var y=lineYintercept(point1.y,t,dy);
		            if(pointOK(x,y)==true){
		            	intersection2 = new Coords(x,y);
		            } else {
		            	intersection2 = false;
		            }
		            
		            var intersections=[intersection1,intersection2];
		            return intersections;
		        }
		}
		
		
		function lineXintercept(x,t,dx){
			
			var x=x;
			var t=t;
			var dx=dx;
			
			return x + t * dx;
		}
		
		function lineYintercept(y,t,dy){
			var y=y;
			var t=t;
			var dx=dx;
			
			return y + t * dy;
		}
		
		function pointOK(x,y){
			var x=x;
			var y=y;
			
			/* Is line is inside circle?
			 * detect if intersection points are larger or smaller than both x or both y line attributes */
			
			if( (line.x1>x && line.x2>x) || (line.x1<x && line.x2<x) || (line.y1>y && line.y2>y) || (line.y1<y && line.y2<y) ){
				return false;
			} else {
				return true;
			}

		}
		
		init();
		return self;
	}
})(jQuery, window, document);
	