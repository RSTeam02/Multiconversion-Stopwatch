/**
 * @rsTeam02
 * Multiconversion Clock => Control Unit
 */
class Controller {

    constructor(model) {
        this.model = model;
        this.view = new View();
        this.classCb = document.getElementsByClassName("cb");
        this.classRbConv = document.getElementsByClassName("rbConv");
        this.classBtn = document.getElementsByClassName("btn");        
        this.saveSettings();
        this.loadSettings();
        this.buttonListener();
        this.view.domView(this.getStrategy().start(["00", "00", "00", "0"]));
    }

    //save settings when clicked one of buttons
    saveSettings() {
        //store checkbox settings
        for (let i = 0; i < this.classCb.length; i++) {
            document.getElementById(this.classCb[i].id).addEventListener("click", () => {
                (document.getElementById(this.classCb[i].id).checked)
                    ? localStorage.setItem(`cbSetting${i}`, true)
                    : localStorage.setItem(`cbSetting${i}`, false);
            });
        }


        for (let i = 0; i < this.classRbConv.length; i++) {
            this.classRbConv[i].addEventListener("click", () => {
                for (let i = 0; i < this.classRbConv.length; i++) {
                    (document.getElementById(this.classRbConv[i].id).checked)
                        ? localStorage.setItem(`rbConv${i}`, true)
                        : localStorage.setItem(`rbConv${i}`, false);
                }
            });
        }
    }

    //visual settings (in)vis dec, bin, color highlight
    settings() {
        if (document.getElementById("hl").checked) {
            this.view.highlight();
        }

        if (!document.getElementById("01").checked) {
            this.view.invisBin();
        }

        if (!document.getElementById("dec").checked) {
            this.view.invisDec();
        }
    }


    loadSettings() {

        for (let i = 0; i < this.classCb.length; i++) {
            (localStorage.getItem(`cbSetting${i}`) !== null)
                ? document.getElementById(this.classCb[i].id).checked = JSON.parse(localStorage.getItem(`cbSetting${i}`))
                : document.getElementById(this.classCb[i].id).checked = true;
        }

        for (let i = 0; i < this.classRbConv.length; i++) {
            (localStorage.getItem(`rbConv${i}`) !== null)
                ? document.getElementById(this.classRbConv[i].id).checked = JSON.parse(localStorage.getItem(`rbConv${i}`))
                : document.getElementById(this.classRbConv[i].id).checked = true;
        }

    }

    buttonListener() {
        var running = false;
        var interval;
        var delayed = 0;
        var start = 0;

        document.getElementById("resetBtn").addEventListener("click", () => {
            delayed = 0;
            clearInterval(interval);
            running = false;
            this.view.domView(this.getStrategy().start(["00", "00", "00", "0"]));
        });
        //update every 100ms
        document.getElementById("startBtn").addEventListener("click", () => {
            if (!running) {
                start = Math.floor(new Date().getTime() / 10);
                running = true;
                interval = setInterval(() => {
                    this.view.domView(this.getStrategy().start(this.model.startLap(start, delayed)));
                    this.settings();
                }, 100);
            }
        });

        document.getElementById("stopBtn").addEventListener("click", () => {
            if (running) {
                delayed = this.model.elapsedLap;
                clearInterval(interval);
                running = false;
            }
        });
    }
    //dependent on conversion mode
    getStrategy() {
        var strategy;
        for (let i = 0; i < this.classRbConv.length; i++) {
            if (document.getElementById(this.classRbConv[i].id).checked) {
                document.getElementById("setTitle").innerHTML = document.getElementById(this.classRbConv[i].id).value;
                strategy = new ConvertStrategy(new Factory().execConvert(this.classRbConv[i].id));
            }
        }
        return strategy;
    }
}