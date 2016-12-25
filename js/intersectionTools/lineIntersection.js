var LineIntersections = function(){
    
    var self=this;
	  
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
		
		if(self.line1Id!='' &&  self.line2Id !='' ){
			self.setCoordinates();
			self.defineSlopesAndIntercepts();
			self.calculateXYcoordinates();
                      
			if(self.insideLines()==false ){
				return false;
			} else {
				return self.coords;
			}
		}
        
	}
	
	//define coordinates for each line
	self.setCoordinates=function(){
		
		self.line1Attributes['x1']=$("line[data-identifier='"+self.line1Id+"']").attr("x1");
		self.line1Attributes['y1']=$("line[data-identifier='"+self.line1Id+"']").attr("y1");
		self.line1Attributes['x2']=$("line[data-identifier='"+self.line1Id+"']").attr("x2");
		self.line1Attributes['y2']=$("line[data-identifier='"+self.line1Id+"']").attr("y2");

		self.line2Attributes['x1']=$("line[data-identifier='"+self.line2Id+"']").attr("x1");
		self.line2Attributes['y1']=$("line[data-identifier='"+self.line2Id+"']").attr("y1");
		self.line2Attributes['x2']=$("line[data-identifier='"+self.line2Id+"']").attr("x2");
		self.line2Attributes['y2']=$("line[data-identifier='"+self.line2Id+"']").attr("y2");
                
         var id1= "L"+self.line1Id;
         var id2= "L"+self.line2Id;
          
         
           console.log(id1,id2);
                		
              var L1 = document.getElementById(id1);
              
              var L2 = document.getElementById(id2);
              
               console.log(L1, self.line1Attributes, L2, self.line2Attributes); 
               
			var LX1 = L1.getAttribute("x1");  
			var LX2 = L2.getAttribute("x1");  		
                		
		console.log(LX1, LX2);
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
		
		
		self.line1Attributes.slope=$("line[data-identifier='"+self.line1Id+"']").LineEquation({x1:l1x1,x2:l1x2,y1:l1y1,y2:l1y2}).getSlope();
	 	self.line1Attributes.yIntercept=$("line[data-identifier='"+self.line1Id+"']").LineEquation({x1:l1x1,x2:l1x2,y1:l1y1,y2:l1y2}).getYintercept();
	 	
	 	self.line2Attributes.slope=$("line[data-identifier='"+self.line2Id+"']").LineEquation({x1:l2x1,x2:l2x2,y1:l2y1,y2:l2y2}).getSlope();
	 	self.line2Attributes.yIntercept=$("line[data-identifier='"+self.line2Id+"']").LineEquation({x1:l2x1,x2:l2x2,y1:l2y1,y2:l2y2}).getYintercept();
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
        
        console.log(a,b,c,d);
        
		var x=(d-c)/(a-b);
		var y=a*((d-c)/(a-b))+c;
        
		self.coords=new Coords(x,y); 
		
		console.log(self.coords);
		
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