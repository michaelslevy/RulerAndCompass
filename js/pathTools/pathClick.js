var PathClick=function(mode,current_line){
    var self=this;
    var mode=mode;//straight or curved
    var selectedPath=$("path.selected");
    
    self.current_line=current_line; //passed from previewline
    
    var x1=self.current_line.x1;
    var x2=self.current_line.x2;
    var y1=self.current_line.y1;
    var y2=self.current_line.y2;
    
    var clickType='point';//point or handle
    
    //direct the action
    var init=function(){
        
        if(mode=="draw-straight"){
           drawStraight();
        } else if(mode="draw-curved"){
            drawCurved();
        }    
        
    }
    
    var drawStraight=function(){
     
        //is first click 
        if(selectedPath.length==0){
            newPath();        
        } else {
            if(isEndpoint()==true){
                var dimensions=$(selectedPath).attr("d");
                dimensions=dimensions +" Z";
                $(selectedPath).attr("d",dimensions).removeClass("selected");
            } else {    
                var dimensions=$(selectedPath).attr("d");
                dimensions=dimensions +" L "+x2+ " "+ y2;
                $(selectedPath).attr("d",dimensions);
            }    
        }    
        
    }    
    
    //draw a new path
    var newPath=function(){
        var dimensions="M "+x1+" "+y1+" L "+x2+ " "+ y2;
        
        var pathClass="";
        if(mode=="draw-curved"){ pathClass=" newCurve"; }
        
        var svgNS = "http://www.w3.org/2000/svg"; 
        var mPath = document.createElementNS(svgNS,"path"); 
        mPath.setAttributeNS(null,"d",dimensions);
        mPath.setAttributeNS(null,"class","selected"+pathClass);
        document.getElementById("drawinglayer").appendChild(mPath);
    }    
    
    //check if its the end of the path
    var isEndpoint=function(){
        
        var dimensions=$(selectedPath).attr("d");
        var dimensionsA=dimensions.split(" ");

        var startX1=dimensionsA[1];
        var startY1=dimensionsA[2];

        if(startX1==x2 && startY1==y2){
            return true;
        } else {
            return false;  
        }    
    }
    
    /* DRAW CURVE
    * determine how to draw new segment
    */
    var drawCurved=function(){
     
        //is first click 
        if(selectedPath.length==0){
            newPath();        
        } else {
            if(isEndpoint()==true){
                var dimensions=$(selectedPath).attr("d");
                dimensions=dimensions +" Z";
                $(selectedPath).attr("d",dimensions).removeClass("selected");
            } else {
                
                var dimensions=$(selectedPath).attr("d");
                var type=findType();
                
                var firstCurve=$(selectedPath).hasClass("newCurve");
                          
                if (type[0]=="L" && firstCurve==true ){
                    console.log("converting");
                   var dimensions=$(selectedPath).attr("d")+" "+x2+ " "+ y2;
                   dimensions=dimensions.replace("L", "Q"); //Convert the line to a curve    
                }  else if (type=="Q") {
                    var dimensions=$(selectedPath).attr("d")+" "+x2+ " "+ y2;
                }    
                
                $(selectedPath).attr("d",dimensions);
            }    
        }    
        
    }    
     
    //find next coord type 
    var findType=function(){ 
        
        //break the path dimenions up into an array
        var dimensions=$(selectedPath).attr("d");
        var DList=dimensions.split(" ");
        
        var type=''; //record last letter in "D" attribute which indicates point type
        var count=0; //record distance from letter
        
        //pass through each element
        for(var i in DList){
            count++;
                        
            if(isLetter(DList[i])==true){
                type=DList[i];
                count=0;
            }    
        }    
        
        var typePackage=[type,count];
        return typePackage;
    }
    
    var isLetter =function(str) {
        var x= str.length === 1 && str.match(/[a-z]/i);
        if(x!=false){
            return true;
        }   else {
            return false;   
        }
    }
    
    init();
    return self;
}    