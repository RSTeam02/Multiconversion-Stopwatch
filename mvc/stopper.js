/**
 * @rsTeam02
 * Stopper accuracy 1/100s
 */

class Stopper {

    startLap(start, paused) {

        this.elapsedLap = new Date().getTime() - start + paused;
        return this.convertHms(this.elapsedLap);
    }

    startTotal(startTotal, add) {
        this.elapsedTotal = new Date().getTime() - startTotal + add;
        return this.convertHms(this.elapsedTotal);
    }

    convertHms(input) {
        var output = [];
        var millis = Math.round(input / 100) % 100
        var sec = Math.floor(input / 1000) % 60;
        var min = Math.floor(input / 60000) % 60;
        var hour = Math.floor(input / 3600000) % 24;
        return [("0" + hour).slice(-2), ("0" + min).slice(-2), ("0" + sec).slice(-2), ("0" + millis).slice(-1)];
    }


}