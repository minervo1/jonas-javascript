'use strict';

console.log('---funciones---');
//LECCIÓN: Funciones
//1. Escriba una función llamada 'describePaís' que tome tres parámetros:'país', 'población' y 'ciudad capital'. Con base en esta entrada, el La función devuelve una cadena con este formato: 'Finlandia tiene 6 millones de habitantes y su la ciudad capital es Helsinki'
const describePais = (pais, poblacion, capital) => `${pais} tiene ${poblacion} millones de habitantes y su capital es ${capital}`
//2. Llame a esta función 3 veces, con datos de entrada para 3 países diferentes. Almacenar el valores devueltos en 3 variables diferentes y registrarlos en la consola.
const datos = describePais('chile', 12, 'santiago');
const datos2 = describePais('argentina', 44, 'buenos aires');
const datos3 = describePais('islandia', 11, 'luxenburgo');

console.log(datos);
console.log(datos2);
console.log(datos3);

console.log('---funciones declarativas vs espresiones---');

//1-La población mundial es de 7900 millones de personas. Crear una declaración de función llamado 'percentageOfWorld1' que recibe un valor de 'población', y devuelve el porcentaje de la población mundial que la población dada representa. Por ejemplo, China tiene 1441 millones de personas, por lo que es alrededor del 18,2% de la población mundial
function porcentageDePoblacion(poblacion) {
    return (poblacion * 100) / 7900
}

//2. Para calcular el porcentaje, divida el valor de 'población' dado por 7900 y luego multiplicar por 100
//*hecho
//3. Llame a 'percentageOfWorld1' para 3 poblaciones de países de su elección, almacenar los resultados en variables y registrarlos en la consola
console.log(porcentageDePoblacion(50));
console.log(porcentageDePoblacion(40));
console.log(porcentageDePoblacion(10));
//4. Cree una expresión de función que haga exactamente lo mismo, llamada 'percentageOfWorld2', y también llamarlo con 3 poblaciones de países (puede ser las mismas poblaciones)

const porcentageDePoblacion2 = function (pobla) {
    return (pobla * 100) / 7900;
}
console.log(porcentageDePoblacion2(100));
console.log(porcentageDePoblacion2(20));

console.log('---Funciones flecha---');

//1. Vuelva a crear la última asignación, pero esta vez cree una función de flecha llamada 'porcentajeDeMundo3'

const porcentageDePoblacion3 = poblacion1 => (poblacion1 * 100) / 7900;
console.log(porcentageDePoblacion3(50));
console.log(porcentageDePoblacion3(15));

console.log('---Funciones calling other Funciones---');

//1. Cree una función llamada 'describePopulation'. Utilice el tipo de función que mas le acomode Esta función acepta dos argumentos: 'país' y 'población', y devuelve una cadena como esta: 'China tiene 1441 millones de personas, que es aproximadamente el 18,2% del mundo.'
const describePoblacion = (pais, poblacion) => `${pais} cuenta con una poblacion de ${poblacion} millones de habitantes que son aproximadamente el ${porcentageDePoblacion(poblacion)} de la poblacion mundial`;
//2. Para calcular el porcentaje, 'describePopulation' llame al 'percentageOfWorld1' que creó anteriormente.

//3. Llame a 'describePopulation' con datos de 3 países de su elección
console.log(describePoblacion('chile', 12));

console.log('---Introduccion a los Arrays---');

//1. Cree una matriz que contenga 4 valores de población de 4 países de su elección. Puede usar los valores que ha estado usando anteriormente. Almacene esta matriz en una variable llamada 'poblaciones'
const poblaciones1 = [23, 12, 10, 50];
//2. Inicie sesión en la consola si la matriz tiene 4 elementos o no (verdadero o falso)
if (poblaciones1.length === 4) {
    console.log('cuatro elementos en el array');
}
//3. Cree una matriz llamada 'porcentajes' que contenga los porcentajes de los población mundial para estos 4 valores de población. Usa la función 'percentageOfWorld1' que creó anteriormente para calcular los 4 valores porcentuales
const porcentages = [porcentageDePoblacion(poblaciones1[0]), porcentageDePoblacion(poblaciones1[1]), porcentageDePoblacion(poblaciones1[2]), porcentageDePoblacion(poblaciones1[3])];
console.log(porcentages);

console.log('---Operaciones basicas de array (Metodos)---');

//1. Cree una matriz que contenga todos los países vecinos de un país de su elección. Elija un país que tenga al menos 2 o 3 vecinos. Almacenar la matriz en una variable llamada 'vecinos'
const vecinos = ['argentina', 'bolivia', 'peru'];
//2. En algún momento, se crea un nuevo país llamado 'Utopía' en el barrio de su país seleccionado. Así que agréguelo al final de la matriz 'vecinos'.
//vecinos.push('utopia');
vecinos[vecinos.length] = 'utopia';
console.log(vecinos);
//3. Desafortunadamente, después de un tiempo, el nuevo país se disuelve. Así que quítalo del final de la matriz.
//vecinos.pop('utopia');
vecinos.length = vecinos.length - 1;
console.log(vecinos);
//4. Si la matriz de 'vecinos' no incluye el país 'Alemania', inicie sesión en la consola: 'Probablemente no sea un país de Europa central: D'.
if (!vecinos.includes('alemania')) {
    console.log('alemania no esta es esta matriz');
}
//5. Cambia el nombre de uno de tus países vecinos. Para hacer eso, encuentra el índice del país en la matriz 'vecinos', y luego use ese índice para cambie la matriz en esa posición de índice. Por ejemplo, puede buscar 'Suecia' en la matriz y luego reemplácelo con 'República de Suecia'.
console.log(vecinos.indexOf('peru'));
vecinos[2] = 'republica de peru';
console.log(vecinos);

