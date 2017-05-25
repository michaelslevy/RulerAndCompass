var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<ul id='workingLayersPalette'>"+
        "<li id='layer1' class='layerGroup selected heading' data-index='1'>"+
            
           "<a class='on selector' data-identifier='layer1' data-name='Layer 1'></a>Layer 1"+
            "<a href='#' class='opener'><span class='arrow'></span></a>"+
            
            "<ul class='childLayers'>"+
                "<li data-identifier='drawinglayer1' class='child musical' data-name='drawing'>"+
                    "<a class='on selector' data-identifier='drawinglayer1'></a>drawing"+
                "</li>"+
                "<li data-identifier='musicallines1' class='child musical' data-name='musical'>"+
                    "<a class='on selector' data-identifier='musicallines1'></a>musical"+
                "</li>"+
                "<li data-identifier='guides1' class='child selected guide' data-stroke='#666666' data-stroke-width='1'  data-name='guides'>"+
                   " <a class='on selector' data-identifier='guides1'></a>guides"+
                "</li>"+
                "<li data-identifier='intersection_points1' class='child'  data-name='intersections'>"+
                 "   <a class='on selector' data-identifier='intersection_points1'></a>intersections"+
                "</li>"+
            "</ul>"+
           
        "</li>"+
    "</ul>";
    
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
    
    $( document ).off('click','.palette li').on('click','.palette li',function(){
        var layerId="#"+$(this).attr("data-identifier");
          var on=$(this).hasClass("selected");
            if(on==true){
                //turn off layer
                $(this).removeClass("selected");
                $(layerId).removeClass("selected");
            } else {
                //turn on layer
                $("g").removeClass("selected");
                $(".palette li").removeClass("selected");
                $(this).addClass("selected");
                $(layerId).addClass("selected");
            }    
     });
    
    $(document).on("click","#newLayer",function(){
        
        //find top level group that is currently selected and its representative in the layer menu
        var selectedGroup=$("#nest #workingLayers .selected");
        
        //create the automated id for the new layer
        var selectedGroupID=selectedGroup.attr("id");
        var layerCount=Number($("#workingLayers g").length);
        var c=layerCount+1;
        var layerName=selectedGroupID+c;
        
        //create the new layer
        var newGroup="<g id='"+layerName+"' data-index='"+c+"' class='layerGroup selected'>"+
                   "<g data-identifier='drawinglayer"+c+"' class='drawing' data-stroke='#000000' data-stroke-width='2'></g>"+
                    "<g data-identifier='musicallines"+c+"' class='musical'></g>"+
                    "<g data-identifier='guides"+c+"' class='selected guide' data-stroke='#666666' data-stroke-width='1'></g>"+
                    "<g data-identifier='intersection_points"+c+"'></g>"+
                "</g>";
        
        
        
        $("#workingLayers").append(newGroup);
        
        var newPaletteItem="<li data-identifier='"+layerName+"' >"+
        "<a class='on selector' identifier='Layer 1'></a>"+layerName+"</li>";
        
        $("#layerPalette [data-identifier='"+selectedGroupID+"']").append(newPaletteItem);
        
    });
   
        
    init();
    return self;    
}






