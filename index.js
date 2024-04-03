let fullOperation = '';

function number(value){
    console.log(value);
    fullOperation = fullOperation + value;
    rendernumber();
}

function operation(op){
    console.log(op);
}

function rendernumber (){
    document.getElementById('screen').innerHTML = fullOperation;
}