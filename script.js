const display = document.querySelector("#display");
const numberA = [];
const numberB = [];
let result;
let operator = "";
let displayValue;


document.querySelectorAll(".digit").forEach(x => x.addEventListener("click", type));
document.querySelectorAll(".operator").forEach(x => x.addEventListener("click", type));
document.querySelectorAll(".operator").forEach(x => x.addEventListener("click", setOperator));
document.querySelector("#equal").addEventListener("click", createOperation);
document.querySelector("#undo").addEventListener("click", undo);
document.querySelector("#clear").addEventListener("click", clear);

function type(e) {
    if (operator) {
        if (e.target.className === "digit") numberB.push(e.target.value);
        setDisplayValue();
    } else {
        if (e.target.className === "digit") {
            result = undefined;
            numberA.push(e.target.value);
        }
        setDisplayValue();
    }
}

function undo() {
    if (operator) {
        numberB.pop();
        setDisplayValue();
    } else {
        numberA.pop();
        setDisplayValue();
    }
}

function setOperator(e) {
    if (numberB.length >= 1) {
        return;
    }
    operator = e.target.value;
    setDisplayValue();
}

function setDisplayValue() {
    if (typeof result === "number") {
        displayValue = `${result} ${operator} ${numberB.join("")}`;
        display.textContent = displayValue;
        return;
    }
    displayValue = `${numberA.join("")} ${operator} ${numberB.join("")}`;
    display.textContent = displayValue;
}

function createOperation() {
    if (typeof result === "number") {
        result = operate(result, +numberB.join(""), operator);
        display.textContent = result;
        emptyData();
        return;
    }
    result = operate(+numberA.join(""), +numberB.join(""), operator);
    display.textContent = result;
    emptyData();
}

function clear() {
    result = undefined;
    emptyData();
    setDisplayValue();
}

function emptyData() {
    numberA.splice(0, numberA.length);
    numberB.splice(0, numberB.length);
    operator = "";
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
    if (b === 0) return "nope";
    return a / b;
}

function operate(a, b, o) {
    if (o === "+") return add(a, b);
    if (o === "-") return subtract(a, b);
    if (o === "*") return multiply(a, b);
    if (o === "/") return divide(a, b);
}