var LayerPalette=function(){
    
    var self=this;
    
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header class='paletteHandle'>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<ul id='PaletteWorkingLayers'>"+
        "<li id='layer1' class='layerGroup selected heading open' data-index='1'>"+
            
           "<header class='layerHeading'><a class='on selector' data-identifier='layer1' data-name='Layer 1'></a><label>Layer 1</label>"+
            "<a href='#' class='opener open'><span class='arrow'></span></a></header>"+
            
            "<ul class='childLayers'>"+
                "<li data-identifier='drawinglayer1' class='child musical' data-name='drawing'>"+
                    "<a class='on selector' data-identifier='drawinglayer1'></a><label>drawing</label>"+
                "</li>"+
                "<li data-identifier='musicallines1' class='child musical' data-name='musical'>"+
                    "<a class='on selector' data-identifier='musicallines1'></a><label>musical</label>"+
                "</li>"+
                "<li data-identifier='guides1' class='child selected guide' data-stroke='#666666' data-stroke-width='1'  data-name='guides'>"+
                   " <a class='on selector' data-identifier='guides1'></a><label>guides</label>"+
                "</li>"+
                "<li data-identifier='intersection_points1' class='child'  data-name='intersections'>"+
                 "   <a class='on selector' data-identifier='intersection_points1'></a><label>intersections</label>"+
                "</li>"+
            "</ul>"+
           
        "</li>"+
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
        
     $( ".palette" ).draggable({ handle: ".", containment: "window" });
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
    
    $( document ).off('click','.palette li.child label').on('click','.palette li.child label',function(){
            
        var parent=$(this).parent();
        
        var layerId="#"+parent.attr("data-identifier");
        var on=parent.hasClass("selected");
        
        if(on==true){
            //turn off layer
            parent.removeClass("selected");
            $(layerId).removeClass("selected");
        } else {
            //turn on layer
            $("g").removeClass("selected");
            $(".palette li").removeClass("selected");
            parent.addClass("selected");
            $(layerId).addClass("selected");
        }
        
     });
    
    $(document).on("click","#newLayer",function(){
        
        //create the automated id for the new layer
        var layerCount=Number($("#workingLayers .layerGroup").length);
        var c=layerCount+1;
        var layerName="layerGroup"+c;
        
        //create the new layer
        var newGroup="<g id='"+layerName+"' data-index='"+c+"' class='layerGroup selected'>"+
                   "<g data-identifier='drawinglayer"+c+"' class='drawing' data-stroke='#000000' data-stroke-width='2'></g>"+
                    "<g data-identifier='musicallines"+c+"' class='musical'></g>"+
                    "<g data-identifier='guides"+c+"' class='selected guide' data-stroke='#666666' data-stroke-width='1'></g>"+
                    "<g data-identifier='intersection_points"+c+"'></g>"+
                "</g>";
        
        
        
        $("#workingLayers").append(newGroup);
        
        var newPaletteItem="<li id='layer1' class='layerGroup  heading closed' data-index='"+c+"'>"+
            
           "<header class='layerHeading'><a class='on selector' data-identifier='layer"+c+"' data-name='Layer 1'></a><label>Layer "+c+"</label>"+
            "<a href='#' class='opener closed'><span class='arrow'></span></a></header>"+
            
            "<ul class='childLayers'>"+
                "<li data-identifier='drawinglayer1' class='child musical' data-name='drawing'>"+
                    "<a class='on selector' data-identifier='drawinglayer"+c+"'></a><label>drawing</label>"+
                "</li>"+
                "<li data-identifier='musicallines1' class='child musical' data-name='musical'>"+
                    "<a class='on selector' data-identifier='musicallines"+c+"'></a><label>musical"+
                "</label></li>"+
                "<li data-identifier='guides1' class='child  guide' data-name='guides'>"+
                   " <a class='on selector' data-identifier='guides"+c+"'></a><label>guides</label>"+
                "</li>"+
                "<li data-identifier='intersection_points"+c+"' class='child'  data-name='intersections'>"+
                 "   <a class='on selector' data-identifier='intersection_points"+c+"'></a><label>intersections</label>"+
                "</li>"+
            "</ul>"+
           
        "</li>";
        
        $("#PaletteWorkingLayers").append(newPaletteItem);
        
    });
   
    
    $(document).on("click",".layerGroup .opener",function(){
        
        if($(this).hasClass("closed")){
            
            $(this).removeClass("closed");
            $(this).addClass("open");
            
            $(this).parent().parent().removeClass("closed");
            $(this).parent().parent().addClass("open");
            
        } else {
            
            $(this).removeClass("open");
            $(this).addClass("closed");
            
            $(this).parent().parent().removeClass("open");
            $(this).parent().parent().addClass("closed");
            
        }
        
    });
        
    init();
    return self;    
}






