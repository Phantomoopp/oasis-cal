let result = document.getElementById('result');
let currentInput = '0';

function clearResult() {
    currentInput = '0';
    updateResult();
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number.toString();
    } else {
        currentInput += number;
    }
    updateResult();
}

function appendSymbol(symbol) {
    currentInput += symbol;
    updateResult();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateResult();
}

function updateResult() {
    result.textContent = currentInput;
}

// Dynamically generate buttons
const buttonsContainer = document.getElementById('buttons');

const buttonValues = [
    'C', '/', '*', '←',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.'
];

buttonValues.forEach(value => {
    const button = document.createElement('button');
    button.textContent = value;
    
    if (value === '=' || value === 'C' || value === '←' || value === '/' || value === '*' || value === '-' || value === '+') {
        button.className = 'operator';
    }

    if (value === '=' || value === '0') {
        button.className += ' double';
    }

    button.addEventListener('click', () => {
        if (value === '=') {
            evaluateExpression();
        } else if (value === 'C') {
            clearResult();
        } else if (value === '←') {
            backspace();
        } else {
            appendSymbol(value);
        }
    });

    buttonsContainer.appendChild(button);
});

function evaluateExpression() {
    try {
        currentInput = eval(currentInput).toString();
        updateResult();
    } catch (error) {
        currentInput = 'Error';
        updateResult();
    }
}
