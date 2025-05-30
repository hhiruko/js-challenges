export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const isLeap = (Y) => {
    let leap = false;
    if(Y % 4 === 0){
        leap = true;
    }
    if(Y % 100 === 0){
        leap = false;
    }
    if(Y % 400 === 0){
        leap = true;
    }
    return leap;
}

// Gauss Algorithm
export const dayOfTheWeek = (D, M, Y) => {
    const monthOffset = [
        [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5],
        [0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
    ];

    const m = monthOffset[isLeap(Y) ? 1 : 0][M - 1];

    return ((D + m + 5 * ((Y - 1) % 4) + 4 * ((Y - 1) % 100) + 6 * ((Y - 1) % 400)) % 7);
};