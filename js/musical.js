var Musical = function(){
  
    var self=this;
    
    self.basePitch= 420;
    self.currentPitch=420;
    self.baseLineLength=$("#guidecircles circle").first().attr("r");
    self.currentLineLength=100;
    self.duration=.2; //time in seconds
    self.playPosition=0;
    self.playTimer=false;
    
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
    
  
    
    var channels = 2;

    // Create an empty two second stereo buffer at the
    // sample rate of the AudioContext
    var frameCount = audioContext.sampleRate * 2.0;
    var myArrayBuffer = audioContext.createBuffer(2, frameCount, audioContext.sampleRate);

    
/* Playing a tone */
    self.playTone=function(){
               
        self.setCurrentPitch();

         // create the oscillator
        var oscillator = audioContext.createOscillator();        
        // set the type of the oscillator
        oscillator.type = 'sine'; // sine, triangle, sawtooth
        // set the frequency based on our stored values
        console.log(self.currentPitch);
        if(isFinite(self.currentPitch)==true){
            oscillator.frequency.value = self.currentPitch;
            // connect it to the output
            oscillator.connect(audioContext.destination);
            // start the note
            oscillator.start(0);

            setTimeout(function(){
                 oscillator.stop(0);
            }, self.duration*1000);
        }

       /* if(typeof oscillator !="undefined"){
           
        }*/
        
        return self;
        
    }    
    
    /* Get current pitch */
    self.setCurrentPitch=function(){
        /* find ratio of current line length to base line length */
        var ratio=parseFloat(self.baseLineLength/self.currentLineLength);
        /* apply ratio to base pitch and set the current pitch */
        self.currentPitch=self.basePitch*ratio;
        console.log(self.baseLineLength,self.currentLineLength,"ratio:"+ratio);
    }
    
    /* play music */
    self.play=function(){
        
        self.playTimer=setInterval(function(){ playNext() }, self.duration*1000);
        
        return self;
    }  
    
    var playNext=function(){
     
        var toneLine=$("#musicallines line").eq(self.playPosition);
        $("#musicallines line").removeClass('playing');
        toneLine.addClass('playing');
        if(self.playPosition>($("#musicallines line").length-1)){
            clearInterval(self.playTimer);
            self.playPosition=0;
        }   else { 
            
        self.playPosition++;
        self.currentLineLength=toneLine.LineEquation().getMagnitude();
        self.playTone();
        
        }
    }    

    
    
    self.bad_browser=function(){
        alert("Your browser does not support web audio");   
    }    
    
   return self;
}
