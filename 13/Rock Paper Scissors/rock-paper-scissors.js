const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const moves = [ROCK, PAPER, SCISSORS];

const winMoves = {
    [PAPER]: ROCK,
    [SCISSORS]: PAPER,
    [ROCK]: SCISSORS
};

let ai1 = 0;
let ai2 = 0;

const randomMove = () => {
    const rand = Math.random();
    if(rand < 0.33){
        return 0;
    }

    if(rand < 0.66){
        return 1;
    }

    return 2;
};

for(i = 0; i < 100;){
    const ai1move = moves[randomMove()];
    const ai2move = moves[randomMove()];
    if(ai1move === ai2move){
        continue;
    }

    if(winMoves[ai1move] === ai2move){
        ai1++;
        console.log(`AI 1 used ${ai1move} against ${ai2move}`);
    }

    if(winMoves[ai2move] === ai1move){
        ai2++;
        console.log(`AI 2 used ${ai2move} against ${ai1move}`);
    }

    i++;
}

console.log(`AI 1 won ${ai1} times. AI 2 won ${ai2} times.`);