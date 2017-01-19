var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<ul id='drawingLayers'>"+
    "    <li data-identifier='drawinglayer'><a class='on selector' identifier='Layer 1'></a>drawing</li>"+
    "</ul>"+
    
    "<ul id='guideLayers'>"+
    "    <li data-identifier='guidelines'>"+
    "        <a class='on selector' ></a>"+
    "<span>guide</span>"+
    "    </li>"+
    "</ul>"+
    
    "<footer class='clearfix'>"+
    "    <button id='newLayer'><i class='small material-icons'>note_add</i></button>"+
    "    <button id='eraseLayer'><i class='small material-icons'>delete</i></button>"+
    "</footer>"+
       
    "</div>";
    
    var init=function(){
        hideShowLayerPalette(layersHTML);
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
     
   hideShowLayerPalette(); 
 });

/*
$( document ).on('click','.palette .close',function(){
     
 });*/

function hideShowLayerPalette(layersHTML){

    if($("#layerPalette").length>0){
                if($("#layerPalette").css("display")=="none"){
                    $("#layerPalette").show();
                } else {
                    $("#layerPalette").hide();
                }    

            } else {    
                console.log(layersHTML);
                //make window
                $(layersHTML).draggable({ handle: "header", containment: "window" }).appendTo($('body')).css("position", "absolute");
            } 
}

   

