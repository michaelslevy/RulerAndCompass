var LineIntersections = function(){
    
    var self=this;
	  
<<<<<<< HEAD
    this.line1Id="";
    this.line2Id="";
    this.coords='';
    var precision=6;//decimal precision of calculations
=======
    self.line1Id="";
    self.line2Id="";
    self.coords='';
    var precision=6;
>>>>>>> lineIntersectionFix
    
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
	this.intersection_point=function(){
		
		if(self.line1Id!='' &&  self.line2Id !='' ){
			this.setCoordinates();
			this.defineSlopesAndIntercepts();
			this.calculateXYcoordinates();
           
			if(this.insideLines()==false ){
				return false;
<<<<<<< HEAD
                console.log("outside");
			} else if(isNaN(this.coords.x)==true){
                console.log("nan");
                return false;
            }    else {
                console.log(this.coords);
				return this.coords;
=======
			} else {
				return self.coords;
>>>>>>> lineIntersectionFix
			}
		}
        
	}
	
	//define coordinates for each line
	this.setCoordinates=function(){
		
<<<<<<< HEAD
		this.line1Attributes['x1']=$("line[data-identifier='"+this.line1Id+"']").attr("x1");
		this.line1Attributes['y1']=$("line[data-identifier='"+this.line1Id+"']").attr("y1");
		this.line1Attributes['x2']=$("line[data-identifier='"+this.line1Id+"']").attr("x2");
		this.line1Attributes['y2']=$("line[data-identifier='"+this.line1Id+"']").attr("y2");
		
		this.line2Attributes['x1']=$("line[data-identifier='"+this.line2Id+"']").attr("x1");
		this.line2Attributes['y1']=$("line[data-identifier='"+this.line2Id+"']").attr("y1");
		this.line2Attributes['x2']=$("line[data-identifier='"+this.line2Id+"']").attr("x2");
		this.line2Attributes['y2']=$("line[data-identifier='"+this.line2Id+"']").attr("y2");
        		
=======
		self.line1Attributes['x1']=$("line[data-identifier='"+self.line1Id+"']").attr("x1");
		self.line1Attributes['y1']=$("line[data-identifier='"+self.line1Id+"']").attr("y1");
		self.line1Attributes['x2']=$("line[data-identifier='"+self.line1Id+"']").attr("x2");
		self.line1Attributes['y2']=$("line[data-identifier='"+self.line1Id+"']").attr("y2");

		self.line2Attributes['x1']=$("line[data-identifier='"+self.line2Id+"']").attr("x1");
		self.line2Attributes['y1']=$("line[data-identifier='"+self.line2Id+"']").attr("y1");
		self.line2Attributes['x2']=$("line[data-identifier='"+self.line2Id+"']").attr("x2");
		self.line2Attributes['y2']=$("line[data-identifier='"+self.line2Id+"']").attr("y2");
                		
>>>>>>> lineIntersectionFix
	}
	
	//get slopes and y intercepts for each line
	
	this.defineSlopesAndIntercepts=function(){
		self.line1Attributes.slope=$("line[data-identifier='"+self.line1Id+"']").LineEquation({x1:this.l1x1,x2:this.l1x2,y1:this.l1y1,y2:this.l1y2}).getSlope();
	 	self.line1Attributes.yIntercept=$("line[data-identifier='"+self.line1Id+"']").LineEquation({x1:this.l1x1,x2:this.l1x2,y1:this.l1y1,y2:this.l1y2}).getYintercept();
	 	
<<<<<<< HEAD
	 	this.line2Attributes.slope=$("line[data-identifier='"+this.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getSlope();
	 	this.line2Attributes.yIntercept=$("line[data-identifier='"+this.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getYintercept();

=======
	 	self.line2Attributes.slope=$("line[data-identifier='"+self.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getSlope();;
	 	self.line2Attributes.yIntercept=$("line[data-identifier='"+self.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getYintercept();
>>>>>>> lineIntersectionFix
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
<<<<<<< HEAD
		var a=this.line1Attributes.slope;
		var b=this.line2Attributes.slope;
		var c=this.line1Attributes.yIntercept;
		var d=this.line2Attributes.yIntercept;
        
        if(typeof a=="undefined" || typeof b=="undefined" || typeof c=="undefined" || typeof d=="undefined"){
         return false;   
        }    
		
		var x=(d-c)/(a-b).toFixed();
=======
		var a=self.line1Attributes.slope;
		var b=self.line2Attributes.slope;
		var c=self.line1Attributes.yIntercept;
		var d=self.line2Attributes.yIntercept;
        
		var x=(d-c)/(a-b).toFixed(precision);
>>>>>>> lineIntersectionFix
		var y=a*((d-c)/(a-b))+c;
        
		
<<<<<<< HEAD
        console.log(a,b,c,d,x,y,this.line1Attributes,this.line2Attributes);
        
		this.coords=new Coords(x,y); 
=======
		self.coords=new Coords(x,y); 
		
>>>>>>> lineIntersectionFix
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