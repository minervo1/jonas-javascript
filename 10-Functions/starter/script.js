'use strict';

console.log('---Defaul parameters---');
/*
//NOTAcomenzaremos a aprender como podemos dejar parametros predeterminados en una funcion en caso de que no sean introducidos a la hora de llamar a la funcion.

//creamos un array vacio para introducir en este los valores del array
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 100 * numPassengers
) {
  //la forma antigua por decirlo asi de crear los valores predeterminados, recordemos que esto funciona gracias al cortocircuito.
  //numPassengers = numPassengers || 1;
  //price = price || 100;

  //pero ahora tenemos una manera de hacerlo de una mejor manera, la cual es escribirlos directamente en los parametros tal como se muestra☝️. una caracteristica de los valores predeterminados es que pueden contener cualquier expresion. por EJEMPLO: podemos calcular el precio basandonos en la cantidad de pasajeros. //*claro que el precio no debe estar introducido ya que si no tomara ese valor. ademas de que el numero de pasajeros debe conocerse antes de esta operacion.

  //creamos un objeto con el nuevo conocimiento. (solo basta la propiedad y el valor tomara ese mismo nombre)
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

//como se observa los 2 parametros que no se introdujeron quedan como indefinidos, pero podemos dejar valores predetermiinados para estos casos
createBooking('LH123');

//claramente los valores predeterminados solo seran tomados en cuenta cuando falte alguno , si no los valores seran los introducidos
createBooking('LG56', 23);
*/
console.log(
  '---COMO PASO LOS ARGUMENTOS A UNA FUNCION? (PASO POR VALOR Y PASO POR REFERENCIA)---'
);

/*
//segun lo que hemos visto hasta ahora, el comportamiento de esta funcion es el correcto ya que al ser el 'flight' un valor primitivo este al modificarse se genera una nueva variable en el stack, en otras palabras se crea una copia del original. y en el caso del objeto al ser un objeto este hace una referencia al valor original por ende sigue siendo el mismo objeto no se crea una copia.
//*basicamente es como realizar lo siguiente, que sabemos tal como se explico arriba que copiar un valor primitivo es muy diferente a copiar un valor como objeto.
//const flightNum = flight;
//const passenger = jonas;

const flight = 'LH345';
const jonas = {
  name: 'nelson rodriguez',
  passport: 344097945,
};

const checkInt = function (flightNum, passengers) {
  flightNum = 'LH999';
  passengers.name = 'Mr. ' + passengers.name;
  if (passengers.passport === 344097945) {
    alert('Checked in');
  } else {
    alert('Wrog passport!');
  }
};

//checkInt(flight, jonas);
//console.log(flight);
//console.log(jonas);

//ahora bien hay que tener mucho cuidadod con este comportamiento entre objetos ya que puede causar algunos comportamientos inesperados, por ejemplo cuando se esta trabajando con el mismo objeto desde 2 o mas funciones diferentes.
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};
//al llamar a la funcion que cambia el pasaporte antes de llamar a la funcion checkInt, nos arroja que el pasaporte esta mal, esto es porque como sabemos al usar y modificar el mismo objeto este no crea una copia como en los primitivos. sigue siendo el mismo objeto.
newPassport(jonas);
checkInt(flight, jonas);

//VEAMOS AHORA ESTO DE PASAR POR VALOR U REFERENCIA TERMINO QUE SE USA CUENDO UTILIZAMOS FUNCIONES EN PROGRAMACION
//NOTA en javascript no se pasa por referencia solo por valor. pasar por referencia significa que puedo pasar cualquier referencia a una funcion y el valor original sera cambiado igual como si fuese el valor original, incluso valores primitivos. lo que pasamos en los ejercicios anteriores sigue siendo un valor el valor de la memoria, pero en si no pasamos una referencia.
//*pasamos una referencia a la funcion, pero no pasamos por referencia a una funcion esta es una sutil distincion que hay que tener en cuenta.
*/

