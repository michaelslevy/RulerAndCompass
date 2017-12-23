var ClosestNote = function () {

    var self = this;
    self.preciseHZ; //exact calculated value
    self.interprettedHZ; //closest to a musical note
    self.interprettedNote; //letter representation  

    var notes = []; //all audible notes

    //list of notes by frequency with corresponding letters    
    notes[0] = [
                [16.35, "C0"],
                [17.32, "C#0"],
                [18.35, "D0"],
                [19.45, "D#0"],
                [20.6, "E0"],
                [21.83, "F0"],
                [23.12, "F#0"],
                [24.5, "G0"],
                [25.96, "G0#"],
                [27.5, "A0"],
                [29.14, "A#0"],
                [30.87, "B0"]
            ];

    notes[1] = [
                [32.7, "C1"],
                [34.65, "C#1"],
                [36.71, "D1"],
                [38.89, "D#1"],
                [41.20, "E1"],
                [43.65, "F1"],
                [46.25, "F#1"],
                [49.0, "G1"],
                [51.9, "G#1"],
                [55, "A1"],
                [58.27, "A#1"],
                [61.74, "B1"]
            ];

    notes[2] = [
                [65.41, "C2"],
                [69.30, "C#2"],
                [73.42, "D2"],
                [77.78, "D#2"],
                [82.41, "E2"],
                [87.31, "F2"],
                [92.50, "F#2"],
                [98, "G2"],
                [103.83, "G#2"],
                [110, "A2"],
                [116.54, "A#2"],
                [123.47, "B2"]
            ];

    notes[3] = [
                [130.81, "C3"],
                [138.59, "C#3"],
                [146.83, "D3"],
                [155.56, "D#3"],
                [164.81, "E3"],
                [174.61, "F3"],
                [185.00, "F#3"],
                [196, "G3"],
                [207.65, "G#3"],
                [220, "A3"],
                [233.08, "A#3"],
                [246.94, "B3"]
            ];

    notes[4] = [
                [261.63, "C4"],
                [277.18, "C#4"],
                [293.66, "D4"],
                [311.13, "D#4"],
                [329.63, "E4"],
                [349.23, "F4"],
                [369.99, "F#4"],
                [392, "G4"],
                [415.30, "G#4"],
                [440, "A4"],
                [466.16, "A#4"],
                [493.88, "B4"]
            ];

    notes[5] = [
                [523.25, "C5"],
                [554.37, "C#5"],
                [587.33, "D5"],
                [622.25, "D#5"],
                [659.25, "E5"],
                [698.46, "F5"],
                [739.99, "F#5"],
                [783.99, "G5"],
                [830.61, "G#5"],
                [880, "A5"],
                [932.33, "A#5"],
                [987.77, "B5"]
            ];

    notes[6] = [
                [1046.50, "C6"],
                [1108.73, "C#6"],
                [1174.66, "D6"],
                [1244.51, "D#6"],
                [1318.51, "E6"],
                [1396.91, "F6"],
                [1479.98, "F#6"],
                [1567.98, "G6"],
                [1661.22, "G#6"],
                [1760.00, "A6"],
                [1864.66, "A#6"],
                [1975.53, "A6"]
            ];

    notes[7] = [
                [2093.00, "C7"],
                [2217.46, "C#7"],
                [2349.32, "D7"],
                [2489.02, "D#7"],
                [2637.02, "E7"],
                [2793.83, "F7"],
                [2959.96, "F#7"],
                [3135.96, "G7"],
                [3322.44, "G#7"],
                [3520.00, "A7"],
                [3729.31, "A#7"],
                [3951.07, "A7"]
            ];

    notes[8] = [
                [4186.01, "C7"],
                [4434.92, "C#7"],
                [4698.63, "D7"],
                [4978.03, "D#7"],
                [5274.04, "E7"],
                [5587.65, "F7"],
                [5919.91, "F#7"],
                [6271.93, "G7"],
                [6644.88, "G#7"],
                [7040.00, "A7"],
                [7458.62, "A#7"],
                [7902.13, "A7"]
            ];

    var octaveSet;
    var nearestSet; //closest set of notes   


    self.findNote = function () {

        //narrow down the list
        findActiveSet();

        //find the nearest in the list
        findNearestSet();

        //compare the two in the set
        findClosest();

        /*console.log(self.interprettedHZ, self.interprettedNote);*/

    }



    var findActiveSet = function () {
        
        //console.log(self.preciseHZ);

        for (var i = 0; i < notes.length; i++) {

            var next = i + 1; //next octave set position

            //compare first value of next octave set
            if (typeof notes[next] != "undefined") {
                //if less: ocatve set is current position
                if (self.preciseHZ < notes[next][0][0]) {
                    octaveSet = i;
                    return octaveSet;
                }
                //if there is no next position, the end has been found.       
            } else {
                octaveSet = i;
            }
        }

    }

    /* Compare the notes in the ocatve range to find the closest match*/
    var findNearestSet = function () {

        //console.log(notes);

        //loop through octave look for two notes that the tone is in between.
        for (var i = 0; i < notes[octaveSet].length; i++) {

            //first note to check
            var currentHZ = notes[octaveSet][i][0];
            var currentNote = notes[octaveSet][i][1];

            //find second note to check
            var n = i + 1; //next position

            if (typeof notes[octaveSet][n] != "undefined") {
                var nextHZ = notes[octaveSet][n][0];
                var nextNote = notes[octaveSet][n][1];
            } else {

                //move to the next scale
                var nextScale = notes[(octaveSet + 1)];

                //if ther is a next scale:
                if (typeof nextScale != "undefined") {
                    nextHZ = nextScale[0][0];
                    var nextNote = nextScale[0][1];
                }
                //else next not is undefined
                else {
                    nextHZ = "undefined";
                }

            }

            if (currentHZ <= self.preciseHZ && nextHZ >= self.preciseHZ) {
                nearestSet = [[currentHZ, currentNote], [nextHZ, nextNote]];
                return nearestSet;
            }

        }
    }

    //compare the precise calculation to the notes in the musical scale
    findClosest = function () {
        
        if(typeof nearestSet!="undefined"){
            
            var diff1 = Math.abs(Number(nearestSet[0][0]) - self.preciseHZ);
            var diff2 = Math.abs(Number(nearestSet[1][0]) - self.preciseHZ);

            if (diff1 <= diff2) {
                self.interprettedHZ = nearestSet[0][0];
                self.interprettedNote = nearestSet[0][1];
            } else {
                self.interprettedHZ = nearestSet[1][0];
                self.interprettedNote = nearestSet[1][1];
            }
            
        }
        

    }

    return self;

}
