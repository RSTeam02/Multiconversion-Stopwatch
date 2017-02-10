class View {

    domLapView(text) {
        document.getElementById("lapTable").innerHTML = text;
    }

    domTotalView(text) {
        document.getElementById("totalTable").innerHTML = text;
    }


    setLap(inputLap, total) {
        var entry = document.createElement("li");
        var lapList = document.getElementById("lapEntry");
        entry.appendChild(document.createTextNode(`Lap: ${inputLap.join(":")}, Total: ${total.join(":")}`));
        lapList.insertBefore(entry, lapList.childNodes[0]);
    }

    clearTotal() {
        document.getElementById("lapEntry").innerHTML = "";
    }

    invisBin() {
        let colID = document.getElementsByClassName("bin");
        for (let i = 0; i < colID.length; i++) {
            colID[i].style.color = 'transparent';
        }
    }

    invisDec() {
        let colID = document.getElementsByClassName("dec");
        for (let i = 0; i < colID.length; i++) {
            colID[i].style.color = 'transparent';
        }
    }

    highlight() {
        let colID = document.getElementsByClassName("bin");
        for (let i = 0; i < colID.length; i++) {
            (colID[i].innerHTML !== "0" && colID[i].innerHTML !== "\u2001")
                ? colID[i].style.backgroundColor = 'lightgreen'
                : colID[i].style.backgroundColor = 'transparent';
        }

    }

}