'use strict';

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

//*¡Estamos construyendo una aplicación de apuestas de fútbol !Supongamos que obtenemos datos de un servidor web sobre un determinado juego (variable 'juego' en siguiente página). En este desafío vamos a trabajar con esos datos.
//*1-. Cree una matriz de jugadores para cada equipo (variables 'players1' y 'jugadores2').
const [jugadores1, jugadores2] = game.players;
console.log(jugadores1);
console.log(jugadores2);
//*2. El primer jugador en cualquier grupo de jugadores es el portero y los demás son de campo. jugadores Para el Bayern de Múnich (equipo 1), cree una variable ('gk') con el nombre del portero y una matriz ('fieldPlayers') con los 10 restantes jugadores de campo.
const [portero, ...jugadoresCampo] = jugadores1;
console.log(portero);
console.log(jugadoresCampo);

//*3. Cree una matriz 'allPlayers' que contenga todos los jugadores de ambos equipos (22 jugadores)
const todosLosJugadores = [...jugadores1, ...jugadores2];
console.log(todosLosJugadores);

//*4. Durante el partido, Bayern Munich (equipo 1) usó 3 jugadores suplentes. Así que crea un nueva matriz ('players1Final') que contiene todos los jugadores originales del equipo 1 más 'Thiago', 'Coutinho' y 'Perisic'.

//*5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

//*6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)

//*7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.

//Datos de prueba para 6.: Primero, use los jugadores 'Davies', 'Muller', 'Lewandowski' y 'Kimmich'. Luego, vuelve a llamar a la función con los jugadores de game.scored
