const form = document.forms.regform;

function checkValidity(input) {
    let validity = input.validity;
    const errors = [];

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
    console.log(errorDiv);

    if (errors.length !== 0) {
        parent.classList.add('.error');
        for (const error of errors) {
            errorDiv.innerHTML += `${error}<br>`;
        }
    } else if (errors.length === 0) {
        errorDiv.innerText ='';
    }
}

function checkAll(form) {
    const inputsSet = form.querySelectorAll('input');

    for (const input of inputsSet) {
        checkValidity(input);
    }
}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    checkAll(form);
  });