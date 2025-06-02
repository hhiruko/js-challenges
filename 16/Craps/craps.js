const rollFrequency = new Map();
const winFrequency = new Map();

const setFrequency = (roll) => {
    const frequency = rollFrequency.get(roll);
    if(typeof frequency === 'undefined'){
        rollFrequency.set(roll, 1);
    } else {
        rollFrequency.set(roll, frequency + 1);
    }
}

const setWin = (result) => {
    const count = winFrequency.get(result);
    if(typeof count === 'undefined'){
        winFrequency.set(result, 1);
    } else {
        winFrequency.set(result, count + 1);
    }
};

const simulateCraps = () => {
    const random = () => {
        return Math.floor(Math.random() * 6) + 1;
    };

    const total = () => {
        return random() + random();
    }

    const rollout = total();
    setFrequency(rollout);

    if([7, 11].includes(rollout)){
        setWin('win');
        return 'Won Rollout';
    }

    if([2, 3, 12].includes(rollout)){
        setWin('lose');
        return 'Craps';
    }

    const point = rollout;
    let isPointPhase = true;
    while(isPointPhase){
        const roll = total();
        setFrequency(roll);

        if(roll === point){
            isPointPhase = false;
            setWin('win');
            return 'Won Point';
        }

        if(roll === 7){
            isPointPhase = false;
            setWin('lose');
            return 'Seven out';
        }
    }
};

const size = 100000;
for(i = 0; i < size; i++){
    simulateCraps();
}

let maxKey = null;
let maxValue = 0;

for (const [key, value] of rollFrequency.entries()) {
  if (value > maxValue) {
    maxValue = value;
    maxKey = key;
  }
}



console.log('Most common roll: ' + maxKey);
console.log('Win percentage: ' + (winFrequency.get('win') / (winFrequency.get('lose') + winFrequency.get('win'))) * 100 + '%');