$(document).ready(function(){
	
	Mode='circle';
	var window_height=$('#frame').height();
	var window_width=$('#frame').width();
	var middle_x=parseInt(window_width/2);
	var middle_y=parseInt(window_height/2);
	
	$('#guidecircles').Circle();
   	$('#guidelines').Guideline({x: middle_x}).draw_guideline_vertical();
   	$('#guidelines').Guideline({y: middle_y}).draw_guideline_horizontal();
    
 
    
 });	