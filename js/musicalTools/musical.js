var Musical = function(){
    
    var self=this;
    
    self.basePitch= 440;
    self.currentPitch=440;
    self.currentNote='';
    self.baseLineLength=$("#workingLayers .guide circle").first().attr("r");

    self.currentLineLength=100;
    self.duration=.2; //time in seconds
    self.durationMicroSeconds=self.duration*1000
    self.playPosition=0;
    self.playTimer=false;    
    var terminal=true; //determines whether tone ends after note is played
    
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
      
      // end note if terminal
      setTimeout(function() {
        var now = audioContext.currentTime;
       	
       	if(terminal==true){
       		gainNode.gain.linearRampToValueAtTime(0,now+self.duration);
       	}
       	 
      }, self.durationMicroSeconds*1.5);
     
    }
    
    self.playPreviewTone=function(){
    	 var current_line=$("#musicallines"+layerIndex+" line").last(); 
         var magnitude=current_line.LineEquation().getMagnitude();
         self.currentLineLength=magnitude;
         self.playTone();
         
         terminal =true;
         return self;
    }
    
    self.playContinousPreviewTone=function(){
        
       /* TODO: Play a stepped notes */
        
      /* send back note as text */
         var current_line=$("#preview line").last(); 
         var magnitude=current_line.LineEquation().getMagnitude();
         self.currentLineLength=magnitude;
        self.setCurrentPitch();
        return self.currentNote;
    }
   
    
    self.setCurrentPitch=function(){
            	
    	if(typeof self.baseLineLength == "undefined") {
    		self.baseLineLength=$("#guides circle").first().attr("r");
    	}
         /* find ratio of current line length to base line length */
        var ratio=parseFloat(self.baseLineLength/self.currentLineLength);
        /* apply ratio to base pitch and set the current pitch */
                
        var absolutePitch=self.basePitch*ratio;
                            
        var findInterpretted=new ClosestNote;
        findInterpretted.preciseHZ=absolutePitch;
        findInterpretted.findNote();
        self.currentPitch=findInterpretted.interprettedHZ;
        self.currentNote=findInterpretted.interprettedNote;
        
    }
    

    
     /* play music */
    self.play=function(){
         terminal=false;
        self.playTimer=setInterval(function(){ playNext() }, self.durationMicroSeconds);
        
        return self;
    }  
    
    var playNext=function(){
    	
        var line="#musicallines"+layerIndex+" line";
     
        var toneLine=$(line).eq(self.playPosition);
        $(line).removeClass('playing');
        toneLine.addClass('playing');
        
        /* If last note, indicate to stop oscilator */
        if(self.playPosition>($("#musicallines line").length-2)){
        	terminal=true;	
        }	
        
        /* end playback if position greater than number of lines. */
        if(self.playPosition>($(line).length-1)){
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