var LineIntersections = function(){
    
    var self=this;
	
	self.line1;
	self.line2;
	  
    self.line1Id="";
    self.line2Id="";
    self.coords='';
    var precision=6;
    
    self.line1Attributes={
	  	x1:"",
		y1:"",
		x2:"",
		y2:"",
		slope:"",
		yIntercept:""
    }

	self.line2Attributes={
	  	x1:"",
		y1:"",
		x2:"",
		y2:"",
		slope:"",
		yIntercept:""
    }
		
	//find and return intersection points
	self.intersection_point=function(){
		
		if(typeof self.line1!='undefined' &&  typeof self.line2 !='undefined' ){
			self.setCoordinates();
			self.defineSlopesAndIntercepts();
			
			if(isFinite(self.line1Attributes.slope)==false || isFinite(self.line2Attributes.slope)==false ){
				self.calculateXYcoordinatesVertical();
			} else {
				self.calculateXYcoordinates();
			}
         
			if(self.insideLines()==false ){
				return false;
			} else {
				return self.coords;
			}
		}
        
	}
	
	//define coordinates for each line
	self.setCoordinates=function(){
				
		self.line1Attributes['x1']=self.line1.attr("x1");
		self.line1Attributes['y1']=self.line1.attr("y1");
		self.line1Attributes['x2']=self.line1.attr("x2");
		self.line1Attributes['y2']=self.line1.attr("y2");

		self.line2Attributes['x1']=self.line2.attr("x1");
		self.line2Attributes['y1']=self.line2.attr("y1");
		self.line2Attributes['x2']=self.line2.attr("x2");
		self.line2Attributes['y2']=self.line2.attr("y2");

}
	
	//get slopes and y intercepts for each line
	
	self.defineSlopesAndIntercepts=function(){
		
		var l1x1=self.line1Attributes.x1;
		var l1x2=self.line1Attributes.x2;
		var l2x1=self.line2Attributes.x1;
		var l2x2=self.line2Attributes.x2;
		
		var l1y1=self.line1Attributes.y1;
		var l1y2=self.line1Attributes.y2;
		var l2y1=self.line2Attributes.y1;
		var l2y2=self.line2Attributes.y2;
		
		
		self.line1Attributes.slope=$(self.line1).LineEquation({x1:l1x1,x2:l1x2,y1:l1y1,y2:l1y2}).getSlope();
	 	self.line1Attributes.yIntercept=$(self.line1).LineEquation({x1:l1x1,x2:l1x2,y1:l1y1,y2:l1y2}).getYintercept();
	 	
	 	self.line2Attributes.slope=$(self.line2).LineEquation({x1:l2x1,x2:l2x2,y1:l2y1,y2:l2y2}).getSlope();
	 	self.line2Attributes.yIntercept=$(self.line2).LineEquation({x1:l2x1,x2:l2x2,y1:l2y1,y2:l2y2}).getYintercept();
	}
	
	/*
	 * Run interception formula
	 * 
	 * Slopes: a&b
	 * Y-Intercepts: c&d
	 * 
	 * ax+c=bx+d
	 * x=(d-c)/a-b 
	 * y=a(d-c/a-b)+c
	 * 
	 */
	
	this.calculateXYcoordinates=function(){

		var a=self.line1Attributes.slope;
		var b=self.line2Attributes.slope;
		var c=self.line1Attributes.yIntercept;
		var d=self.line2Attributes.yIntercept;
                
		var x=(d-c)/(a-b);
		var y=a*((d-c)/(a-b))+c;
        
		self.coords=new Coords(x,y); 
				
	}
	
	self.calculateXYcoordinatesVertical=function(){
			
			var X;
			var Y;
			
			if(isFinite(self.line1Attributes.slope)==false) {
				X=self.line1Attributes.x1;
				Y=self.line2.LineEquation({known_x:X}).y_from_x();
			}	else if (isFinite(self.line2Attributes.slope)==false ){
				X=self.line2Attributes.x1;
				Y=self.line1.LineEquation({known_x:X}).y_from_x();
			} else {
				console.warn("No vertical line found");
				return false;
			}
			
			self.coords=new Coords(X,Y); 
			
	}			
	
	//determine whether coordinates lie inside the bounds of the line
	this.insideLines=function(){
		
		var ix=self.coords.x;
		var l1x1=self.line1Attributes.x1;
		var l1x2=self.line1Attributes.x2;
		var l2x1=self.line2Attributes.x1;
		var l2x2=self.line2Attributes.x2;
				
		//if the intersection X position is > or < both line x1 and x2 coordinates, the line is outside of the bounds
		if((ix > l1x1 && ix > l1x2) ||  (ix > l2x1 && ix > l2x2) || (ix < l1x1 && ix < l1x2) ||  (ix < l2x1 && ix < l2x2)   ){
			return false;
		}
		else { 
			return true; 
		}
		
	}
		
}