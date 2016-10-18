var Musical = function(){
    
    var self=this;
    
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

    self.direction='up';
    gainNode.gain.value = 0;
    self.pitch=200;
    self.oscillator.frequency.value = self.pitch;
    self.oscillator.start(0);
    

    self.playTone =function() {

      gainNode.gain.value = 0.2;
      // The sound should last for 250ms
      setTimeout(function() {

        var now = audioContext.currentTime;  
        gainNode.gain.linearRampToValueAtTime(0,now+.05);
          
        self.setCurrentPitch();  

        self.oscillator.frequency.setValueAtTime(self.pitch, now+.05);

      }, 250);
      self.oscillator.frequency.value++;
    }
    
    self.setCurrentPitch=function(){
    
         if(self.direction=="up"){
            self.pitch=self.pitch/1.618;
        }  else {
            self.pitch=self.pitch*1.618;
        }    

        if(self.pitch>2000){
            self.direction="up";   
        } else if(self.pitch<60){
            self.direction="down";
        }    
        
    }

    $(document).click(function(){
        self.playTone();
    });
    
}    