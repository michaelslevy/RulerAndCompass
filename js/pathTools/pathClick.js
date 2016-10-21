var PathClick=function(mode,current_line){
    var self=this;
    var mode=mode;//straight or curved
    var selectedPath=$("path.selected");
    
    self.teriminal=false;//indicates end of segment
    self.current_line=current_line; //passed from previewline
    
    var x1=self.current_line.x1;
    var x2=self.current_line.x2;
    var y1=self.current_line.y1;
    var y2=self.current_line.y2;
    
    var clickType='point';//point or handle
    
    var init=function(){
        
        //is first click 
        if(selectedPath.length==0){
            
            var dimensions="M "+x1+" "+y1+" L "+x2+ " "+ y2;
            
            var svgNS = "http://www.w3.org/2000/svg"; 
			var mPath = document.createElementNS(svgNS,"path"); 
		    mPath.setAttributeNS(null,"d",dimensions);
		    mPath.setAttributeNS(null,"class","selected");
		    document.getElementById("drawinglayer").appendChild(mPath);
        
        } else {
            var dimensions=$(selectedPath).attr("d");
            var dimensionsA=dimensions.split(" ");
            
            var startX1=dimensionsA[1];
            var startY1=dimensionsA[2];
            
            if(startX1==x2 && startY1==y2){
            
                dimensions=dimensions +" Z";
                $(selectedPath).attr("d",dimensions).removeClass("selected");
                
            } else {    
           
                dimensions=dimensions +" L "+x2+ " "+ y2;
                $(selectedPath).attr("d",dimensions);
                
            }    
        }    
        
        //else is same as first click
            
            //then close path
        
        //else add new segment
        
    }
    
    /* Mouse Click 
    * Determine what to do with a new click.
    */    
    
    /* Determine what to do with point */
    var pointAction=function(){
        var action='';
        
        //break down selected path and determine attribute type
        
        //action=first
        
            //first corner
            
            //first curve
        
        //action=handle
        
        //action=last
        
        return action;
    }    
    
    init();
    return self;
}    