(() =>{
    'use strict'

    /**
 * 2C =Treboles 
 * 2D = Diamantes
 * 2H = Corazon
 * 2S = Espadas
 */

let baraja = [];
const cartasNormales = ['C','D','H','S'];
const cartasEspeciales = ['A','J','Q','K'];
let puntosJugador = 0;
let puntosCPU = 0;

//Referencias HTML

const btnNuevo         = document.querySelector('#btnNuevo');
const btnPedir         = document.querySelector('#btnPedir');
const btnPlantarse     = document.querySelector('#btnPlantarse');
let smalls             = document.querySelectorAll('small');
const imgCartasJugador = document.querySelector('#cartasJugador');
const imgCartasCPU     = document.querySelector('#cartasComputadora');
//Inicia Baraja

const iniciarJuego = () => {
    //Inicia a hacer el conteo de cartas
    for(let i = 2; i <= 10; i++ ) {
        for(let cartaNormal of cartasNormales){
            baraja.push(i + cartaNormal);
        }
    }

    for(let cartaNormal of cartasNormales){
        for(let cartaEspecial of cartasEspeciales){
            baraja.push(cartaEspecial + cartaNormal);
        }
    }
    //Barajea
    baraja = _.shuffle(baraja);
    //Nos devuelve la baraja ya hecha
    return baraja;

}

//Pide Carta

const pedirCarta = () => {

     const carta = baraja.pop();
    return carta;
};

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1); //TENGO QUE ARREGLAR ESTO
    const valorAs = () => {

        return ((puntosJugador+valorCarta(valor)) >= 11) ? 1 : 11;
    }

        return (isNaN( valor)) ?
         ( valor === 'A') ?
           valorAs(): 10 :
            valor * 1;
}

//Turno de la computadora
//Saca dos cartas, una se debe revelar y la otra no
//Despues de que jugador termine de sacar cartas
//Computadora debe intentar alcanzar al jugador hasta un maximo de 18
// Si computadora hace BlackJack entonces gana y jugador no saca cartas

const pedirCartaComputadora = (mostrar = true) =>{
   
    let carta = pedirCarta();
    puntosCPU = puntosCPU + valorCarta( carta );
    smalls[1].innerText = puntosCPU; 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    imgCartasCPU.append(imgCarta);

    return (puntosCPU === 21) ? 
    (console.warn("21 de la computadora"), 
    btnPedir.disabled = true, 
    btnPlantarse.disabled = true) 
    : true;
}

const plantarse = () => {

    if(puntosCPU < 18){
        do{
            pedirCartaComputadora();
            return plantarse();
        }while(puntosCPU < 18);
    }else{
        if(puntosCPU === puntosJugador){
            console.warn('Empate');
        }else if(puntosCPU > 21){
            console.warn('Ganaste');
        }else if(puntosCPU > puntosJugador && puntosCPU <= 21 ){
            console.warn('Perdiste');
        }else{
            console.warn('Ganaste');
        }
    };
};

//Eventos
const nuevo = btnNuevo.addEventListener('click', () =>{
     console.clear();
     imgCartasCPU.innerHTML = '';
     imgCartasJugador.innerHTML = '';  
     baraja = ['']; 
     puntosJugador = 0;
     puntosCPU = 0;
     smalls[0].innerText = 0;
     smalls[1].innerText = 0;
     btnPedir.disabled = false;
     btnPlantarse.disabled = false;
     iniciarJuego();
     pedirCartaComputadora(false);
     pedirCartaComputadora();

});
const pedir = btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta);
    smalls[0].innerText = puntosJugador; 

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    imgCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Perdiste :C');
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
    }else if(puntosJugador >= 21){
        console.warn('21 :D');
        plantarse();
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
    }

});

const cuenta = btnPlantarse.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnPlantarse.disabled = true;
    plantarse();
});






})();