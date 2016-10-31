var UndoHistory=function(){
    
    self=this;
    
    var undoHistory=[];
    
    self.addStep=function(undoObj){ 
        console.log(undoObj);
        undoHistory.push(undoObj);
        console.log(undoHistory);
    }
    
    self.stepBack=function(){
    
    }
    
    return self;
}