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
                
        }
        
        saveHistory();
    }
    
    var removePrimitives=function(){
        for(var i in lastStep.content){
            var elemID= lastStep.content[i];
            $("[data-identifier='"+elemID+"']").remove();
        }    
    }
    
    var saveHistory=function(){
        var historyJSON=JSON.stringify(undoHistory);
        localStorage.setItem("RC_undoHistory", historyJSON);
    }    
    
    return self;
}