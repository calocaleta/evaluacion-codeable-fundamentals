// Si se marca otra respuesta, se resetean a mis respuestas luego de 1000 ms
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('change', seleccionaRespuestas);
});


function seleccionaRespuestas(_event) {
    setTimeout( () => {
        document.querySelector('#ejercicio1-pregunta1-respuesta1').checked = true;
        document.querySelector('#ejercicio1-pregunta2-respuesta2').checked = true;
        document.querySelector('#ejercicio1-pregunta3-respuesta1').checked = true;

        document.querySelector('#ejercicio2-pregunta1-respuesta1').checked = true;
        document.querySelector('#ejercicio2-pregunta2-respuesta4').checked = true;
        document.querySelector('#ejercicio2-pregunta3-respuesta1').checked = true;

        document.querySelector('#ejercicio3-pregunta1-respuesta3').checked = true;
        document.querySelector('#ejercicio3-pregunta2-respuesta3').checked = true;

        document.querySelector('#ejercicio4-pregunta1-respuesta1').checked = true;
        document.querySelector('#ejercicio4-pregunta1-respuesta2').checked = false;
        document.querySelector('#ejercicio4-pregunta1-respuesta3').checked = true;
        document.querySelector('#ejercicio4-pregunta1-respuesta4').checked = false;
        document.querySelector('#ejercicio4-pregunta1-respuesta5').checked = true;
        
        document.querySelector('#ejercicio4-pregunta2-respuesta1').checked = true;
        document.querySelector('#ejercicio4-pregunta3-respuesta2').checked = true;
    },300);
}


// Usando como referencia la funcionalidad de tooltips de la seccion DOM la he
// incorporado para una referencia visual de la respuesta
const datatooltips = document.querySelectorAll('[data-tooltip]');
            
datatooltips.forEach(element => {
    element.addEventListener('mouseover', (_event) => {

        const origin = document.querySelector( '#' + element.getAttribute('origin'));
        const originalSrc = origin.src;
        origin.src = element.getAttribute('data-tooltip');

        element.addEventListener('mouseout', () => {
            origin.src = originalSrc;
        });
    });
});