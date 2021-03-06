/**
 * @rsTeam02
 * Stopper accuracy 1/10s
 */

class Stopper {

    startLap(start, paused, callback) {
        this.elapsedLap = new Date().getTime() - start + paused;
        callback(this.convertHms(this.elapsedLap));
    }

    startTotal(startTotal, add, callback) {
        this.elapsedTotal = new Date().getTime() - startTotal + add;
        callback(this.convertHms(this.elapsedTotal));
    }

    convertHms(input) {
        var millis = input / 100;
        var tenth = Math.round(millis);
        var tenthMod10 = tenth % 10;
        var sec = Math.floor(tenth / 10) % 60;
        var min = Math.floor(tenth / 600) % 60;
        var hour = Math.floor(tenth / 36000) % 24;
        return [("0" + hour).slice(-2), ("0" + min).slice(-2), ("0" + sec).slice(-2), tenthMod10];
    }
}