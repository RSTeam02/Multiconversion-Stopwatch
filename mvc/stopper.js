/**
 * @rsTeam02
 * Stopper accuracy 1/100s
 */

class Stopper {
  
    startLap(start, paused) {

        this.elapsedLap = Math.floor(new Date().getTime() / 10) - start + paused;
        return this.convertHms(this.elapsedLap);
    }
 
    convertHms(input) {
        var output = [];   
        var millis = Math.floor(input / 10) % 100
        var sec = Math.floor(input / 100) % 60;
        var min = Math.floor(input / 6000) % 60;
        var hour = Math.floor(input / 360000) % 24;
    
        return [("0" + hour).slice(-2), ("0" + min).slice(-2), ("0" + sec).slice(-2), ("0" + millis).slice(-1)];
    }


}