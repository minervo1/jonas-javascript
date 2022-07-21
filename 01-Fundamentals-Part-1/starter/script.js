console.log("-----------VALORES Y VARIABLES-----------");
/*
console.log("nelson");
console.log(23);

// es una convencion , pero no es ilegal escribir la segunda palabra con mayuscula y la primera con minuscula. otro punto importante es que los nombres de las variables deben ser muy descriptivos segun el valor que almacenen.
let firtName = "nelson";
console.log(firtName);
console.log(firtName);
console.log(firtName);
console.log(firtName);

//Los nombres de las variables solo pueden contener numeros, letras, guiones bajos y la asignacion dolar, pero los numeros no deben ir al comienzo. tampoco esta permitido (porque arrojaria error) utilizar palabras que son y estan reservadas para javascript como (new,function, etc).

//hay palabras que se escriben todas en mayusculas, pero se escriben asi ya que estan predeterminadas /ejemplo: variables que nunca cambiam. de hecho vs code la reconoce y nos la pone de otro color.
let PI = 3.1415;
*/

console.log("---------------tipo de datos---------------------------------------");
/*
//un punto muy importante a conocer es que javascript posee un tipado dinamico esto significa que no se necesita especificar que tipo de dato se almacenara. como si ocurre en otros lenguajes como java.esto se debe a que en javascript //*es el valor el que posee el tipo de dato NO la variable.

//esto de el tipado dinamico tambien lleva a que se puede cambiar facilmente el tipo de dato que posee una variable 
let javascriptIsFun = true;
console.log("en este punto la variable javacriptIsFun es un " + typeof javascriptIsFun),
    javascriptIsFun = "divertido";
console.log("pero en este punto ya cambio y ahora es un " + typeof javascriptIsFun);

//TIPOS DE DATOS
let indefinido;
console.log(typeof 20);
console.log(typeof "cadena");
console.log(typeof false);
//podemos abservar en la consola que al declarar una variable sin valor tanto la variavle como el valor son indefinidos
console.log(indefinido);
console.log(typeof indefinido);

//tal como lo hicimos anteriormente. podemos asignarle un valor o reasignarle porque ya tenia el valor de indefinido. esto es gracias al tipado dinamico 
indefinido = 23;
console.log(indefinido);

//los valores nulos tambien son variables que estan indefinidas, tanto su valor como la variable que la posee, pero esto se profundisara mas adelannte en el curso. por el momento veamos un error de javascript, que debemos tener en cuenta.
console.log(typeof null);//en consola se muestra OBJET, pero es un error ya que deveria mostrar null, este error no se corrige por razones heredables.

//el tipo de dato BigInt como su nombre lo indica sirve para almacenar valores enteros muy grandes no soportados por la variable number.
*/

console.log("-------------------LET, CONST Y VAR-----------------------");
/*

//otro concepto que se usa mucho es 'mutar' una variable y es precisamente lo que realizamos anteriormente al declarar una variable vacia y luego asignarle un valor. y existe 3 variables que podemos usar para esto, es precisamente LET la que se usa para cualquier valor que vaya a cambiar con el tiempo, en el ejemplo se muestra y se le conoce como mutar una variable.
let edad = 30;
edad = 31;

//por otro lado asignamos la variable CONST para valores que no cambiaran en el tiempo
const birthYear = 1998;
//birthYear = 1999;//esto arrojara un error, porque no se puede reasignar una variable declarada con const

//*el hecho de que las variables declaradas con CONST sean inmutables significa tambien que no podemos declarar variables vacias.

//const hola;//esto generara un error, de hecho el vscode lo detecta como un error

//VAR pertenece al javascript antiguo, y deveria evitarse por completo
//otro punto importante es que podemos escribir una variable sin declararla, pero es una mala practigca que deveriamos evitar por completo. porque se pierde el alcance de las mismas esto se vera mas adelante.
lasName = "rodriguez";
console.log(lasName);
*/

