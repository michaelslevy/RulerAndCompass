var LineIntersections = function(){
	  
    this.line1Id="";
    this.line2Id="";
    
	this.l1x1="";
	this.l1y1="";
	this.l1x2="";
	this.l1y2="";
	this.l1Slope="";
	this.l1Yintercept="";

	this.l2x1="";
	this.l2y1="";
	this.l2x2="";
	this.l2y2="";
	this.l2Slope="";
	this.l2Yintercept="";
		
	//find and return intersection points
	this.intersection_point=function(){
		
			console.log("finding intersects");

		if(this.line1Id!='' &&  this.line2Id !='' ){
			
			this.setCoordinates();
			this.defineSlopesAndIntercepts();
			var coord=this.calculateXYcoordinates();
			return coord;
			
		}
	}
	
	//define coordinates for each line
	this.setCoordinates=function(){
		
		this.l1x1=$("line[data-identifier='"+this.line1Id+"']").attr("x1");
		this.l1y1=$("line[data-identifier='"+this.line1Id+"']").attr("y1");
		this.l1x2=$("line[data-identifier='"+this.line1Id+"']").attr("x2");
		this.l1y2=$("line[data-identifier='"+this.line1Id+"']").attr("y2");
		
		this.l1x1=$("line[data-identifier='"+this.line2Id+"']").attr("x1");
		this.l1y1=$("line[data-identifier='"+this.line2Id+"']").attr("y1");
		this.l1x2=$("line[data-identifier='"+this.line2Id+"']").attr("x2");
		this.l1y2=$("line[data-identifier='"+this.line2Id+"']").attr("y2");
		
	}
	
	//get slopes and y intercepts for each line
	
	this.defineSlopesAndIntercepts=function(){
		this.l1Slope=$("line[data-identifier='"+this.line1Id+"']").LineEquation({x1:this.l1x1,x2:this.l1x2,y1:this.l1y1,y2:this.l1y2}).getSlope();
	 	this.l1Yintercept=$("line[data-identifier='"+this.line1Id+"']").LineEquation({x1:this.l1x1,x2:this.l1x2,y1:this.l1y1,y2:this.l1y2}).getYintercept();
	 	
	 	this.l1Slope=$("line[data-identifier='"+this.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getSlope();;
	 	this.l1Yintercept=$("line[data-identifier='"+this.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getYintercept();
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
		console.log(this.l1x1);
		console.log(this.l1Slope,this.l1Yintercept,this.l2Slope,this.l2Yintercept);
	}
	
		
}