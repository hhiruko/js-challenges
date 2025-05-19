let matrix = [[1]];

const levels = 40;
for(i = 1; i < levels; i++){
    matrix[i] = [];
    let counter = [];
    matrix[i - 1].forEach(e => {
        if(counter.length === 0 || counter[0] === e){
            counter.push(e);
        } else {
            matrix[i].push(counter.length);
            matrix[i].push(counter[0]);
            counter = [e];
        }
    });
    if(counter.length > 0){
        matrix[i].push(counter.length);
        matrix[i].push(counter[0]);
    }
}

matrix.forEach(e => {
    console.log(e.join());
});