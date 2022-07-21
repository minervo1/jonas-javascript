console.log("---fundamental 1.1----(values and variables)");
//1. Declarar variables llamadas 'país', 'continente' y 'población' y asigne sus valores de acuerdo con su propio país (población en millones).

let pais = "chile";
let continente = "america"
let poblacion = 20;

//2. Registre sus valores en la consola
console.log(pais);
console.log(continente);
console.log(poblacion);

console.log("---fundamental 1,2----(data types)");
//1. Declare una variable llamada 'isIsland' y establezca su valor de acuerdo con su país. La variable debe contener un valor booleano. También declarar una variable 'idioma', pero no le asigne ningún valor todavía.

const isIsland = true;
let idioma;
//2. Registrar los tipos de 'isla', 'población', 'país' e 'idioma' a la consola
console.log(typeof isIsland);
console.log(typeof poblacion);
console.log(typeof pais);
console.log(typeof idioma);

console.log("---fundamental 1.3---(let, const and var)");

//1. Establezca el valor de 'idioma' en el idioma que se habla donde vive (algunos los países tienen varios idiomas, pero solo elija uno)
idioma = "ingles";

//2. Piense en qué variables deberían ser variables constantes (qué valores nunca cambiar y cuáles podrían cambiar?). Luego, cambia estas variables a const.
//hecho

//3. Intente cambiar una de las variables cambiadas ahora y observe lo que sucede.
// error

console.log("---Fundamental 1.4---(operadores basicos)");

//1. Si su país se dividiera por la mitad, y cada mitad contendría la mitad de la población Entonces, ¿cuántas personas vivirían en cada mitad?
poblacion /= 2; // poblacion = poblacion/2
console.log(poblacion)

//2. Aumente la población de su país en 1 y registre el resultado en la consola
poblacion++; //poblacion = poblacion + 1;
console.log(poblacion);

//3. Finlandia tiene una población de 6 millones. ¿Tu país tiene más gente que ¿Finlandia?
let finlandia = 6;
console.log(poblacion > finlandia);

//4. La población promedio de un país es de 33 millones de personas. ¿Tu país tiene menos gente que el país promedio?}
let promedio = 33;
console.log(poblacion <= promedio);

//5. Basado en las variables que creó, cree una nueva variable 'descripción' que contiene una cadena con este formato: 'Portugal está en Europa, y sus 11 millones la gente habla portugués'

const descripcion = pais + " esta en " + continente + " y sus " + poblacion + " millones de habitantes hablan " + idioma;
console.log(descripcion);

console.log("---fundamental 1.5---(string and plantillas literales)");

//1. Vuelva a crear la variable 'descripción' de la última asignación, esta vez usando la sintaxis literal de la plantilla

console.log(`${pais} esta en ${continente} y sus ${poblacion} millones de habitantes hablan ${idioma}`);


console.log('---fundamentals 1.6---(taking decisions if/else statement)');

//1. Si la población de su país supera los 33 millones, registre una cadena como esta en el consola: 'La población de Portugal está por encima de la media'. De lo contrario, registre una cadena como 'La población de Portugal está 22 millones por debajo del promedio' (el 22 es el promedio de 33 menos la población del país.
//2. Después de verificar el resultado, cambie la población temporalmente a 13 y luego a 130. Ver los diferentes resultados y volver a establecer la población original
poblacion = 100;

if (poblacion >= 33) {
    console.log('la poblacion de ' + pais + ' esta por encima de la media');
} else {
    console.log('la poblacion de ' + pais + ' esta por debajo de la media ' + (33 - poblacion));
}


console.log('fundamentals 1.7---(Type Conversion and Coercion)');

//1-Predice el resultado de estas 5 operaciones sin ejecutarlas:
'9' - '5';//4
'19' - '13' + '17';//'617'
'19' - '13' + 17;//23
'123' < 57;//false
5 + 6 + '4' + 9 - 4 - 2;//1143
//2. Ejecuta las operaciones para comprobar si acertaste
console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);

console.log('---fundamentals 1.8(Equality Operators: == vs. ===)');

//1. Declare una variable 'vecinos' basada en una entrada de solicitud como esta: prompt('¿Cuántos países vecinos tiene su país?.
//*let vecinos = (prompt('Cuantos paises vecinos tiene tu pais'));

