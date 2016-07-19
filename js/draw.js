//Drawing App Object

/* 
 * Interprets mouse events and sends them off for activitiy
 */
var DrawApp = function(){
	  
	self=this;
	coordDictionary=new CoordDictionary();  
	  
	 /* CLICK EVENTS
	  * Click events are either starting points or ending points 
	  * clicknum keeps track of which stage you are at. 
	  * 1. start
	  * 2. end
	  */
	 
	var clicknum=0; 
	var mode="line";
    var pan=false;
    var panMode=false;
	
	var newLineCoord = {
        x1: "nan",
        y1: "nan",
        x2: "nan",
        y2: "nan"
    }
    
    self.init=function(){
    	setUpCanvas();
    	return self;
    }
    self.init();
    
    
    $(window).resize(updateWindow());
    
    //Register Keyboard Events
   $(document).keyup(function(e) {
	  e = e || window.event; 
       
	  var charCode = e.charCode || e.keyCode, character = String.fromCharCode(charCode);
	  var keycode=e.keyCode;    
	
	//alert(keycode);
	
		switch (keycode){
            //esc    
			case 27:
				reset_vars();
			break;
                
            case 32:
                console.log("stop");
				panMode=false;
                setPanOffset();
			break;
                
            //m    
            case 77:
                changeMode();
			break;    
			//= (+)
			case 187:
				zoomIn();
			break;
			//-
			case 189:
				zoomOut();
			break;
			//0
			case 48:
				zoomReset();
			break;
			
            //.
			case 190:
				hideIntersectionPoints();
			break;	
		}	  

	});
        
    $(document).keydown(function(event) {
        
      //  alert(event.which);
        if (event.ctrlKey==true && (event.which == '187' || event.which == '189')) {
            event.preventDefault();
         }
        
        if(event.which == '187') {
            zoomIn();
        }
        
        else if(event.which == '189') {
            zoomOut();
        }
        
        var keycode=event.keyCode; 
        
        switch (keycode){
            //space    
			case 32:
                if(pan==false){pan="newPan";}
                if(panMode==false){ panMode="start";}
                
			break;
       }       
        
    });
	 
	//document.getElementById("frame").addEventListener("click", function(e){
	// document.addEventListener("click", function(e){
		
	$(document).on('click',".intersection",function(){
		
  		var my_x=this.getAttribute("cx");
		
		var my_y=this.getAttribute("cy");
		/* get mouse positions */
		
		/*//get values
		var parent_offset=$("#nest").parent().offset(); 
		var my_x=parseInt(e.pageX-parent_offset.left);
		var my_y=parseInt(e.pageY-parent_offset.top);*/
		
		//only register clicks inside the drawing canvas
		if(my_x <0|| my_y <0){
			return false; 
		}
		
		clicknum++;
		
		if(clicknum == 1){
			//starting coordinates
			newLineCoord.x1=my_x;
			newLineCoord.y1=my_y;
			
		} else if (clicknum == 2){ 
			
			//ending coordinates
			newLineCoord.x2=my_x;
			newLineCoord.y2=my_y;
            
            $("line.preview_line").attr({"x2":my_x, "y2":my_y});
            
			var current_line; 

						
			switch (mode){
				
				case "line":
					//add new line
					add_line();
					var current_line=$(".guideline").last(); 

				break;
				
				case "circle-center":
					add_circle("guide");
					current_line=$(".guide").last(); 
				break;
				
				case "circle-edge":
					add_circle("guide");
					current_line=$(".guide").last(); 
				break;
				
			}
			
            
			coordDictionary.currentElement=current_line; 
			coordDictionary.find_coords(); 
		
			//remove the preview line
			reset_vars();
		
		}		
	});
	
	/* MOUSE MOVE */
	document.onmousemove = function(e) { 
        
        var parent_offset=jQuery('#nest').parent().offset();
        var followX=parseInt(e.pageX-parent_offset.left);
		var followY=parseInt(e.pageY-parent_offset.top);
        
        var viewBox=document.getElementById("nest").getAttribute("viewBox");
        var viewBox_a=viewBox.match(/-?[\d\.]+/g);
        var pan_offset_x=parseInt(viewBox_a[0]);
        var pan_offset_y=parseInt(viewBox_a[1]);
        followX=followX+pan_offset_x;
        followY=followY+pan_offset_y;
        
        
        //console.log(pan_offset_x,pan_offset_y);
        //captures scale values
        //var matrix=$("#nest").css("transform");
        // values = matrix.match(/-?[\d\.]+/g);

        //    $(".follower").attr("cx",followX).attr("cy",followY);
        
        if(panMode != false){
            if(panMode=="start"){
                var parent_offset=jQuery('#nest').parent().offset();
                var  x=parseInt(e.pageX-parent_offset.left);
			     var  y=parseInt(e.pageY-parent_offset.top);
               
                pan=new Coords(x,y);
                panMode=true;
            }    
            panViewBox(e);
        }    
        
        //draw preview line
        if(newLineCoord.x1!='nan' ) {
            //var scale=Number($("#nest").attr("data-scale"));
            //if(typeof scale=="undefined"){ scale=1; }
            var panOffset=getPanOffset();
            
			$('.preview_line').remove();
			var parent_offset=jQuery('#nest').parent().offset();
			newLineCoord.x2=parseInt(e.pageX-parent_offset.left)+panOffset["x"];
			newLineCoord.y2=parseInt(e.pageY-parent_offset.top)+panOffset["y"];
            
			jQuery('#preview').Guideline({css_class:"preview_line",x1: newLineCoord.x1, y1:newLineCoord.y1, x2:newLineCoord.x2, y2:newLineCoord.y2}).draw();
			if(mode=="circle-center" || mode=="circle-edge"){
				add_circle("preview_line");
			}
            
           
        } 
        
	}
	
	function reset_vars(){ 
		clicknum=0;
		newLineCoord.x1="nan";
		newLineCoord.y1="nan";
		newLineCoord.x2="nan";
		newLineCoord.y2="nan";
		$('.preview_line').remove();
        updateZoomDimension();
	}
	
	function add_line(){
		x1v=newLineCoord.x1;
		y1v=newLineCoord.y1;
		x2v=newLineCoord.x2;
		y2v=newLineCoord.y2;
		
		jQuery('#guidelines').Guideline({x1: x1v, y1:y1v, x2:x2v, y2:y2v}).draw();
		 
	}
	
	function add_circle(className){
		//define variables
		var myClass=className;
        var group="#guidecircles";
        if(myClass=="preview_line"){
            group="#preview";
        }  
        
		//get circle attributes from click distance & mode
		if(mode=="circle-center"){
			var attrs=calculateCircleCenterAttrs();
		}
		else if(mode=="circle-edge"){
			var attrs=calculateCircleEdgeAttrs();
		}
		
          
        
		//draw circle
		$(group).CircleDraw({cx:attrs.cx,cy:attrs.cy,radius:attrs.radius, css_class:className }); 

	}
	
	function calculateCircleCenterAttrs(){
				
		var x1v=newLineCoord.x1;
		var y1v=newLineCoord.y1;
		var x2v=newLineCoord.x2;
		var y2v=newLineCoord.y2;
                
		var magnitude=$("line.preview_line").LineEquation().getMagnitude();
    
        //console.log("x1: "+x1v+"y1: "+y1v+" x2: "+x2v+"y:2 "+y2v+" magnatude:"+magnitude);
        
		var attrs={
			cx:x1v,
			cy:y1v,
			radius:magnitude
		}
		
		return attrs;
		
	}
	
	function calculateCircleEdgeAttrs(){
		var x1v=newLineCoord.x1;
		var y1v=newLineCoord.y1;
		var x2v=newLineCoord.x2;
		var y2v=newLineCoord.y2;
		var midpoint=$("line.preview_line").LineEquation().findMidpoint();
		var magnitude=$("line.preview_line").LineEquation().getMagnitude();
				
		var attrs={
			cx:midpoint.x,
			cy:midpoint.y,
			radius:magnitude/2
		}
		
		return attrs;
	}
	
	$("#toolbox button").click(function(){
		$("#toolbox button").removeClass("active");
		mode=$(this).attr('data-mode');
		$(this).addClass("active").blur();
	});
	
	function setUpCanvas(){
		
			var frameHeight=Number($('#nest').height());
			var frameWidth=Number($('#nest').width());
		
			$("#guidecircles").CircleDraw();
			var xCoord=$("circle").attr("cx");
			var yCoord=$("circle").attr("cy");
			$("#intersection_points").CircleDraw({cx:xCoord, cy:yCoord, radius:5, css_class:"intersection"});
			$("#guidelines").Guideline({x1:xCoord,y1:0,x2:xCoord,y2:frameHeight}).draw();
			coordDictionary.currentElement=$("line").last(); 
			coordDictionary.find_coords(); 
			
			$("#guidelines").Guideline({x1:0,y1:yCoord,x2:frameWidth,y2:yCoord}).draw();
			coordDictionary.currentElement=$("line").last();
			coordDictionary.find_coords();
            $("#guidelines line").remove();
        
            updateWindow();
		
	}
	
	var zoomIn=function(){
        var scale=Number($("#nest").attr("data-scale")).toFixed(4);
        if(typeof scale=="undefined" || scale <=0 || isNaN(scale)==true){
            scale=1;   
        }    
        
        scale=scale*1.1;
        
        $("#nest").attr("data-scale", scale).css("transform", "scale("+scale+","+scale+")");
        updateZoomDimension(scale);
        
	}
	
	var zoomOut=function(){
		var scale=Number($("#nest").attr("data-scale")).toFixed(4);
        if(typeof scale=="undefined" || scale <=0 || isNaN(scale)==true){
            scale=1;   
        }    
        
        scale=scale*.9;
        
        $("#nest").attr("data-scale", scale).css("transform", "scale("+scale+","+scale+")");
         updateZoomDimension(scale);
	}
	
	var zoomReset=function(){
        scale=1;
		$("#nest").attr("data-scale", scale).css("transform", "scale("+scale+","+scale+")");
        updateZoomDimension(scale);
	}
    
    var updateZoomDimension=function(){
        var scale=$("#nest").attr("data-scale");
        if(typeof scale=="undefined"){ return false; }
        var nodeRadius=(5/scale).toFixed(2);
        var lineWidth=(1/scale).toFixed(2);
        $("#nest #intersection_points circle").attr("r",nodeRadius);
         $("#nest circle").css("stroke-width",lineWidth);
         $("#nest line").css("stroke-width",lineWidth);
    }  
    
    function updateWindow(){
        var w=parseInt($("#frame").width());
        var h=parseInt($("#frame").height());
        var l=parseInt($("#nest").attr("data-left"));
        var t=parseInt($("#nest").attr("data-top"));
        
        $("#nest").attr("data-width",w).attr("data-height",h);
        document.getElementById("nest").setAttribute("viewBox", l+" "+t+" "+w+" "+h);
        
    }    
    
    var panViewBox = function(e){
        
        //get current mouse coordinates
        var parent_offset=jQuery('#nest').parent().offset();
		//var curX=parseInt(e.pageX-parent_offset.left);
		//var curY=parseInt(e.pageY-parent_offset.top);
        var curX=parseInt(e.pageX)-parent_offset.left;
		var curY=parseInt(e.pageY)-parent_offset.top;
            
        //get difference of current and pan
        var xDiff=pan.x-curX;
        var yDiff=pan.y-curY;
        
        //add to viewport paramaeters
        
        var viewX=parseInt($("#nest").attr("data-left"));
        var viewY=parseInt($("#nest").attr("data-top"));
        
        var w=$("#nest").attr("data-width");
        var h=$("#nest").attr("data-height");
        var l = viewX+xDiff;
        var t= viewY+yDiff;
                        
        document.getElementById("nest").setAttribute("viewBox", l+" "+t+" "+w+" "+h);
    }  
    
    var getPanOffset =function(){
        var offset=[];
        var viewBox=document.getElementById("nest").getAttribute("viewBox");
        var viewBox_a=viewBox.match(/-?[\d\.]+/g);
        var pan_offset_x=parseInt(viewBox_a[0]);
        var pan_offset_y=parseInt(viewBox_a[1]);
        offset['x']=pan_offset_x;
        offset['y']=pan_offset_y;
        return offset;
    }    
    
    var setPanOffset=function(){
        var offset=getPanOffset();
        
        var viewX=$("#nest").attr("data-left",offset["x"]);
        var viewY=$("#nest").attr("data-top",offset["y"]);
    }    
    
    function changeMode(){
        $("#toolbox button").removeClass("active");
        
        if(mode=="circle-edge"){
            mode="line";
            $("#lineMode").addClass("active");
        } 
        else if(mode=="circle-center"){
            mode="circle-edge";   
            $("#CircleEdgeMode").addClass("active");
        }
        else if(mode=="line"){
            mode="circle-center";   
            $("#CircleCenterMode").addClass("active");
        }    
    }    
	
	var hideIntersectionPoints=function(){
		if($("#intersection_points").hasClass("hidden")==true){
			$("#intersection_points").removeClass("hidden");
		} else {
			$("#intersection_points").addClass("hidden");
		}
	}
	
  }
