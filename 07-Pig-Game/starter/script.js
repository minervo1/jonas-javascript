'use strict';
//para seleccionar especificamente los elementos ID existe el 'getElementById', para el cual no es necesario identificar el elemento como tal (con el #)
const playerCero = document.querySelector('.player--0');
const playerUno = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const fotoDados = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDace = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scorePlayer1 = document.getElementById('current--0');
const scorePlayer2 = document.getElementById('current--1');

//*condiones iniciales

//*lo que haremos sera poner todas las condiciones iniciales en una funcion para luego utilizarla aca en esta parte del codigo para que desde un principio esas sean las condiciones y luego la llamaremos nuevamente al final cuando se haga click en el boton de nuevo juego

let puntajes;
let puntageActual;
let activePlayer;
let juego;

const init = function () {
  puntajes = [0, 0];
  puntageActual = 0;
  activePlayer = 0;
  juego = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;

  fotoDados.classList.add('hidden');
  playerCero.classList.remove('player--winner'); //no sabemos quien ganara el nuego por lo que eliminamos la clase en ambos
  playerUno.classList.remove('player--winner');
  //establecimos que el jugador activo nuevamente sea el jugador 1, por lo que eliminamos esta clase del jugador 2
  playerCero.classList.add('player--active'); //agregamos la clase active player al jugador activo(1)
  playerUno.classList.remove('player--active');
};
init();
//! este codigo fue copiado y reemplazado dentro de la funcion 'init', pra no romper el principio de No repetir codigo
// //tener en cuenta que estos numeros, javascript los convertira a string una vez se despliegue la pagina
// score0El.textContent = 0;
// score1El.textContent = 0;
// fotoDados.classList.add('hidden'); //de forma predeterminada ocultamos el elemento (.dice) con css especificamente la clase 'hidden'

// //es bueno tener en nuestro codigo esta variable y no solo dejarlo en manos del DOM. la declaramos fuera de la funcion porque si no fuera asi se reiniciaria cada vez que se llame a la funcion
// let puntageActual = 0;

// //para saber que jugador esta activo devemos hacer un seguimiento en el momento en que los dados son lanzados ese sera el jugador activo, sera el jugador 1 cuando la variable sea 0 y sera el jugador 2 cuando la variable cambiea a 1 recordemos que los jugadores estan como 0 y 1 en nuestro html. y la razon principal de tenerlos asi es porque almacenaremos los puntages totales en un array, por lo que en la posicion 0 estara el puntage del jugador 1 y en la posicion 1 estara el puntage del jugador 2 , por eso es que almacenamos los jugadores en nuestra variable como 0 y 1
// let puntajes = [0, 0];
// let activePlayer = 0;

// //por ultimo necesitamos que una vez que algun jugador gane el juego debe terminar , para eso crearemos una variable que nos diga si el juego enta en curso o si termino, si el juego termino todo el codigo relacionado con los botones no deviera poder ejecutarce
// let juego = true;

//funcion que contiene el codigo para cambiar de jugador
const swichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //cambiamos de jugador
  activePlayer = activePlayer === 0 ? 1 : 0;
  //tambien debemos establecer el puntage del jugador activo actualmente a cero
  puntageActual = 0;
  //con toggle intercambiamos entre 'remove' y 'add', ya que si esta la clase la elimina y si no esta la agrega
  playerCero.classList.toggle('player--active');
  playerUno.classList.toggle('player--active');
};

//*lanzando los dados
btnRollDace.addEventListener('click', function () {
  if (juego) {
    const dados = Math.trunc(Math.random() * 6 + 1); //creamos este numero aleatorio entre 1 y 6 dentro de la funcion porque queremos un nuevo numero cada vez que se haga click
    fotoDados.classList.remove('hidden'); //mostramos los dados(removiendo la clase hidden)
    //seleccionamos el atributo src del html para manipularlo y mostrar el numero correspondiente de manera dinamica utilisando el nombre correnpondiente a las imagenes de los dados
    fotoDados.src = `dice-${dados}.png`;

    //agregamos el valor del dado al puntage actual, esto solo sucede si el dado NO es 1
    if (dados !== 1) {
      puntageActual = puntageActual + dados; //sumamos el puntage
      //scorePlayer1.textContent = puntageActual; //mostramos el puntage actual solo para el jugador 1
      //mostramos el puntage dinamicamente segun el jugador que este activo
      document.getElementById(`current--${activePlayer}`).textContent =
        puntageActual;
    } else {
      //! este codigo fue copiado y puesto en una funcion, para no romper el principio de No repetir codigo
      /*//antes de cambiar de jugador debemos restablecer la puntuacion del jugador activo a cero
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    //si el jugador activo es 0 se cambia a 1 y si es 1 se cambia a 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    //tambien debemos establecer el puntage del jugador inactivo a cero, para que ambos puntages cean 0 al momento de cambiar
    puntageActual = 0;
    //con toggle intercambiamos entre 'remove' y 'add', ya que si esta la clase la elimina y si no esta la agrega, basicamente le damos o quitamos esta clase que caracterisa a los jugadores activos
    playerCero.classList.toggle('player--active');
    playerUno.classList.toggle('player--active');*/
      //llamamos a la funcion que contiene el codigo para cambiar de jugador que es el mismo que esta comentado
      swichPlayer();
    }
  }
});

//guardando nuestra puntuacion actual en puntage total
btnHold.addEventListener('click', function () {
  if (juego) {
    //el siguiente codigo es como 'puntajes[1] = puntajes[1] + puntageActual', pero de manera dinamica como el jugador 1 y 2  (0 y 1) coinciden con las posiciones del array el puntage se agregara en la posicion correspondiente al jugador activo //*por eso es buena idea poner a estos jugadores como jugador 0 y jugador 1, para que coincidan la posicion del array
    puntajes[activePlayer] += puntageActual; //
    //mostramos el puntage en pantalla del jugador activo, usando la ventaja de que el jugador activo ya sea 0 u 1 conincide con esas posiciones
    document.getElementById(`score--${activePlayer}`).textContent =
      puntajes[activePlayer];

    //cambiamos de jugador.

    //al momento de agregar el puntage base al total necesitaremos cambiar de jugador para eso susamos el mismo codigo que realizamos anteriormente 'para cambiar de jugador', pero como sabemos usar el mismoo codigo en varios lugares no es una buena practica. por lo que crearemos una funcion y la llamaremos en los lugares donde necesitemos cambiar de jugador que en este caso sera cuando cuando NO se gane el juego osea en el else.
    /*document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    puntageActual = 0;
    playerCero.classList.toggle('player--active');
    playerUno.classList.toggle('player--active');*/

    //comprobamos que el jugador que llegue a los 100 puntos gana el juego, eso significa que los botones deben desabilitarrse y deveriamos mostrar una clase que identifique al ganador del juego, ademas de remover la clase que identifica a un jugador activo si no tendriamos estas 2 clases activas.
    if (puntajes[activePlayer] >= 50) {
      //si algun jugador gana el juego la variable juego cambiara a false por lo que el codigo correspondiente a cada boton no se podra ejecutar
      juego = false;
      fotoDados.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swichPlayer();
    }
  }
});
//esto se puede hacer ya que es una funcion la que recibe este 'addEventListener' ademas que recordemos que una funcion es solo un valor mas
btnNewGame.addEventListener('click', init);
