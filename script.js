const display = document.querySelector("#display");
let displayValue = "";
const number = [];
const operation = [];


document.querySelectorAll(".digit").forEach(x => x.addEventListener("click", type));
document.querySelectorAll(".operator").forEach(x => x.addEventListener("click", type));
document.querySelectorAll(".operator").forEach(x => x.addEventListener("click", pushToOperation));
document.querySelector("#equal").addEventListener("click", createOperation);

function type(e){
    if (e.target.className === "digit") number.push(e.target.value);
    displayValue += e.target.value;
    display.textContent = displayValue;
}

function pushToOperation(e) {
    operation.push(+number.join(""));
    number.splice(0, number.length);
    operation.push(e.target.value);
}

function createOperation() {
    operation.push(+number.join(""));
    number.splice(0, number.length);
    display.textContent = operate(operation[0], operation[2], operation[1]);
    operation.splice(0, operation.length);
    displayValue = "";
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a === 0 || b === 0) return "nope";
    return a / b;
}

function operate(a, b, o) {
    if (o === "+") return add(a, b);
    if (o === "-") return subtract(a, b);
    if (o === "*") return multiply(a, b);
    if (o === "/") return divide(a, b);
}