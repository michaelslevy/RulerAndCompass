var LayerPalette=function(){
    
    var self=this;
    
    var layersHTML="<div id='layerPalette' class='palette'>"+
   "<header class='paletteHandle'>Layers  <a class='close'><i class='tiny material-icons'>clear</i></a></header>"+
    
    "<div class='layerContainer'>"+
        "<ul id='PaletteWorkingLayers'>"+
            "<li data-identifier='layerGroup1' class='layerGroup selected heading open' data-index='1'>"+
               "<header data-identifier='layerGroup1' class='layerHeading'><a class='on selector' data-identifier='layerGroup1' data-name='Layer 1'></a><label>Layer 1</label>"+
                "<a href='#' class='opener open'><span class='arrow'></span></a></header>"+
                "<ul class='childLayers'>"+
                    "<li data-identifier='drawinglayer1' class='child drawing' data-name='drawing'>"+
                        "<a class='on selector' data-identifier='drawinglayer1'></a><label>drawing</label>"+
                    "</li>"+
                    "<li data-identifier='musicallines1' class='child musical' data-name='musical'>"+
                        "<a class='on selector' data-identifier='musicallines1'></a><label>musical</label>"+
                    "</li>"+
                    "<li data-identifier='guides1' class='child selected guide'  data-name='guides'>"+
                       " <a class='on selector' data-identifier='guides1'></a><label>guides</label>"+
                    "</li>"+
                    "<li data-identifier='intersection_points1' class='child intersection'  data-name='intersections'>"+
                     "   <a class='on selector' data-identifier='intersection_points1'></a><label>intersections</label>"+
                     "</li>"+
                 "</ul>"+
            "</li>"+
         "</ul>"+
    "</div>"+
    
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
        
         var maxHeight=parseInt($(window).height())-200;
        $(".layerContainer").css({"max-height":maxHeight});
        
    }
    
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
    
    
    //selects layer to draw in
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
            $(layerId).parent().addClass("selected");
        }
        
     });
    
    
    
    $(document).on("click","#newLayer",function(){
        
        //create the automated id for the new layer
        var layerCount=Number($("#workingLayers .layerGroup").length);
        var c=layerCount+1;
        var layerName="layerGroup"+c;
        
        //create the new SVG layer
        
        //add layer group to svg
                
        var layerGroup=new Group();
        layerGroup.args={
            id:layerName,
            index:c,
            class:'layerGroup selected',
            parentID:"workingLayers"
        };
       layerGroup.addGroup();
        
        var drawingGroup=new Group();
        drawingGroup.args={
            id:"drawinglayer"+c,
            class:'drawing child',
            parentID:layerName,
            stroke:'#000000',
            strokeWidth:2
        };
        drawingGroup.addGroup();
        
        var musicalGroup=new Group();
        musicalGroup.args={
            id:"musicallines"+c,
            class:'musical child',
            parentID:layerName,
        };
        musicalGroup.addGroup();
        
        var guidesGroup=new Group();
        guidesGroup.args={
            id:"guides"+c,
            class:'selected guide child',
            parentID:layerName,
            stroke:"#666666",
            strokeWidth:1
        };
        guidesGroup.addGroup();
        
        var intersectionGroup=new Group();
        intersectionGroup.args={
            id:"intersection_points"+c,
            class:'intersections child',
            parentID:layerName
        };
        intersectionGroup.addGroup();
        
        
        var newPaletteItem="<li data-identifier='layerGroup"+c+"' class='layerGroup  heading closed' data-index='"+c+"'>"+
            
           "<header class='layerHeading' data-identifier='layerGroup"+c+"'><a class='on selector' data-identifier='layerGroup"+c+"' data-name='Layer "+c+"'></a><label>Layer "+c+"</label>"+
            "<a href='#' class='opener closed'><span class='arrow'></span></a></header>"+
            
            "<ul class='childLayers'>"+
                "<li data-identifier='drawinglayer"+c+"' class='child drawing' data-name='drawing'>"+
                    "<a class='on selector' data-identifier='drawinglayer"+c+"'></a><label>drawing</label>"+
                "</li>"+
                "<li data-identifier='musicallines"+c+"' class='child musical' data-name='musical'>"+
                    "<a class='on selector' data-identifier='musicallines"+c+"'></a><label>musical"+
                "</label></li>"+
                "<li data-identifier='guides"+c+"' class='child  guide' data-name='guides'>"+
                   " <a class='on selector' data-identifier='guides"+c+"'></a><label>guides</label>"+
                "</li>"+
                "<li data-identifier='intersection_points"+c+"' class='child intersection'  data-name='intersections'>"+
                 "   <a class='on selector' data-identifier='intersection_points"+c+"'></a><label>intersections</label>"+
                "</li>"+
            "</ul>"+
           
        "</li>";
        
        $("#PaletteWorkingLayers").append(newPaletteItem);
        
    });
   
   //opens layer group 
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
     
    var init=function(){
        hideShowLayerPalette();
    }
        
    init();
    return self;    
}






