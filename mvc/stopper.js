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
        var output = [];
        var millis = ((input / 100) % 1000) % 10;
        var mTenth = 0;

        (millis < 9)
            ? mTenth = Math.round(millis)
            : mTenth = Math.floor(millis);

        var sec = Math.floor(input / 1000) % 60;
        var min = Math.floor(input / 60000) % 60;
        var hour = Math.floor(input / 3600000) % 24;

        return [("0" + hour).slice(-2), ("0" + min).slice(-2), ("0" + sec).slice(-2), mTenth];
    }
}