var WindowZoom =function() {
	var self=this;
	var scale=1;
	
	self.init=function(){
		return self;
	}
	
	self. zoomIn=function(){
		updateScale();
        if(typeof scale=="undefined" || scale <=0 || isNaN(scale)==true){
            scale=1;   
        }    
        
        scale=scale*1.1;
        
        $("#nest").attr("data-scale", scale).css("transform", "scale("+scale+","+scale+")");
        self.updateZoomDimension(scale);
        
	}
	
	self.zoomOut=function(){
		updateScale();
        if(typeof scale=="undefined" || scale <=0 || isNaN(scale)==true){
            scale=1;   
        }    
        
        scale=scale*.9;
        
        $("#nest").attr("data-scale", scale).css("transform", "scale("+scale+","+scale+")");
         self.updateZoomDimension(scale);
	}
	
	self.zoomReset=function(){
        scale=1;
		$("#nest").attr("data-scale", scale).css("transform", "scale("+scale+","+scale+")");
        self.updateZoomDimension(scale);
	}
    
    /* UPDATE DIMENSIONS
     * Updates relative line widths and intersection point radiuses
     *  to make them appear the same size
     **/
    self.updateZoomDimension=function(){
       updateScale();
        if(typeof scale=="undefined"){ return false; }
        var nodeRadius=(5/scale).toFixed(2);
        var lineWidth= self.getLineWidth();
        $("#nest #intersection_points circle").attr("r",nodeRadius);
         $("#nest circle").css("stroke-width",lineWidth);
         $("#nest line").css("stroke-width",lineWidth);
    }  
     
     
    /* UPDATE WINDOW VIEWBOX
     * match viewbox to current window
     */ 
    self.updateWindow=function(){

        var w=parseInt($("#frame").width());
        var h=parseInt($("#frame").height());
        var l=parseInt($("#nest").attr("data-left"));
        var t=parseInt($("#nest").attr("data-top"));
        
        $("#nest").attr("data-width",w).attr("data-height",h);
        document.getElementById("nest").setAttribute("viewBox", l+" "+t+" "+w+" "+h);
        
    }    
    
    /* PREVIEW COORDINATES 
     * Converts window coordinate system to zoom system  
     **/
    self.scaleMouseCoords=function(e){
        
        /*  Get current Mouse Position position */
        var parent_offset=jQuery('#nest').parent().offset();
        var x=parseInt(e.pageX-parent_offset.left);
        var y=parseInt(e.pageY-parent_offset.top);
        
        console.log(x,y);
        
        /* Get scale and invert */
        updateScale();
        var invertedRatio=1/scale;
        
        var compensated = []; 
        
        //find compensated value
        if(typeof scale!="undefined"){
        
            /* get intersection points */
            var centerX=Number($(".intersectionPoint").attr("cx"));
            var centerY=Number($(".intersectionPoint").attr("cy"));

            /* convert to centerpoint coordinate */
            var relX=x-centerX;
            var relY=y-centerY;

            /* Scale coordinates */
            var scaled_x=invertedRatio*relX;
            var scaled_y=invertedRatio*relY;

            /* convert to window coordinate */
            var absX=scaled_x+centerX;
            var absY=scaled_y+centerY;

            compensated["x"]=absX;
            compensated["y"]=absY;   
        
        } else {
            compensated["x"]=x;
            compensated["y"]=y;  
        }    
         
        /* return values */
        return compensated;
        
    }    
	
	/* LINE WIDTH AT CURRENT ZOOM
	 * returns line width at current zoom 
	 */
	 self.getLineWidth=function(){
        updateScale();
        if(typeof scale=="undefined"){ return false; }
        var nodeRadius=(5/scale);
        var lineWidth=(1/scale);
        return lineWidth;
    }   
    
    /* UPDATE SCALE
     * Retrieve scale value from SVG attribute
     */
    var updateScale=function(){
		scale=$("#nest").attr("data-scale");
	}
	
	self.init();
	
	return self;
}
