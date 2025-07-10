const input = {
    a: {
        b: {
            c: 1
        },
        d: 2
    }
};

function deepFlatten(input) {
    if(typeof input !== 'object'){
        return input;
    }

    const flat = {};
    function flatten(key, value) {
        if(typeof value === 'object'){
            for(const [k, val] of Object.entries(value)){
                flatten(key + '.' + k, val);
            }
        } else {
            flat[key.substr(1)] = value;
        }
    }
    flatten('', input);
    
    return flat;
}

console.log(deepFlatten(input));