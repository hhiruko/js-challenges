const prompt = require("prompt-sync")();
const fs = require('node:fs');

class Stopwatch {
    constructor(filePath) {
        this.file = filePath;
        this.startT = 0;
        this.laps = [];
        this.stopT = 0;

        console.log(`
            1. Start
            2. Lap
            3. Stop
            4. Exit programm    
        `);
    }

    execute(command) {
        switch(command){
            case 1: this.start(); break;
            case 2: this.lap(); break;
            case 3: this.stop(); break;
            default: console.log('Undefined command.');
        }
    }

    start() {
        if(this.startT === 0){
            this.startT = performance.now();
            this.log('Started!');
        } else {
            console.log('Stop the stopwatch first.')
        }
    }

    lap() {
        if(this.startT > 0 && this.stopT === 0) {
            const lap = performance.now();
            const diff = this.diff(this.startT, lap);
            this.laps.push(diff);

            this.log('Lap: ' + this.pretty(diff));
        } else {
            "Start the stopwatch first."
        }
    }

    stop() {
        if(this.startT > 0){
            const stop = performance.now();
            this.stopT = stop;

            this.log('Stopped: ' + this.pretty(this.diff(this.startT, this.stopT))  + '\n');
        } else {
            console.log('Start the stopwatch first.');
        }
    }

    diff(start, stop) {
        return stop - start;
    }

    pretty(difference) {
        return `${(difference / 1000).toFixed(3)} seconds`;
    }

    log(message) {
        try {
            const data = fs.appendFileSync(this.file, message  + '\n', "utf-8");
            console.log(message);
        } catch (e) {
            console.error("Couldn't write to file:", e);
        }
    }
}

let loop = true;
const stopwatch = new Stopwatch('stopwatch.log');
while(loop) {
    let command = parseInt(prompt("Command: "));
    if(command === 4){
        loop = false;
    } else {
        stopwatch.execute(command);
    }
}