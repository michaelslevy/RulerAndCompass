var IntersectionNode = function(coords,elems){
	self=this;
	self.intersectionCoords=coords;
	self.elem1=elems[0];
	self.elem2=elems[1];
    self.nodID='';
	
	//check if exists
	var init=function(){
		var node=nodeExists();

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
			
			//looks for intersections within .01 pexls of each other
			var cx=Number($(this).attr('cx'));
			var cy=Number($(this).attr('cy'));
            var IntX=Number(coord.x);
            var IntY=Number(coord.y);
         
         var X=cx.toFixed(2);
         var Y= cy.toFixed(2);
         var x=IntX.toFixed(2);
          var y=IntY.toFixed(2);
       
            						
			if(X==x && y==Y){
				exists =true;
                return;
			}
			
		});
		return exists;
	}
	
	//if not: draw node
	function drawNode(){
		var c=self.intersectionCoords;
        var layerIndex=$(".layerGroup.selected").attr("data-index");
		$("#intersection_points"+layerIndex).CircleDraw({cx:c.x,cy:c.y,radius:5, css_class:"intersection",stroke:'none',fill:'fill' });
        self.nodID=$("#intersection_points"+layerIndex +" circle").last().attr("data-identifier");
	}
	
	//else: add element id to node
	function addNodeElement(node){
		
	}
	
}