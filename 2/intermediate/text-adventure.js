const prompt = require("prompt-sync")();
const fs = require('node:fs');

class Game {
    constructor(path, name){
        this.file = path;
        this.name = name;

        try {
            const data = fs.readFileSync(this.file, 'utf-8');
            const json = JSON.parse(data);
            this.levels = json;

            this.commands();
            this.started = true;
            this.inventory = [];
            this.startLevel('0');
        } catch (e) {
            console.error('Invalid JSON:', e);
        }
    }

    startLevel(index){
        this.levelIndex = index;
        this.level = this.levels[this.levelIndex];
        console.log(this.level['name']);
        console.log(this.level['description']);

        if(Object.keys(this.level['exits']).length === 0){
            this.stop();
            console.log(`Thanks for playing, ${this.name}!`);
        }
    }

    stop(){
        if(this.started){
            this.started = false;
        }

        return !this.started;
    }

    move(direction) {
        let exit = this.level['exits']?.[direction];
        if(typeof exit === 'undefined'){
            console.log("You bump into a wall. There's no exit that way.");
        } else{
            if(this.level?.['used_items']?.[direction]){
                console.log('Closed.')
                if(this.inventory.includes(this.level['used_items'][direction])){
                    console.log('You have something in your inventory that might help.')
                } else {
                    console.log('You need something to open this exit.')
                }
            } else {
                this.startLevel(exit);
            }
        }
    }

    l() {
        let items = this.level['items'];
        let npcs = this.level['npcs'];

        let itemsExist = items && Object.keys(items).length > 0;
        if(itemsExist){
            console.log("You see:");
            for(const [name, description] of Object.entries(items)){
                console.log(`- ${name}: ${description}`);
            }
        }

        let npcsExist = npcs && Object.keys(npcs).length > 0;
        if(npcsExist){
            if(itemsExist){
                console.log();
            }
            console.log("Someone is here:")
            for(const [name, _] of Object.entries(npcs)){
                console.log(`- ${name}`);
            }
        }

        if(!itemsExist && !npcsExist){
            console.log("Nothing of interest here.")
        }
    }

    take(item){
        if(typeof this.level?.['items'] === 'undefined'){
            console.log("Nothing to take here.");
        } else if(item in this.level['items']){
            this.inventory.push(item);
            let levelItems = this.level['items'];
            delete levelItems[item];
            this.level['items'] = levelItems;
            this.levels[this.levelIndex] = this.level;
            console.log(`You took the ${item}.`);
        } else {
            console.log("You couldn't find the item.");
        }
    }

    use(item){
        let usedItems = this.level?.['used_items'];
        const usedKey = Object.keys(usedItems).find(key => usedItems[key] === item);
        if(typeof usedItems === 'undefined'){
            console.log("Nothing to use here.");
        } else if(!this.inventory.includes(item)){
            console.log("You don't have the item in your inventory.");
        } else if(usedKey) {
            this.inventory = this.inventory.filter(e => e !== item);
            delete usedItems[usedKey];
            this.level['used_items'] = usedItems;
            this.levels[this.levelIndex] = this.level;
            console.log(`You used the ${item}. Something seems to happen.`);
        } else {
            console.log("You can't use the item here.");
        }
    }

    talkTo(npc){
        let npcs = this.level?.['npcs'];
        if(typeof npcs === 'undefined'){
            console.log('Noone to talk to here.');
        } else if(npc in npcs){
            Object.entries(this.level['npcs'][npc]['dialogue']).forEach(([key, { message, items }]) => {
                console.log(`${npc}: ${message}`);
              
                if(items){
                    items.forEach(item => {
                        this.inventory.push(item);
                        let items = npcs[npc]['dialogue'][key]['items'];
                        items = items.filter(e => e !== item);
                        this.level['npcs'][npc]['dialogue'][key]['items'] = items;
                        this.levels[this.levelIndex] = this.level;
                        console.log(`${npc} gave you the ${item}.`);
                    });
                }
              });
        } else{
            console.log('You tried to talk to someone.');
        }
    }

    processExpression(expression){
        const take = /take\s+((?:[A-Za-z]+\s*)+)/;
        let takeItem = expression.match(take);

        const use = /use\s+((?:[A-Za-z]+\s*)+)/;
        let useItem = expression.match(use);

        const talk = /talk\s+to\s+((?:[A-Za-z]+\s*)+)/;
        let talkTo = expression.match(talk);

        if(takeItem){
            let item = takeItem[1].trim();
            this.take(item);
        } else if(useItem){
            let item = useItem[1].trim();
            this.use(item);
        } else if(talkTo){
            let npc = talkTo[1].trim();
            this.talkTo(npc);
        } else{
            console.log("You mutter something incomprehensible. Nothing happens.")
        }
    }

    processCommand(command){
        if(['n', 's', 'e', 'w', 'u', 'd'].includes(command)){
            this.move(command);
        } else if('l' === command){
            this.l();
        } else if('stop' === command){
            this.stop();
        } else if('' === command) {
            console.log("You stand silently. The world waits.")
        } else {
            this.processExpression(command);
        }
    }

    commands(){
        console.log(`
            n - North
            s - South
            e - East
            w - West
            u - Up
            d - Down
            l - Look around
            take [item] - Take item
            use [item] - Use item
            talk to [npc] - Talk to npc

            stop - Stop and exit
        `);
    }
}

let loop = true;
let name = prompt("What is your name, Chosen Undead? ");
let game = new Game('levels.json', name);
while(loop) {
    let input = prompt();
    game.processCommand(input);
    if(!game.started){
        loop = false;
    }
}

