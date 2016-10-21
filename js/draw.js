//Drawing App Object

/* 
 * Interprets mouse events and sends them off for activitiy
 */
var DrawApp = function(){
	  
	self=this;
    var musicPlayer=new Musical();
    var windowZoom=new WindowZoom();
    var windowPan=new WindowPan();
    var nodeClicks=new NodeClicks();
    
    var mode="line";
    setMode("line");
    
    self.init=function(){
    	setUpCanvas();
    	return self;
    }
    
    self.init();
    
    $(window).resize(function(){windowZoom.updateWindow()});
    
      /*****************************************
      ******** Register Key Up Events**********
      ****************************************/   

   $(document).keyup(function(e) {
	  e = e || window.event; 
       
	  var charCode = e.charCode || e.keyCode, character = String.fromCharCode(charCode);
	  var keycode=e.keyCode;    
	
	//alert(keycode);
	
		switch (keycode){
            //esc    
			case 27:
				nodeClicks.reset_vars();
			break;
               
              //space  
            case 32:
				windowPan.panMode=false;
                windowPan.setPanOffset();
			break;
                
            case 69:
                setMode("erase");
                $("#toolbox button").removeClass("active");
                $("#eraseMode").addClass("active");
				updateNestClass();
				nodeClicks.reset_vars();
			break;
            
            //(l)ine
            case 76:
                setMode("line");
                 $("#toolbox button").removeClass("active");
                $("#lineMode").addClass("active");
            break; 
            
            //(c)ircle
            case 67:
                changeCircleMode();
            break; 
                
            //(m)usical   
            case 77:
                setMode("musical");
                 $("#toolbox button").removeClass("active");
                $("#musical").addClass("active");
			break;    
                
            case 80:
              musicPlayer.play();
			break;    
                
			//= (+)
			case 187:
				windowZoom.zoomIn();
			break;
			//-
			case 189:
				windowZoom.zoomOut();
			break;
			//0
			case 48:
				windowZoom.zoomReset();
			break;
			
            //.
			case 190:
				hideIntersectionPoints();
			break;	
		}	  

	});
        
     /*****************************************
      ********** Register Key Down************
      ****************************************/   
    $(document).keydown(function(event) {
        
      //  alert(event.which);
        if (event.ctrlKey==true && (event.which == '187' || event.which == '189')) {
            event.preventDefault();
         }
        
        if(event.which == '187') {
            windowZoom.zoomIn();
        }
        
        else if(event.which == '189') {
            windowZoom.zoomOut();
        }
        
        var keycode=event.keyCode; 
        
        switch (keycode){
            //space    
			case 32:
                if(windowPan.pan==false){windowPan.pan="newPan";}
                if(windowPan.panMode==false){ windowPan.panMode="start";}
			break;
       }       
        
    });
	
	  /*******************************************
      ********** Register Mouse Move ************
      ********************************************/   
	document.onmousemove = function(e) { 
        
        windowPan.checkPan(e);
        
        if(isDrawMode()==true){ 
            //draw preview line
            var panOffset=windowPan.getPanOffset();
            var mouseCoords=windowZoom.scaleMouseCoords(e);
			nodeClicks.drawPreviewLine(panOffset, mouseCoords, mode);
        }    
        
	}

	$("#toolbox button").click(function(){
		$("#toolbox button").removeClass("active");
		setMode($(this).attr('data-mode'));
		$(this).addClass("active").blur();
        
        updateNestClass();
        
	});
	
	function setMode(m){
		mode=m;
		nodeClicks.setShapeMode(m);
	}
    
    var updateNestClass =function(){
        $("#nest").removeClass("line").removeClass("erase").removeClass("circle-edge").removeClass("circle-center");
        $("#nest").addClass(mode);
    }    
	
	function  setUpCanvas(){
			 nodeClicks.newCanvasPolygons();
            windowZoom.updateWindow();
	}
    
    var  changeCircleMode=function(){
        $("#toolbox button").removeClass("active");
        
        if(mode=="circle-edge"){
            setMode("circle-center");   
            $("#CircleCenterMode").addClass("active");
        } 
        else if(mode=="circle-center"){
            setMode("circle-edge");   
            $("#CircleEdgeMode").addClass("active");
        }
        else {
           setMode("circle-center");   
            $("#CircleCenterMode").addClass("active");
        }    
        
        updateNestClass();
    }    
	
	var hideIntersectionPoints=function(){
		if($("#intersection_points").hasClass("hidden")==true){
			$("#intersection_points").removeClass("hidden");
		} else {
			$("#intersection_points").addClass("hidden");
		}
	}
            
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
    
    
    
    var isDrawMode = function(){
        if(mode=="circle-center" || mode=="circle-edge" || mode=="line" || mode=="musical" || mode=="draw-straight" || mode=="draw-curved"){
            return true;   
        }   
        else {
            return false
        }
    }    
    
  }
