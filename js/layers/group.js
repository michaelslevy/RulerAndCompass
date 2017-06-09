var Group=function(){
    
    var self=this;
    self.args={
        parentID:'', //id of where the group is inserted
        id:'', //groups' id
        index:'', //position in Working Layers
        class:'', // css classes
        stroke:'', //svg stroke color
        strokeWidth:'' //svg stroke width
    }
   
    //add the new group
   self.addGroup=function(){
       
       var valid=validateGroup();
       
       if(valid==0){
           return false;
       }
       
       var svgNS = "http://www.w3.org/2000/svg"; 

       var mGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            
       mGroup.setAttribute("id", self.args.id);
       
       if(typeof self.args.index!='undefined'){
           mGroup.setAttribute("data-index", self.args.index);
       }
       
       if(typeof self.args.class!='undefined'){
            mGroup.setAttribute("class", self.args.class);
       }
       
       if(typeof self.args.stroke!='undefined'){
            mGroup.setAttribute("data-stroke", self.args.stroke);
       }
       
       if(typeof self.args.strokeWidth!='undefined'){
            mGroup.setAttribute("data-stroke-width", self.args.strokeWidth);
       }
       
       document.getElementById(self.args.parentID).appendChild(mGroup);
       
   }
   
   //Verify the group has an ID and a Parent
   var validateGroup=function(){
       
       var valid=1;
       
       if(self.args.id==''){
           valid=0;
           console.error("The group could not be added because it is missing an ID");
       }
       
       if(self.args.parentID==''){
           valid=0;
           console.error("The group could not be added because it is missing a PARENT ID");
       }
       
       return valid;
       
   }
    
}