console.log("--------------operadores basicos---------------");
/*

//no hay mucho que decir a cerca de estos operadores, tenemos nocion de ellos devodo a que se utilizan en matematicas, podemos mencionar que podemos algunos atajos por aso decirlo.

//pero antes veamos como podemos escribir un mejor codigo a partir del siguiente ejemplo, tenemos estas 2 edades calculadas, pero si nos damos cuenta el año actual se repite, lo cual no es necesario. 
const edadNelson = 2037 - 1991;
const edadJessica = 2037 - 1993;
console.log(edadNelson, edadJessica);

//podemos mejorar el codigo escribiendo en una sola variable el año actual
const añoActual = 2037;
const edadNelson1 = añoActual - 1991;
const edadJessica1 = añoActual - 1993;
console.log(edadNelson1, edadJessica1);

//operadores matematicos basicos en accion
console.log(edadNelson1 * 2, edadNelson1 / 10, 2 ** 3);

//tener en cuenta y cuidado con el oprador (+).ya que con este no solo podemos sumar si no que podemos concatenar cadenas de caracteres o string
const primerNombre = "nelson";
const apellido = "rodriguez";
console.log(primerNombre + " " + apellido);

//otro punto importante de los operaadores es su precedencia osea la prioridad que tiene un operador por sobre otro para ejecutarse.

//en este caso tenemos que el sigo (+) tiene mayor prioridad que sobre el operador de (=) por eso se realiza la opreracion matematica primero y luego ese valor se le asigna a x. (en javascript el codigo se ejecuta de arriba hacia abajo y de izquierda a derecha)
let x = 10 + 14;
console.log(x);

//(atajos) operadores de asignacion
x += 10; // x = x + 10 = 34(porque x vale 24)
console.log(x); //pero ahora x vale 34 fue reasigando su valor o muto.

x *= 2 //x = x * 2 = (34 * 2 = 68)
console.log(x);

x++ //x = x + 1 = (68 + 1).
console.log(x);

x-- // x = x -1 = (69-1)
console.log(x);

//operadores de comparacion generaran valores u resultados booleanos.

console.log(edadNelson1 > edadJessica1);
console.log(edadNelson1 >= edadJessica1);
console.log(edadNelson1 < edadJessica1);
console.log(edadNelson1 <= edadJessica1);

//tener en cuenta que estos resultados de true o false en codigo real se almacenan en variables, como en el siguiente ejemplo.
const esMayor = edadNelson1 > edadJessica1;
console.log(esMayor);

//veamos como podemos hacer el calculo de las edades y al mmismo tiempo ver cual es el mayor u menor.
console.log(añoActual - 1991 > añoActual - 1993);
*/

console.log("----------prioridad de operadores-----------");
/*
const añoActual = 2037;
const edadNelson1 = añoActual - 1991;
const edadJessica1 = añoActual - 1993;

// javascript sabe que primero debe realizar la resta de izquierda a derecha y al final el si es mayor o no. esto es asi debido a la prioridad que poseen algunos operadores por sobre otros.
console.log(añoActual - 1991 > añoActual - 1993);

//la mayoria de los operadores matematicos de ejecutan de izquierda a derecha
console.log(25 - 10 - 5);

//pero otros se ejecutan de DERECHA A IZQUIERDA como en el ejemplo abajo, es algo dificil de ver,pero tenemos que entender que si se ejecutara de izquierda a derecha x seria igual a y, pero y en este punto no  vale nada es indefinido, por lo que x tambien seria un indefinido. solo despues y valdria 10, pero x seguiria siendo indefinido.
let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

//promedio, aca es necesario usar los parentesis ya que necesitamos que se ejecute la suma primero y luego la division
const promedioEdades = (edadNelson1 + edadJessica1) / 2
console.log(edadNelson1, edadJessica1, promedioEdades);
*/

console.log("-------------cadenas y plantillas literales-------------------");
/*

const primerNombre = "nelson";
const trabajo = "profesor";
const cumpleaños = 1990;
const año = 2022;

//esta es la forma antigua de realizar una cadena
const nelson = "soy " + primerNombre + " un " + trabajo + " de " + (año - cumpleaños) + " años de edad";
console.log(nelson);

// con javascript moderno podemos realizar esta cadena de una manera mucha mejor
const nelson2 = `soy ${primerNombre} un ${trabajo} de ${año - cumpleaños} años de edad`
console.log(nelson2);

//no necesariamente podemos usar commilas invertidas para construir una plantilla. tambien las podemos usar para escribir cualquier string. de hecho son usadas por muchos programadores reemplazando el uso de commilas.
console.log(`esto es una cadena cualquiera`);

//otro uso muy bien resibido por la comunidad es el hecho de poder escribir multiples lineas de codigo lo que antes era algo mas dificil de realizar.
console.log(`cadena con 
multiples 
lineas de 
codigo`);
*/

