const prompt = require("prompt-sync")();
const fs = require('node:fs');

const menu = () => {
    return `
    1. View events

    2. Add an event

    3. Edit an event

    4. Delete an event

    5. Exit
`;
};

class Event {
    constructor(path){
        this.file = path;
        this.list = Array.from(new Array(24), (_, i) => {
            return (i < 10 ? '0' : '') + i + ':00';
        });
        this.map = new Map();

        try {
            const data = fs.readFileSync(this.file, 'utf-8');
            const json = JSON.parse(data);
            
            this.list.forEach(e => {
                this.map.set(e, json[e] ?? '');
            });
        } catch (e) {
            console.error('Invalid JSON:', e);
        }
    }

    view() {
        this.map.forEach((e, t) => {
            let color = '\x1b[32m';
            if(e.length === 0) {
                e = 'No event planned for this hour.';
                color = '\x1b[31m';
            }
            console.log(color + '%s\x1b[0m => %s', t, e);
        });
    }

    add() {
        let timeslot = prompt("Choose a timeslot: ");
        let row = this.map.get(timeslot);
        if(typeof row === 'undefined'){
            console.log('\x1b[31m%s\x1b[0m', 'Please enter a valid timeslot.');
        } else if(row.length > 0) {
            console.log('\x1b[31m%s\x1b[0m', 'This timeslot is unavailable.');
        } else {
            let event = prompt("Enter an event: ");
            if(event.length === 0){
                console.log('\x1b[31m%s\x1b[0m', 'Please enter a valid event.');
            } else {
                this.map.set(timeslot, event);
                this.persist();
                console.log('\x1b[32m%s\x1b[0m', 'Successfully added!');
            }
        }
    }

    edit() {
        let timeslot = prompt("Choose a timeslot: ");
        let row = this.map.get(timeslot);
        if(typeof row === 'undefined'){
            console.log('\x1b[31m%s\x1b[0m', 'Please enter a valid timeslot.');
        } else if(row.length === 0) {
            console.log('\x1b[31m%s\x1b[0m', 'Nothing to edit.');
        } else {
            let event = prompt(`Enter an edit (current: \x1b[33m${row}\x1b[0m): `);
            if(event.length === 0){
                console.log('\x1b[31m%s\x1b[0m', 'Please enter a valid event.');
            } else {
                this.map.set(timeslot, event);
                this.persist();
                console.log('\x1b[32m%s\x1b[0m', 'Successfully edited!');
            }
        }
    }

    delete() {
        let timeslot = prompt("Choose a timeslot: ");
        let row = this.map.get(timeslot);
        if(typeof row === 'undefined'){
            console.log('\x1b[31m%s\x1b[0m', 'Please enter a valid timeslot.');
        } else if(row.length === 0) {
            console.log('\x1b[31m%s\x1b[0m', 'Nothing to delete.');
        } else {
            this.map.set(timeslot, '');
            this.persist();
            console.log('\x1b[32m%s\x1b[0m', 'Successfully deleted!');
        }
    }

    persist() {
        const obj = Object.fromEntries(this.map);
        const content = JSON.stringify(obj, null, 2);
    
        try {
            const data = fs.writeFileSync(this.file, content, "utf-8");
        } catch (e) {
            console.error("Couldn't write to JSON:", e);
        }
    }
}

let loop = true;
let events = new Event('intermediate.json');
while(loop){
    console.log(menu());
    let command = parseInt(prompt("Choose an option: "));
    switch(command){
        case 1: events.view(); break;
        case 2: events.add(); break;
        case 3: events.edit(); break;
        case 4: events.delete(); break;
        case 5: loop = false; break;
        default:
    }
}