/*
console.log('---Funciones de primera clase vs funciones de orden superior---');

//son cosas diferentes ya que la primera 'funciones de primera clase' solo es un concepto adstracto(no hay funciones de primera clase en la practica) solo hacen una referencia a una caracteristica del lenguaje en si, si es que esta presente o no, porque no todos los lenguajes de programacion poseen esta caracteristica. ahora esto tecnicamente significa que javascript reconoce a una funcion como un objeto, por lo tanto es un valor mas.
//por otro lado tenemos a las 'funciones de orden superior' que si existen en la practica y son posibles porque javascript admite funciones de primera clase. este concepto quiere decir que estas funciones son las que reciben a otras funciones y las que devuelven funciones. y las funciones que se pasan a otra funcion reciben a su vez el nombre de call back function, ya que seran llamadas despoues.

//en esta funcion utilizamos una expresion regular para determinar lo que queremos reeemplazar 'espacios vacios', pero tambien podriamos haber utilizado 'replaceAll' para que inclullera todos los espacios vacios.
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

//esta funcion lo que hara es convertir la primera palabra en mayuscula. lo primero que hacemos es dividir la cadena, luego con la destructuracion creamos la primera variable y el patron de descanso seran todas las demas (recordemoos que las dejara en un array). por ultimo retornamos la primera variable en mayusculas y luego unimos todo.
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
console.log(upperFirstWord('nelson rodriguez'));

//ahora que tenmos estas dos funciones, crearemos nuestra funcion de 'ORDEN SUPERIOR'
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`trasformer string: ${fn(str)}`);
  console.log(`transformer By: ${fn.name}`);
};

//esta funcion de orden superior recibe una cadena y una callBack function, la cual llamamos dentro de la funcion superior
transformer('Javascript is the best!', upperFirstWord);
//claramente funciona con la otra funcion que creamos
transformer('Javascript is the best!', oneWord);

//ejemplo rapido de lo que hemos hecho antes al trabajar con el DOM
const hihg5 = function () {
  console.log('🖖');
};
document.body.addEventListener('click', hihg5);

//las c allback function son muy utilizadas en javascript, hay muchos ejemplos que podemos utillizar como por ejemplo al trabajar con array tambien podemos utilizar una funcion para que realice algo para cada uno de los elementos del array. en este ejemplo utilizamos el metodo 'ForEach' que veremos mas tarde.
['jonas', 'marisol', 'pepe'].forEach(hihg5);

//veamos ahora lo opuesto de recibir una funcion. retornemos una funcion desde otra.
const greet = function (grieting) {
  return function (name) {
    console.log(`${grieting} ${name}`);
  };
};

//en este momento la variable greeterHey es la funcion que fue retornada, por lo tanto podemos llamarla inmediatamente despues y pasarle el argumento que seria en este ca so el nombre. si no llamamos a esta funcion solo obtendremos la funcion 'greet' en si.
const greeterHey = greet('hola');
greeterHey('Nelson');
greeterHey('marisol');

//no es necesario almacenar esta funcion en una variable, en este caso la al llamar a la funcioon esta en si es la funcion retornada por lo tanto podemos llamarla innmediatamente.

greet('que tal')('constanza');

//* el paradigma de 'programasion funcional' es donde se suele utilizar esto de devolver una funcion desde otra

//como se puede observar aca reproducimos la funcion 'greet' con una funcion flecha //*No es necesario agragarle un nombre a la funcion retornada
const grett2 = saludando => nombre => console.log(`${saludando} ${nombre}`);

grett2('Hola')('juena');
*/

console.log('!Los metodos de llamada y aplicasion¡');

