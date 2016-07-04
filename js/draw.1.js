
var click_num=0;

var x1v;
var y1v;
var x2v;
var y2v;

jQuery('#nest').click(function(e){
	
	//check click_num
	click_num=check_click_num();

	//get values
	var parent_offset=jQuery(this).parent().offset(); 
	//add variables
	if(click_num==1){
		x1v=parseInt(e.pageX-parent_offset.left);
		y1v=parseInt(e.pageY-parent_offset.top);
	} else {
		x2v=parseInt(e.pageX-parent_offset.left);
		y2v=parseInt(e.pageY-parent_offset.top);
		add_line(x1v,y1v,x2v,y2v);
		reset_vars();
	}
	
});

function reset_vars() {
	var x1v=-1;
	var y1v=-1;
	var x2v=-1;
	var y2v=-1;

}

jQuery('#nest').mousemove(function(e){
	
	if(x1v>0) {
		var parent_offset=jQuery(this).parent().offset();
		x2v=parseInt(e.pageX-parent_offset.left);
		y2v=parseInt(e.pageY-parent_offset.top);
		add_line(x1v,y1v,x2v,y2v);
	}

});	

function check_click_num(){
	click_num++;
	if(click_num>2){
		click_num=1;
	}
	return click_num;
}

function add_line(x1v,y1v,x2v,y2v){
	jQuery('#guidelines').Guideline({x1: x1v, y1:y1v, x2:x2v, y2:y2v}).draw();
}
 