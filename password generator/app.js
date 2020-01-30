const form = document.getElementById('form');
const inputRange = document.getElementById('inputRange');
const inputRangeNumbers = document.getElementById('inputRangeNumbers');
const checkboxUppercaseElement = document.getElementById('checkbox-uppercase');
const checkboxNumbersElement = document.getElementById('checkbox-numbers');
const checkboxSymbolsElement = document.getElementById('checkbox-symbols');
const passwordField = document.getElementById('password-field');

const LOWERCASE_CHAR_ASCII_CODE = generateAsciiRange(97, 122);
const UPPERCASE_CHAR_ASCII_CODE = generateAsciiRange(65, 90);
const NUMBERS_CHAR_ASCII_CODE = generateAsciiRange(48, 57);
// parsing all ranges of symbols to get every possible symbol
const SYMBOLS_CHAR_ASCII_CODE = generateAsciiRange(33, 47).concat(
    generateAsciiRange(58, 64).concat(
        generateAsciiRange(91, 96).concat(
            generateAsciiRange(123, 126)
        )
    )
);



inputRange.addEventListener('input', syncCharacterAmount);
inputRangeNumbers.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', e => {
    e.preventDefault();
    const isCheckedUppercase = checkboxUppercaseElement.checked;
    const isCheckedNumbers = checkboxNumbersElement.checked;
    const isCheckedSymbols = checkboxSymbolsElement.checked;
    const passwordLength = inputRangeNumbers.value;
    const password = generatePassword(passwordLength, isCheckedUppercase, 
        isCheckedNumbers, isCheckedSymbols);
    passwordField.textContent = password;    
}); 

function generatePassword(charAmount, isUppercase, isNumbers, isSymbols) {
    let tempPassword = LOWERCASE_CHAR_ASCII_CODE;
    if (isUppercase) tempPassword = tempPassword.concat(UPPERCASE_CHAR_ASCII_CODE);
    if (isNumbers) tempPassword = tempPassword.concat(NUMBERS_CHAR_ASCII_CODE);
    if (isSymbols) tempPassword = tempPassword.concat(SYMBOLS_CHAR_ASCII_CODE);

    let password = [];
    for (let i = 0; i < charAmount; i++) {
        const charCode = tempPassword[Math.floor(Math.random() * tempPassword.length)];
        password.push(String.fromCharCode(charCode));
    }
    return password.join("");
}

function generateAsciiRange(low, high) {
    let array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

function syncCharacterAmount(e) {
    const input = e.target.value;
    inputRange.value = input;
    inputRangeNumbers.value = input;
}