console.log("----------IF/ELSE----------");
/*

let edad = 12;
let esSuficiemte = edad >= 18;
const leQuedan = 18 - edad;
if (esSuficiemte) {
    console.log('nelson puede obtener su licencia👌');
} else {
    console.log(`le quedan ${leQuedan} años para obtener licencia`);
}

//veamos otro ejemplo de esta estructura de control
const añoNacimiento = 2012;
let century;
if (añoNacimiento <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);

//RESUMEN para usar esta estructura de control debemos pasarle cualquier expresion que devuelve un valor booleano.  

*/

console.log("-----Coersion y conversion-----");

/*
//en la CONVERSION debemos explicitamente indicar a que valor queremos cambiar. javascript solo puede convertir 3 valores (string, numeros y booleanos) los booleanos se comportan de otra manera y seran vistos mas adelante.
const inputYear = '1991';

//en este caso lo hacemos con la funcion (Number).para convertir el strin a numero
console.log(Number(inputYear));

//debemos tener en cuenta que el valor origianl no cambia solo en el momento en que se ejecute esa linea nos dara el valor que le indicamos, por eso es que debemos indicarle en esta linea tambien para que pueda sumar 2 numeros y no un string y un numero.
console.log(Number(inputYear) + 18);

//pero debemos tener en cuenta que no se podra convertir cualquier cadena a un numero, en este caso nos arrojara un (NAN) lo  que significa "no es un numero" que en otras palabras es una especie de error que indica "NUMERO INVALIDO".
console.log(Number("nelson"));

//sigue siendo un numero, de alguna forma, pero es un numero invalido.
console.log(typeof NaN);

//claro esta que podemos convertir de numero a string. podemos observar que tenemos la cadena y el numero
console.log(String(23), 23);


//por otro lado tenemos la COERSION, que javascript realizara automaticamente sin que nosotros lo sepamos.
console.log("yo tengo " + 23 + " años de edad");

//esto lo realiza cuando estamos o esta trabajando con 2 o mas tipos de datos al mismo tiempo, en el ejemplo de arriba los signos (+) desencadenan una coersion sobre en numero convirtiendolo en un string.

//no todos los operadores realizan coersion a string, podemos observar en este ejemplo que el operador (-) realiza una coersion de string a numero
console.log('23' - '10' - 3);// resultado es 10

//son convertidos a numeros, porque es la unica forma de que funcione, lo mismo para el operador de division
console.log('23' * '2');

//analicemos el siguiente codigo, recordemos que el operador + al encontrarse con un numero lo convertira a string,por lo que el primer resultado es "11", ahora el operador - lo que hace es lo comtrario convertira el string a numero, por lo que el resultando sera (11-1) = 10.
let n = "1" + 1;
n = n - 1;
console.log(n);
*/
console.log("------VALORES VERDADEROS Y FALSOS------");
/*
//*la conversion a booleanos es siempre implicita osea javascript siempre aplica coersion,  en este ejemplo se realiza de manera manual, pero es solo para efectos de aprendisaje.
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

//?pero ¿cuando se aplica esta coersion de javascript para tranformar a booleanos?

//r ocurre en 2 escenarios: 1- cuando usamos operadores logicos (&& y ||)
//r 2- en un contexto logico como por ejemplo cuando usamos if 

//ejemplo debemos tener claro que cualquier valor que introduscamos en esta declaracion javascript intentara convertirlo a boolean. en este caso 0 sabemos que en nste entorno se convertitta a falso.
const dinero = 0;
if (dinero) {
    console.log("tengo dinero");
} else {
    console.log("no tengo dinero");
}

//veamos otro ejemplo, se desplega el else porque tenemos un valor que no esta definido, por lo tanto pasa a ser falso dentro de esta declaracion. pero debemos tener cuidado ya que podriamos tener errores si no pensamos bien al escribir nuestro codigo.
let altura;
if (altura) {
    console.log("altura definida");
} else {
    console.log("altura es indefinida");
}

*/
console.log("----- = VS === ------");
/*
//veamos otro ooperador el de IGUALDAD ESTRICTA o COMPARACION que tambien nos devolvera una valor booleano
//ejemplo: que pasa si queremos saber si dos valores son en realidad iguales
const age = 18;
if (age === 18) console.log("eres aadulto");//*si ssolo tenemos una linea no es necesario los brackes

//* la diferencia entre estos 2 operadores es que el operador estricto no realiza coersion, por lo tanto regresara true solo si realmente los valores son iguales, en cambio el operador de igualdad realiza coersio ya que nos regresara true a paesar de que los valores no sean iguales como ("18" == 18) = true.

if (age == '18') {
    console.log("son iguales");
} else {
    console.log("no son iguales");
}

//* es por esto y otros comportamientos de el operador de igualdad (=) que se recomienda usar siempre el operador de igualdad estricta cada vez que se requiera comparar valores.

//con la funcon PROMPT, podemos pedir u obtener un valor desde afuera. desde la pagina u aplicasion.

const numeroFavorito = Number(prompt('¿cual es tu numero favorito'));
console.log(numeroFavorito);

//*debemos tener cuidado ya que el valor devuelto por esta funcion siempre sera un string
console.log(typeof numeroFavorito);

//* si usamos el operador de igualdad no tendriamos problemas, pero a pesar de eso se recomienda y es buena practica para evitar problemas usar el operador de igualdad estricta y convertir el string a numero de forma explicita si a si lo necesitaramos.

//? pero como hacemos eso
//r simplemente usamos la funcion NUMBER al momento de pedir el valor
if (numeroFavorito === 23) {
    console.log('son iguales');
} else {
    console.log('no son iguales');
}

// esto nos lleva a el siguiente punto y es que podemos agregar mas condicionales. por ejemplo que no solo evalue un valor si no que otros mas 
if (numeroFavorito === 23) {
    console.log('son iguales');
} else if (numeroFavorito === 7) {
    console.log('el numero 7 tambien es mi numero favorito');
} else {
    console.log('no hay numeros que coincidan');
}

// por ultimo veamos el operador que realiza lo comtrario al operador de igualdad que es (!=) que tambien posee su version estricta (!==) y al igual que la anterior es buena practica usar la version estricta.
if (numeroFavorito !== 23) console.log('este numero no es 23');
*/
console.log('------LOGICA BOOLEANA------')
/*
//* el operador && sera verdadero solo si todos los valores son verdaderos en cualquier otro caso sera false
//* el operador || sera verdadero si al menos 1 valor es verdadero, sera falso si todos sus valores son falsos
//* el operador de not(!) negara cualquier condicion

let tieneLicencia = true;
let tieneBuenaVista = true;

console.log(tieneBuenaVista && tieneLicencia);//ambas son true por lo que el resultado es TRUE
console.log(tieneBuenaVista || tieneLicencia);//basta con 1 true por lo que el resultado es TRUE
console.log(!tieneBuenaVista);//lo invierte , el resultado es FALSE

//ejercicio para terminar de entender estos opperadores
let puedeConducir = tieneBuenaVista && tieneLicencia;
if (puedeConducir) {
    console.log('Felicidades ya puedes conducir');
} else {
    console.log('🤮 no puedes conducir');
}

//veamos otro ejemplo
const estaCansado = true;
console.log(tieneBuenaVista || tieneLicencia || estaCansado);//true
console.log(tieneBuenaVista || tieneLicencia && estaCansado);//true

//otro ejemplo usando el operador de negacion
if (tieneBuenaVista && tieneLicencia && !estaCansado) {
    console.log('pudes manejar');
} else {
    console.log('es preferible que otra persona maneje👍');
}

*/
console.log("---------THE SWITCH STATEMENT--------");
/*
//esta declaracion es usada cuando queremos comparar un solo valor en diferentes situaciones, claro que podemos usar el bloque if con multiples else if, pero esta es una obsion diferente.
//*la comparacion con esta sentencia switch es una comparacion estricta(===).
//*sin el break el codigo se seguiria ejecutando.

const day = 'friday';

switch (day) {
    case 'monday':
        console.log('plan course structure');
        console.log('go to coding meetup');
        break;
    case 'tuesday':
        console.log('prepare theory videos');
        break;
    case 'wednesday':
    case 'thurday':
        console.log('write code examples');
        break;
    case 'friday':
        console.log('record videos');
        break;
    case 'satuurday':
    case 'sunday':
        console.log('enjoy the weekend');
        break;
    default:
        console.log('not a valid day!');

}

//veamos el mismo ejercisio U logica aplicando el bloque IF
const dia = 'viernes';

if (dia === 'lunes') {
    console.log('estructura del curso');
    console.log('preparando el codigo');
} else if (dia === 'martes') {
    console.log('preparando videos de teoria');
} else if (dia === 'miercoles' || dia === 'jueves') {
    console.log('escribiendo codigos de ejemplo');
} else if (dia === 'viernes') {
    console.log('editanndo videos');
} else if (dia === 'sabado' || dia === 'domingo') {
    console.log('disfrutando de el fin de semana');
} else {
    console.log('el dia no es valido');
}
*/
console.log('---------DECLARACIONES Y EXPRESIONES--------');
/*
//es importante enterder las diferenncias entre una EXPRESION y Una DECLARACION
//*EXPRESION: es algo que producira en javascript un valor.
3 + 4 // esto producira un valor.   
1999// este numero en si es un valor y javascript asi lo interpretara
true && false && !false// esto producira un valor booleano.

//*DECLARACION: por lo general las expresiones estan declaradas dentro de una declaracion, las declaraciones en si no producen valores, pero si las expresiones que estan dentro de ellas.

//tomemos el ejemplo de la declaracion IF, ahora dentro de esta declaracion tenemos la cadena string esta cadena en si es una expresion porque es la que produce el valor final.
if (23 > 10) {
    const str = '23 is mas grande';
}

//las declaraciones son como una orasion y las expresiones son las palabras de esa oracion, esto de las declaraciones y expresiones es necesario saberlo ya que javascript espera declarasiones y expresiones en determinados lugares.
//EJEMPLO en una plantilla literal javascript espera expresiones(no se pueden incluir declaraciones)

console.log(`yo tengo ${2022 - 1985} años de edad`);// esto funciona porque introdujimos una expresion, pero si introdujeramos la declaracion if nos arrojaria un error

//si tenemos variables como en el siguiente ejemplo tambien funcionaria ya que las variables en si contiene una expresion
let yo = 'nelson';
console.log(` yo soy ${yo}`);
*/
console.log('------OPERADOR CONDICIONAL O TERNARIO-------');

