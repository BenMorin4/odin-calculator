const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const back = document.querySelector(".delete");
const equal = document.querySelector(".equal");
const operators = document.querySelectorAll(".operator");
let previouslySelectedOperator = null;
let previousNumber = null;
let selectedOperator = null;
let shownAnswer = null;

// When using the operator to execute another operator, we must know both operators, store the past operator.

numbers.forEach(function(number) {
    number.addEventListener("click", function() {
        let currentNumber = display.innerHTML;

        // currently looking at an answer
        if (shownAnswer != null) {
            // want to perform an operation on answer
            if (selectedOperator != null) {
                previousNumber = shownAnswer;
                previouslySelectedOperator = selectedOperator;
                shownAnswer = null;
                selectedOperator = null;
                unselectOperatorVisual();

                display.innerHTML = this.innerHTML;
                return;
            // want to perform new operation
            } else {
                display.innerHTML = this.innerHTML;
                previouslySelectedOperator = null;
                previousNumber = null;
                selectedOperator = null;
                shownAnswer = null;
                return;
            }
        // currently viewing user input nuvber
        } else {
            if (selectedOperator != null) {
                // if it is the first number, just store it
                if (previousNumber == null) {
                    previousNumber = currentNumber;
                    previouslySelectedOperator = selectedOperator;
                    currentNumber = null;
                    shownAnswer = null;
                    unselectOperatorVisual();

                    display.innerHTML = this.innerHTML;
                    return;
                }
            }
        }

        // cannot have 2 decimal points
        if (this.innerHTML == ".") {
            if (display.innerHTML.includes(".")) {
                return;
            }
        }

        // prevents double 0s 
        if (currentNumber == "0") {
            display.innerHTML = this.innerHTML;
        } 
        else {
            display.innerHTML += this.innerHTML;
        }

    })
});

clear.addEventListener("click", function() {
    display.innerHTML = '0';
    selectedOperator = null;
    previouslySelectedOperator = null;
    previousNumber = null;
    unselectOperatorVisual();
    shownAnswer = null;
});

back.addEventListener("click", function() {
// maybe backspace operator first

    if (display.innerHTML != "0") {
        let currentNumber = display.innerHTML;
        let newNumber = currentNumber.slice(0, -1);
        display.innerHTML = newNumber; 
    }

    if (display.innerHTML == "") {
        display.innerHTML = "0";
    }
});

operators.forEach(function(operator) {
    operator.addEventListener("click", function() {

        // if we must perform prior calculation first
        if (previousNumber != null && previouslySelectedOperator != null) {
            console.log('yes');
            operate(parseInt(previousNumber), previouslySelectedOperator, parseInt(display.innerHTML)); 
            previousNumber = null;
            previouslySelectedOperator = null;
        }

        selectOperator(this);

    });    
});

equal.addEventListener("click", function() {
    // if no stored number, do nothing 
    if (previousNumber == null || previouslySelectedOperator == null) {
        return;
    }

    operate(parseInt(previousNumber), previouslySelectedOperator, parseInt(display.innerHTML)); 
    previousNumber = null;
    selectedOperator = null;
    previouslySelectedOperator = null;
    unselectOperatorVisual();
    
});

function selectOperator(self) {
    // logic to control selection and unselection of operators
    if (selectedOperator == self.innerHTML) {
        selectedOperator = null;
        unselectOperatorVisual();
    } else {
        selectedOperator = self.innerHTML;
        self.classList.add("clicked");
    }

    console.log(self.classList);
}

// this is just a visual unselect
// not necessary to unselect all, becuause only one should be selected, just a safety measure
function unselectOperatorVisual() {
    let toggledOperator = document.querySelector(".clicked")
    if (toggledOperator) {
        toggledOperator.classList.remove("clicked");
    }  
}


function add(x, y) {
    ans = (parseInt(x) + parseInt(y));
    console.log(x, y, ans);
    return ans;
}

function subtract(x, y) {
    ans = (parseInt(x) - parseInt(y));
    console.log(x, y, ans);
    return ans;
}

function multiply(x , y) {
    ans = (parseInt(x) * parseInt(y));
    console.log(x, y, ans);
    return ans;
}

function divide(x, y) {
    ans = (parseInt(x) / parseInt(y));
    console.log(x, y, ans);
    return ans;
}

function operate(x, operator, y) {
    let answer;

    switch(operator.toString()) {
        case '+':
            answer = add(x, y);
            break;
        case '-':
            answer = subtract(x, y);
            break;
        case '*':
            answer = multiply(x, y);
            break;
        case '/':
            answer = divide(x, y);
            break;
    }

    console.log(x, y, operator, answer);

    display.innerHTML = answer;
    shownAnswer = answer;

}