let fullOperation = '';
let result = '';
let record = [];

function button(value){
    console.log(value);
    fullOperation = fullOperation + value;
    renderNumber();
}

function operation(op){
    console.log(op);
    let [operando1, operador, operando2] = fullOperation.toString().split(/(\+|-|\x|\^|\/)/);
    if (operador) return;
    fullOperation = fullOperation + op;
    renderNumber();
}

function showResult() {
    const values = fullOperation.split(/(\+|-|\x|\^|\/)/);
  
    console.log(values);
    let [number1, operador, number2] = fullOperation.split(/(\+|-|\x|\^|\/)/);
  
    console.log(number1);
    console.log(number2);
    console.log(operador);
  
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
  
    switch (operador) {
        case 'x':
            fullOperation = multiplication(number1, number2);
            break;
        case '+':
            fullOperation = add(number1, number2);
            break;

        case '-':
        fullOperation = sub(number1, number2);
        break;

        case '/':
        fullOperation = divided(number1, number2);
        break;

        case '^':
        fullOperation = powere(number1, number2);
        break;
        
      
        default:
        break;
    }
  
    renderNumber();
}

function multiplication(number1, number2) {
    return number1 * number2;
}

function add(number1, number2) {
    return number1 + number2;
}

function sub(number1, number2) {
    return number1 - number2;
}

function divided(number1, number2) {
    return number1 / number2;
}

function powere(number1, number2) {
    return Math.pow(number1, number2);
}

function clearScreen(){

    record.push(fullOperation);
    fullOperation = '';
    console.clear();
   renderNumber();
  

}

function reportR(){
    if(!record[0]){
      return;
    }
    fullOperation = record[record.length - 1];
    fullOperation = record.pop();
     renderNumber();
}

function renderNumber (){
    document.getElementById('screen').innerHTML = fullOperation;
}

renderNumber();
