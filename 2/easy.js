const prompt = require("prompt-sync")();

const options = () => {
    return `
        1. Celsius to Fahrenheit
        2. Fahrenheit to Celsius
        3. Exit
    `;
}

const celsiusToFahrenheit = () => {
    let celsius = parseFloat(prompt("Enter degree in Celsius (°C): "));
    if (celsius < -273.15) {
        console.log("Impossible temperature.")
    } else {
        // (°C × 9/5) + 32 = °F
        let fahrenheit = (celsius * 9/5) + 32;
        console.log(fahrenheit + '°F');
    }
};

const fahrenheitToCelsius = () => {
    let fahrenheit = parseFloat(prompt("Enter degree in Fahrenheit (°F): "));
    if (fahrenheit < -459.67) {
        console.log("Impossible temperature.")
    } else {
        // (°F − 32) × 5/9 = °C
        let celsius = (fahrenheit - 32) * 5/9;
        console.log(celsius + '°C');
    }
};

let loop = true;
while(loop) {
    console.log(options());
    let option = parseInt(prompt("Select an option: "));
    switch(option){
        case 1: celsiusToFahrenheit(); break;
        case 2: fahrenheitToCelsius(); break;
        case 3: loop = false; break;
        default: console.log("Choose appropriate option. ");
    }
}