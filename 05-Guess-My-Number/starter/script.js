'use strict';
/*
//esta es una forma de obtener el selector 
console.log(document.querySelector(".message").textContent);

//¿que es el DOM? 
//=> son las siglas de 'Document Object Model', es la representacion estructura de un documento html, es este el que le permite a javascrippt acceder a sus elementos e interactuar con ellos. 
//=> este lo crea el navegador al recargar una pagina, y tiene una estructura de arbol en la cual cada elemento es un objeto
//=> usamos los terminos elemento padre, hijo, hermano etc cuando hablamos de el DOM y su manipulacion
//¿como funciona el DOM con javascript?
//=> recordemos que el DOM No es parte de javascript. mas bien forma parte de algo que se conoce como WEB API(interfaz de aplicasiones web), las API son librerias que los navegadores implementan y que estan escritas en javascript a las que tenemos acceso desde el lenguaje javascropt, estan poseen un standar es por eso que funciona de la misma manera independiente del navegador que utilicemos.
//=> de hecho existen muchas mas API como (timers, fetch).



//realicemos algunas manipulaciones
document.querySelector('.message').textContent = 'Numero Correcto.👍';
document.querySelector('.message').textContent;

document.querySelector('.number').textContent = 12;
document.querySelector('.score').textContent = 10;

//en este caso tanto para  obtener el valor o manipularlo usamos (value) ya que es un elemento tipo input
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);

*/
//*comencemos nuestro proyecto

//primero debemos tener el numero secreto y lo hacemos afuera del todo ya que solo necesitamos un numero para todo el juego, si lo hicieramos dentro de la funcion obtendriamos un numero secreto cada vez que se recargue la pagina.
//*el metodo ramdon nos dara un numero aleatorio de coma flotante entre el 0 y 1
let secretNumber = Math.trunc(Math.random() * 20 + 1);

//creamos una variable para el score de esta manera tendremos el codigo nosotros y no solamente nos limitamos a actualizar el elemento directo del html lo cual seria la segunda forma de hacerlo, pero no es una buena practica.
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  //obtenemos y guardamos el valor del input en una variable, pero recordar que cada vez que obtenemos algo desde afuera este ingresa como string.
  const guess = Number(document.querySelector('.guess').value);

  //siempre debemos de comprobar si es que realmente hay un valor en la entrada. en este caso nuestra aplicasion nos pide encontrar un numero entre 1 y 20, por lo que cualquier valor que se ingrese sera un valor true(que hay un numero), excepto el 0 que dentro de la declaracion if se un valor false. y si no se introduce nada tambien nos dara un cero por lo tanto al introducir la negacion estamos diciendo que //* si el valor introducido es falso en otras palabras se introdujo un cero o no se introdujo nada if(guess == 0) RECORDAR que solo ingresara si la afirmacion es verdadera
  if (!guess) {
    document.querySelector('.message').textContent = ' No Number.⛔';
    //cuando se gana el juego
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Numero Correcto.👍🎉';
    //mostramos el numero secreto solo cuando se gana el juego
    document.querySelector('.number').textContent = secretNumber;

    //cambiamos el color de la pagina cuando se gane el juego
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    //cuando el numero es mayor que el numero secreto
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = 'Muy alto 📈';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'Lost The Game 😞';
      document.querySelector('.score').textContent = 0;
    }
    //cuando el numero es menor al numero secreto
  } else if (guess < secretNumber) {
    //queremos que al llegar la puntuacion a cero el jugador pierda el juego
    if (score > 1) {
      document.querySelector('.message').textContent = 'Muy Bajo 📉';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //cuando se pierda el juego se reestablece la puntuacion a cero
      document.querySelector('.message').textContent = 'Lost The Game 😞';
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  //tenemos que volver a generar un numero aleatorio
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  //el valor de entrada de un imput es un string por ende para establecer este valor a nada se debe espefificar una cadena vacia
  document.querySelector('.guess').value = '';
});

//IMPORTANTE revisar el proyecto de la carpeta fiinal en el se encuentra el proyecto refactorizado osea que se mejoro el codigo para que no existiera codigo repetido.