console.log('---Introduccion a los Objetos---');
//1. Cree un objeto llamado 'myCountry' para un país de su elección, que contenga propiedades 'país', 'capital', 'idioma', 'población' y 'vecinos' (una matriz como la que usamos en asignaciones anteriores)
const miPais = {
    pais: 'chile',
    capital: 'santiago',
    idioma: 'español',
    poblacion: 20,
    vecinos: ['argentina', 'Bolivia', 'peru']
}

console.log('---Dot vs bracket notation');

//1. Utilizando el objeto de la asignación anterior, registre una cadena como esta en el consola: 'Finlandia tiene 6 millones de personas que hablan finlandés, 3 países vecinos y una capital llamada Helsinki.
console.log(`${miPais.pais} tiene ${miPais['poblacion']} millones de habitantes que hablan ${miPais.idioma} posee ${vecinos.length} paises vecinos y su capital es ${miPais.capital}`);
//2. Aumentar la población del país en dos millones usando la notación de puntos, y luego disminúyalo en dos millones utilizando la notación de corchetes.

miPais.poblacion = miPais.poblacion + 2;
console.log(miPais);

miPais['poblacion'] = miPais['poblacion'] - 2;
console.log(miPais);

console.log('---Metodos de Objetos');

//1. Agregue un método llamado 'describe' al objeto 'myCountry'. Este método registrará una cadena en la consola, similar a la cadena registrada en el anterior tarea, pero esta vez usando la palabra clave 'this'.
const miPais1 = {
    pais: 'chile',
    capital: 'santiago',
    idioma: 'español',
    poblacion: 20,
    vecinos: ['argentina', 'Bolivia', 'peru'],
    describe: function () {
        console.log(`${this.pais} tiene una poblacion de ${this.poblacion} millones d habitantes los cuales hablan ${this.idioma} este posee ${vecinos.length} vecinos ${this.vecinos} y su capital es ${this.capital}`);
    },
    esIsla: function () {
        console.log(this.vecinos ? true : false);
        console.log(this);
    }
}

//2. Llame al método 'describir'
miPais1.describe();
//3.Agregue un método llamado 'checkIsland' al objeto 'myCountry'. Este método establecerá una nueva propiedad en el objeto, llamada 'isIsland'. 'isIsland' será verdadero si no hay países vecinos, y falso si los hay. Utilice el operador ternario para establecer la propiedad.
miPais1.esIsla();

console.log('Iteration: The for Loop');
//1. ¡Hay elecciones en tu país! En un pueblo pequeño, solo hay 50 votantes. Use un ciclo for para simular la votación de 50 personas, registrando una cadena como esta para la consola (para los números del 1 al 50): 'El votante número 1 está votando actualmente'
for (let i = 1; i <= 10; i++) {
    console.log(`el votante n° ${i} esta votando actualmente`);
}

console.log('---Matrices en bucle, rompiendo y continuando---');

//1. Recuperemos la matriz de "poblaciones" de una tarea anterior
const poblaciones2 = [23, 12, 10, 50];
//2. Use un bucle for para calcular una matriz llamada 'porcentajes2' que contiene el porcentajes de la población mundial para los 4 valores de población.Utilizar el función 'percentageOfWorld1' que creó anteriormente
const porcentages2 = [];
for (let i = 0; i < poblaciones2.length; i++) {
    const porcen = porcentageDePoblacion(poblaciones2[i]);
    porcentages2.push(porcen);

}
//3. Confirme que 'porcentajes2' contiene exactamente los mismos valores que el matriz de 'porcentajes' que creamos manualmente en la tarea anterior, y reflexionar sobre cuánto mejor es esta solución.
console.log(porcentages2);
//* mucho menos codig, mas linpio y entendible

console.log('---arrays hacia atras y arrays en arrays---');

//1. Almacene esta matriz de matrices en una variable llamada 'listOfNeighbours' [['Canadá', 'México'], ['España'], ['Noruega', 'Suecia', 'Rusia']];
const listaVecinos = [['canada', 'mexico'], ['españa'], ['noruega', 'suecia', 'rusia'],];
//2. Registre solo los países vecinos en la consola, uno por uno, no todo el arreglo. Registre una cadena como 'Vecino: Canadá' para cada país
for (let i = 0; i < listaVecinos.length; i++) {
    for (let y = 0; y < listaVecinos[i].length; y++) {
        console.log(`vecino: ${listaVecinos[i][y]}`);
    }
}
//3. Necesitarás un bucle dentro de un bucle para esto. Esto es realmente un poco complicado, así que no ¡Preocúpate si es demasiado difícil para ti! Pero aún puedes intentar resolver esto de todos modos 😉
console.log('---ciclo while---');
//1. Vuelva a crear el desafío de la conferencia 'Looping Arrays, Breaking and Continuing', pero esta vez usando un bucle while (llame a la matriz 'porcentajes3')
let poblaciones3 = [23, 12, 10, 50];
let porcentages3 = [];
let i = 0;
while (i < poblaciones3.length) {
    let por = porcentageDePoblacion(poblaciones3[i]);
    porcentages3.push(por);
    i++;
}
console.log(porcentages3);

//2. Reflexiona sobre qué solución te gusta más para esta tarea: el bucle for o el while ¿círculo?
//en este ejercicio en particular no note gran ventaje de parte de ninguno en especial