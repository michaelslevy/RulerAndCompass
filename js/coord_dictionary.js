	var CoordDictionary = function(settings){
	  
        var self=this;
    	this.snapshot_width=10;
    	this.Dictionary=[];
    	this.intersectingElements=[];
    	this.currentElement='';
    	this.currentElementID='';
    	var lastComparison=[];//last comparison list
	      
        this.find_coords=function(){
     	
     		var myX1=$(this.currentElement).attr("x1");
     		var myX2=$(this.currentElement).attr("x2");
     		this.currentElementID=$(this.currentElement).attr("data-identifier");
     		
     		if(myX1>myX2){
     			min_x=myX2;
     			max_x=myX1;
     		} else {
     			max_x=myX2;
     			min_x=myX1;
     		}  
     		
     		var start=this.find_start(min_x);
     		var my_y="nan";
     		     		     		
     		for(i=start;i<=max_x; i=i+this.snapshot_width){
         		my_y=$(this.currentElement).LineEquation({known_x:i}).y_from_x().toFixed(2);
         		this.add_y_to_dictionary(i,my_y );
         		this.check_for_intersections(i); 
         	}
         	
         	//reset comparison array
         	lastComparison=[];
         	
         	if(typeof intersectingElements !="undefined"){
         		console.log(intersectingElements);
         	}
         	
     	}
         	
         /*
          * Find Coords
          * Find the Y value for each snapshot postition along the X axis
          */

         /* find the starting snapshot for an element */
         this.find_start=function(min_x){
         	var mstart =Math.floor(min_x / this.snapshot_width) * this.snapshot_width; 
         	return mstart;
         }
         
         /* Add a Y value to the dictionary paired with the shape id */
		 this.add_y_to_dictionary=function(my_x,my_y){
			el_id=$(this.currentElement).attr('data-identifier');
	
			var entry=[];
			entry.y=my_y;
			entry.id=el_id;
			
			if(typeof this.Dictionary[my_x] === 'undefined') {
			    this.Dictionary[my_x]=[];
			}
			
			this.Dictionary[my_x].push(entry);
			var enrtySorted=sort_entry(this.Dictionary[my_x]);
			this.Dictionary[my_x]=enrtySorted;
			
		} 	
		
		function sort_entry(entry){
			
			entry.sort(function(a,b) {
			 // assuming distance is always a valid integer
			 return parseFloat(a.y) - parseFloat(b.y);
			});
			
			return entry;
			
		}
		
		this.check_for_intersections=function(current_x){
			
			/*
			 * Sweep Line Check
			 * At each X ccordinate check for position shifts on the Y axis
			 * order changes relative to another element indicates that an intersection has ocurred
			 */
			
			// Look for more than one element in the Dictionary at given x position
			// If more than one exists compare previous array to current position
			
			//find previous position by subtracting snapshot distance from current X position
			var current_x=current_x;
			var last_x=current_x-this.snapshot_width;
			
			/*
			 * Compare order of ID to other element in each array. 
			 * If there is a change add elements into intersectingElements[]
			 */
			 			
			//locate dictionary for current X 
			var current_x_list=this.Dictionary[current_x];
			//reuse last comparison list
			var last_x_list=lastComparison;
			
			//if comparison list is undefined: current list = last list; end;
			if(typeof lastComparison =="undefined"){
				
				//make sure there is at least two to conpare
					if(current_x_list.length>1){
						last_comparisons=this.make_comparison_list(current_x_list);
					}
				return;
			} 
			//if last list is present: make a current list
			else if(typeof current_x_list!="undefined"  ){ 
				//make sure there is at least two to conpare
				if(current_x_list.length>1){
					current_comparisons=this.make_comparison_list(current_x_list);
				}
												
			}
			
			//Now compare the two. Crossing of size will indicate an intersection
			if(typeof current_comparisons !="undefined" && typeof lastComparison !="undefined"){
				this.append_intersection_list(current_comparisons,lastComparison );
			}
				
			 //Prepare for the next go around	
			if(typeof current_comparisons!="undefined"  ){ 
				lastComparison=current_comparisons;
			}	
		}
		
		this.append_intersection_list=function(current_comparisons,lastComparison ){
			//console.log(current_comparisons,lastComparison);
			if(current_comparisons.length>0 && lastComparison.length>0){
				
				for(index in current_comparisons ){
					if(current_comparisons[index]!=lastComparison[index]){
						elems=[index,this.currentElementID];
						this.find_intersection_points(elems);
					}
				} 
				
			}
		}
		
		this.make_comparison_list=function(list){
				
				var comparison_list=[];
				var compare='smaller';
				for(var i=0; i<list.length; i++ ){
					var li=list[i];
					if(li.id==this.currentElementID){
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
		this.find_intersection_points=function(elems){
			var coord=new LineIntersections(); 
			coord.line1Id=elems[0];
			coord.line2Id=elems[1];
			var intersection_point=coord.intersection_point();
			//console.log(intersection_point);
		}
 	}
 	
        			        
		       
         
         
	