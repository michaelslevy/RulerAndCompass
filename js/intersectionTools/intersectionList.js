var IntersectionList = function(settings){
	  
    this.intersectingElements=new BinarySearchTree;
    this.intersectionCoord;
    this.elem;
    this.elem2;
    
    //add node
    this.add=function(){
  	
    	var coords=this.intersectionCoord;
    	var elem=this.elem;
    	var elem2=this.elem2;
    	var unique=false;
    	
    	//check if x-coordinate exists by requesting list of Y's
    	var yCoordsList=this.intersectingElements.contains(coords.x);
    	
    	//if not: add x coordinate and create new y tree
    	if(yCoordsList==false ) {
    		yCoordsList=[coords.y];
    		var elements=[elem,elem2];
    		yCoordsList=[];
    		this.intersectingElements.add(coords.x,yCoordsList);
    		unique=true;
    	}
    	
    	 //check if y-coordinate exists
    	else {
    		
    		//if no y: add y to yCoordsList tree
    		if($.inArray( coords.y ,yCoordsList )==false){
    			yCoordsList[coords.y]=[elem,elem2];
    		}

    		//If Y exists: check elements
    		else {
    			if($.inArray( elem ,yCoordsList[coords.y] )==false ){
    				yCoordsList[coords.y].push(elem);
    			}
    			
    			if($.inArray( elem2 ,yVals )==false ){
    				yCoordsList[coords.y].push(elem2);
    			}
    		   
    		}
    	}	
    		   
    	//does intersecting element exist at coordinate
    	//if not add it
    	
    	if(unique==true){
    		this.addIntersectionHitSpot();
    	}
    	
    }
    
	this.addIntersectionHitSpot=function(){
		var coord=this.intersectionCoord;
		//console.log(coord);
		$("#intersection_points").CircleDraw({cx:coord.x,cy:coord.y,radius:5, css_class:"intersection" });
	}
        
}