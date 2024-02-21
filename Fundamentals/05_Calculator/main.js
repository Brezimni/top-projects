let valueOne = [];
let valueTwo = [];
let activeOperator = '';
let activeFloat = false;
let cleanSlate = false; //This flag signals that the variables need to be reset.

const handleClick = function(valueOfKey, moreInfo) {
    
    const numberStorage = document.getElementById('workspace');
    const resultStorage = document.getElementById('result');

    const actions = {
        'addCharacter': (element) => {
            numberStorage.innerText += element;
            },
        'addOperator': (newOperator) => {
            if(valueOne.length === 0 || cleanSlate) {return;} //Prevents operator from being added before the numbers;
            if(activeOperator === numberStorage.innerText.split('')[numberStorage.innerText.length-1]) {
                numberStorage.innerText = numberStorage.innerText.replace(valueOne.join('')+activeOperator, valueOne.join('')+newOperator)
            } else {
                /*Enable chaining of operators*/
                if(valueTwo.length !== 0) {
                    actions.operate(false);
                    valueOne = resultStorage.innerText.split('');
                    numberStorage.innerText = resultStorage.innerText;
                    valueTwo = []
                    resultStorage.innerText= '';
                }
                actions.addCharacter(newOperator);
            }
            activeOperator = newOperator;
            activeFloat = false;
        },
        'plusMinus': () => {
            if(activeOperator) {
                if(activeOperator === '+') {
                    activeOperator = '-';
                    numberStorage.innerText = numberStorage.innerText.replace('+', '-');
                } else if(activeOperator === '-') {
                    activeOperator = '+';
                    numberStorage.innerText = numberStorage.innerText.replace(`${valueOne.join('')}-`, `${valueOne.join('')}+`);
                } else {
                    if(valueTwo[0] === '-') {
                        valueTwo.shift();
                        numberStorage.innerText = numberStorage.innerText.replace((valueOne.join('')+activeOperator+'-'), valueOne.join('')+activeOperator);
                    } else {
                        if(valueTwo.length === 0) {valueTwo = ['-']; numberStorage.innerText = numberStorage.innerText + '-'; return null;}
                        numberStorage.innerText = numberStorage.innerText.replace(valueTwo.join(''), ('-'+valueTwo.join('')));
                        valueTwo.unshift('-');
                    }
                }
            } else {
                if(valueOne[0] === '-') {
                    valueOne.shift();
                    numberStorage.innerText = valueOne.join('');
                } else {
                    valueOne.unshift('-');
                    numberStorage.innerText = valueOne.join('');
                }
            }
        },
        'operate': (clear = true) => {
            if(valueOne.length === 0 || valueTwo.length === 0) {return;} //Terminate function if we don't have both necessary values.
            const [numValue1, numValue2] = [parseFloat(valueOne.join('')), parseFloat(valueTwo.join(''))]; 
            activeOperator === '+' ? //Calculate addition
                resultStorage.innerText = numValue1+numValue2 :
            activeOperator === '-' ? //Calculate substraction
            resultStorage.innerText = numValue1-numValue2 :
            activeOperator === '÷' ? //Calculate division
                resultStorage.innerText = Math.round((numValue1/numValue2).toFixed(5)*100000)/100000 :
                resultStorage.innerText = numValue1*numValue2; //Calculate multiplication
            cleanSlate = clear;
        },
        'delete': () => {
            if(cleanSlate) {return;}
            if(activeOperator === numberStorage.innerText.split('')[numberStorage.innerText.length - 1]) {
                activeOperator = ''; //Check if the operator was the last typed value and reset the flag.
            } else if(activeOperator) {
                valueTwo.pop();
            } else {valueOne.pop();}
            numberStorage.innerText = numberStorage.innerText.substring(0, numberStorage.innerText.length - 1);
        },
        'clear': () => {
            [numberStorage.innerText, resultStorage.innerText, activeOperator] = ['', '', ''];
            [valueOne, valueTwo] = [[], []];
            [activeFloat, cleanSlate] = [false, false];
        },
    }    
    /*Check if it's a number or a float point*/
    if(!isNaN(valueOfKey) || valueOfKey === '.'){
        if(valueOfKey === '.') {
            if(activeFloat) {return;
            } else if(!activeOperator && valueOne.length === 0) {valueOfKey = '0.'; activeFloat = true;
            } else if(activeOperator && valueTwo.length === 0) {valueOfKey = '0.'; activeFloat = true;
            } else {activeFloat = true;}
        }
        if(cleanSlate) {actions.clear()};
        activeOperator ? valueTwo.push(valueOfKey) : valueOne.push(valueOfKey);
        actions.addCharacter(valueOfKey);
    } else {actions[valueOfKey](moreInfo)}
}
/*End of calculator logic*/

/* Add pressed key effect */
const addKeyEffects = () => {
    const allKeys = document.querySelectorAll('.keys');
    const keyAddClass = (theKey) => {
        theKey.classList.add('pressed-key');
    }
    const keyRemoveClass = (theKey) => {
        theKey.classList.remove('pressed-key');
    }
    for(let key of allKeys) {
        key.addEventListener('mousedown', (e) => keyAddClass(e.target));
        key.addEventListener('mouseup', (e) => keyRemoveClass(e.target));
        key.addEventListener('mouseout', (e) => keyRemoveClass(e.target))
    }
}
addKeyEffects();