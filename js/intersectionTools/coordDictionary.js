/* 
uses sweep line algorithim to efficiently detect intersection points
https://www.youtube.com/watch?v=_j1Qd9suN0s
*/

var CoordDictionary = function(settings){
	  
        var self=this;
    	self.snapshot_width=10; //x positions are checked at this increment
    	self.Dictionary=[];
        self.DictionaryVerticals=[];
    	self.currentElement='';
    	self.currentElementID='';
        self.newNodeList=[];//passed to undo history
    	var lastComparison=[];//last comparison list
	      
        self.find_coords=function(){
			
            self.newNodeList=[];//reset number of new intersections
            
			if(self.currentElement.is("circle")==true ) {
				self.find_circle_intersections();
				return;
			}  else {
                self.checkLineIntersections();   
            }    
        }
        
        //run line and circle intersetcion checks
        self.checkLineIntersections=function(){
            self.currentElementID=$(self.currentElement).attr("data-identifier");
     		
     		//check intersections with circles
			self.findLineCircleIntersections();
            
            //check intersections with lines
           // self.runSweepLineCheck();
           self.findLineLineIntersections();
        }    
        
        self.findLineLineIntersections=function(){
        	$("#guidelines line").not("[data-identifier='"+self.currentElementID+"']").each(function(){

        		var intersections = new LineIntersections();
        		intersections.line1=$(this);
        		intersections.line2=$("[data-identifier='"+self.currentElementID+"']");
        		var intersection_point=intersections.intersection_point();
        		if(intersection_point!=false && isNaN(intersection_point.x)!=true &&  isNaN(intersection_point.y)!=true){ 
        			var elems=[];
					addIntersectionNode(intersection_point,elems);
				}
        		
        	});
        }
        
        //if the line is straight up and down track seperately
        self.runSweepLineCheck=function(){
            var myX1=parseInt($(self.currentElement).attr("x1"));
     		var myX2=parseInt($(self.currentElement).attr("x2"));
            
            if(myX1==myX2){
                self.verticalsSweepline();
            } else {
                self.normalSweepLine();
                self.checkNormalVerticalIntersections();//check against verticals
            }    
            
        }
        
        //used if line is straight up and down
        self.verticalsSweepline=function(){
            var x=parseInt($(self.currentElement).attr("x1"));
     		
            //add a new position
            if(typeof self.DictionaryVerticals[x]=="undefined" ){
                self.DictionaryVerticals[x]=[self.currentElementID]
            } 
            
            //add a new id to a position
            else {
                self.DictionaryVerticals[x].push(self.currentElementID);
            }    
            
            self.checkVerticalNormalIntersections();
        }    
        
        //checks vertical line after adding
        self.checkVerticalNormalIntersections=function(){
            var xToCheck=parseInt($(self.currentElement).attr("x1"));
            var min=xToCheck-self.snapshot_width;
            var max=xToCheck+self.snapshot_width;
            for (var x in self.Dictionary){
            
            //find snapshots in rage of vertical line
                if(x > min && x < max){
                    var checklist=[];
                    for(el in self.Dictionary[x]){
                        var newId=self.Dictionary[x][el].id;
                        checklist.push(newId);
                    }    
                                        
                    for(el in checklist){
                        var normal=checklist[el];
                        var vertical=self.currentElementID;
                        findVerticalNormalintersection_points(vertical, normal);
                    }    
                }    
            }    

        }    
        
         //checks new line against vertical lines
        self.checkNormalVerticalIntersections=function(){
        	
        	
            var min=parseInt($(self.currentElement).attr("x1"));
            var max =parseInt($(self.currentElement).attr("x2"));
            
            
            //look in veritical dictionary for match
            for (var x in self.DictionaryVerticals){
                        
            //find snapshots in range of vertical line
                if(x > min && x < max){
                    var checklist=[];
                    
                    for(el in self.DictionaryVerticals[x]){
                        var newId=self.DictionaryVerticals[x][el];
                        checklist.push(newId);
                    }    
                     
                 //calculate intersection points for elements in list
                    for(el in checklist){
                        var vertical=checklist[el];
                        var normal=self.currentElementID;
                        findVerticalNormalintersection_points(vertical, normal);
                    }    
                }    
            }    

        }    
        
        //used for all other lines
        self.normalSweepLine=function(){
            var myX1=parseInt($(self.currentElement).attr("x1"));
     		var myX2=parseInt($(self.currentElement).attr("x2"));
            
     		if(myX1>myX2){
     			min_x=myX2;
     			max_x=myX1;
     		} else {
     			max_x=myX2;
     			min_x=myX1;
     		}  
     		
     		var start=self.find_start(min_x)-(self.snapshot_width*2); 
     		var end=max_x+(self.snapshot_width*2);
     		var my_y="nan";

     		for(var xpos=start;xpos<=end; xpos=xpos+self.snapshot_width){

         		my_y=$(self.currentElement).LineEquation({known_x:xpos}).y_from_x();
         		self.add_y_to_dictionary(xpos,my_y );
         		self.check_for_intersections(xpos); 

         	}
         	         	         	
         	//reset comparison array
         	lastComparison=[];
         	
     	}
         	
         /*
          * Find Coords
          * Find the Y value for each snapshot postition along the X axis
          */

         /* find the starting snapshot for an element */
         self.find_start=function(min_x){
         	var mstart =Math.floor(min_x / self.snapshot_width) * self.snapshot_width; 
         	return mstart;
         }
         
         /* Add a Y value to the dictionary paired with the shape id */
		 self.add_y_to_dictionary=function(my_x,my_y){
			el_id=$(self.currentElement).attr('data-identifier');
	
			var entry=[];
			entry.y=my_y;
			entry.id=el_id;
			
			if(typeof self.Dictionary[my_x] === 'undefined') {
			    self.Dictionary[my_x]=[];
			}
			
			self.Dictionary[my_x].push(entry);
			var enrtySorted=sort_entry(self.Dictionary[my_x]);
			self.Dictionary[my_x]=enrtySorted;
			
		} 	
		
		function sort_entry(entry){
			
			entry.sort(function(a,b) {
			 // assuming distance is always a valid integer
			 return parseFloat(a.y) - parseFloat(b.y);
			});
			
			return entry;
			
		}
    
        var findVerticalNormalintersection_points=function(vertical, normal) {
            
            //vertical coords       
            var vLine=$("line[data-identifier='"+vertical+"']");
            var vX=Number(vLine.attr("x1"));
            var vY1=Number(vLine.attr("y1"));
     		var vY2=Number(vLine.attr("y2"));

            //normal coords
            var nLine=$("line[data-identifier='"+normal+"']");
            var nX1=Number(nLine.attr("x1"));
     		var nX2=Number(nLine.attr("x2"));
            var nyY1=Number(nLine.attr("y1"));
     		var nyY2=Number(nLine.attr("y2"));
            
            //is inside range
            if( (nX1 >vX && nX2<vX) || (nX1 < vX && nX2 > vX)) {
                
                //find y at X
                var iY=nLine.LineEquation({known_x:vX}).y_from_x();//y
                var coords=new Coords(vX,iY );
                var elem=[vertical, normal];
                addIntersectionNode(coords, elem);
            } 
            
            //if is in range: intersection=y on normal
        }
        
          
		
		self.check_for_intersections=function(current_x){
			
			/*
			 * Sweep Line Check
			 * At each X ccordinate check for position shifts on the Y axis
			 * order changes relative to another element indicates that an intersection has ocurred
			 */
			
			// Look for more than one element in the Dictionary at given x position
			// If more than one exists compare previous array to current position
			
			//find previous position by subtracting snapshot distance from current X position
			var current_x=current_x;
			var last_x=current_x-self.snapshot_width;
						
			/*
			 * Compare order of ID to other element in each array. 
			 * If there is a change add elements into intersectingElements[]
			 */
			 			
			//locate dictionary for current X 
			var current_x_list=self.Dictionary[current_x];
			//reuse last comparison list
			var last_x_list=lastComparison;
			
			//if comparison list is undefined: current list = last list; end;
			if(typeof lastComparison =="undefined"){
				
				//make sure there is at least two to compare
					if(current_x_list.length>1){
						last_comparisons=self.make_comparison_list(current_x_list);
					}
				return;
			} 
			//if last list is present: make a current list
			else if(typeof current_x_list!="undefined"  ){ 
				//make sure there is at least two to compare
				if(current_x_list.length>1){
					current_comparisons=self.make_comparison_list(current_x_list);
				}
												
			}
			
			//Now compare the two. Crossing of size will indicate an intersection
			if(typeof current_comparisons !="undefined" && typeof lastComparison !="undefined"){
				//console.log(current_comparisons,lastComparison);
				self.append_intersection_list(current_comparisons,lastComparison );
			}
							
			 //Prepare for the next go around	
			if(typeof current_comparisons!="undefined"  ){ 
				lastComparison=current_comparisons;
			}	
		}
		
        //checks for differences in sort order between lists
		self.append_intersection_list=function(current_comparisons,lastComparison ){
			//console.log(current_comparisons,lastComparison);
			
			//use jquery to test if objects are empty
			if($.isEmptyObject(current_comparisons)==false && $.isEmptyObject(lastComparison)==false){

				for(index in current_comparisons ){
					if(current_comparisons[index]!=lastComparison[index]){
						elems=[index,self.currentElementID];
						self.find_intersection_points(elems);
					}
				} 
				
			}
		}
		
		self.make_comparison_list=function(list){
				var comparison_list=[];
				var compare='smaller';
				for(var it=0; it<list.length; it++ ){
					var li=list[it];
					if(li.id==self.currentElementID){
						compare="subject";
						comparison_list[li.id]=compare; 
						compare="bigger";
					} else {
						comparison_list[li.id]=compare;
					}
				}//end for loop
			return comparison_list;
		}//end make comparison list
		
       	//The grand finale
		//Find intersection points and add them to the list
		self.find_intersection_points=function(elems){
			var intersectionCoord=new LineIntersections(); 
			intersectionCoord.line1Id=elems[0];
			intersectionCoord.line2Id=elems[1];
			
			var intersection_point=intersectionCoord.intersection_point();
                        
			var iCoord=new Coords(intersection_point.x,intersection_point.y);
			if(intersection_point!=false && isNaN(intersection_point.x)!=true &&  isNaN(intersection_point.y)!=true){ 
				addIntersectionNode(iCoord,elems);
			}
		}
		
		self.find_circle_intersections=function(){
			var cur=self.currentElement;
			
			$("#guidecircles circle").not(self.currentElement).not(".preview_line").each(function(){

                var intersects=$(cur).CircleEquation({circleToTest:$(this)}).FindCircleCircleIntersections();

                var elems=[$(this).attr("data-identifier"),$(cur).attr("data-identifier")];
												
				if(intersects[0]!=false && typeof intersects[0]!="undefined"){
					//make intersection node
					var iCoord=new Coords(intersects[0].x,intersects[0].y);
					addIntersectionNode(iCoord,elems);
				} 
 				if(intersects[1]!=false && typeof intersects[1]!="undefined"){
 					//make intersection node
 					var iCoord=new Coords(intersects[1].x,intersects[1].y);
 					addIntersectionNode(iCoord,elems);
				}

			});
			
			$("line").not(".preview_line").each(function(){
				var intersects=$(cur).CircleEquation({lineToTest:$(this)}).findCircleLineIntersection();
				var elems=[$(this).attr("data-identifier"),$(cur).attr("data-identifier")];
								
				if(intersects[0]){
					var iCoord=new Coords(intersects[0].x,intersects[0].y);
					addIntersectionNode(iCoord,elems);
				} 
 				if(intersects[1]){
					var iCoord=new Coords(intersects[1].x,intersects[1].y);
					addIntersectionNode(iCoord,elems);
				}
			});
			
		}
		
		self.findLineCircleIntersections=function(){
			var cur=self.currentElement;
			
			$("#guidecircles circle").each(function(){
				var intersects=$(this).CircleEquation({lineToTest:cur}).findCircleLineIntersection();

				var elems=[$(this).attr("data-identifier"),$(cur).attr("data-identifier")];
				
				if(intersects!=false ){ 
					if(intersects[0]){
						var iCoord=new Coords(intersects[0].x,intersects[0].y);
						addIntersectionNode(iCoord,elems);
					} 
	 				if(intersects[1]){
						var iCoord=new Coords(intersects[1].x,intersects[1].y);
						addIntersectionNode(iCoord,elems);
					}	
				}
			});
		}
        
        var addIntersectionNode = function(iCoord,elems){

            var iNode=new IntersectionNode(iCoord,elems); 
            //was a new node created
            if(iNode.nodID.length>1){
                self.newNodeList.push(iNode.nodID);
            }    
        }    
        
       self.removeIntersection=function(myId){
           $("[data-identifier='"+myId+"']").remove();
           self.removePositionsById(myId);
           //removeEmptyPositions();
          
       }   
       
       self.removePositionsById=function(myId){
            //loop through dictionary by X positions remove positions with a given id
           
           for(var x in self.Dictionary){
               
                if(typeof self.Dictionary[Number(x)] != "undefined" ){
                    //loop through x position
                   for(var i=0; i<self.Dictionary[x].length; i++){
                       if(self.Dictionary[x][i]!=="undefined"){
                           //compare id's
                           if(self.Dictionary[x][i].id==myId){
                               //remove if id's match
                               self.Dictionary[x].splice(i, 1);
                           } //end id comparison  
                       }//end if  self.Dictionary[x][i] exists  
                   } 
                } //end if  self.Dictionary[i] !=="undefined" 
           }     
           
           removeEmptyPositions();
       }   
        
       var removeEmptyPositions=function(){
            for(var x=0; x < self.Dictionary.length; x=x+1){
                if(typeof self.Dictionary[x]!="undefined"){
                    if(self.Dictionary[x].length==0){
                        self.Dictionary.splice(x, 1);
                    }   
                }    
            } 
       }   
		
/* 
uses sweep line algorithim to efficiently detect intersection points
https://www.youtube.com/watch?v=_j1Qd9suN0s
*/

var CoordDictionary = function(settings){
	  
        var self=this;
    	self.snapshot_width=10; //x positions are checked at this increment
    	self.Dictionary=[];
        self.DictionaryVerticals=[];
    	self.currentElement='';
    	self.currentElementID='';
    	var lastComparison=[];//last comparison list
	      
        this.find_coords=function(){
     		
     	/*	Brute force test algorithm 
     	 *  It is initially fast, but gets exponentially larger with each line
     	 *  Sweep Line has better worst case with very fast best case scenarios
     	 
			var ce=self.currentElement;
			$('line').not(self.currentElement).each(function(){
				var coord=new LineIntersections(); 
				coord.line1Id=$(ce).attr("data-identifier");
				coord.line2Id=$(this).attr("data-identifier");
				var intersection_point=coord.intersection_point();
				if(intersection_point!=false && isNaN(intersection_point.x)!=true &&  isNaN(intersection_point.y)!=true){ 
					$("#intersection_points").CircleDraw({cx:intersection_point.x,cy:intersection_point.y,radius:5, css_class:"intersection" });
				}
			});
			*/
						
			if(self.currentElement.is("circle")==true ) {
				this.find_circle_intersections();
				return;
			}  else {
                this.checkLineIntersections();   
            }    
        }
        
        //run line and circle intersetcion checks
        this.checkLineIntersections=function(){
            self.currentElementID=$(self.currentElement).attr("data-identifier");
     		
     		//check intersections with circles
			self.findLineCircleIntersections();
            
            //check intersections with lines
            self.runSweepLineCheck();
        }    
        
        //if the line is straight up and down track seperately
        self.runSweepLineCheck=function(){
            var myX1=parseInt($(self.currentElement).attr("x1"));
     		var myX2=parseInt($(self.currentElement).attr("x2"));
            
            if(myX1==myX2){
                self.verticalsSweepline(); 
            } else {
                self.normalSweepLine();
            }    
            
        }
        
        //used if line is straight up and down
        self.verticalsSweepline=function(){
        	
        	console.log( "sweeping" );
            var x=parseInt($(self.currentElement).attr("x1"));
     		
            //add a new position
            if(typeof self.DictionaryVerticals[x]=="undefined" ){
                self.DictionaryVerticals[x]=[self.currentElementID]
            } 
            
            //add a new id to a position
            else {
                self.DictionaryVerticals[x].push(self.currentElementID);
            }    
            
            console.log(self.DictionaryVerticals);
            
            self.checkVerticalNormalIntersections();
            
        }    
        
        //checks vertical line after adding
        self.checkVerticalNormalIntersections=function(){
            var xToCheck=parseInt($(self.currentElement).attr("x1"));
            var min=xToCheck-self.snapshot_width;
            var max=xToCheck+self.snapshot_width;
            for (var x in self.Dictionary){
            
            //find snapshots in rage of vertical line
                if(x > min && x < max){
                    var checklist=[];
                    for(el in self.Dictionary[x]){
                        var newId=self.Dictionary[x][el].id;
                        checklist.push(newId);
                    }    
                                        
                    for(el in checklist){
                        var normal=checklist[el];
                        var vertical=self.currentElementID;
                        findVerticalNormalintersection_points(vertical, normal);
                    }    
                }    
            }    

        }    
        
        //used for all other lines
        self.normalSweepLine=function(){
            var myX1=parseInt($(self.currentElement).attr("x1"));
     		var myX2=parseInt($(self.currentElement).attr("x2"));
            
     		if(myX1>myX2){
     			min_x=myX2;
     			max_x=myX1;
     		} else {
     			max_x=myX2;
     			min_x=myX1;
     		}  
     		
     		var start=self.find_start(min_x)-(self.snapshot_width*2); 
     		var end=max_x+(self.snapshot_width*2);
     		var my_y="nan";

     		for(var xpos=start;xpos<=end; xpos=xpos+self.snapshot_width){

         		my_y=$(self.currentElement).LineEquation({known_x:xpos}).y_from_x();
         		self.add_y_to_dictionary(xpos,my_y );
         		self.check_for_intersections(xpos); 

         	}
         	         	
         	//reset comparison array
         	lastComparison=[];
         	
     	}
         	
         /*
          * Find Coords
          * Find the Y value for each snapshot postition along the X axis
          */

         /* find the starting snapshot for an element */
         self.find_start=function(min_x){
         	var mstart =Math.floor(min_x / self.snapshot_width) * self.snapshot_width; 
         	return mstart;
         }
         
         /* Add a Y value to the dictionary paired with the shape id */
		 self.add_y_to_dictionary=function(my_x,my_y){
			el_id=$(self.currentElement).attr('data-identifier');
	
			var entry=[];
			entry.y=my_y;
			entry.id=el_id;
			
			if(typeof self.Dictionary[my_x] === 'undefined') {
			    self.Dictionary[my_x]=[];
			}
			
			self.Dictionary[my_x].push(entry);
			var enrtySorted=sort_entry(self.Dictionary[my_x]);
			self.Dictionary[my_x]=enrtySorted;
			
		} 	
		
		function sort_entry(entry){
			
			entry.sort(function(a,b) {
			 // assuming distance is always a valid integer
			 return parseFloat(a.y) - parseFloat(b.y);
			});
			
			return entry;
			
		}
    
        var findVerticalNormalintersection_points=function(vertical, normal) {
            
            //vertical coords       
            var vLine=$("line[data-identifier='"+vertical+"']");
            var vX=Number(vLine.attr("x1"));
            var vY1=Number(vLine.attr("y1"));
     		var vY2=Number(vLine.attr("y2"));

            //normal coords
            var nLine=$("line[data-identifier='"+normal+"']");
            var nX1=Number(nLine.attr("x1"));
     		var nX2=Number(nLine.attr("x2"));
            var nyY1=Number(nLine.attr("y1"));
     		var nyY2=Number(nLine.attr("y2"));
            
            //is inside range
            if( (nX1 >vX && nX2<vX) || (nX1 < vX && nX2 > vX)) {
                
                //find y at X
                var iY=nLine.LineEquation({known_x:vX}).y_from_x();//y
                var coords=new Coords(vX,iY );
                var elem=[vertical, normal];
                addIntersectionNode(coords, elem);
            } 
        
             
            
            //if is in range: intersection=y on normal
        }
        
          
		
		self.check_for_intersections=function(current_x){
			
			/*
			 * Sweep Line Check
			 * At each X ccordinate check for position shifts on the Y axis
			 * order changes relative to another element indicates that an intersection has ocurred
			 */
			
			// Look for more than one element in the Dictionary at given x position
			// If more than one exists compare previous array to current position
			
			//find previous position by subtracting snapshot distance from current X position
			var current_x=current_x;
			var last_x=current_x-self.snapshot_width;
						
			/*
			 * Compare order of ID to other element in each array. 
			 * If there is a change add elements into intersectingElements[]
			 */
			 			
			//locate dictionary for current X 
			var current_x_list=self.Dictionary[current_x];
			//reuse last comparison list
			var last_x_list=lastComparison;
			
			//if comparison list is undefined: current list = last list; end;
			if(typeof lastComparison =="undefined"){
				
				//make sure there is at least two to compare
					if(current_x_list.length>1){
						last_comparisons=self.make_comparison_list(current_x_list);
					}
				return;
			} 
			//if last list is present: make a current list
			else if(typeof current_x_list!="undefined"  ){ 
				//make sure there is at least two to compare
				if(current_x_list.length>1){
					current_comparisons=self.make_comparison_list(current_x_list);
				}
												
			}
			
			//Now compare the two. Crossing of size will indicate an intersection
			if(typeof current_comparisons !="undefined" && typeof lastComparison !="undefined"){
				//console.log(current_comparisons,lastComparison);
				self.append_intersection_list(current_comparisons,lastComparison );
			}
							
			 //Prepare for the next go around	
			if(typeof current_comparisons!="undefined"  ){ 
				lastComparison=current_comparisons;
			}	
		}
		
        //checks for differences in sort order between lists
		self.append_intersection_list=function(current_comparisons,lastComparison ){
			//console.log(current_comparisons,lastComparison);
			if(current_comparisons.length>0 && lastComparison.length>0){
				
				for(index in current_comparisons ){
					if(current_comparisons[index]!=lastComparison[index]){
						elems=[index,self.currentElementID];
						self.find_intersection_points(elems);
					}
				} 
				
			}
		}
		
		self.make_comparison_list=function(list){
				var comparison_list=[];
				var compare='smaller';
				for(var it=0; it<list.length; it++ ){
					var li=list[it];
					if(li.id==self.currentElementID){
						compare="subject";
						comparison_list[li.id]=compare; 
						compare="bigger";
					} else {
						comparison_list[li.id]=compare;
					}
				}//end for loop
			return comparison_list;
		}//end make comparison list
		
       	//The grand finale
		//Find intersection points and add them to the list
		self.find_intersection_points=function(elems){
			var intersectionCoord=new LineIntersections(); 
			intersectionCoord.line1Id=elems[0];
			intersectionCoord.line2Id=elems[1];
            
			var intersection_point=intersectionCoord.intersection_point();
            
            
			var iCoord=new Coords(intersection_point.x,intersection_point.y);
			if(intersection_point!=false && isNaN(intersection_point.x)!=true &&  isNaN(intersection_point.y)!=true){ 
				addIntersectionNode(iCoord,elems);
			}
		}
		
		self.find_circle_intersections=function(){
			var cur=self.currentElement;
			
			$("#guidecircles circle").not(self.currentElement).not(".preview_line").each(function(){

                var intersects=$(cur).CircleEquation({circleToTest:$(this)}).FindCircleCircleIntersections();

                var elems=[$(this).attr("data-identifier"),$(cur).attr("data-identifier")];
												
				if(intersects[0]!=false && typeof intersects[0]!="undefined"){
					//make intersection node
					var iCoord=new Coords(intersects[0].x,intersects[0].y);
					addIntersectionNode(iCoord,elems);
				} 
 				if(intersects[1]!=false && typeof intersects[1]!="undefined"){
 					//make intersection node
 					var iCoord=new Coords(intersects[1].x,intersects[1].y);
 					addIntersectionNode(iCoord,elems);
				}

			});
			
			$("line").not(".preview_line").each(function(){
				var intersects=$(cur).CircleEquation({lineToTest:$(this)}).findCircleLineIntersection();
				var elems=[$(this).attr("data-identifier"),$(cur).attr("data-identifier")];
								
				if(intersects[0]){
					var iCoord=new Coords(intersects[0].x,intersects[0].y);
					addIntersectionNode(iCoord,elems);
				} 
 				if(intersects[1]){
					var iCoord=new Coords(intersects[1].x,intersects[1].y);
					addIntersectionNode(iCoord,elems);
				}
			});
			
		}
		
		self.findLineCircleIntersections=function(){
			var cur=self.currentElement;
			
			$("#guidecircles circle").each(function(){
				var intersects=$(this).CircleEquation({lineToTest:cur}).findCircleLineIntersection();

				var elems=[$(this).attr("data-identifier"),$(cur).attr("data-identifier")];
				
				if(intersects!=false ){ 
					if(intersects[0]){
						var iCoord=new Coords(intersects[0].x,intersects[0].y);
						addIntersectionNode(iCoord,elems);
					} 
	 				if(intersects[1]){
						var iCoord=new Coords(intersects[1].x,intersects[1].y);
						addIntersectionNode(iCoord,elems);
					}	
				}
			});
		}
        
        var addIntersectionNode = function(iCoord,elems){

            var iNode=new IntersectionNode(iCoord,elems); 
        }    
        
       self.removeIntersection=function(myId){
           $("[data-identifier='"+myId+"']").remove();
           this.removePositionsById(myId);
           //removeEmptyPositions();
          
       }   
       
       self.removePositionsById=function(myId){
            //loop through dictionary by X positions remove positions with a given id
           
           for(var x in self.Dictionary){
               
                if(typeof self.Dictionary[Number(x)] != "undefined" ){
                    //loop through x position
                   for(var i=0; i<self.Dictionary[x].length; i++){
                       if(self.Dictionary[x][i]!=="undefined"){
                           //compare id's
                           if(self.Dictionary[x][i].id==myId){
                               //remove if id's match
                               self.Dictionary[x].splice(i, 1);
                           } //end id comparison  
                       }//end if  self.Dictionary[x][i] exists  
                   } 
                } //end if  self.Dictionary[i] !=="undefined" 
           }     
           
           removeEmptyPositions();
       }   
        
       var removeEmptyPositions=function(){
            for(var x=0; x < self.Dictionary.length; x=x+1){
                if(typeof self.Dictionary[x]!="undefined"){
                    if(self.Dictionary[x].length==0){
                        self.Dictionary.splice(x, 1);
                    }   
                }    
            } 
       }   
		
		}
 	}