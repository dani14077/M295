'use strict'
function verdoppeln(zahl, callback){
    const result = zahl * 2;
    callback(result);
}

function printResult(result) {
    console.log(result)
}

verdoppeln(7, printResult)