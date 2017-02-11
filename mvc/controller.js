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
        this.view.domLapView(this.getStrategy().start(["00", "00", "00", "0"]));
        this.view.domTotalView(this.getStrategy().start(["00", "00", "00", "0"]));
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
        var delayed = 0;
        var start = 0;
        var addTotal = 0;
        var classBtn = document.getElementsByClassName("btn");
        var btn = [];

        //start
        btn[0] = () => {
            if (!running) {
                classBtn[0].value = "stop";
                start = new Date().getTime();
                running = true;
                this.interval = setInterval(() => {
                    this.updateView(start, addTotal, delayed);
                }, 25);
            } else {
                classBtn[0].value = "start";
                delayed = this.model.elapsedLap;
                clearInterval(this.interval);
                running = false;
            }
        }

        //reset
        btn[2] = () => {
            delayed = 0;
            addTotal = 0;
            clearInterval(this.interval);
            classBtn[0].value = "start";
            running = false;
            this.view.domLapView(this.getStrategy().start(["00", "00", "00", "0"]));
            this.view.domTotalView(this.getStrategy().start(["00", "00", "00", "0"]));
            this.view.clearTotal();
        }

        //next lap
        btn[1] = () => {
            if (running) {
                start = new Date().getTime();
                delayed = 0;
                var input = this.model.elapsedLap;
                //total: add laps
                document.getElementById("lapEntry").scrollTop = 0;
                let lastLap = this.model.convertHms(input);
                addTotal += this.model.elapsedLap;
                this.view.setLap(lastLap, this.model.convertHms(addTotal));
                this.updateView(start, addTotal);
            }
        }

        for (var i = 0; i < classBtn.length; i++) {
            classBtn[i].addEventListener('click', btn[i], false);
        }

    }

    updateView(start, addTotal, delayed = 0) {
        this.view.domLapView(this.getStrategy().start(this.model.startLap(start, delayed)));
        this.view.domTotalView(this.getStrategy().start(this.model.startTotal(start, addTotal + delayed)));
        this.settings();
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