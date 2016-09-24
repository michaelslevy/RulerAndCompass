;(function ( $, window, document, undefined ) {
    
$.fn.Musical = function(settings){
  
    var self=this;
    
    self.oscilator=false;

   var config = {
        "basePitch": 420,
        "currentPitch":420,
        "baseLineLength":100,
        "currentLineLength":100,
        'duration':.1
    }

    if (settings) {
        $.extend(config, settings);
    }
    
    var init = function() {
        self.settings = $.extend({}, config, settings);
        return self;
    }

    /* Playing a tone */
    self.playTone=function(){
                
        var context = new AudioContext();
        window.context = context;

        
        self.setCurrentPitch();
     
         // create the oscillator
        self.oscillator = context.createOscillator();
        // set the type of the oscillator
        self.oscillator.type = 'sine'; // sine, triangle, sawtooth
        // set the frequency based on our stored values
        self.oscillator.frequency.value = config.currentPitch;
        // connect it to the output
        self.oscillator.connect(context.destination);
        // start the note
        self.oscillator.start(0);
        
         if(typeof self.oscillator !="undefined"){
            self.oscillator.stop(config.duration);
        }
        
        return self;
        
    }    
    
    /* Get current pitch */
    self.setCurrentPitch=function(){
        /* find ratio of current line length to base line length */
        var ratio=parseFloat(config.baseLineLength/config.currentLineLength);
        /* apply ratio to base pitch and set the current pitch */
        config.currentPitch=config.basePitch*ratio;
    }
    
    /* play music */
    self.play=function(){

        var line=$("#musicallines line").first();
        self.playline(line);
        window.setTimeout(self.playNext,200); 
                           
        return self;
    }  

    self.playNext=function(line){
        var next=line.next();
        self.playline(next);
    }    

    self.playline=function(line){
        var baseLength=$("#guidecircles circle").first().attr("r");
        var magnitude=$(this).LineEquation().getMagnitude();
        $("body").Musical({baseLineLength:baseLength, currentLineLength:magnitude }).playTone();
    }
    
    init();
    return self;
}

})( jQuery, window, document );
 /* 
  	var myCircle="<g class='circleGroup'>"+
		"<circle cx='"+xPos+"' cy='"+yPos+"' r='"+Radius+"' class='principal' />"+
		"<line x1="50%" y1="0" x2="50%" y2="100%" class='guideline' />"+
		"<line x1="0" y1="50%" x2="100%" y2="50%" class='guideline' />"+
		"<circle cx='"+xPos+"' cy='"+yPos+"' r="2"  class='centerpoint'/>"+
	"</g>";
    
 */