//2. Si solo hay 1 vecino, inicie sesión en la consola '¡Solo 1!' (usar igualdad suelta == por ahora)
//3. Use un bloque else-if para registrar 'Más de 1 borde' en el caso de 'numNeighbors' es mayor que 1
//4. Use un bloque else para registrar 'Sin bordes' (este bloque se ejecutará cuando'numNeighbors' es 0 o cualquier otro valor)
//5. Pruebe el código con diferentes valores de 'numNeighbours', incluidos 1 y 0.
//6. Cambie == a === y vuelva a probar el código, con los mismos valores de 'numero de Vecinos'. ¡Observe lo que sucede cuando hay exactamente 1 borde! Por qué esta pasando esto?
//7. Finalmente, convierta 'numNeighbours' en un número y observe lo que sucede ahora. cuando ingresas 1
//8. Reflexione sobre por qué deberíamos usar el operador === y escribir la conversión en este situación

//NOTA al usar el signo igual nos arroja de manera normal los resultados esperados ya que recordemos que este operador Si realiza coersion, pero si usamos el operador de comparacion estricta este No reliza coersion por lo que reconocera el string proveniente del promt, por lo que nos retornara false es por eso  que se ejecuta la ultima linea, pero recordemos que esto se puede solucionar convirtiendo inmemdiatamente el valor del promt en un numero.22 
/*
if (vecinos === 1) {
    console.log('solo ' + vecinos + ' vecino');
} else if (vecinos > 1) {
    console.log('tienes mas de un vecino ' + vecinos);
} else {
    console.log('no tienes vecinos ' + vecinos);
}
*/

console.log('---fundamentals 1.9---(Logical Operators)');

//1. Comente el código anterior para que el aviso no interfiera
//2. Digamos que Sarah está buscando un nuevo país para vivir. Quiere vivir en un país que habla inglés, tiene menos de 50 millones de habitantes y no es un isla.
//3. Escribe una declaración if para ayudar a Sarah a determinar si tu país es adecuado para ella. Deberá escribir una condición que tenga en cuenta todos los criterios de Sarah. Tomar su tiempo con esto, y verifique parte de la solución si es necesario.
//4. Si el tuyo es el país correcto, registra una cadena como esta: 'Deberías vivir en Portugal :)'. Si not, log 'Portugal no cumple con sus criterios :('
//5. Probablemente su país no cumpla con todos los criterios. Así que regrese y cambie temporalmente algunas variables para que la condición sea verdadera (a menos que viva en Canadá: D).


if (poblacion < 50 && idioma === 'ingles' && !isIsland === false) {
    console.log('deveriamos vivir en ' + pais);
} else {
    console.log(pais + ' no cumple con las condiciones');
}

console.log('---fundamentals 1.10 ---(The switch Statement)');

//1. Use una swicht para registrar la siguiente cadena para el 'idioma' dado: chino o mandarín: '¡LA MAYOR cantidad de hablantes nativos!' español: 'segundo lugar en número de hablantes nativos'
//inglés: '3er lugar' hindi: 'Número 4' árabe: 'quinto idioma más hablado' para todos los demás, simplemente ingrese 'Excelente idioma también: D'
let idioma2 = 'hindu';
switch (idioma2) {
    case 'chino':
    case 'mandarin':
        console.log('La mayor cantidad de hablantes nativos 😮');
        break;
    case 'español':
        console.log('Segundo lugar en hablantes nativos');
        break;
    case 'ingles':
        console.log('Tercer lugar en hablantes nativos ');
        break;
    case 'hindu':
        console.log('4° lugar en habblantes nativos');
        break;
    case 'arabe':
        console.log('5 idioma mas hablado');
        break;

    default:
        console.log('Excelente idioma tambien');
        break;
}

console.log('---fundamentals 1.11--- (operador ternario)');

//1. Si la población de su país es mayor a 33 millones, use el operador ternario para registrar una cadena como esta en la consola: 'La población de Portugal está por encima del promedio'. De lo contrario, simplemente registre 'La población de Portugal está por debajo del promedio'. Fíjate cómo sólo ¡una palabra cambia entre estas dos oraciones!
//2. Después de verificar el resultado, cambie la población temporalmente a 13 y luego a 130. Ver los diferentes resultados y volver a establecer la población original
console.log(`${pais} tiene una poblacion ${poblacion > 33 ? 'alta' : 'baja'} segun promedio`);
