var PathClick=function(mode){
    var self=this;
    
    var mode=mode;//straight or curved
    self.teriminal=false;//indicates end of segment
    
    var clickType='point';//point or handle
    
    var init=function(){
    
        console.log(mode);
        
        //is first click
        
            //add starting segment
        
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