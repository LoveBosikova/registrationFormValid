const form = document.forms.regform;


function checkValidity(input) {
    let validity = input.validity;
    const errors = [];
    let correctForm = true;

    if (validity.patternMismatch) {
        errors.push('Неверный формат заполнения'); 
        }
    
	if (validity.rangeOverflow) {
        let max = input.max;
		errors.push('Максимальное значение не может быть больше, чем ' + max); 
        }
    
	if (validity.rangeUnderflow) {
        let min = input.min;
		errors.push('Минимальное значение не может быть больше, чем ' + min); 
        }

    if (validity.stepMismatch) {
        let step = input.step;
        errors.push('Не соответствует указаному шагу ' + step); 
        }

    if (validity.tooLong) {
        errors.push('Слишком длинное значение'); 
    }

    if (validity.tooShort) {
        errors.push('Слишком короткое значение'); 
    }

    if (validity.typeMismatch) {
        let type = input.type;
        errors.push('Не тот форматЖ нужно заполнить в' + type); 
    }

    if (validity.valueMissing) {
        errors.push('Необходимо выбрать значение'); 
    }
    const parent = input.parentNode;
    const errorDiv = parent.querySelector('.error-message');

    if (errors.length !== 0) {
        parent.classList.add('.error');
        errorDiv.innerText ='';
        for (const error of errors) {
            errorDiv.innerHTML += `${error}<br>`;
            correctForm = false;
        }
    } else if (errors.length === 0) {
        errorDiv.innerText ='';
        
    }
    return correctForm;
}

function isCorrectForm(form) {
    const inputsSet = form.querySelectorAll('input');
    const validityInputs = [];
    for (const input of inputsSet) {
        const validityInput = checkValidity(input);
        validityInputs.push(validityInput);
    }
    console.log(validityInputs);
    if(!validityInputs.includes(false)){
        return true;
    } else {
        return false;
    }
}

function isCorrectPassword (firstPassword, secondPassword) {
    if(firstPassword === secondPassword) {
        return true;
    } else if (firstPassword !== secondPassword){
        const pasError = document.getElementById('passwordErrorMessage');
        pasError.innerText = '';
        pasError.innerText = 'Пароли не совпали, попробуйте ещё раз';
        return false;
    } 
    
}

function isCorrectSelect(select){
    const selectError = document.getElementById('selectError');
    selectError.innerText = '';
    if (select.value === ''){
        selectError.innerText = 'Выберите профессию';
        return false;
    } 
    else if (select.value !== ''){
        return true;
    }
}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const firstPassword = document.getElementById('firstPassword').value;
    const secondPassword = document.getElementById('secondPassword').value;

    const select = form.elements.profession;

    isCorrectPassword(firstPassword, secondPassword);
    (isCorrectSelect(select));

    if(((isCorrectForm(form)) === true) && (isCorrectPassword(firstPassword, secondPassword)) && (isCorrectSelect(select))) {
        form.reset();
    }
  });