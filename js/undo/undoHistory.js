var UndoHistory=function(){
    
    self=this;
    
    var undoHistory= JSON.parse(localStorage.getItem("RC_undoHistory"));
    var lastStep=false;
    
    if(typeof undoHistory=="undefined" || undoHistory==null){
        undoHistory=[];  
    }    
    
    self.refresh=function(){
        localStorage.clear("RC_undoHistory");
    }
        
    self.addStep=function(undoObj){ 
        console.log(undoObj);
        undoHistory.push(undoObj);
        saveHistory();
    }
    
    self.stepBack=function(){
        lastStep=undoHistory.pop();
        
        if(typeof lastStep=="undefined"){
            return false;   
        }    
        
        switch(lastStep.type){
            case "add-primitive":
                removePrimitives();
                $(".preview_line").remove();
            break;
                
            case "layerDeletion":
                reinsertLayer();
                $(".preview_line").remove();
            break;    
                
        }
        
        saveHistory();
    }
    
    var removePrimitives=function(){
        for(var i in lastStep.content){
            var elemID= lastStep.content[i];
            $("[data-identifier='"+elemID+"']").remove();
        }    
    }
   
    
    /**********************/
    /*** Reinsert Layer ***/
    /**********************/
    
    var reinsertLayer=function(){
        
        //retrieve values needed to reinsert variables
        var svg=lastStep.content;
        var pos=lastStep.position; //position of svg element
        var insertAfter=pos-1; // position before the svg element
                
        //reinsert svg
        
        ////////////////////////////////
        // do any layer groups exist // 
        ///////////////////////////////
        
        var groupCount=document.getElementById("workingLayers").getElementsByClassName('layerGroup').length;
                
        //if not insert into html
        if(groupCount==0){
            document.getElementById("workingLayers").innerHTML=svg;
        }

        //if so insert into position
        else {
            var before=document.getElementById("workingLayers").getElementsByClassName('layerGroup')[insertAfter];
            
            if(typeof before == "undefined"){
                elem=document.getElementById("workingLayers");
                elem.innerHTML=svg+elem.innerHTML;
            } else {
                before.insertAdjacentHTML("afterend", svg);
            }
            
        }
        
        /////////////////////////////////////////////
        // Reinsert Layer Pallette representation //
        ////////////////////////////////////////////
        
        var addLayer=new AddLayer();
        addLayer.setPos(pos);
        addLayer.reinsertLayer();
        
    }
    
    var saveHistory=function(){
        var historyJSON=JSON.stringify(undoHistory);
        localStorage.setItem("RC_undoHistory", historyJSON);
    }    
    
    return self;
}