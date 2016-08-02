var LineIntersections = function(){
	  
    this.line1Id="";
    this.line2Id="";
    this.coords='';
    var precision=6;//decimal precision of calculations
    
    this.line1Attributes={
	  	x1:"",
		y1:"",
		x2:"",
		y2:"",
		slope:"",
		yIntercept:""
    }

	this.line2Attributes={
	  	x1:"",
		y1:"",
		x2:"",
		y2:"",
		slope:"",
		yIntercept:""
    }
		
	//find and return intersection points
	this.intersection_point=function(){
		
		if(this.line1Id!='' &&  this.line2Id !='' ){
			
			this.setCoordinates();
			this.defineSlopesAndIntercepts();
			this.calculateXYcoordinates();
           
			if(this.insideLines()==false ){
				return false;
                console.log("outside");
			} else if(isNaN(this.coords.x)==true){
                console.log("nan");
                return false;
            }    else {
                console.log(this.coords);
				return this.coords;
			}
		}
	}
	
	//define coordinates for each line
	this.setCoordinates=function(){
		
		this.line1Attributes['x1']=$("line[data-identifier='"+this.line1Id+"']").attr("x1");
		this.line1Attributes['y1']=$("line[data-identifier='"+this.line1Id+"']").attr("y1");
		this.line1Attributes['x2']=$("line[data-identifier='"+this.line1Id+"']").attr("x2");
		this.line1Attributes['y2']=$("line[data-identifier='"+this.line1Id+"']").attr("y2");
		
		this.line2Attributes['x1']=$("line[data-identifier='"+this.line2Id+"']").attr("x1");
		this.line2Attributes['y1']=$("line[data-identifier='"+this.line2Id+"']").attr("y1");
		this.line2Attributes['x2']=$("line[data-identifier='"+this.line2Id+"']").attr("x2");
		this.line2Attributes['y2']=$("line[data-identifier='"+this.line2Id+"']").attr("y2");
        		
	}
	
	//get slopes and y intercepts for each line
	
	this.defineSlopesAndIntercepts=function(){
		this.line1Attributes.slope=$("line[data-identifier='"+this.line1Id+"']").LineEquation({x1:this.l1x1,x2:this.l1x2,y1:this.l1y1,y2:this.l1y2}).getSlope();
	 	this.line1Attributes.yIntercept=$("line[data-identifier='"+this.line1Id+"']").LineEquation({x1:this.l1x1,x2:this.l1x2,y1:this.l1y1,y2:this.l1y2}).getYintercept();
	 	
	 	this.line2Attributes.slope=$("line[data-identifier='"+this.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getSlope();
	 	this.line2Attributes.yIntercept=$("line[data-identifier='"+this.line2Id+"']").LineEquation({x1:this.l2x1,x2:this.l2x2,y1:this.l2y1,y2:this.l2y2}).getYintercept();

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
		var a=this.line1Attributes.slope;
		var b=this.line2Attributes.slope;
		var c=this.line1Attributes.yIntercept;
		var d=this.line2Attributes.yIntercept;
        
        if(typeof a=="undefined" || typeof b=="undefined" || typeof c=="undefined" || typeof d=="undefined"){
         return false;   
        }    
		
		var x=(d-c)/(a-b).toFixed();
		var y=a*((d-c)/(a-b))+c;
		
        console.log(a,b,c,d,x,y,this.line1Attributes,this.line2Attributes);
        
		this.coords=new Coords(x,y); 
	}
	
	//determine whether coordinates lie inside the bounds of the line
	this.insideLines=function(){
		
		var ix=this.coords.x;
		var l1x1=this.line1Attributes.x1;
		var l1x2=this.line1Attributes.x2;
		var l2x1=this.line2Attributes.x1;
		var l2x2=this.line2Attributes.x2;
				
		//if the intersection X position is > or < both line x1 and x2 coordinates, the line is outside of the bounds
		if((ix > l1x1 && ix > l1x2) ||  (ix > l2x1 && ix > l2x2) || (ix < l1x1 && ix < l1x2) ||  (ix < l2x1 && ix < l2x2)   ){
			return false;
		}
		else { 
			return true; 
		}
		
	}
		
}