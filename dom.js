// dom.html - Ejercicio 1 : Crea un 'Tooltip'

const datatooltips = document.querySelectorAll('[data-tooltip]');
            
datatooltips.forEach(element => {
    element.addEventListener('mouseover', (_event) => {

        let tooltip = document.createElement('div');
        tooltip.className = 'panel-script__tooltip';
        tooltip.innerText = element.getAttribute('data-tooltip');
        tooltip.style.top = (element.offsetTop - element.offsetHeight) + 'px';

        // Le pongo un timeout para que espere 300 ms antes de mostrar el tooltip
        const timeoutID = setTimeout(() => {
            element.before(tooltip);
        },300);

        element.addEventListener('mouseout', () => {
            // Si sale del elemento objetivo, cancela el timeout y ya no muestra el tooltip
            clearTimeout(timeoutID);
            tooltip.remove();
        });
    });
});


// dom.html - Ejercicio 2 : Crea un Formulario con Validación en tiempo real

// Utilizo este objeto para llevar control de que se cumplan todas las validaciones
const formulario = {
    nombre: false,
    apodo: false,
    biografia: true,
    password: false,
    validar() {
        document.querySelector('#submit').disabled = !(this.nombre && this.apodo && this.biografia && this.password);
    }
};

// Agrego expresiones regulares dependiendo de que se requiera
const regExpNombre      = (value) => /^[A-Za-z\s]{3,}$/.test(value);
const regExpApodo       = (value) => /^[A-Za-z0-9]{3,10}$/.test(value);
const regExpBiografia   = (value) => /^(.{100,})?$/.test(value);
const regExpPassword    = (value) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\@\$\.]{8,}$/.test(value);

const nombre = document.querySelector('#nombre');
const apodo = document.querySelector('#apodo');
const biografia = document.querySelector('#biografia');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit');
const result = document.querySelector('#result');
const showresponse = document.querySelector('#showresponse');

formulario.validar();

// Recupero datos guardados del localStorage
nombre.value = localStorage.getItem('nombre') || '';
apodo.value = localStorage.getItem('apodo') || '';
biografia.value = localStorage.getItem('biografia') || '';

// Si alguno tiene un valor, realiza la validación para no tener que obligar al usuario a pasar por ese control para validar
if(nombre.value !== '')     formulario.nombre = regExpNombre(nombre.value);
if(apodo.value !== '')      formulario.apodo = regExpApodo(apodo.value);
if(biografia.value !== '')  formulario.biografia = regExpBiografia(biografia.value);

// Recibo el evento y la validación, si es positivo habilita el elemento siguiente del input que es el help-text
const habilitaHelpText = (event, condicionValida) => {
    event.target.nextElementSibling.style.display = condicionValida ? 'none' : 'block';
    formulario.validar();
}

// Incorporo resultado de expresiones regulares a help-text, objeto de formulario y localStorage
const validaNombre = (event) => {
    formulario.nombre = regExpNombre( event.target.value );
    if (formulario.nombre) { localStorage.setItem('nombre', event.target.value); }
    habilitaHelpText(event , formulario.nombre);
}
const validaApodo = (event) => {
    formulario.apodo = regExpApodo( event.target.value );
    if (formulario.apodo) { localStorage.setItem('apodo', event.target.value); }
    habilitaHelpText(event , formulario.apodo);
}
const validaBiografia = (event) => {
    formulario.biografia = regExpBiografia( event.target.value );
    if (formulario.biografia) { localStorage.setItem('biografia', event.target.value); }
    habilitaHelpText(event , formulario.biografia);
}
const validaPassword = (event) => {
    formulario.password = regExpPassword( event.target.value );
    habilitaHelpText(event , formulario.password);
}

// Agrego el evento blur en caso le de click al elemento obligatorio y luego salga sin llenar nada
nombre.addEventListener("input", (event) => validaNombre(event) );
nombre.addEventListener("blur", (event) => validaNombre(event) );
apodo.addEventListener("input", (event) => validaApodo(event) );
apodo.addEventListener("blur", (event) => validaApodo(event) );
biografia.addEventListener("input", (event) => validaBiografia(event) );
password.addEventListener("input", (event) => validaPassword(event) );
password.addEventListener("blur", (event) => validaPassword(event) );

// Realizo el envio de la información usando fetch y formData
const form = document.forms.register;
 
form.onsubmit = function (event) {
  event.preventDefault();
  const formData = new FormData(form);

  const url = "https://mocktarget.apigee.net/echo";

  const options = {
    method: "POST",
    body: formData
  };
 
  fetch(url, options)
    .then((response) => response.json())
    .then((value) => {  
        result.innerText = JSON.stringify(value, null, '  ');
        showresponse.style.display = 'block';
        localStorage.clear();
    })
    .catch(console.error);
};