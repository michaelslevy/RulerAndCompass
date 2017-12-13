/* After clicking delete, open confirmation box */

    $(document).on("click","#eraseLayer",function(){
        
        /* Get text of label and insert into confrimation message */
        
        var layerName=$("#PaletteWorkingLayers .heading.selected .layerHeading label").text();
        
        console.log(layerName);
        
        var r=confirm("Are you sure you would like to permanently erase layer: "+layerName);
        
        console.log(r);
                
    });

/* If prompt is confirmed delete layer


    /* Delete layer from palette */
    
    /* Delete SVG layer */
    
    /* Create undo feature for restoring layer */