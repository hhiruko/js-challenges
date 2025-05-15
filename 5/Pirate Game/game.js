const { Entity } = require("./entity");
const prompt = require("prompt-sync")();

// assume true inclusive rand
const getRand = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

console.log(`
    HIT - H,
    DEFEND - D    
`);

const isAction = (action) => {
    return action === 'H' || action === 'D';
};

const player = new Entity(100, 10, 20);
const enemy = new Entity(200, 10, 10);

const status = () => {
    console.log(`Davy Jones: ${enemy.health}HP`);
    console.log(`You: ${player.health}HP\n`);
};
let loop = true;
let turn = 0;
while(loop){
    status();
    if(turn % 2 == 0){
        player.nextTurn(turn);
        const action = prompt("Your action: ");
        if (isAction(action)){
            if(action === 'H'){
                console.log('You are hitting.\n');
                enemy.hitWith(player.attack);
                if(enemy.health < 1){
                    loop = false;
                    console.log('You won!');
                }
            } else if(action === 'D'){
                console.log('You are defending.\n');
                player.defend();
            }
        } else {
            console.log("You choose to speak gibberish.\n");
        }
    } else {
        enemy.nextTurn(turn);
        const action = getRand(0, 1);
        if(action === 0){
            console.log('Davy hit you.\n');
            player.hitWith(enemy.attack);
            if(player.health < 1){
                loop = false;
                console.log('You lost...');
            }
        } else if(action === 1){
            console.log('Davy is defending.\n');
            enemy.defend();
        }
    }
    turn++;
    console.log('------------------------------------------------------------');
}