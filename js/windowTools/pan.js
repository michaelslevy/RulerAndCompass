var WindowPan=function(){
	var self=this;
	
	self.pan=false;
    self.panMode=false;
    self.event=false;
    centerpointOffset={
    	x: 0,
    	y:0
    }
    
    var parent_offset, viewBox;
    
   var panOffset={
    	x:0,
    	y:0
    };
    
    var init=function(){
	    setValues();
	    return self;
    }
   
   //seperate viewbox attribute and asign them to seperate values
   var setValues=function(){
   	
   		parent_offset=jQuery('#nest').parent().offset();
	        
	    viewBox=document.getElementById("nest").getAttribute("viewBox");
	    if(typeof viewBox != "undefined" &&  viewBox != null){
	    	 viewBox_a=viewBox.match(/-?[\d\.]+/g);
		    panOffset.x=parseInt(viewBox_a[0]);
		    panOffset.y=parseInt(viewBox_a[1]);
	    }
	   
   }
   
   /* Find Absolute Mouse Coords 
    * If starting a new pan define pan property
    */
   self.checkPan=function(e){
   		
   		//set event
   		self.event=e;
   		
   		//test if pan mode is on
	   	if(self.panMode != false){
	   		
	   			//define pan property
	            if(self.panMode=="start"){
	            	
	            	//find the offset of the frmae that holds the SVG element from the page
	                parent_offset=jQuery('#nest').parent().offset();
	                
	                //set x, y values by subtracting page offset from current mouse position
	                x=parseInt(self.event.pageX-parent_offset.left);
				    y=parseInt(self.event.pageY-parent_offset.top);
	               
	               //set pan property
	                self.pan=new Coords(x,y);
	                self.panMode=true;
	            }    
	            panViewBox();
	        }    
   }
   
   /* SET PAN
   Finds the difference between the mouse position current pan
   Scales the difference
   Chnages Viewbox Value 
   */
  	var panViewBox = function(){
        
        //get current mouse coordinates
        var parent_offset=jQuery('#nest').parent().offset();
        var curX=parseInt(self.event.pageX)-parent_offset.left;
		var curY=parseInt(self.event.pageY)-parent_offset.top;
        
        //get curent scale
        var scale=Number($("#nest").attr("data-scale"));
        
        //get difference of current and pan increment
        var xDiff=(self.pan.x-curX)/scale;
        var yDiff=(self.pan.y-curY)/scale;
        
        //add to viewport paramaeters
        var viewX=parseInt($("#nest").attr("data-left"));
        var viewY=parseInt($("#nest").attr("data-top"));
        
        var x = viewX+xDiff;
        var y= viewY+yDiff;
                        
       updateViewBox(x,y);
    } 
    
    /* UPDATE VIEWBOX
     * Recieves x and y and retrieves width and height from SVG attributes
     */
    var updateViewBox=function(x,y){
    	 var w=$("#nest").attr("data-width");
        var h=$("#nest").attr("data-height");
    	document.getElementById("nest").setAttribute("viewBox", x+" "+y+" "+w+" "+h);
    }
    
    self.getPanOffset =function(){
        var offset=[];
        var viewBox=document.getElementById("nest").getAttribute("viewBox");
        var viewBox_a=viewBox.match(/-?[\d\.]+/g);
        var panOffsetX=parseInt(viewBox_a[0]);
        var panOffsetY=parseInt(viewBox_a[1]);
        offset['x']=panOffsetX;
        offset['y']=panOffsetY;
        return offset;
    }    
    
    self.setPanOffset=function(){
        var offset=self.getPanOffset();
        
        var viewX=$("#nest").attr("data-left",offset["x"]);
        var viewY=$("#nest").attr("data-top",offset["y"]);
    }     
    
    /* CENTERS PAN 
     * Window may have a different centerpoint from the drawing 
     */
    
    self.updateWindow=function(){
    	findCenterpointOffset();
		updateViewBox(centerpointOffset.x ,centerpointOffset.y);
    }
    
    /* FIND CENTER POINT OFFSET*/
    var findCenterpointOffset=function(){
    	
    	var centerpointAttr=$("#nest").attr("data-centerpoint");
    	var centerpointArr=centerpointAttr.split(",");
    	var drawingCenter={
    		x: centerpointArr[0],
    		y: centerpointArr[1]
    	}
    	
    	var frameHeight=Number($('#nest').height());
		var frameWidth=Number($('#nest').width());
    	var windowCenter={
    		x:(frameWidth/2),
    		y:(frameHeight/2)
    	}
    	
    	console.log(drawingCenter, windowCenter);
    	
    	centerpointOffset.x=drawingCenter.x-windowCenter.x;
    	centerpointOffset.y=drawingCenter.y-windowCenter.y;
    }
	
	init();
	return self;
}