//veremos como implementar la palabra this de forma manual y para que queriamos hacer esto
//para este ejemplo crearemos un objeto
const latam = {
  airlane: 'latam',
  latamCode: 'LH',
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airlane} flight ${this.latamCode} ${flightNum}`
    );
    this.bookings.push({ flight: `${this.latamCode}${flightNum}`, name });
    console.log(this.bookings);
  },
};

latam.book(234, 'juena de arco');
latam.book(145, 'juan petorca');
console.log(latam);

//todo normal y funcionando como debe ser, pero supongamos que este grupo 'latam' creo una nueva aerolinea

const latamFlig = {
  airlane: 'latamFlig',
  latamCode: 'lt',
  bookings: [],
  //esta nueva aerolinea realiza los mismos procedimientos que la otr,  pero realizar la misma funcion otra vez no es una buena practica, lo mejor es realizar una copia y utilizar esa copia para ambos vuelos. para eso tomamos la funcion que ya tenemos y la almacenamos en una variable. //*ahora recordar que la palabra  this se va a conportar de una manera u otra dependiendo de quien llame a la  funcion, en este ejemplo al llamar a la funcion BOOK (copia, pero como esta afuera es una funcion regular independiente) es esta la que finalmente llama a la funcion, recordar que en las funciones regulares la pallabra this apunta a indefinido(en modo estricto), es por esta razon que al llamar a esta funcion nos indica 'que no puede leer la propiedad de un indefinido'. por lo que debemos indicarle explicitamente o manualmente como debe comportarse esta palabra this.
};
const book = latam.book;
//book(23, 'sara willians');

//para decirle a javascript que la palabra THIS debe apuntar a latam u latamFlig dependiendo tenemos 3 metodos para esto : call y apply, entonces en vez de realizar la llamada como esta en la linea 172, lo que debemos hacer es...//*(recordar que las funciones es un objeto mas y como los objetos tienen metodos nuestra funcion book tambien tiene metodos y este metodo es una de ellos).
//tal como se ve primero le indicamos a que objeto debe apuntar la palabra this y luego le damos los argumentos
book.call(latamFlig, 23, 'jessica rodriguez');
console.log(latamFlig);

book.call(latam, 45, 'pedro');
console.log(latam);

//y a si podemos seguir creando nuevos objetos, pero cuida,do estos deben tener los ismos nombres que el primero ya que la palabra this esta tratando de leer estas propiedades tall como esta el primer objeto 'latam'
const nelsonEairline = {
  airlane: 'nelsonEairline',
  latamCode: 'Bianca',
  bookings: [],
};

book.call(nelsonEairline, 12, 'bahamondes');

//veamos ahora el metodo APPLY, este hace basicamente lo mismo que 'call' solo que este  no recibe u acepta los demas parametros solo acepta un array
const fligData = [433, 'Gearge Macgregor'];
book.apply(nelsonEairline, fligData);

//pero con lo que sabemos ahora podemos seguir usando el metodo call.  el operador de descanzo se encargara de sacar estos elementos y ponerlos como elementos individuales.
book.call(nelsonEairline, ...fligData);

//veamos el metodo de 'vinculacion' 'BIND', que es el tercero y mas importante de los 3 metodos, este metoodo realiza basicamente lo mismo, pero la gran diferencia es que este metodo no llama inmediatamente a la funcion si no que devuelbe una nueva funcion con el valor de la palabra THIS vinculada en ella.
//*supongamos que ahora queremos establecer el objeto u aerolinea 'nelsoneairlane' de forma permanente
//como observamos este metodo  devolvera esta funcion sin llamarla, esto lo hacemos en el momento que sea mas oprtuno pasandole los argumentos que correspondan.
const bookNel = book.bind(nelsonEairline);
bookNel(11, 'Steven Willioans');

// de esta manera se hace mas facil poder llamar a una determinada aerolinea ya que cada una tendra su prooia funcion
const booklatam = book.bind(latam);
const booklatamFli = book.bind(latamFlig);

//otra cosa interesante de este metodo es que podemos pasarle mas parametros los que quedaran vinculados a la funcion, por ejemplo si queremos solo registrar un determinado numero de vuelo
const bookNel23 = book.bind(nelsonEairline, 23);

// como sabemos el objeto al que estamos llamando en esta funcion requiere de 2 parametros, pero uno ya esta establecido en la funcion, por lo que solo es necesario pasarle el que falta.
bookNel23('penelopez cruz');

//otro ejemplo en que el metodo 'BIND' es muy util es cuando usamos objetos atados a detectores de eventos
latam.planes = 300;
//agregamos un nuevo metodo solo a esta aerolinea
latam.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//obtenemos un error, 'que no es un numero' esto se debe a que la palabra this siempre a apuntara al objeto al que esta asociado y si nos damos cuenta el objeto 'latam.buyPlane' esta asiciado al objeto 'document.querySelector('.buy')' osea esta asociado al botom, de hecho se corrobora esto ya que es el boton el que aparece en la linea 218.
//*si llamamos a esta funcion sola el rrsultado sera el esperado
//latam.buyPlane();

//para solucionar esto debemos indicar manualmente a donde debe apuntar esta palabra this, lo que necesitamos es defirnirla pero no llamarla por lo que el metodo bind es el indicado
document
  .querySelector('.buy')
  .addEventListener('click', latam.buyPlane.bind(latam));

// a continuacion veremos otro caso en que el metodo bind es muy usado. esta es una fincion generica que cobra una determinada taza de inpuesto a un valor x
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//ahora digamos que hay un inpuesto fijo que no varia, pues realicemos esa funcion, por ejemplo el IVA(inpuesto alvalor agegado) en chiple es del 19%, pues lo que podemos hacer es preestablecer este porcentage usando nuestro metodo.
//pero en este caso no nos importa hacia donde apunta la palabra this por lo que etablecemos este argumento como NULL
const addIva = addTax.bind(null, 0.19);

//nuestra funcion addVat se veria algo asi: addVat = value => value + value * 0.23;
console.log(addIva(100));
console.log(addIva(56));

//*podriamos haver realizado todo esto con los parametros predeterminados que vimos antes, pero esto es diferente ya que estamos creando una nueva funcion mas especifica con este metodo

//IMPORTANTE: DESAFIO REALIZAR EL EJERCICIO ANTERIOR USANDO UANA FUNCION QUE DEVUELVA OTRA FUNCION
const funciRetor = function () {
  return function (rate, value) {
    return value + value * rate;
  };
};

const primeraFuncion = funciRetor();
console.log(primeraFuncion(0.23, 100));
console.log(primeraFuncion(0.23, 23));
