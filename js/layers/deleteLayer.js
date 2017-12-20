/* After clicking delete, open confirmation box */

    $(document).on("click","#eraseLayer",function(){
        
        /* Get text of label and insert into confrimation message */
        
        var layerName=$("#PaletteWorkingLayers .heading.selected .layerHeading label").text();
                
        var r=confirm("Are you sure you would like to permanently erase layer: "+layerName);
        
        if(r==true){
            deleteCurrentLayer();
        }
                        
    });

/* If prompt is confirmed delete layer*/

var deleteCurrentLayer=function(){
    
     /* Retrieve current layer name */
    var currentLayer=$(".heading.selected").attr("data-identifier");
    
    var layer=$("#workingLayers #"+currentLayer).clone().wrap('<div>').parent().html();
    var pos=$("g.layerGroup").index($("#workingLayers #"+currentLayer));
    
    /* Create undo feature for restoring layer */        
     var undoObj={
        type:"layerDeletion",
        content:layer,
        position: pos
    }

    var undoHistory=new UndoHistory();
    undoHistory.addStep(undoObj);
       
    /* Delete layer from palette */
    $(".layerGroup[data-identifier='"+currentLayer+"']").remove();

    /* Delete SVG layer */
     $("#workingLayers #"+currentLayer).remove();

    
}

    