var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<ul id='drawingLayers'>"+
    "    <li data-identifier='drawinglayer' class='heading'><a class='on selector' identifier='Layer 1'></a>drawing</li>"+
    "</ul>"+
    
    "<ul id='guideLayers'>"+
    "    <li data-identifier='guidelines' class='heading'>"+
    "        <a class='on selector' ></a>"+
    "<span>guide</span>"+
    "    </li>"+
    "</ul>"+
    
    "<footer class='clearfix'>"+
    "    <button id='newLayer'><i class='small material-icons'>note_add</i></button>"+
    "    <button id='eraseLayer'><i class='small material-icons'>delete</i></button>"+
    "</footer>"+
       
    "</div>";
    
    var hideShowLayerPalette=function(){
        
       if($("#layerPalette").length>0){
           
             if($("#layerPalette").css("display")=="none"){
                $("#layerPalette").css("display","block");
            } else {
                $("#layerPalette").css("display","none");
            }    

             } else {       
                    //make window
                    $(layersHTML).draggable({ handle: "header", containment: "window" }).appendTo($('body')).css("position", "absolute");
             } 
    }
    
    var init=function(){
        hideShowLayerPalette();
    }
        
     $( ".palette" ).draggable({ handle: "header", containment: "window" });
     $( document ).off('mouseup','.palette .close').on('mouseup','.palette .close',function(){
       hideShowLayerPalette(); 
     });
    

    $( document ).off('click','.palette .selector').on('click','.palette .selector',function(){
         var layerId="#"+$(this).parent().attr("data-identifier");
         var on=$(this).hasClass("on");
            if(on==true){
                //turn off layer
                $(this).removeClass("on");
                $(layerId).addClass("hidden");
            } else {
                //turn on layer
                $(this).addClass("on");
                $(layerId).removeClass("hidden");
            }    
     });
   
        
    init();
    return self;    
}






