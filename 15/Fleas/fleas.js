const simulate = (size = 30, bell = 50) => {
    let grid = Array.from({ length: size }, () =>Array.from({ length: size }, () => [1]));
    const moves = ['n', 's', 'w', 'e'];

    for(let i = 0; i < bell; i++){
        let moved = Array.from({ length: size }, () =>Array.from({ length: size }, () => []));
        grid.forEach((row, ri) => {
            row.forEach((column, ci) => {
                moved[ri][ci] = column;
            });
        });

        for(r = 0; r < 30; r++){
            for(c = 0; c < 30; c++){
                grid[r][c].forEach(flea => {
                    let directions = [...moves];
                    if(r === 0){
                        directions = directions.filter(e => e !== 'n');
                    }

                    if(r === 29){
                        directions = directions.filter(e => e !== 's');
                    }

                    if(c === 0){
                        directions = directions.filter(e => e !== 'w');
                    }

                    if(c === 29){
                        directions = directions.filter(e => e !== 'e');
                    }

                    const move = directions[Math.floor(Math.random() * directions.length)];
                    let row = r;
                    let column = c;

                    if(move === 'n'){
                        row--;
                    } else if(move === 's'){
                        row++;
                    } else if(move === 'w'){
                        column--;
                    } else if(move === 'e'){
                        column++;
                    }
                    
                    moved[r][c].pop();
                    moved[row][column].push(flea);
                });
            }
        }
        grid = moved;
    }

    let empty = 0;
    grid.forEach(row => {
        row.forEach(column => {
            if(column.length === 0){
                empty++;
            }
        });
    });
    return empty;
}

const probability = (precision = 100) => {
    let sum = 0;
    for(let i = 0; i < precision; i++){
        sum += simulate();
    }
    return sum / precision;
}

console.log(probability(50));