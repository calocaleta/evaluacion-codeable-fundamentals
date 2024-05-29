function interactuarCadenas(cadena1, cadena2) {
    return [...cadena1].reduce((acc, simbolo, i) => {
        return acc + ( simbolo === cadena2[i] ? simbolo : '0' );
    } , '' );
}

function generarApodo(nombre) {
    if(nombre.length < 4)   throw new Error('Nombre muy corto');

    const vocales = ['a', 'e', 'i', 'o', 'u'];

    return vocales.indexOf(nombre[2]) !== -1 
            ? nombre.substring(0,4)
            : nombre.substring(0,3);
}

function obtenerMarcador(texto) {
    const equivalencia = ['cero', 'uno', 'dos', 'tres', 'cuatro',
                        'cinco', 'seis', 'siete', 'ocho', 'nueve']
    let marcador = [];

    for(let palabra of texto.split(' ')){
        let numero = equivalencia.indexOf(palabra);
        if (numero !== -1) {
            marcador.push(numero);
        }
    }
    return marcador.length === 2 ? marcador : [0,0] ;
}

class Barco {
    constructor(calado, tripulacion){
        this.calado = calado;
        this.tripulacion = tripulacion;
    }
    valeLaPena(){
        return (this.calado - this.tripulacion * 1.5) > 20;
    }
}