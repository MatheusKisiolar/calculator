const display = document.querySelector("#display");
const numberA = ["0"];
const numberB = [];
let result;
let operator = "";
let displayValue;
setDisplayValue();

document.querySelectorAll(".digit").forEach(x => x.addEventListener("click", type));
document.querySelectorAll(".operator").forEach(x => x.addEventListener("click", setOperator));
document.querySelector("#equal").addEventListener("click", doOperation);
document.querySelector("#undo").addEventListener("click", undo);
document.querySelector("#clear").addEventListener("click", clear);

document.addEventListener("keydown", (e) => {
    document.querySelectorAll(".digit, .operator").forEach(button => {
        if (e.key === button.value) {
            button.click();
        } else if (e.key === "/" && button.value === "÷") {
            button.click();
        } else if (e.key === "*" && button.value === "×") {
            button.click();
        }
    });
    document.querySelectorAll("#clear, #undo, #equal").forEach(button => {
        if (e.key === "Escape") {
            if (button.id === "clear") {
                button.click();
            }
        }
        if (e.key === "Backspace") {
            if (button.id === "undo") {
                button.click();
            }
        }
        if (e.key === "Enter") {
            if (button.id === "equal") {
                button.click();
            }
        }
    });
});


function type(e) {
    if (numberA[0] === "0" && numberA.length === 1 && !(e.target.value === "0") && !(e.target.value === ".") && operator === ""){
        numberA.pop();   
    }
    if (numberA[0] === "0" && e.target.value === "0" && numberA.length === 1 || numberB[0] === "0" && e.target.value === "0" && numberB.length === 1) return;
    if (e.target.value === "." && numberA.join("").includes(".") && operator === "" || e.target.value === "." && numberB.join("").includes(".")) {
        return;
    }
    if (operator) {
        if (numberB.length === 0 && e.target.value === ".") {
            numberB.push("0")
        }
        if (numberB.length === 22) return;
        numberB.push(e.target.value);
        setDisplayValue();
    } else {
        if (numberA.length === 22) return;
        result = undefined;
        numberA.push(e.target.value);
        setDisplayValue();
    }
}

function undo() {
    if (operator) {
        numberB.pop();
        setDisplayValue();
    } else {
        if (numberA[0] === "0" && numberA.length === 1) {
            return;
        }
        numberA.pop();
        setDisplayValue();
    }
}

function setOperator(e) {
    if (!numberA.length && !result) {
        return;
    }
    if (numberB.length >= 1) {
        doOperation();
        operator = e.target.value;
        setDisplayValue();
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

function doOperation() {
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
    numberA.push("0");
    setDisplayValue();
}

function emptyData() {
    numberA.splice(0, numberA.length);
    numberB.splice(0, numberB.length);
    operator = "";
}

function add(a, b) {
    return +(a + b).toFixed(6);
}

function subtract(a, b) {
    return +(a - b).toFixed(6);
}

function multiply(a, b) {
    return +(a * b).toFixed(6);
}

function divide(a, b) {
    if (b === 0) return "nope";
    return +(a / b).toFixed(6);
}

function operate(a, b, o) {
    if (o === "+") return add(a, b);
    if (o === "-") return subtract(a, b);
    if (o === "×") return multiply(a, b);
    if (o === "÷") return divide(a, b);
}