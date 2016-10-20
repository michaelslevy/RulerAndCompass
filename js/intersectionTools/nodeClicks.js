/* Handles clicks on intersetction points */

var NodeClicks=function(){
	var self=this;
	var coordDictionary=new CoordDictionary(); 
	var musicPlayer=new Musical();
	var mode='line';

	 /* CLICK EVENTS
	  * Click events are either starting points or ending points 
	  * clicknum keeps track of which stage you are at. 
	  * 1. start
	  * 2. end
	  */
	 
	var clicknum=0; 
	var newLineCoord = new Line();
	
	self.init=function(){
		return self;
	}
	
	self.setShapeMode=function(m){
		mode=m;
	}
	
	self.reset_vars=function(){
		
		newLineCoord.x1="nan";
		newLineCoord.y1="nan";
		newLineCoord.x2="nan";
		newLineCoord.y2="nan";
		
		clicknum=0;
		$('.preview_line').remove();
		
		var windowZoom=new WindowZoom();
        windowZoom.updateZoomDimension();
        
	}
		
	$(document).on('click',".intersection",function(){
  		var my_x=this.getAttribute("cx");
		var my_y=this.getAttribute("cy");
						
		/* get mouse positions */
				
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
					add_line('#guidelines');
					var current_line=$(".guideline").last(); 
                    
                    coordDictionary.currentElement=current_line; 
			        coordDictionary.find_coords(); 
				break;
                    
                case "musical":
				//add new line
				    add_line("#musicallines");
				    var current_line=$("#musicallines line").last(); 
                    musicPlayer.playPreviewTone();
				break;
				
				case "circle-center":
					add_circle("guide");
					current_line=$(".guide").last(); 
                    
                    coordDictionary.currentElement=current_line; 
			        coordDictionary.find_coords(); 
				break;
				
				case "circle-edge":
					add_circle("guide");
					current_line=$(".guide").last(); 
                    
                    coordDictionary.currentElement=current_line; 
			        coordDictionary.find_coords(); 
				break;
				
			}
            
            
			
		
			//remove the preview line
			self.reset_vars();
		
		}		
	});
	
	self.drawPreviewLine=function(panOffset, mouseCoords){
				
		if(typeof newLineCoord=="undefined"){
			return false;
		}  else if (typeof newLineCoord.x1=="undefined") {
			return false;
		} else if(newLineCoord.x1=='nan' ) {
			return false;
		} 
				
        $('.preview_line').remove();
        newLineCoord.x2=mouseCoords["x"]+panOffset["x"];
        newLineCoord.y2=mouseCoords["y"]+panOffset["y"];
        
        var mX1=newLineCoord.x1;
        var mY1=newLineCoord.y1;
        
        var mX2=newLineCoord.x2;
        var mY2=newLineCoord.y2;

        jQuery('#preview').Guideline({css_class:"preview_line",x1: mX1, y1:mY1, x2:mX2, y2:mY2}).draw();
        if(mode=="circle-center" || mode=="circle-edge"){
            add_circle("preview_line");
        }
        
       	var  windowZoom=new WindowZoom();
        var lineWidth= windowZoom.getLineWidth();
        $("#nest #preview line").css("stroke-width",lineWidth);
        $("#nest #preview circle").css("stroke-width",lineWidth);

	}
	
	self.newCanvasPolygons=function(){
		
		var frameHeight=Number($('#nest').height());
		var frameWidth=Number($('#nest').width());
			
		$("#guidecircles").CircleDraw();
			var xCoord=$("circle").attr("cx");
			var yCoord=$("circle").attr("cy");
			$("#intersection_points").CircleDraw({cx:xCoord, cy:yCoord, radius:5, css_class:"intersection intersectionPoint"});
			$("#guidelines").Guideline({x1:xCoord,y1:0,x2:xCoord,y2:frameHeight}).draw();
			coordDictionary.currentElement=$("line").last(); 
			coordDictionary.find_coords(); 
			
			$("#guidelines").Guideline({x1:0,y1:yCoord,x2:frameWidth,y2:yCoord}).draw();
			coordDictionary.currentElement=$("line").last();
			coordDictionary.find_coords();
            $("#guidelines line").each(function(){
                var myId=$(this).attr("data-identifier");
                coordDictionary.removeIntersection(myId);
            });
	}
	
	var add_line=function(id){
		x1v=newLineCoord.x1;
		y1v=newLineCoord.y1;
		x2v=newLineCoord.x2;
		y2v=newLineCoord.y2;
		
		jQuery(id).Guideline({x1: x1v, y1:y1v, x2:x2v, y2:y2v}).draw();
		 
	}
	
	var  add_circle=function(className){
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
	
	var calculateCircleCenterAttrs =function (){
				
		var x1v=newLineCoord.x1;
		var y1v=newLineCoord.y1;
		var x2v=newLineCoord.x2;
		var y2v=newLineCoord.y2;
                
		var magnitude=$("line.preview_line").LineEquation().getMagnitude();
            
		var attrs={
			cx:x1v,
			cy:y1v,
			radius:magnitude
		}
		
		return attrs;
		
	}
	
	var  calculateCircleEdgeAttrs = function(){
		
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
	
	self.init();
	return self;
}
