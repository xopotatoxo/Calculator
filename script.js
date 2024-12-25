const addition = function (a, b){
    return a + b;
}

const subtraction = function(a, b){
    return a - b;
}

const multiplication = function(a, b){
    return a * b;
}

const division = function(a, b){
    if(b > 0){
        return a / b;
    }
    return null;
}

const negate = function(value) {
    return -value;
}

let first = null;
let second = null;
let operator = null;
let total = null;
let currentInput = '';

const numButtons = document.querySelectorAll("button:not(.operator):not(.clear):not(.evaluate)");
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.textContent;
        updateAnswerBox();
    });
});

const opButtons = document.querySelectorAll(".operator");
opButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operator === null) {
            first = parseFloat(currentInput);
        } else if (currentInput !== '') {
            second = parseFloat(currentInput);
            total = getTotal();
            first = total;
        }
        currentInput = '';
        operator = button.textContent;
        updateAnswerBox();
    });
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", resetEverything);

const evaluator = document.querySelector(".evaluate");
evaluator.addEventListener("click", () => {
    if (operator !== null && currentInput !== '') {
        second = parseFloat(currentInput);
        total = getTotal();
        const answerBox = document.querySelector('.answerBox');
        answerBox.textContent = total;
        first = total;
        second = null;
        operator = null;
        currentInput = '';
    }
});

const negationButton = document.querySelector(".negation");
negationButton.addEventListener("click", () => {
    if (currentInput !== '') {
        currentInput = negate(parseFloat(currentInput)).toString();
    }
    updateAnswerBox();
});

function operate(a , b, operator){
    let ans;
    switch(operator){
        case '+':
            ans = addition(a, b);
            break;
        case '-':
            ans = subtraction(a, b);
            break;
        case '/':
            ans = division(a, b);
            break;
        case '*':
            ans = multiplication(a, b);
            break;
    }
    return ans;
}

function getTotal(){
    return operate(first, second, operator);
}

function resetEverything(){
    first = null;
    second = null;
    operator = null;
    total = null;
    currentInput = '';
    document.querySelector('.answerBox').textContent = '';
}

function updateAnswerBox() {
    const answerBox = document.querySelector('.answerBox');
    let display = '';
    if (first !== null) {
        display += first;
    }
    if (operator !== null) {
        display += ` ${operator} `;
    }
    if (currentInput !== '') {
        display += currentInput;
    }
    answerBox.textContent = display;
}
