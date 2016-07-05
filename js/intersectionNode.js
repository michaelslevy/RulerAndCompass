var IntersectionNode = function(coords,elems){
	
	self=this;
	self.intersectionCoords=coords;
	self.elem1=elems[0];
	self.elem2=elems[1];
	
	//check if exists
	var init=function(){
		var node=nodeExists();
		console.log(node);
		if(node==false){
			drawNode();
		} else {
			addNodeElement(node);
		}
	}
	init();
	
	 function nodeExists(){
	 	var coord=self.intersectionCoords;
	 	var exists=false;
		$("#intersection_points circle").each(function(){
			
			var cx=Number($(this).attr('cx'));
			var cy=Number($(this).attr('cy'));
            						
			if(cx==coord.x && cy==coord.y){
				exists =true;
                return;
			}
			
		});
		return exists;
	}
	
	//if not: draw node
	function drawNode(){
		var c=self.intersectionCoords;
		$("#intersection_points").CircleDraw({cx:c.x,cy:c.y,radius:5, css_class:"intersection" });
	}
	
	//else: add element id to node
	function addNodeElement(node){
		
	}
	
}