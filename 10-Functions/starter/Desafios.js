'use strict';

console.log('Desafio n° 1');
//¡Construyamos una aplicación de encuesta simple! Una encuesta tiene una pregunta, una serie de opciones entre las que la gente puede elegir y un matriz con el número de respuestas para cada opción. Estos datos se almacenan en el motor de arranque. objeto 'encuesta' a continuación.

//1. Cree un método llamado 'registerNewAnswer' en el objeto 'poll'. Él método hace 2 cosas:
//1.1. Mostrar una ventana de solicitud para que el usuario ingrese el número de opción seleccionada. El mensaje debería verse así:
//¿Cuál es tu lenguaje de programación favorito?
//0: Javascript
//1: pythón
//2: java
//3: C++
//(Escribir número de opción)
//1.2. Según el número de entrada, actualice la propiedad de matriz 'respuestas'. por ejemplo, si la opción es 3, aumente el valor en la posición 3 de la matriz en
//*1. Asegúrese de verificar si la entrada es un número y si el número hace sentido (por ejemplo, la respuesta 52 no tendría sentido, ¿verdad?).
//2. Llame a este método cada vez que el usuario haga clic en el botón "Responder encuesta".
//3. Cree un método 'displayResults' que muestre los resultados de la encuesta. El método toma una cadena como entrada (llamada 'tipo'), que puede ser 'cadena' o 'matriz'. Si el tipo es 'matriz', simplemente muestre la matriz de resultados tal como está, usando consola.log(). Esta debería ser la opción predeterminada. Si el tipo es 'cadena', muestra una cadena como "Los resultados de la encuesta son 13, 2, 4, 1".
//4. Ejecute el método 'displayResults' al final de cada Llamada al método 'registrarseNuevaRespuesta'.
//5. Bonificación: use el método 'displayResults' para mostrar las 2 matrices en la prueba datos. Utilice tanto la opción 'matriz' como la 'cadena'. No pongas las matrices en la encuesta. ¡objeto! Entonces, ¿cómo debería verse esta palabra clave en esta situación?

const poll = {
  question: 'what is your favorite programing languaje?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  //el codigo de aqui abajo lo aprenderemos mas tarde, pero basicamennte creara un array com este [0,0,0,0]
  aswers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const respuesta = Number(
      prompt(
        `${this.question}\n${this.options.join(
          '\n'
        )}\n digita el numero de tu opcion`
      )
    );
    console.log(respuesta);
    typeof respuesta === 'number' &&
      respuesta < this.options.length &&
      this.aswers[respuesta]++;

    console.log(this.aswers);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
