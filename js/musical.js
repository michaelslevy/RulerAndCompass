var Musical = function(){
  
    var self=this;
    
    self.oscilator=false;
    self.basePitch= 420;
    self.currentPitch=420;
    self.baseLineLength=100;
    self.currentLineLength=100;
    self.duration=.2;
    
/* Playing a tone */
    self.playTone=function(){
        
        try {
            if (! window.AudioContext) {
                if (! window.webkitAudioContext) {
                    self.bad_browser();
                    return;
                }
                window.AudioContext = window.webkitAudioContext;
            }

            var audioContext = new AudioContext();
        }
        catch(e) {
            console.log('Web Audio API is not supported in this browser');
        }
       
        self.setCurrentPitch();

         // create the oscillator
        self.oscillator = audioContext.createOscillator();
        // set the type of the oscillator
        self.oscillator.type = 'sine'; // sine, triangle, sawtooth
        // set the frequency based on our stored values
        self.oscillator.frequency.value = self.currentPitch;
        // connect it to the output
        self.oscillator.connect(audioContext.destination);
        // start the note
        self.oscillator.start(0);
        
         if(typeof self.oscillator !="undefined"){
            self.oscillator.stop(self.duration);
        }
        
        return self;
        
    }    
    
    /* Get current pitch */
    self.setCurrentPitch=function(){
        /* find ratio of current line length to base line length */
        var ratio=parseFloat(self.baseLineLength/self.currentLineLength);
        /* apply ratio to base pitch and set the current pitch */
        self.currentPitch=self.basePitch*ratio;
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
    
    self.bad_browser=function(){
        alert("Your browser does not support web audio");   
    }    
    
   return self;
}