//hemos visto 2 formas de escribir una condicion, el operador IF y el operador switch, pero existe otro operador. el operador ternario el cual se asemeja al IF, pero con la diferencia de que podremos hacerlo en una sola linea.

let edad = 23;
edad >= 18 ? console.log('me gusta el vino🍷') : console.log('me gusta el agua🚿');

//se le llama ternario porque esta compuesto de 3 partes 1° el condicional, 2° si es verdadero, 3° si es false. 
//* todo operador es una expresion
//dicho esto podemos deducir que si este operador en si es una expresion por que nos devolvera un valor ese valor podemos almacenarloen una variable.
let beber = edad >= 18 ? 'vino' : 'agua';
console.log(beber);

//si usaramos el operador if, tendriamos que declarar la variable fuera del bloque ya que si lo hacemos dentro del bloque ete o estara dispoible afuera. de otra manera esto arrojaria error.
let beber1;
if (edad >= 18) {
    beber1 = 'vino';
} else {
    beber1 = 'agua';
}
console.log(beber1);

//esto nos lleva a que podemos introducir esta exprecion o este operador ternario dentro de una plantilla literal que como sabemos solo acepta expresiones.
console.log(`me gusta beber ${edad >= 18 ? 'vino' : 'agua'}`);

//para terminar debemos tener en cuenta que este operador no es un reemplazo del bloque if, el operador ternario nos servira para tomar decisiones rapidas y sencillas como las que vimo aca, pero siempre nesecitaremos de el bloque if para bloques de codigo grande donde necesitemos ejecutar una funcion en base a una condicion. 

