// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let percentageApplied = false;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                percentageApplied = false;
                display.innerText = '0';
            } else if (value === '±') {
                currentInput = (currentInput.startsWith('-')) ? currentInput.substring(1) : '-' + currentInput;
                display.innerText = currentInput || '0';
            } else if (value === '%') {
                if (previousInput && operator) {
                    currentInput = (parseFloat(previousInput) * (parseFloat(currentInput) / 100)).toString();
                    percentageApplied = true;
                    display.innerText = currentInput;
                } else {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.innerText = currentInput;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '' && operator === '') return;
                if (previousInput !== '') {
                    currentInput = operate(previousInput, currentInput, operator).toString();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                percentageApplied = false;
                display.innerText = previousInput + ' ' + operator;
            } else if (value === '=') {
                if (previousInput === '' || currentInput === '' || operator === '') return;
                if (percentageApplied) {
                    currentInput = (parseFloat(previousInput) * (parseFloat(currentInput) / 100)).toString();
                } else {
                    currentInput = operate(previousInput, currentInput, operator).toString();
                }
                operator = '';
                previousInput = '';
                percentageApplied = false;
                display.innerText = currentInput;
            } else {
                currentInput += value;
                display.innerText = previousInput + ' ' + operator + ' ' + currentInput;
            }
        });
    });

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});
