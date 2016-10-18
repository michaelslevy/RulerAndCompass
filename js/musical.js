var Musical = function(){
    
    var self=this;
    
    self.basePitch= 420;
    self.currentPitch=420;
    self.baseLineLength=$("#guidecircles circle").first().attr("r");
    self.currentLineLength=100;
    self.duration=.2; //time in seconds
    self.durationMicroSeconds=self.duration*1000
    self.playPosition=0;
    self.playTimer=false;    
    
    var audioContext = new(AudioContext || webkitAudioContext)();

    self.frequencyOffset = 0
      // Our sound source is a simple triangle oscillator
    self.oscillator = audioContext.createOscillator(); // Create sound source  
    self.oscillator.type = 'triangle';

    // Adding a gain node just to lower the volume a bit and to make the
    // sound less ear-piercing. It will also allow us to mute and replay
    // our sound on demand
    var gainNode = audioContext.createGain();
    self.oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = 0;
    self.oscillator.start(0);
    

    self.playTone =function() {
    
      var now = audioContext.currentTime;
      self.setCurrentPitch();      
      self.oscillator.frequency.linearRampToValueAtTime(self.currentPitch,now);
      gainNode.gain.linearRampToValueAtTime(.2,now+.0008);
      // The sound should last for 250ms
      setTimeout(function() {
        var now = audioContext.currentTime;
        gainNode.gain.linearRampToValueAtTime(0,now+.0008);
          
        self.oscillator.frequency.setValueAtTime(self.currentPitch, now+.0008);

      }, 300);
     
    }
    
    self.setCurrentPitch=function(){
    	
    	if(typeof self.baseLineLength == "undefined") {
    		self.baseLineLength=$("#guidecircles circle").first().attr("r");
    	}
         /* find ratio of current line length to base line length */
        var ratio=parseFloat(self.baseLineLength/self.currentLineLength);
        /* apply ratio to base pitch and set the current pitch */
        self.currentPitch=self.basePitch*ratio;
        console.log(self.baseLineLength,self.currentLineLength,"ratio:"+ratio);
        
    }
    
     /* play music */
    self.play=function(){
        
        self.playTimer=setInterval(function(){ playNext() }, self.durationMicroSeconds);
        
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