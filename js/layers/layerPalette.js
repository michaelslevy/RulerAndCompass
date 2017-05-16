var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<ul id='drawingLayers'>"+
    "    <li data-identifier='drawinglayer' class='heading'><a class='on selector' identifier='Layer 1'></a>drawing</li>"+
    "</ul>"+
    
    "<ul id='guideLayers'>"+
    "    <li data-identifier='guides' class='heading selected'>"+
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
        var selectedHeading=$("#layerPalette .heading.selected");
        var selectedGroup=$("#nest .top.selected");
        
        //create the automated id for the new layer
        var selectedGroupID=selectedGroup.attr("id");
        var layerCount=Number($("#"+selectedGroupID+" g").length);
        var c=layerCount+1;
        var layerName=selectedGroupID+c;
        
        //create the new layer
        var newGroup="<g id='"+layerName+"' class=''></g>";
        selectedGroup.append(newGroup);
        
        var newPaletteItem="<li data-identifier='"+layerName+"' >"+
        "<a class='on selector' identifier='Layer 1'></a>"+layerName+"</li>";
        
        $("#layerPalette [data-identifier='"+selectedGroupID+"']").append(newPaletteItem);
        
    });
   
        
    init();
    return self;    
}






