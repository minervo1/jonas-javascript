'use strict';
console.log('-----desafio n° 1-----');
//*Julia y Kate están haciendo un estudio sobre perros. Así que cada uno de ellos preguntó a 5 dueños de perros sobre la edad de su perro y almacenó los datos en una matriz (una matriz para cada uno). Para ahora, solo les interesa saber si un perro es adulto o cachorro. Un perro es adulto si tiene al menos 3 años y es cachorro si tiene menos de 3 años.

//Cree una función 'checkDogs', que acepte 2 matrices de edades de perros ('dogsJulia' y 'dogsKate'), y hace lo siguiente:
//1. Julia descubrió que los dueños del primero y de los dos últimos perros en realidad son ¡gatos, no perros! Así que cree una copia superficial de la matriz de Julia y elimine los gatos, de esa matriz copiada (porque es una mala práctica mutar la función parámetros)
//2. Cree una matriz con los datos de Julia (corregidos) y Kate
//3. Para cada perro restante, registre en la consola si es un adulto ("El perro número 1 es un adulto y tiene 5 años") o un cachorro ("El perro número 2 todavía es un cachorro 🐶").
//4. Ejecute la función para ambos conjuntos de datos de prueba
//console.log(checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]));

//Test data:
//§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
//§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const checkDogs = function (dogJ, dogK) {
  //creamos solo la copia y luego eliminamos de esa copia los gatos
  const newDogJ = dogJ.slice();
  //primero eliminamos el primer elemento
  newDogJ.splice(0, 1);
  //eliminamos los 2 ultimos
  newDogJ.splice(-2);
  const Dogs = [...newDogJ, ...dogK];
  //const Dogs = newDogJ.concat(dogK);
  Dogs.forEach(function (p, i) {
    if (p >= 3) {
      console.log(`el perro n° ${i + 1} es un adulto y tiene ${p} años`);
    } else {
      console.log(
        `el perro n° ${i + 1} aun es un cachorro 🐶y tiene ${p} años `
      );
    }
  });
};

console.log(checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]));

console.log('---DESAFIO N° 2---');
//Volvamos al estudio de Julia y Kate sobre perros. Esta vez, quieren convertir las edades de los perros con las edades de los humanos y calcule la edad promedio de los perros en su estudio.
//Sus tareas:
//Cree una función 'calcAverageHumanAge', que acepte matrices de datos de perros edades ('edades'), y hace lo siguiente en orden:
//1. Calcula la edad del perro en años humanos usando la siguiente fórmula: si el perro es <= 2 años, humanAge = 2 * dogAge. Si el perro tiene > 2 años, edadhumana = 16 + edadperro * 4
//2. Excluya todos los perros que tengan menos de 18 años humanos (que es lo mismo que tener perros que tengan al menos 18 años)
//3. Calcula la edad humana promedio de todos los perros adultos (ya deberías saberlo) de otros desafíos cómo calculamos los promedios 😉)
//4. Ejecute la función para ambos conjuntos de datos de prueba
//Datos de prueba:
const edades1 = [5, 2, 4, 1, 15, 8, 3];
// Dato 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (edades) {
  const humanAge = edades
    .map(function (mov) {
      if (mov <= 2) return 2 * mov;
      else return 16 + mov * 4;
    })
    .filter(function (mov) {
      if (mov >= 18) return mov;
    });
  const suma = humanAge.reduce(function (acu, ele, i, arr) {
    return acu + ele / arr.length;
  }, 0);
  console.log(suma);
};
calcAverageHumanAge(edades1);

console.log('----DESAFIO N° 3----');
//* Vuelva a escribir la función 'calcAverageHumanAge' del Desafío n.º 2, pero esta vez como una función de flecha, y usando encadenamiento!
const calcAverageHumanAge1 = function (edades) {
  const humanAge = edades
    .map(mov => {
      return mov <= 2 ? mov * 2 : 16 + mov * 4;
    })
    .filter(mov => mov >= 18)
    .reduce((acum, mov, i, arr) => acum + mov / arr.length, 0);
  console.log(humanAge);
};
calcAverageHumanAge1(edades1);
