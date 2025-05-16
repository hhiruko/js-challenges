const prompt = require('prompt-sync')({ sigint: true });

let board = [];
for(i = 1; i < 5; i++){
    board[i - 1] = new Array(i * 2 - 1).fill(1);
}

const display = (board) => {
    board.forEach(e => {
        console.log(e.join(' '));
    });
    console.log('_____________________________________________________')
};

const strategy = (board) => {
    let heapNumber = 0;
    
    let nimsum;

    let isOnlyHeapOfAtLeastTwo = false;
    let onlyHeapOfAtLeastTwoIndex;

    let isHeapsOfOnes = true;

    let minLength;
    let maxLength;
    let maxIndex;

    board.forEach((e, i) => {
        if(e.length !== 0) {
            heapNumber++;
        }

        // Calculate nimsum
        if(e.length > 0){
            const row = e.reduce((acc, v) => acc + v);
            nimsum = typeof nimsum === 'undefined' ? row : nimsum ^ row;
        }

        // Check for a heap of two 
        if(e.length > 1){
            if(typeof onlyHeapOfAtLeastTwoIndex === 'undefined'){
                onlyHeapOfAtLeastTwoIndex = i;
                isOnlyHeapOfAtLeastTwo = true;
            } else {
                isOnlyHeapOfAtLeastTwo = false;
            }
        }

        // Check for heaps of ones
        if(e.length !== 1){
            isHeapsOfOnes = false;
        }

        // Check for Max and Min
        const length = e.length;
        if(typeof minLength === 'undefined' || length < minLength){
            minLength = length;
        }
        if(typeof maxLength === 'undefined' || length > maxLength){
            maxLength = length;
            maxIndex = i;
        }
    });
    
    if(isHeapsOfOnes || nimsum === 0){
        board[maxIndex].splice(0, 1);
    } else if(heapNumber === 1){
        board[maxIndex].splice(0, maxLength - 1);
    } 
    else if(isOnlyHeapOfAtLeastTwo){
        if(heapNumber % 2 === 0){
            board[onlyHeapOfAtLeastTwoIndex].splice(0, 2);
        } else {
            board[onlyHeapOfAtLeastTwoIndex].splice(0, 1);
        }
    }
    else if(heapNumber === 2){
        let length = maxLength - minLength;
        if(length === 0){
            length = Math.random() < 0.5 ? 1 : maxLength
        }
        board[maxIndex].splice(0, length);
    }
    else {
        let zeroIndex;
        let onlyOnes = true;
        board.forEach((e, i) => {
            const length = e.length;
            if(length > 0){
                const zeroLength = length - nimsum;
                if(typeof zeroIndex === 'undefined' && zeroLength >= 0){
                    zeroIndex = i;
                    if(zeroLength > 1){
                        onlyOnes = false;
                    }
                } else if(length > 1) {
                    onlyOnes = false;
                }
            }
        });
        
        if(onlyOnes && heapNumber % 2 === 0){
            board[zeroIndex].splice(0)
        } else {
            board[zeroIndex].splice(0, nimsum);
        }
    }
}


const checkBoard = (board) => {
    let b = [];
    board.forEach(e => {
        if(e.length > 0){
            b.push(e);
        }
    });
    return b;
}

let game = true;
let turn = 0;
while(game){
    board = checkBoard(board);
    if(board.length === 0){
        console.log(turn === 1 ? 'You lost...' : 'You won!');
        game = false;
    } else {
        display(board);
        if(turn === 0){
            let illegalMove = true;
            do{
                const row = parseInt(prompt('Row: ')) - 1;
                const number = parseInt(prompt('Number: '));

                if(typeof board[row] === 'undefined' || board[row].length === 0 || number < 1 || board[row].length < number){
                    continue;
                }

                board[row].splice(0, number);
                illegalMove = false;
            } while(illegalMove);

            turn = 1;
            console.log('Your turn:')
        } else {
            strategy(board);
            turn = 0;
            console.log("Computer's turn:")
        }
    }
}