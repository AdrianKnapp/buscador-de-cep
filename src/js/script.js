const form = document.getElementById('address-search');
const cepInput = form.querySelector('input[type="text"]');
const addressInfoBox = document.querySelector('.address-info-box');
const alert = document.querySelector('.alert');
const alertClose = document.querySelector('.alert-close');
const loader = document.querySelector('.lds-dual-ring');
const addressDataLine = document.querySelectorAll('[data-address]');
const label = form.querySelector('label');

form.addEventListener('submit', formAction);

function formAction(event) {
  event.preventDefault();
  const cepInputValue = cepInput.value.replace('-', '');
  if (cepInputValue.length === 8 && cepInput.dataset.cep !== cepInputValue) {
    cepInput.dataset.cep = cepInputValue;
    loader.classList.add('ativo');
    getAddress(cepInputValue);
  } else {
    cepInput.style.borderColor = '#ec0007';
  }
}

async function getAddress(cep) {
  try {
    const cepFetch = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const cepJson = await cepFetch.json();

    if (!cepJson.erro) {
      addressInfoBox.classList.add('ativo');
      alert.classList.remove('ativo');

      addressDataLine.forEach(element => {
        element.innerText = cepJson[element.dataset.address];
      });

    } else {
      addressInfoBox.classList.remove('ativo');
      alert.classList.add('ativo');
    }
  } catch (err) {
    console.log(err);
  } finally {
    loader.classList.remove('ativo');
  }
}

cepInput.addEventListener('keyup', inputValidationOnKeyUp);

function inputValidationOnKeyUp(event) {
  this.value = VMasker.toPattern(this.value, "99999-999");
  if (this.value.length >= 1) {
    label.classList.add('ativo');
    cepInput.style.borderColor = '#757575';
  } else {
    label.classList.remove('ativo');
  }
}

alertClose.addEventListener('click', () => {
  alert.classList.remove('ativo');
});