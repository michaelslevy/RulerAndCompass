/* Handles clicks on intersetction points */

var NodeClicks=function(){
	var self=this;
	var coordDictionary=new CoordDictionary(); 
	var musicPlayer=new Musical();
	var mode='line';
	var fill="none";
	var stroke="#000000";
	var strokeWidth=1;

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
    
      /*****************************************
      ********  Record Mouse Status **********
      ****************************************/ 
        var mouseDown=false;//keep track of whether mouse is up or down;

     $(document).mousedown(function() {
     		mouseDown=true;
     });
      $(document).mouseup(function() {
     		mouseDown=false;
     });
    
    
    /* RESET VARIABLES
    *  After line finishes make ready for new line or path segment
    */
	self.reset_vars=function(){
        
        //checks to see if there is an active open path
        var pathSelected = isPathSelected();
        
        //if normal draw mode reset variables
        if((mode!="draw-straight" && mode != "draw-curved" )|| pathSelected!=true ){
            newLineCoord.x1="nan";
            newLineCoord.y1="nan";
            newLineCoord.x2="nan";
            newLineCoord.y2="nan";
            newLineCoord.xQ="nan";
            newLineCoord.yQ="nan";

            clicknum=0;
        } 
        
        //enables continuity of path line
        else if((mode=="draw-straight" || mode == "draw-curved" ) && pathSelected==true ){
        	
            //passes points along to next segment
            newLineCoord.x1=newLineCoord.x2;
            newLineCoord.y1=newLineCoord.y2;
            newLineCoord.x2="nan";
            newLineCoord.y2="nan";
            newLineCoord.xQ="nan";
            newLineCoord.yQ="nan";
          
            clicknum=1;
            
        }    
            
		$('.preview_line').remove();
		
        //updates line widths 
		var windowZoom=new WindowZoom();
        windowZoom.updateZoomDimension();
        
        coordDictionary.newNodeList=[];
	}
	
	self.hardReset=function(){
		  $("path.selected").removeClass("selected");
		  var tempMode=mode; //remeber mode
		  mode="stop"; //switching mode escapes continous click mode
		  self.reset_vars(); //run reset
		  mode=tempMode; //return mode
	}	
    
    //checks for an active path in the DOM
    var isPathSelected=function(){
        
        var pathSelected;
        if( $("path.selected").length >0){
            pathSelected = true;
        } else {
            pathSelected = false;   
        }   
        return pathSelected;
    }    
    
	//Determines behaviors when an intersection node is clicked.	
	$(document).on('click',".intersection",function(){
        
        var node=this;
  		var my_x=node.getAttribute("cx");
		var my_y=node.getAttribute("cy");
						
		/* get mouse positions */
				
		clicknum++;
        				
		if(clicknum == 1){
			//starting coordinates
			newLineCoord.x1=my_x;
			newLineCoord.y1=my_y;
						
		} else if (clicknum == 2){ 
            
            //ignore double clicks
            if(newLineCoord.x1==my_x && newLineCoord.y1==my_y){
                clicknum=1;//revert click
                return false;   
            }    
			
            //set enpoints
            if(mode!="draw-curved"){
                //ending coordinates
                newLineCoord.x2=my_x;
                newLineCoord.y2=my_y;
                completeLine(node);
            } 
            else if(mode=="draw-curved"){
                //set curve end point
                newLineCoord.x2=my_x;
                newLineCoord.y2=my_y;
            }    
            
            
		}	
        //set endpoint for curved segments
        else if (clicknum == 3){   
            
            //ignore double clicks
             if(newLineCoord.xQ==my_x && newLineCoord.yQ==my_y){
                clicknum=2;//revert clicks
                return false;   
            }   
            
            //refresh line and complete
             if(mode!="draw-curved"){
                //ending coordinates
                newLineCoord.x2=my_x;
                newLineCoord.y2=my_y;
                newLineCoord.xQ="nan";//remove control points
                newLineCoord.yQ="nan";//remove control points   
                completeLine(node);
            } 
            
            //complete draw curved
            else if(mode=="draw-curved"){
                //Set Control Points
                newLineCoord.xQ=my_x;
                newLineCoord.yQ=my_y;
                var pathClick=new PathClick(mode,newLineCoord);
                self.reset_vars();
            }    
           
        }   	
         
	});
    
    /* COMPLETE LINE 
    *  Triggered after node clicks
    */
    
    var completeLine =function(node){
        
        var my_x=node.getAttribute("cx");
		var my_y=node.getAttribute("cy");
                
        switch (mode){
				
				case "line":
					fill="none";
					stroke="#666666";
					
                    $("line.preview_line").attr({"x2":my_x, "y2":my_y});
					//add new line
					add_line('#guidelines');
					var current_line=$(".guideline").last();                    
                
                    coordDictionary.currentElement=current_line; 
			        coordDictionary.find_coords(); 
                
                     addUndoStep(current_line,"add-primitive");
                    
                    //restore defaults
                    self.reset_vars();                    
				break;
                    
                case "musical":
                
                	fill="none";
					stroke="#000000";
					
                    $("line.preview_line").attr({"x2":my_x, "y2":my_y});
				    //add new line
				    add_line("#musicallines");
				    current_line=$("#musicallines line").last(); 
                    musicPlayer.playPreviewTone(); //plays a preview tone
                
                    addUndoStep(current_line,"add-primitive");
                    
                    //restore defaults
                    self.reset_vars();                    
				break;
				
				case "circle-center":
				
					fill="none";
					stroke="#666666";
					
                    $("line.preview_line").attr({"x2":my_x, "y2":my_y});
					add_circle("guide");
					var current_line=$(".guide").last(); 
                    
                    coordDictionary.currentElement=current_line; 
			        coordDictionary.find_coords();
                
                     addUndoStep(current_line,"add-primitive");
                    
                    //restore defaults
                    self.reset_vars();                    
                   
				break;
				
				case "circle-edge":
				
					fill="none";
					stroke="#666666";
				
                    $("line.preview_line").attr({"x2":my_x, "y2":my_y});
					add_circle("guide");
					var current_line=$(".guide").last(); 
                    
                    coordDictionary.currentElement=current_line; 
			        coordDictionary.find_coords(); 
                
                    addUndoStep(current_line,"add-primitive");
                    
                    //restore defaults
                    self.reset_vars();                    
                   
				break;
                    
                case "draw-straight":
                	
                	fill="none";
					stroke="#000000";
                		
                    $("line.preview_line").attr({"x2":my_x, "y2":my_y});
                    var pathClick=new PathClick(mode,newLineCoord);
                    
                    //restore defaults
                    self.reset_vars();
                break;   
                                        
			}
    }    
    
    var addUndoStep=function(currentLine,type){
        //console.log(currentLine);
        
        //Create list of new element id's
        var additionList=coordDictionary.newNodeList;
        var elemID=currentLine.attr("data-identifier");
        additionList.push(elemID);
        
        var undoObj={
            type:type,
            content:additionList
        }
        
        var undoHistory=new UndoHistory();
        undoHistory.addStep(undoObj);   
    }    
    
	
    /* draw a straight preview line */
	self.drawPreviewLine=function(panOffset, mouseCoords){
        
        //Does new line coordinates exist?
        if(typeof newLineCoord=="undefined"){
			return false;
		}  
        //Does new line coordinates X1 exist?
        else if (typeof newLineCoord.x1=="undefined" || newLineCoord.x1=='nan') {
			return false;
		}
				
        $('.preview_line').remove();
        var mX2=mouseCoords["x"]+panOffset["x"];
        var mY2=mouseCoords["y"]+panOffset["y"];
        
        var mX1=newLineCoord.x1;
        var mY1=newLineCoord.y1;

        jQuery('#preview').Guideline({css_class:"preview_line",x1: mX1, y1:mY1, x2:mX2, y2:mY2}).draw();
        if(mode=="circle-center" || mode=="circle-edge"){
            add_circle("preview_line");
        } else if (mode=="musical"){
            var note=musicPlayer.playContinousPreviewTone(); //plays a preview tone
            $("#noteDisplay").text(note);
        }
        
       	var  windowZoom=new WindowZoom();
        var lineWidth= windowZoom.getLineWidth();
        $("#nest #preview line").css("stroke-width",lineWidth);
        $("#nest #preview circle").css("stroke-width",lineWidth);

	} 
    
    /* draw preview line for a curved path */
    self.drawPreviewCurve=function(panOffset, mouseCoords){

        //don't draw a line before first click
        if(typeof newLineCoord=="undefined" || newLineCoord.x1=='nan' || typeof newLineCoord.x1=="undefined"){
			return false;console.log("nothing yet");
		}  
        
        //draw a straight line after first click
        else if(newLineCoord.x2=='nan' || typeof newLineCoord.x2=='undefined' ) {
           self.drawPreviewLine(panOffset, mouseCoords);
        }    
        
        //draw preview curve after second click
        else if(newLineCoord.x2!='nan' && typeof newLineCoord.x2!='undefined' ) {

           var x1 = newLineCoord.x1;//start coord
           var y1 = newLineCoord.y1;//start coord
           var x2 = newLineCoord.x2;//curve control
           var y2 = newLineCoord.y2;//curve control
           var xQ=mouseCoords["x"]+panOffset["x"]; //end coord
           var yQ=mouseCoords["y"]+panOffset["y"]; //end coord    
            
            drawPreviewCurvePath(x1,y1,xQ,yQ,x2,y2);
        }  
        
    }    
    
    //draws a curved preview line
     var drawPreviewCurvePath=function(x1,y1,xQ,yQ,x2,y2){
        $(".preview_line").remove();
        var dimensions="M "+x1+" "+y1+ " Q "+xQ+ " "+ yQ+ " "+x2+" "+y2 ;
        var svgNS = "http://www.w3.org/2000/svg"; 
        var mPath = document.createElementNS(svgNS,"path"); 
        mPath.setAttributeNS(null,"d",dimensions);
        mPath.setAttributeNS(null,"class","preview_line");
        document.getElementById("preview").appendChild(mPath);
    }    
	
	self.newCanvasPolygons=function(){
		
		 $("#guidecircles").CircleDraw(); //by default draws a centered circle
		 
		 /* CREATE FIRST CIRCLE
		  * Add an intersection point in the center of the first circle
		  * Record Centerpoint on SVG Element
		   *********************************************************/
			var xCoord=$("circle").attr("cx");
			var yCoord=$("circle").attr("cy");
			var centerpoint=xCoord+", "+yCoord;
			$("#intersection_points").CircleDraw({cx:xCoord, cy:yCoord, radius:5, css_class:"intersection intersectionPoint centerpoint",stroke:"none", fill:"#666"});
			//$("#nest").attr("data-centerpoint", centerpoint);
			$("#nest centerpoint").text( centerpoint);
			
			/* CREATE INITIAL INTERSECTION NODES
			 * Add guidelines to generate intersections then remove them
			 */
			var frameHeight=Number($('#nest').height());
			var frameWidth=Number($('#nest').width());
			
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
		
		jQuery(id).Guideline({
				x1: x1v,
				y1:y1v, 
				x2:x2v, 
				y2:y2v,
				fill:fill,
				stroke:stroke,
				lineWidth:strokeWidth
			}).draw();
        
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
		$(group).CircleDraw({cx:attrs.cx,cy:attrs.cy,radius:attrs.radius, css_class:className, fill:fill,stroke:stroke }); 

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
    
     /* ERASE*/
    
    $(document).on("click","circle",function(){
        //console.log($(this).css("stroke-width"));
        if(mode=="erase"){
          $(this).remove();
        }    
    });
	
 /* ERASE*/
    $(document).on("click","line",function(){
        if(mode=="erase"){
        	var myID=$(this).attr("data-identifier");
        	coordDictionary.removeIntersection(myID);
          $(this).remove();
        }    
    });
    
    $(document).on("mouseover","line",function(){
        if(mode=="erase" && mouseDown==true){
        	var myID=$(this).attr("data-identifier");
        	coordDictionary.removeIntersection(myID);
          $(this).remove();
        }    
    });
    
    $(document).on("mouseover","circle",function(){
        if(mode=="erase" && mouseDown==true){
          $(this).remove();
        }    
    });
    
    $(document).on("mouseover","path",function(){
        if(mode=="erase" && mouseDown==true){
          $(this).remove();
        }    
    });
    
	
	self.init();
	return self;
}
