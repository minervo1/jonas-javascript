'use strict';

//*¡Estamos construyendo una aplicación de apuestas de fútbol !Supongamos que obtenemos datos de un servidor web sobre un determinado juego (variable 'juego' en siguiente página). En este desafío vamos a trabajar con esos datos.

console.log('-----------------DESAFIOS-----------------');
console.log('Desafio n°1');
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
/*
//*1-. Cree una matriz de jugadores para cada equipo (variables 'players1' y 'jugadores2').
//usamos la destructuracion parra  crear estas 2 variables
const [jugadores1, jugadores2] = game.players;
console.log(jugadores1);
console.log(jugadores2);
//*2. El primer jugador en cualquier grupo de jugadores es el portero y los demás son de campo. jugadores Para el Bayern de Múnich (equipo 1), cree una variable ('gk') con el nombre del portero y una matriz ('fieldPlayers') con los 10 restantes jugadores de campo.
//usamos la destructuracion en conjunto con el patron de descoanso, la primera variable tomara el valor del primer jugador y el resto en la variable de jugadores de campo.
const [portero, ...jugadoresCampo] = jugadores1;
console.log(portero);
console.log(jugadoresCampo);

//*3. Cree una matriz 'allPlayers' que contenga todos los jugadores de ambos equipos (22 jugadores)
//utilizamos el operador de propagacion para juntar estos 2 arrays en uno solo
const todosLosJugadores = [...jugadores1, ...jugadores2];
console.log(todosLosJugadores);

//*4. Durante el partido, Bayern Munich (equipo 1) usó 3 jugadores suplentes. Así que crea un nueva matriz ('players1Final') que contiene todos los jugadores originales del equipo 1 más 'Thiago', 'Coutinho' y 'Perisic'.
const jugadores1Final = [...jugadores1, 'thiago', 'Coutinho', 'perisic'];
console.log(jugadores1Final);
//*5.Basado en el objeto game.odds, cree una variable para cada probabilidad (llamada 'team1', 'draw' y 'team2').
//aca tenemos un objeto dentro de otro, por lo que realizamos una destructuracion anidada, y cambiamos el nombre a la propiedad x, recordar que debe existir una referencia  a esta propiedad
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1);
console.log(team2);
console.log(draw);
//*6.Escriba una función ('printGoals') que reciba una cantidad arbitraria de nombres de jugadores (no una matriz) e imprima cada uno de ellos en la consola, junto con la cantidad de goles que se anotaron en total (cantidad de nombres de jugadores pasados).
//Datos de prueba para 6.: Primero, use los jugadores 'Davies', 'Muller', 'Lewandowski' y 'Kimmich'. Luego, vuelve a llamar a la función con los jugadores de game.scored

const printGoalds = function (...jugadores) {
  //en realidad no se recibe ninguna matriz, solo que sus valores (individuales) son puestos inmediatamente en una matriz gracias al operador de propagacion
  console.log(`${jugadores.length} fueron los golees que se marcaron`);
};
printGoalds('Davis', 'Muller', 'Lewandosky', 'Kimich');
printGoalds(...game.scored);
//*7.El equipo con la cuota más baja tiene más posibilidades de ganar. Imprima en la consola qué equipo tiene más probabilidades de ganar, sin usar una declaración if/else o el operador ternario.

//si usaramos el operador 0R (||) el cortocircuito se realizaria cuando aparesca el primer valor true, pero lo que nesecitamos es que al encontrar un true siga evaluando y eso lo permite el operador &&
team1 < team2 && console.log('el equipo 1 tiene mas probabilidades de ganar');
team1 > team2 && console.log('el equipo 2 tiene mas probabilidades de ganar');
*/
/*
console.log('Desafio n°2');
//¡Sigamos con nuestra app de apuestas de fútbol! Sigue usando la variable 'juego' de antes
//1- Recorra la matriz game.scored e imprima el nombre de cada jugador en la consola, junto con el número de gol (Ejemplo: "Gol 1: Lewandowski")

for (const [gol, nombre] of game.scored.entries())
  console.log(`Gol n° ${gol + 1} del jugador ${nombre}`);

//2. Use un ciclo para calcular la cuota promedio y regístrela en la consola (ya estudió cómo calcular promedios, puede ir a verificar si no lo recuerda)
let suma = 0;
for (const x of Object.values(game.odds)) {
  suma += x;
}
suma /= Object.values(game.odds).length;
console.log(suma);

//3-Imprime las 3 cuotas en la consola, pero con un formato agradable, exactamente así:
//Cuota de victoria Bayern Munich: 1.33, Cuota de empate: 3.25, Probabilidad de victoria Borrussia Dortmund: 6.5, Obtén los nombres de los equipos directamente desde el objeto del juego, no los codifiques (excepto para "dibujar"). Sugerencia: observe cómo las probabilidades y los objetos del juego tienen la mismos nombres de propiedad 😉.
for (const [nomb, valor] of Object.entries(game.odds)) {
  const CadenaString = nomb === 'x' ? 'Empate' : `victoria del ${game[nomb]}`;
  console.log(`probabilidad de ${CadenaString} ${valor}`);
}
//4-4. Cree un objeto llamado 'anotadores' que contenga los nombres de los jugadores que marcaron como propiedades, y el número de goles como valor. En esto juego, se verá así:
//{
//Gnarby: 1,
//Hummel: 1,
//Lewandowski: 2
//}

const anotadores = {};
for (const player of game.scored) {
  anotadores[player] ? anotadores[player]++ : (anotadores[player] = 1);
}
console.log(anotadores);
*/

