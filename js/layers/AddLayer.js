/*****************************/
/******* add a layer ********/
/****************************/

var AddLayer=function(index){
        
    var self=this;
    self.pos=0;
    self.insertionPoint=false;
    
    self.setPos=function(p){
        self.pos=p;
    }
        
    var addSVGLayerGroup=function(){

        //create the automated id for the new layer
        var c=self.pos;
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

    }                                                               

    var addNewPaletteItem=function(){
        
        var i=self.pos;
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

        /**** check if paletteGroup is being inserted ****/

        if(self.insertionPoint!=false){
            /* if paletteGroup is being inserted */
            var insertBefore=$("#PaletteWorkingLayers .layerGroup").eq(self.insertionPoint);
            insertBefore.before(newPaletteItem);
        } else {
            /* else insert at the end */
            $("#PaletteWorkingLayers").append(newPaletteItem);
        }
       
    }    
    
    self.addNewLayer=function(){
    //add new layer with a given index
        self.insertionPoint=false;
        addSVGLayerGroup();
        addNewPaletteItem();
    }
    
     /* find element to insert palette item after*/
    var findPalettePositionToInsert=function(){
         var i=0;
        
        /* loop through group indexes and find highest index less than inserted pos */ 
        $("#workingLayers .layerGroup").each(function(){
            var currentIndex=parseInt($(this).attr("data-index"));
            if(currentIndex>i && i< self.pos ){
                i=currentIndex;
            } 
        });
        
        return i;

    }

    self.reinsertLayer=function(){
        self.insertionPoint=findPalettePositionToInsert();
        self.pos++;
        addNewPaletteItem();
    }
    
   
    
    return self;

}
    