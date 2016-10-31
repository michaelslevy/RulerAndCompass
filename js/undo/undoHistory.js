var UndoHistory=function(){
    
    self=this;
    
    var undoHistory= JSON.parse(localStorage.getItem("RC_undoHistory"));
    if(typeof undoHistory=="undefined" || undoHistory==null){
        undoHistory=[];  
    }    
        
    self.addStep=function(undoObj){ 
        undoHistory.push(undoObj);
        var historyJSON=JSON.stringify(undoHistory);
        localStorage.setItem("RC_undoHistory", historyJSON);
    }
    
    self.stepBack=function(){
    
    }
    
    return self;
}