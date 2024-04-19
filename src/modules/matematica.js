
const PI = 3.14;

function sumar(x, y) {
    return parseInt(x)+parseInt(y);
}

const multiplicar = (a, b) => {
    return parseInt(a)*parseInt(b);
};

function dividir(divisor, dividendo){
    return parseInt(divisor)/parseInt(dividendo);
};

function restar(a, b){
    return parseInt(a)-parseInt(b);
};

export {PI, sumar, multiplicar, dividir, restar};
