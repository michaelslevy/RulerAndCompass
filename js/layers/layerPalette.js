var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPallette' class='pallette'>"+
   "<header>Layers</header>"+
    
    "<ul id='drawingLayers'>"+
    "    <li><a class='on selected' identifier='Layer 1'></a>Layer 1</li>"+
    "</ul>"+
    
    "<ul id='guideLayers'>"+
    "    <li id='intersection_points'>"+
    "        <a class='on selected' identifier='intersection'></a>"+ 
    "        <span>intersection points</span>"+
    "    </li>"+
    "    <li>"+
    "        <a class='on selected' identifier='guidelines'></a>"+
    "        <span>guides</span>"+
    "    </li>"+
    "</ul>"+
    
    "<footer>"+
    "    <button id='newLayer'>+</button>"+
    "    <button id='eraseLayer'>-</button>"+
    "</footer>"+
       
    "</div>";
    
    var init=function(){
        
        console.log("initilaizing");
        //make window
        $( "body" ).prepend(layersHTML);
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