/*
console.log('---------DESAFIO N° 3------------');
//¡Sigamos con nuestra app de apuestas de fútbol! Esta vez, tenemos un mapa llamado 'gameEvents' (ver más abajo) con un registro de los eventos que ocurrieron durante el juego. Los valores son los eventos mismos, y las claves son los minutos en los que sucedió cada evento (un partido de fútbol tiene 90 minutos más algo de tiempo extra).

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. Cree una matriz de 'eventos' de los diferentes eventos del juego que sucedieron (no duplicados). podemos crear el array inmediatamente. usamos el values porque son los valores los que queremos mostrar (no duplicados).
const setEventos = [...new Set(gameEvents.values())];
console.log(setEventos);

//o podemos crearlo despues
const matriz = [...setEventos];
console.log(matriz);

//2. Una vez finalizado el partido, se constata que la tarjeta amarilla de el minuto 64 fue injusta, Así que elimine este evento del registro de eventos del juego.
gameEvents.delete(64); //usamos la key correspondiente para eliminar esa targeta amarilla
console.log(gameEvents);
//3. Calcule y registre la siguiente cadena en la consola: "Ocurrió un evento, el promedio, cada 9 minutos" (tenga en cuenta que un juego tiene 90 minutos)
console.log(
  `Ocurrio un evento en promedio cada ${90 / gameEvents.size} minutos`
);

//pero en realidad el partido duro 92 minutos, pwro nesecitamos obtener este numero de manera dinamica
const time = [...gameEvents.keys()].pop();
console.log(time);

//ahora si podemos reemplazar este valor en nuestra cadena
console.log(
  `Ocurrio un evento en ppromedio cada ${time / gameEvents.size} minutos`
);
//4. Recorra 'gameEvents' y registre cada elemento en la consola, marcando ya sea en la primera mitad o en la segunda mitad (después de 45 min) del juego, así: [PRIMERA MITAD] 17:⚽goal{}
for (const [key, valor] of gameEvents) {
  const mitad = key <= 45 ? 'Primera Mitad' : 'Segunda Mitad';
  console.log(`[${mitad}] ${key}: ${valor}`);
}
*/

console.log('------DESAFIO N° 4---------');

//NOTA Escriba un programa que reciba una lista de nombres escritos de la siguiente forma (subrayado_caso) y convertirlos a camelCase La entrada provendrá de un área de texto insertada en el DOM (vea el código a continuación para inserte los elementos), y la conversión ocurrirá cuando se presione el botón.

//datos de prueba
//underscore_case
//first_name
//Some_Variable
//calculate_AGE
//delayed_departure

//el resultado deveria verse asi, todos en 'camelCase', siendo 5 lineas separadas
//underscoreCase   ✅
//firstName        ✅✅
//someVariable     ✅✅✅
//calculateAge     ✅✅✅✅
//delayedDeparture ✅✅✅✅✅

//Sugerencias:
//Recuerda qué carácter define una nueva línea en el área de texto 😉
//La solución solo necesita funcionar para una variable formada por 2 palabras, como a_b
//Empieza sin preocuparte por el ✅. Aborde eso solo después de que tenga la variable
//conversión de nombre funcionando 😉
//Este desafío es difícil a propósito, así que empieza a ver la solución por si acaso estas atorado. ¡Luego haz una pausa y continúa!

//creamos el textarea y el boton en el DOM
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

//primero creamos un evento para el botton
document.querySelector('button').addEventListener('click', function () {
  //luego debemos obtener el valor (texto)que se ingresara en el texarea
  const text = document.querySelector('textarea').value;
  //debemos separar este texto en 5 lineas, 5 string diferentes
  const lineas = text.split('\n'); //este caracter esta presente al comienzo de toda cadena de manera oculta

  for (const linea of lineas) {
    const [pri, segun] = linea.toLowerCase().trim().split('_');

    //creamos la salida final
    const salida = `${pri}${segun[0].toUpperCase()}${segun.slice(1)}`;
    //tambien tenemos esta otra manera de obtener la salida, que nos dara el mismo resultado.
    //const salida2 = `${pri}${segun.replace(segun[0], segun[0].toUpperCase())}`;

    //ahora construimos los vistos buenos tal como en el ejemplo a seguir, con padEnd le damos a todas  las lineas la misma longitud luego solo ponemos el logo
    console.log(`${salida.padEnd(20)} ✅`);
  }
});
