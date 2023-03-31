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

console.log('DESAFIO n° 4');
//Julia y Kate todavía están estudiando perros, y esta vez están estudiando si los perros comen demasiado o comen poco. Comer demasiado significa que la porción de comida actual del perro es más grande que la porción recomendada, y comer muy poco es lo contrario.Comer una cantidad aceptable significa que la porción de comida actual del perro está dentro de un rango del 10 % por encima y 10% por debajo de la porción recomendada (ver sugerencia).

//* DATOS-UTILES
//Use muchas herramientas diferentes para resolver estos desafíos, puede usar el resumen conferencia para elegir entre ellos 😉
//Estar dentro de un rango de 10% por encima y por debajo de la porción recomendada significa: actual > (recomendado * 0.90) && actual < (recomendado * 1.10). Básicamente, la porción actual debe estar entre el 90% y el 110% del porción recomendada.

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1. Recorra la matriz de 'perros' que contiene objetos de perro y, para cada perro, calcule la porción de comida recomendada y agréguela al objeto como una nueva propiedad. no cree una nueva matriz, simplemente recorra la matriz. Dato: Alimento recomendado = peso ** 0.75 * 28. (El resultado es en gramos de alimentos, y el peso debe estar en kg)
dogs.forEach(function (ele) {
  ele.porcionReco = Math.trunc(ele.weight ** 0.75 * 28);
});

console.log(dogs);
//2. Encuentra el perro de Sarah e inicia sesión en la consola, ya sea que esté comiendo demasiado o demasiado poco. Sugerencia: algunos perros tienen varios dueños, por lo que primero debe encontrar a Sarah en la matriz de propietarios, por lo que este es un poco complicado (a propósito) 🤓
const saraDog = dogs.find(function (perro) {
  return perro.owners.includes('Sarah');
});

console.log(
  `el perro  de sarah come ${
    saraDog.curFood > saraDog.porcionReco ? 'mucho' : 'poco'
  }`
);

//3. Cree una matriz que contenga todos los dueños de perros que comen demasiado ('propietarios comen demasiado') y una matriz con todos los propietarios de perros que comen muy poco ('los propietarios comen demasiado poco').

const ownersEatMuch = dogs
  .filter(function (ele) {
    return ele.curFood > ele.porcionReco;
  })
  .map(function (ele) {
    return ele.owners;
  })
  .flat();

console.log(ownersEatMuch);

//recordar que cuando tenemos arrays anidados podemos usar el metodo flat y si esta presente el metodo map, podemos reemplazar todo con 'flatMap'
const ownersEatLi = dogs
  .filter(function (ele) {
    return ele.curFood < ele.porcionReco;
  })
  .flatMap(function (ele) {
    return ele.owners;
  });

console.log(ownersEatLi);

//4. Registre una cadena en la consola para cada matriz creada en 3., EJP: Los perros de matilda, Alice y Bob comen demasiado!" y "Los perros de Sarah, John y Michael comen ¡demasiado poco!".
console.log(`los perros de ${ownersEatMuch.join(' y ')} comen mucho`);
console.log(`los perros de ${ownersEatLi.join(' y ')} comen muy poco`);

//5. Registre en la consola si hay algún perro comiendo exactamente la cantidad de comida que se recomienda (solo verdadero o falso)

const mismaPorcion = dogs.some(function (ele) {
  ele.curFood === ele.porcionReco;
});
console.log(mismaPorcion);
//6. Registre en la consola si hay algún perro comiendo una cantidad adecuada de comida (simplemente verdadero o falso)
const porcionAdecuada = dogs.some(function (ele) {
  return (
    ele.curFood > ele.porcionReco * 0.9 && ele.curFood < ele.porcionReco * 1.1
  );
});
console.log(porcionAdecuada);

//7. Cree una matriz que contenga los perros que comen una buena cantidad de comida (intente para reutilizar la condición utilizada en 6.)
const buenaPorcionTodos = dogs.filter(function (ele) {
  return (
    ele.curFood > ele.porcionReco * 0.9 && ele.curFood < ele.porcionReco * 1.1
  );
});
console.log(buenaPorcionTodos);
//8. Cree una copia superficial de la matriz 'perros' y ordénela por comida recomendada porción en orden ascendente (tenga en cuenta que las porciones están dentro del objetos de la matriz 😉).
const dogsCopy = dogs.slice().sort(function (a, b) {
  //tenemos que recordar que estos parametros ahora son objetos y no solamente numeros
  return a.porcionReco - b.porcionReco;
});
console.log(dogsCopy);
