var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<ul id='drawingLayers'>"+
    "    <li><a class='on selector' identifier='Layer 1'></a>layer 1</li>"+
    "</ul>"+
    
    "<ul id='guideLayers'>"+
    "    <li id='intersection_points'>"+
    "        <a class='on selector' identifier='intersection'></a>"+ 
    "<span>intersection points</span>"+
    "    </li>"+
    "    <li>"+
    "        <a class='on selector' identifier='guidelines'></a>"+
    "<span>guides</span>"+
    "    </li>"+
    "</ul>"+
    
    "<footer class='clearfix'>"+
    "    <button id='newLayer'><i class='small material-icons'>note_add</i></button>"+
    "    <button id='eraseLayer'><i class='small material-icons'>delete</i></button>"+
    "</footer>"+
       
    "</div>";
    
    var init=function(){
        
        if($("#layerPalette").length>0){
            if($("#layerPalette").css("display")=="none"){
                $("#layerPalette").show();
            } else {
                $("#layerPalette").hide();
            }    
            
        } else {    
            //make window
            $(layersHTML).draggable({ handle: "header", containment: "window" }).prependTo($('body')).css("position", "absolute");
        }    
    }
    
    //populate window

        //get layers
        
        //get layer visibility
        
    //turn on and off layers
    
    //select layer
    
    //change layer name
    
        //change name to an input on click
        
        //change name to text on blur
            
            //validate id
            
            //change layer id        
    
    //add layer
    
    //delete layer
    
    init();
    return self;
        
}

 $( ".palette" ).draggable({ handle: "header", containment: "window" });
 $( document ).on('click','.palette .close',function(){
     
    $( ".palette" ).hide();
 });