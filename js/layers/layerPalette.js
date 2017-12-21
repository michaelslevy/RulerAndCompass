var LayerPalette=function(){
    
    var self=this;
    self.index=0;//used to keep track of layer identifiers
    
    /* Base HTML for Layer Palette */
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
                    "<li data-identifier='guides1' class='child selected guide'  data-name='guides'>"+
                       " <a class='on selector' data-identifier='guides1'></a><label>guides</label>"+
                    "</li>"+
                    "<li data-identifier='musicallines1' class='child musical' data-name='musical'>"+
                        "<a class='on selector' data-identifier='musicallines1'></a><label>musical</label>"+
                    "</li>"+
                    "<li data-identifier='intersection_points1' class='child intersectionPoints'  data-name='intersections'>"+
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
    
    self.hideShowLayerPalette=function(){
        
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
       self.hideShowLayerPalette(); 
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
    
    
   //register click on label
    $( document ).off('click','.palette li.child label').on('click','.palette li.child label',function(){
            
        var parent=$(this).parent();
        selectLayer(parent);
        
     });
    
    //switch active layer based on tool mode
    self.autoSelectLayer=function(mode){

        //find the layerGroup
        var currentChild=$(".child.selected");//which child layer is currently selected
        var layerGroup=currentChild.parent();
        
        //select layer group
        selectLayerGroup(layerGroup);
        
        //determine whether child is a standard drawing layer or a specialized layer
        var hasSpecialChild=0;

        if(currentChild.hasClass("guide") != 1 && currentChild.hasClass("drawing")!=1){
            hasSpecialChild=1;
        }

        var selectedLayer; //child layer that will be selected

        //switch selected child based on selections below

        if(mode== "line" || mode== "circle-center" || mode =="circle-edge" ) {
            //default to guide layer
            if(hasSpecialChild==1){
                selectedLayer=layerGroup.find(".guide");
            }
        }

        else if(mode== "draw-curved" || mode== "draw-straight"  ) {

            selectedLayer=layerGroup.find(".drawing");
        }

        else if(mode== "musical") {
            selectedLayer=layerGroup.find(".musical");
        }

        if(typeof selectedLayer!="undefined"){
            selectLayer(selectedLayer);

        }
    }
    
    //select layer
    //takes layer object as parameter
    var selectLayer = function(layer){
        
        var layerId="#"+layer.attr("data-identifier");
        var on=layer.hasClass("selected");
                
        if(on==true){
            //turn off layer
            //layer.removeClass("selected");
           // $(layerId).removeClass("selected");
        } else {
            //turn on layer
            
            //remove existing selection classes
            $("g").removeClass("selected");
            $(".palette li").removeClass("selected");
            
            //add selected class to svg layer
            layer.addClass("selected");
            $(layerId).addClass("selected");
            $(layer).parent().addClass("selected");
            
            //add selected class to line in palette
            var paletteItem=$("#PaletteWorkingLayers").find("[data-identifier='"+(layer.attr("data-identifier"))+"']");
            paletteItem.addClass("selected");
            //add selected class to parent group
            var parent=paletteItem.parent().parent();
            if(parent.length>0){
                paletteItem.parent().parent().addClass("selected");
            } else {
                //add selected class to parent group in palette
                var paletteChild=layer.attr("id");
                var identifier="[data-identifier='"+paletteChild+"']";
                $(identifier).parent().parent().addClass("selected");
            }
        }
    }
    
    var selectLayerGroup=function(layerGroup){
                
        $(".layerGroup").removeClass("selectedLayerGroup");
        $(layerGroup).addClass("selectedLayerGroup");
        
    }
    
    /*****************************/
    /******* add a layer ********/
    /****************************/
    
    var addLayer=function(index){
        //create the automated id for the new layer
        var c=index;
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
        
        var guidesGroup=new Group();
        guidesGroup.args={
            id:"guides"+c,
            class:'selected guide child',
            parentID:layerName,
            stroke:"#666666",
            strokeWidth:1
        };
        guidesGroup.addGroup();
        
        var musicalGroup=new Group();
        musicalGroup.args={
            id:"musicallines"+c,
            class:'musical child',
            parentID:layerName,
        };
        musicalGroup.addGroup();
        
        var intersectionGroup=new Group();
        intersectionGroup.args={
            id:"intersection_points"+c,
            class:'intersections child',
            parentID:layerName
        };
        intersectionGroup.addGroup();
        
        addNewPaletteItem(c);
        
    }
    
    var addNewPaletteItem=function(i){
        var newPaletteItem="<li data-identifier='layerGroup"+i+"' class='layerGroup  heading closed' data-index='"+i+"'>"+
            
           "<header class='layerHeading' data-identifier='layerGroup"+i+"'><a class='on selector' data-identifier='layerGroup"+i+"' data-name='Layer "+i+"'></a><label>Layer "+i+"</label>"+
            "<a href='#' class='opener closed'><span class='arrow'></span></a></header>"+
            
            "<ul class='childLayers'>"+
                "<li data-identifier='drawinglayer"+i+"' class='child drawing' data-name='drawing'>"+
                    "<a class='on selector' data-identifier='drawinglayer"+i+"'></a><label>drawing</label>"+
                "</li>"+
                "<li data-identifier='guides"+i+"' class='child  guide' data-name='guides'>"+
                   " <a class='on selector' data-identifier='guides"+i+"'></a><label>guides</label>"+
                "</li>"+
                "<li data-identifier='musicallines"+i+"' class='child musical' data-name='musical'>"+
                    "<a class='on selector' data-identifier='musicallines"+i+"'></a><label>musical"+
                "</label></li>"+
                "<li data-identifier='intersection_points"+i+"' class='child intersectionPoints'  data-name='intersections'>"+
                 "   <a class='on selector' data-identifier='intersection_points"+i+"'></a><label>intersections</label>"+
                "</li>"+
            "</ul>"+
           
        "</li>";
        
        $("#PaletteWorkingLayers").append(newPaletteItem);
    }
    
    //Add a New Layer after clicking on layer palette button
    $(document).on("click","#newLayer",function(){
        
        var index=getLayerIndex();
        addLayer(index);
        
    });
    
    self.reinsertLayer=function(pos){
        pos++;
        addLayer(pos);
    }
    
    /************************************/
    /* gets the last layer index value */
    /***********************************/

    var getLayerIndex = function(){
        
        //if index property isn't set sort through all of the layer groups to find the highest index
        if(self.index<=0) {
            self.index=findHighestIndex();
        }
        
        //loop through layer groups and find largest index
        self.index++;
        return self.index;
    }
    
    var findHighestIndex = function(){
         var i=0;
        $("#workingLayers .layerGroup").each(function(){
            var currentIndex=parseInt($(this).attr("data-index"));
            if(currentIndex>i){
                i=currentIndex;
            }
        });
                
        return i;
    }
    
    /*********************/
    /* opens layer group */
    /*********************/
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
        
   
    return self;    
}