const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const cardNumberOutput = document.querySelector('.card-number-output');
const nameOutput = document.querySelector('.name-output');
const monthOutput = document.querySelector('.month-output');
const yearOutput = document.querySelector('.year-output');
const cvcOutput = document.querySelector('.cvc-output');

const displayError = (input, msg) => {
  const inputFieldDiv = input.parentElement;
  const errorMsgElement = inputFieldDiv.querySelector('.error-msg');
  inputFieldDiv.classList.add('error');
  input.classList.add('error');
  errorMsgElement.innerText = msg;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    if (input.value === '') {
      displayError(input, "Can't be blank");
      return;
    }

    if (
      (input.id === 'card-number' || input.id === 'month' || input.id === 'year' || input.id === 'cvc') &&
      !input.value.match(/^\d+$/)
    ) {
      displayError(input, 'Wrong format, number only');
      return;
    }

    if (
      input.id === 'year' &&
      (input.previousElementSibling.value === '' || !input.previousElementSibling.value.match(/^\d+$/))
    ) {
      return;
    }

    if (input.id === 'card-number' && input.value.length !== 16) {
      displayError(input, 'Wrong format, card number should be 16 digits');
      return;
    }
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
  });
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.id === 'card-number') {
      if (input.value.length === 0) {
        cardNumberOutput.innerText = '';
        return;
      }
      const cardNumber = input.value.match(/.{1,4}/g).join(' ');
      cardNumberOutput.innerText = cardNumber;
    }

    if (input.id === 'name') nameOutput.innerText = input.value;
    if (input.id === 'month') monthOutput.innerText = input.value;
    if (input.id === 'year') yearOutput.innerText = input.value;
    if (input.id === 'cvc') cvcOutput.innerText = input.value;
  });
});
