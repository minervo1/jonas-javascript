'use strict';

//objeto openingHours que fue incorporado al objeto restaurant

//tercera mejora de los literales objetos, lo que podemos hacer con esta mejora es calcular por ejemplo los dias de nuestro objeto openingHours usando este array. lo hacemos usando la sintaxis de los corchetes, de hecho podemos escribir cualquier expresion.
const diasSemana = [
  'monday',
  'tuesday',
  'wednesday',
  'thurday',
  'friday',
  'saturday',
  'sunday',
];
const openingHours = {
  [diasSemana[3]]: {
    open: 12,
    close: 12,
  },
  [diasSemana[4]]: {
    open: 11,
    close: 13,
  },
  [diasSemana[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  orden(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //al recibir este objeto 1 solo lo desestructuramos inmediatamente, recordar que para los objetos necesitamos los mismos nombres. y en el caso de que algo funcione mal podemos establecer algunos parametros predeterminados
  ordenDelivery: function ({ time, address, mainIndex = 1, starterIndex = 2 }) {
    console.log(
      `orden de entrega ${this.starterMenu[starterIndex]} y ${this.mainMenu[mainIndex]} a las ${time} en la direccion ${address}`
    );
  },
  ordenPasta: function (ingre1, ingre2, ingre3) {
    console.log(
      `esta lista su pasta. con los ingredientes que solicito ${ingre1}, ${ingre2}, ${ingre3} `
    );
  },
  ordenPizza: function (mainIngredient, ...otrosIngredientes) {
    console.log(mainIngredient);
    console.log(otrosIngredientes);
  },
};

//NOTA: dejaremos el objeto restaurant de lado ya que ahora veremos como trabajar con strings y los diferentes metodos que existen para manipularlos

const aerolinea = 'Latam air Chile';
const vuelo = 'A3450';

//como ya sabemos podemos obtener cada uno de los caracteres de una cadena
console.log(vuelo[0]);
console.log(vuelo[1]);
console.log(vuelo[2]);

//lo cual podemos hacer directamente
console.log('Ae234'[0]);
console.log('Ae234'[1]);

//tambien podemos usar la longitad al igual que con las matricez
console.log(aerolinea.length);
console.log('B345'.length);

//veamos como trabajar con algunos metodos, indexOf nos devolvera el indice de la primera coincidencia que encuetre
console.log(aerolinea.indexOf('a'));

// 'lastIndexOf' nos devolvera el indice de la ultima coinciedencia
console.log(aerolinea.lastIndexOf('a'));

//no solo podemos buscar caracteres si no tambien frases completas, tener cuidado ya que este metodo es caseSentitive
console.log(aerolinea.indexOf('Chile'));

//veamos ahora el metodo 'slice' que nesecita indices como argumentos de esta manera con este metodo podremos extraer pedazoz de una cadena, devolviendonos una cadena nueva.
console.log(aerolinea.slice(4)); //desde la posicion 4 comenzara la extraccion inclullendolo

//claro que podemos ponerle un alto al corte.
console.log(aerolinea.slice(4, 8)); //no incluye el final, como dato esto significa que la longitud siempre sera el (final - comienzo)

//pero en la mayoria de las ocasiones no sabemos la cadena que estamos reciviendo, es aqui donde estos metodos 'indexOf', 'lastIndexOf' se vuelven mas importantes.
//NOTA: supongamos que queremos obtener la primera palabra de esta cadena que no conocemos. sabemos que deveremos comenzar desde el comienzo (0) hasta que lleguemos al primer espacio en blanco
console.log(aerolinea.slice(0, aerolinea.indexOf(' ')));

//obtenemos la ultima palabra , solo necesitamos el ultimo espacio y de hecho no es necesario nada mas porque si no especificamos nada, extraera hasta el final. NOTA: como el comienzo lo incluye le sumamos 1 para sacarlo. en este caso sacamos el espacio
console.log(aerolinea.slice(aerolinea.lastIndexOf(' ') + 1));

//tambien podemos darle indices negativos, esto  hara que comienze la extraccion desde el final. en este ejemplo extraemos las 2 ultimas letras
console.log(aerolinea.slice(-2));
console.log(aerolinea.slice(1, -1)); //comensamos la extraccion desde el comienzo hasta la ultima letra que recordemos no la incluye

//popngamos en practico lo visto hasta ahora con un agradable ejercicio. creemos una funcion que nos devulba un string que diga si el asiento es un asiento de el medio o no. NOTA. en general los aviones tinen 3 ileras de asientos a cada lado enumerados con letras de la A hasta la f, que suelen venir antecedidas del numero de vuelo (34B). por lo que los asientos del medio serian B Y E.
const checkMiddleSeat = function (seat) {
  const asiento = seat.slice(-1); //como la letra de este vuelo esta al final usamos el -1
  if (asiento === 'B' || asiento === 'E')
    console.log('TU ASIENTO ES DEL MEDIO💺');
  else console.log('tuviste suerte no te toco ningun asiento del medio');
};

checkMiddleSeat('13B');
checkMiddleSeat('12A');
checkMiddleSeat('45C');

//NOTA por ulltimo entendamos porque esto funciona ya que los string son valores primitivos por lo tanto no deberian poder tener metodos asociados, solo los objetos como los array pueden tener metodos, en efecto esto si es cierto, pero javascript convierte los string en objetos, en otras palabras mete en una caja esta cadena pero esta caja que contiene esta cadena es un objeto. todo esto lo hace detras de escena.
console.log(typeof new String('jonas')); // es el objeto string el que contiene el string en si. esto es lo que hace javascript.

//una vez terminada la operacion el string vuelve a ser el string con valor primitivo.//* de hecho todos los metodos devuelven primitivos incluso si se llama a un objeto string.
console.log(typeof new String('jonas').slice(1));

//otro metodo  muy util es 'toLowerCase' y 'toUpperCase'

console.log(aerolinea.toLowerCase()); //todo el string lo convierte a minusculas
console.log(aerolinea.toUpperCase()); //el string lo convierte a mayusculas

//un caso de uso de estos metodos podria ser para corregir alguna cadena ingresada por el usuario que este mal escrita
const pasajero = 'nelSON'; //cadena a corregir
const pasajeroMinuscula = pasajero.toLowerCase(); //pasamos toda la cadena a minusculas
const pasajeroCorregido =
  pasajeroMinuscula[0].toUpperCase() + pasajeroMinuscula.slice(1);
console.log(pasajeroCorregido); //convertimos la primera letra a mayuscula y luego le sumamos la cadena restante.

//otro ejemplo comun es corregir u comparar el email
const email = 'hola@nelson.com';
const loginEmail = ' Hola@nelson.Com \n';

//lo primero que hacemos es pasar todo a minuscuula
let emailLower = loginEmail.toLowerCase();

//luego le quitamos todos los espacios en blanco que pueda tener (delante y atras)
emailLower = loginEmail.trim();
console.log(emailLower);

//pero al igual que con los set, podemos llamar inmediatamente,obtendemos el mismo resultado
const emailNormal = loginEmail.toLowerCase().trim();
console.log(emailNormal);

//ahora si podemos comparar estos 2 email
console.log(email === emailNormal);

//el mismo ejercicio, pero en una funcion
const corrigeEmail = function (email1, email2) {
  email1.toLowerCase().trim();
  email2.toLowerCase().trim();
  if (email1 === email2) console.log(`los email son iguales`);
  else {
    console.log('los email no son oguales');
  }
};
corrigeEmail('nelson@hotmail.com', 'Nelson@hotmail.Com ');

//otra de las cosas que mas se suele hacer es con string esreemplazar pedazoz de cadena por otras cadenas
//NOTA supongamos que tenemos un precio de europa en el cual utilizan la coma para separar decimales y la moneda que es el auro pasarlo a dolar y la coma a punto

//esto lo hacemos con el metoodo 'replace' el primer caracter sera el que queremos reemplazar y el segundo sera por el cual sera reemplazado
const priceGB = '344,45€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);

//claro esta que tambien podemos reemplazar palabras o fases completas, teniendo en cuenta que 'replace' solo funciona con la primera coiincidencia usamos 'replaceAll' que reemplazara todas las coincidencias. esta demas mencionar que este metodo es CaseSensitive
const anuncio = 'All passengers come to boarding door 23, Boarding door 23';
console.log(anuncio.replaceAll('door', 'gate'));

//otrop metodo muy util es el 'includes' que nos permite saber si una cierta frase u caracter esta o no presente en el string
const plane = 'A230neo';
console.log(plane.includes('A230')); //tambien es sencible a mayusculas y minusculas

//tambien tenemos el metodo 'startswith' que nos permitira saber si unna cadena comienza o no con determinada frase
console.log(plane.startsWith('a23')); //esta solo verificara el comienzo esa es la diferencia con 'includes'.

//supongamos que queremos verificar si el avion pertenece a la familia de los neo. para eso utilizaremos 'stratswith' y 'endwith'.

if (plane.startsWith('A230') && plane.endsWith('neo'))
  console.log('el avion es de la familia NEO');
else {
  console.log('el avion no pertenece a la familia de los NEO');
}

//veamos el ultimo ejercicio que consistira en verificar si el equipaje cumple con algunas condiciones para poder ingresar a chile, tener en cuenta que el includes es sencible a mayusculas y minusculas es por eso es inportante pasar todo a minuscula para evitar que algun cuchillo o arma escrito con mayuscula pase el control.
const checkBanggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('Tu maleta Imcumple el protocolo');
  } else {
    console.log('Bienvenido a chile');
  }
};

checkBanggage('I have a laptop, some Food and pocket knife');
checkBanggage('Sock and camara');
checkBanggage('Got some snack and a gun for protection');

//sigamos aprendiendo de los string. uno de los metodos mas utilizados y populares es el 'SPLIT', este nos permite dividir una cadena segun un caracter especificado este debe estar presente, este nos devolvera un array con las cadenas separadas tal como se aprecia en el ejemplo.
console.log('cadena+separada+por+un+caracter+especifico'.split('+'));
console.log('nelson rodriguez'.split(' '));

//probemos el poder de la destructuracion con este metodo
const [firsName, lasName] = 'jonas Schnedtman'.split(' ');
console.log(firsName, lasName);

//veamos otro poderoso metodo que realiza lo opuesto al 'spit'. este nos permitira unir una o mas cadenas
//NOTA supongamos que queremos una cadena que comience con Mister luego el nombre y por ultimo el apellido en mayuscula

const nuevoNombre = ['Mr.', firsName, lasName.toUpperCase()].join(' ');

console.log(nuevoNombre);

//veamos un ejemplo donde tenemos varios nombres y cada uno de ellos queremos poner la primera letra en mayusculas
const capitalizaeName = function (nombres) {
  const nombre = nombres.split(' ');
  const nombresMayusculas = [];
  for (const n of nombre) {
    nombresMayusculas.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(nombresMayusculas.join(' '));
};

capitalizaeName('jessica ann smith davis');
capitalizaeName('jonas schmedtman');

//veamos ahora el concepto de rellenar(PADDING) una cadena este quiere decir que le agregamos una cierta cantidad de caracteres hasta tener una longitud deseada.

const message = 'Go tu gate 23';
console.log(message.padStart(25, '+')); //primer caracter sera la longitud que deseamos y el segundo sera el caracter
console.log('nelson'.padStart(10, '-'));

//tambien tenemos el 'padEnd'. tal como su nombre lo indica los caracteres se pondran al final de la cadena
console.log(message.padEnd(19, '-'));

//podemos conbinar estos metodos, debemos tener cuidado al momento de usarlos juntos ya que cada uno actuara de forma independiente por lo que la longitud del 'padEnd' debe incluir la longitud del 'padStart'.
console.log(message.padStart(20, '*').padEnd(30, '-'));

//veamos un ejemplo mas real, por ejemplo cuando vemos los numeros de uan targeta de credito, en muchas ocasiones solo vems los ultimos digitos y los demas estan enmascarados por algun caracter.

const maskCreditCard = function (number) {
  //esta operacion funciona igual que la de abajo porque si le agregamos al signo + una cadena, toda la cadena se transformara a string
  //const str = number + '';
  const str = String(number);
  //recuperamos los 4 ultimos caracteres
  const ultimos = str.slice(-4);
  //retornamos esos 4 ultimos numeros con un relleno igual a la longitud del numero original
  return ultimos.padStart(str.length, '*');
};

console.log(maskCreditCard(432443423565665));
console.log(maskCreditCard('4679453656967'));

//veamos un ultimo metodo este es 'REPEAT', tal como su nombre lo indica nos permite repetir una cadena las veces que se le indiquen.
//NOTA supongamos que queremos transmitir un mensaje varias veces como el que usan cuando quieren dar alguna informacion inportante.
const mensaje = 'Tormentas al norte..., todos los vuelos estan retrasados ---';
console.log(mensaje.repeat(5));

//supongamos que ddebido al mal tiempo hay muchos aviones esperando para salir .
const planesInLine = function (aviones) {
  console.log(`Hay ${aviones} ${'🛩️'.repeat(aviones)} en la pista`);
};

planesInLine(2);
planesInLine(5);
planesInLine(10);

// String Methods Practice
//NOTA realicemos el ultimo ejercicio con string, y este sera ordenar esta cadena y convrtirla tal como lo indica el ejemplo mas abajo.

const vuelos =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const vuelosSepara = vuelos.split('+');

for (const vuelo of vuelosSepara) {
  const [pri, segu, ter, cuar] = vuelo.split(';');
  const salida = `${pri.startsWith('_Delayed') ? '⛔' : ''}${pri.replaceAll(
    '_',
    ' '
  )} from ${segu.toUpperCase().slice(0, 3)} to ${ter
    .toUpperCase()
    .slice(0, 3)} (${cuar.replace(':', 'h')})`.padStart(45);
  console.log(salida);
}

/*
console.log('-------Maps--------');

//creamos el map
const resto = new Map();

//llenamos el map con el metodo set, que vendria siendo como el ADD en los set (para agregar)
resto.set('name', 'clasico italiano');
resto.set(1, 'santiago chile');
console.log(resto.set(2, 'lisboa portugal'));

//otra cosa que nos permite realizar este metodo SET aparte de agregar un elemento es que nos devuelbe el mapa actualizado esto nos permite volver a llamar a este mapa inmediatamente.

resto
  .set('categorias', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'abierto')
  .set(false, 'cerrado');
//ahora para recuperar los elementos del mapa usamos el metoddo GET y le passamos la key
console.log(resto.get('name'));
console.log(resto.get(true));

//el hecho de que podamos tener booleanos como clave y de hecho cualquier valor como elemento nos permite realizar cosas muy interesantes como esta
//*como al get debemos pasarle la key podemos crear esa key de manera dinamica en vez de poner directamente true o false podemos crearla dinamicamente. obtendremos el mismo resultado.

const time = 21;
console.log(resto.get(time > resto.get('open') && time < resto.get('close')));

//al igual que en los set, podemos averiguar si existe una determinda key en el maps, usando el metodo HAS
console.log(resto.has('categorias'));

//tambien podemos eliminar un elemento atravez de su clave
console.log(resto.delete(2)); //se eliminara 'lisboa portugal' y me lo confirma con un true
console.log(resto);

//*realizando una comparacion con los objetos estos tambien podemos eliminar sus propiedades usando algo llamado operador de elimiacion que lo veremos mas adelante.

//de los mapas tambien podemos obtener su tamaño con la propiedad SIZE
console.log(resto.size);

// y tambien podemos eliminar todos los elementos ded un mapa
//console.log(resto.clear());

//por ultimo tambien podemos usar arrays y objetos como keys
resto.set([1, 2], 'Test');
console.log(resto);

//si recordamos la seccion anterior sabremos que recuperar este objeto de la forma  en la que se intenta en este ejemplo no sera posible, ya que //* este objeto no es el mismo que el objeto que creamos en la linea 105, de hecho es otro. no apuntan a la misma direccion en la  memory.
console.log(resto.get([1, 2]));

//para que funcione tendriamos que realizar que hacerlo asi, de sta manera si apuntan a la misma direccion en memoria
const arr = [1, 2];
resto.set(arr, 'test');
console.log(resto.get(arr));

//todo esto es super util sobretodo al momento de trabajar con el DOM ya que podemos trabajar con sus elementos (que son un tipo especial de objeto). en este ejemplo usamos el encabezado de nuestra pagina como keys, de hecho lo podemos comprabar en la consola vemos como se selecciona el encabezado
resto.set(document.querySelector('h1'), 'encabezado');
console.log(resto.get(document.querySelector('h1')));
console.log(resto);

// sigamos aprendiendo de los mapas, tenemos otra manera de cerar mapas, y todos los elementos van dentro de esta sintaxis separados cada uno en un array, claro que cuando nesecitamos seguir agregando elemmentos es mejor usar el set.
const pregunta = new Map([
  ['pregunta', '¿cual es el mejor lenguaje de programacion'],
  [1, 'c'],
  [2, 'java'],
  [3, 'javascript'],
  ['correcto', 3],
  [true, 'correcto 🎉'],
  [false, 'Trata otra vez😢'],
]);
console.log(pregunta);

//si analizamos esta estructura(array dentro de array) es la misma que obtenemos al invocar el metodo ENTRIES en los objetos, esto quiere decir que podemos convertir un objeto a mapa de una manera sencilla
console.log(Object.entries(openingHours));

//convirtiendo un objeto a mapa
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//*los mapas son iterables por lo que podemos recorrerlos, como sabemos en cada iteracion nos devolvera tanto la clave como el valor por lo que podemos destructurar inmediatamente pra asi obtener 2 variables separadas. si nos fijamos la unica diferencia con los objetos que que ya no nesecitamos el metodo 'entries' este lo nesecitamos en los  objetos porque estos no son iterables.
//ahora en este ejemplo lo que queremos obtener son solo los valores de (c, java, javascrriptt) osea los que su key es un numero
console.log(pregunta.get('pregunta'));

for (const [key, valor] of pregunta) {
  if (typeof key === 'number') {
    console.log(`respuesta ${key}: ${valor}`);
  }
}

//codigo para mostrar la respuesta correcta segun lo que haya marcado el usuario, de esta manera podemmos ver el poder de tener booleanos como clave.
//const respuesta = Number(prompt('Su respuesta'));
const respuesta = 3;

console.log(pregunta.get(pregunta.get('correcto') === respuesta));

//por ultimo en algunas ocasiones podemos nesecitar convertir un mapa en un array y eso tambien o podemos hacer
console.log([...pregunta]);

//por ultimo tambien tenemos los metodos entries, keys y values por si se nesecitaran en alguna ocasion
console.log([...pregunta.entries()]);
console.log([...pregunta.keys()]);
console.log([...pregunta.values()]);
*/

/*
console.log('-------------Sets-----------');
//los sets son una coleccio u conjunto de elementos unicos, esto quiere decir que no admite duplicados, por otro lado si admite diferentes tipos de valores. en este ejemplo metemos un array dentro del set.

const ordenSet = new Set([
  'pasta',
  'pizza',
  'pizza',
  'risotto',
  'pasta',
  'pizza',
]);

console.log(ordenSet); //vemos que los duplicados no fueron tomados en cuenta

//NOTA los sets son iterables, el orden en los set es irrelevante, ademas de que no admite duplicados y tampoco posee indices, esto hace que en esta estructura de datos no podamos recuperar sus elementos.

console.log(new Set('nelson')); //como los string son iterables tambien podemos pasarlo

//VEAMOS COMO TRABAJAR CON SETS
console.log(ordenSet.size); //obtenemos el tamaño del set, seria como el lenthg en los arrayys
console.log(ordenSet.has('pizza')); //podemos comprobar con este metodo si exizte determinado elemente en el set
console.log(ordenSet.add('otro')); //podemos agregar elementos al set
console.log(ordenSet.delete('otro')); //podemos eliminar un elementos del set
//console.log(ordenSet.clear);con esta propiedad podemos eliminar todos los elementos del set

//ahora como los set s son iterables podemos recorrerlos
for (const orden of ordenSet) console.log(orden);

//entonces en donde podemos usar estos sets, bueno en muchos casos estos son usados para eliminar elementos duplicados de las matricez
//supongamos que tenemos a todo nuestro personal del restaurante en un array
const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];
//pero queremos saber solamente el tipo de personal que tiene el personal, en otras palabras no queeremos los duplicados, pues creariamos un set para esto.
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

//excelente, pero en realidad queremos que  sea un array y no un set, eso es facil ya que los 2 sosn iterables
//const staffUniqueArray = [...staffUnique];
//console.log(staffUniqueArray); //de hecho podemos hacerlo mucho mejor usando el operador de propagacion directamente al momento de crear el set.

//incluso podemos saltarnos la creacion de un array , por ejemplo si quisieramos saber el tamaño, podriamos  hacer simplemente esto
console.log(
  new Set(['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter']).size
);
*/

/*
console.log('---------OBJETOS EN BUCLE-----------');
//* Objetos en bucle: claves de objeto, valores y entradas
//aprendimos a recorrer arrays (iterables) con el ciclo FOR OF, pero tambien podemos recorrer objetos(No iterables) de manera indirecta. para esto tenemos varias opciones dependiendo de que exactamente queremos saber  o recorrer.
//NOTA 1-queremos recorrer los nombres de las propiedades del objeto, tambien llamadas 'KEYS', NO ESTAMOS RECORRIENDO EL OBJETO EN SI, lo hacemos sobre el array.

//primero echemosle un vistazo a este metodo 'Object.keys' para que veamos que realmente estamos recorriendo un array y no el objeto en si.
const properties = Object.keys(openingHours);
console.log(properties); //es de hecho un array lo que nos devuelbe este metodo

//como ejemplo podemos usar esto para saber cuantos propiedades posee ese objeto, en este ejemplo cuantas dias a la semana el restaurante esta abierto
let cadena = `el restaurante abre ${properties.length} dias a la semana : `;

//ahora que sabemos y vimos los ejemplos de arriba podemos recorrer este objeto, usando lo que recien realizamos
for (const day of properties) {
  cadena += `${day}, `;
}
console.log(cadena);
//NOTA 2-queremos recorrer los valores, usariamos el metodo 'Object.values' y funcionara de la misma manera que con los nombres (keys)
const values = Object.values(openingHours);
console.log(values); //vemos que tambien nos arroja un array con los 3 valores

//NOTA 3-queremos recorrer ambos, por ultimo para recorrer el objeto completo 'que ya habiamos visto una pincelada antes con los array', necesitamos las ENTRIES.
const entries = Object.entries(openingHours);
console.log(entries); //nos devuelve un array, basicamente mete el objeto en un array, en el cual tenemos la clave(nombre) y el valor.

//ahora podemos usar esto para recorrer todo el objeto
for (const x of entries) {
  console.log(x);
}

//usando lo que ya sabemos 'destructuracion' podemos crear una cadena para que lusca mas lindo. sabemos que tenemos la posibilidad de obtener el nombre(key) y los valores pues realizamos una destructuracion, pero sabemos que los valores en si vienen o son un objeto por lo que usamos esta sintxis para destructurarlos tambien
for (const [key, { open, close }] of entries) {
  console.log(
    `los dias ${key} abrimoa a las ${open} y cerramos a las ${close}`
  );
}
*/

/*
console.log('-----------OPCIONAL CHAINING (?)-----------');
//supongamos que queremos obtener el horario de apertura del dia lunes, sabemos que este dia no existe en nuestro objeto, pero supongamos que no sabemos porque los datos provienen de un servidor remoto. incluso vayamos mas alla supongamos que no sabemos tampoco si existe la propiedad 'openigHours' por lo cual tambien tendriamos que comprpbar si existe esta o no

if (restaurant.openingHours && restaurant.openingHours.monday) {
  console.log(restaurant.openingHours.monday.open);
}

//esto puede salirse un poco de control y volverse algo complejo cuando tenemos objetos anidados, es aca cuando entra en accion este operador de 'encadenamiento opcional'. //*lo que hace este operador es devolvernos inmediatamente 'indefinido' si es que lo que esta antes del signo de interrogacion no existe y no seguira leyendo el codigo, de esta manera nos saltamos el error.

console.log(restaurant.openingHours.monday?.open);

//podemos tener varios dentro de una misma sintaxis de esta manera podemos comprobar varios parametros sin tener que lidiar con algun error.
console.log(restaurant.openingHours?.monday?.open);

//veamos un ejemplo mas real. con nuestro objeto dias array dias de la semana
const diasSemana2 = [
  'monday',
  'tuesday',
  'wednesday',
  'thurday',
  'friday',
  'saturday',
  'sunday',
];
//recorramos este array y imprimamos en consola que dias este o no abierto el restaurante y si no lo esta en vez de dejarlo como 'indefinido' indicamos que esta cerrado. pero observamos que hay un error al usar el operador (||) y es que el dia sabado abre a las 0, por lo que lo toma como un valor false, por ,o que se activara y mostrara el string 'cerrado'. pero en este punto ya sabemos como solucionar este problema con el 'operador de fusion nulo (??)' que ignora las caddenas vacias y ceros como valores falsos.
for (const dias of diasSemana2) {
  // de hecho estos 2 operadores (?), (??) fueron hechos parfa trabajar juntos
  const open = restaurant.openingHours[dias]?.open ?? 'Cerrado';
  console.log(`los ${dias}, abrimos a las ${open}`);
}

//ahora este operador 'encadenamiento opcional'(?) tambien trabaja con metodos, podemos verificar si un metodo existe o no nates de llamarlo.
console.log(restaurant.orden?.(0, 1) ?? 'metodo no existe'); //podemos observar lo bueno que es este metodo
console.log(restaurant.Noexiste?.(0, 1) ?? 'metodo no existe');

//finalmente (?) tambien trabaja con arrays, nos permitira saber si un array esta vacio o no.
const users = [{ name: 'nelson', email: 'nelson@hotmail.cl' }];
console.log(users[0]?.name ?? 'array vacio');

//sin el encadenamiento opcional tendriamos que hacer algo asi
if (users.length > 0) {
  console.log(users[0].name);
} else {
  console.log('cadena vacio');
}
*/

console.log('---------OBJETOS LITERALES MEJORADOS-----------');
//* OBJETOS LITERALES MEJORADOS, esta es otra mejora u actualizacion para estos objetos, recordemos que un objeto literal se refiere a la forma o manera en la que escribimos o creamos un objeto manualmente. como nuestro objeto RESTAURANT

//la 1° mejora es que por ejemplo si tenemos el objeto 'openingHours' separado del objeto restaurant, para poder incorporarlo tendriamos que hacer algo asi. escribir el nombre de la propiedad seguido de el nombre del objeto al que queremos igualarlo. esto puede ser algo molesto
//openingHours: openingHours

//con esta mejora solo necesitamos el nombre de la propiedad que debe ser igual al nombre del objeto del cual proviene, pero no es necesario escribirlo(mirar el objeto restaurant).

//la 2° mejora que traen estos objetos literales es que ya no es necesario establecer una propiedad y asignarla a una funcion para crear esta propiedad (MIRAR LA PROPIEDAD ORDEN) esta contiene la nueva sintaxis.tambien podemos observar que vs code mantiene el color que caracteriza a los metodos en otras palabras es exactamente o mismo solo escrito de otra forma.

//finalmente  la 3° mejora es que ahora podemos calcular o introducir dinamicamente los nombres de las propiedades de un objeto en vez de escribirlas directamente, esto se demostrara con el objeto 'openigHours' que esta al comienzo.

/*
console.log('---------BUCLE FOR OF---------');
//*BUCLE FOR OF una nueva forma de recorrer array
//supongamos que queremos recorrer todo el menu,(mainMenu, StarMenu)
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

//con un bucle for normal seria de lasiguiente manera

for (let i = 0; i < menu.length; i++) {
  console.log(menu[i]);
}

//pero con este nuevo bucle, podemos ahorrarnos algunas lineas de codigo, lo que hace es recorrer toda la matriz de una vez, pero en cada iteracion tenemos acceso a ese elemento, pues lo que hacemos es mostrarlo en consola en cada iteracion. al igual que con las declaraciones if/else no es necesario usar bracket si solo tenemos 1 linea de codigo.
for (const elemento of menu) console.log(elemento);

//IMPORTANTE mencionar que es mas complejo obtener el indice del elemento en este ciclo, asi que hay que considerar esto, ya que fue diseñado solo para eso (entregar el elemento actual). sin enbargo podemos obtener este indice de todas maneras
for (const item of menu.entries()) {
  //este metodo entries, nos devolvera un array que contiene un array con los elementos,
  //console.log(item);
  //igual podemopos crear algo mas ordenado
  console.log(`${item[0] + 1}: ${item[1]}`);
}
//a esta altura podemos mejorar aun mas este ciclo for, ya que sabemos que 'item' es un array por lo que podemos destructurarlo inmediatamente y crear 2 variables
for (const [i, ele] of menu.entries()) {
  console.log(`${i + 1}: ${ele}`); //observamos que tenemos el mismo resultado
}
*/

/*
//*operadores de asignasion logica,(||=, ) estos operaadores se introdujeron en 2021 y vienen a remplazar al operador ||,  digamos mejor que nos permiten realizar lo mismo que el este operador pero de manera mas facil
//vamos a realizar un ejercicio para demostrar su uso, pero primero lo haremos con el operador OR y luego veremos como hacerlo con estos nuevos operadores.
const rest1 = {
  name: 'Capri',
  nuGuests: 20,
};
const rest2 = {
  name: 'La Piazza',
  ower: 'Giovani Rossi',
};

//supongamos que estos 2 objetos nos llegan desde una API y lo que queremos hacer es agregar una propiedad a cualquiera de estos que no la tenga, esto con el operador OR (||) seria de la siguiente manera
//rest1.nuGuests = rest1.nuGuests || 10;
//rest2.nuGuests = rest2.nuGuests || 10;
// el resultado correcto se debe al cortocircuito en este caso (||) al ser el primer operando TRUE imprimira este inmediatamente si no seguira buscando un true o imprimira en su efecto el ultimo operando. el objeto rest 1 si posee esta propiedad por lo tanto es true e imprimira su valor, en el caso del objeto rest2 no posee este operando por lo que es false y seguira evaluando y en este caso imprimira el ultimo que es el valor de 10.
//console.log(rest1);
//console.log(rest2);

//veamos ahora como seria esto con los nuevos operadores, si nos damos cuenta nos ahoramos de escribir 2 veces el objeto esto es exactamente lo mismo, pero lamentablemente no funciona en ciertas situasiones tal coo lo hace su hermano menor(||) y es cuando el numero de invitados es cero.
rest1.nuGuests ||= 10;
rest2.nuGuests ||= 10;

//pero al igual que su hermano menor esto se puede areglar con nuestro operador de asignasion null, solo reemplazandolo. recordemos porque esto funciona. este operador no toma en cuenta como valores falsos a el (0, y ' ') por lo que al no ser un falso sera true y se imprimira. tal cual paso con su hermano menor en el ejercicio anterior.
rest1.nuGuests ??= 10;
rest2.nuGuests ??= 10;

//*tal como tenemos este operador (||=) tambien tenemos uno para el operador (&&),
//recordemos que este operador efectuara el cortocircuito cuando elvalor sea false , si no seguira evaluando. en este ejemplo el objetro rest2 si posee esta propiedad por lo que segue evaluando y en este caso devuelve el ultimo valor que es esta cadena.

rest2.ower = rest2.ower && 'Anonimus';

//veamos como seria con este nuevo operador &&=
rest2.ower &&= 'Anonimus';
rest1.ower &&= 'Anonimus';

//podemos observar que funciona de la misma manera que con el operador ||, ahorrandonos de escribir algunas lineas de codigo.
console.log(rest2);
console.log(rest1);
*/

/*
//* operador de fusion nulo (??)

//veamos ahora como poder resolver el problema que se generaba cuando el numero de invitados es cero. observamos que a pesar de que el valor esxiste y es cero nos arroja el valor de 10, eso se debe a que 'cero' es considerado un valor falso
restaurant.numeroInvitados = 0;
const invitados = restaurant.numeroInvitados || 10;
console.log(invitados);

// esto lo solucionamos con este nuevo operador (??). analicemos porque ahora si funciona. IMPORTANTE todo se debe a que este operador trabaja con  el concepto de que solo los valores NULOS y UNDEFINED son valores falsos, los valores (0, y '')no son valores falsos para  el.
const invitadosCorrectos = restaurant.numeroInvitados ?? 10;
//entonces solo los valores nulos u undefined provocaran un cortocircuito, como 0 no es un valor nulo (para este operador) tomara el valor true. porque ahora  0 si el valido.
console.log(invitadosCorrectos);
*/
/*
//*veamos mas a profundidad los operadores AND(&) Y OR(||) ya que podemos usarlos en diferentes situaciones

//se menciono antes que estos siempre nos retornarian un booleano, pero eso no es del todo cierto. ya que estos poseen 3 propiedades que no se emncionaron antes (pueden usar cualquier tipo de dato, pueden devolver cualquier tipo de datos, y pueden realizar cortocircuito).

//lo que vemos en este ejemplo es un cortocircuito ¿como funciona? el cortocircuito es cuando el PRIMER elemento es verdadero este es el que sera devulto sin siquiera revisar los elementos restantes tal como en el ejemplo
console.log('---operador 0R(||)---');
console.log(3 || 'jonas');

//veamos otros ejemplos
console.log('' || 'jonas'); // el primer elemento es falso, se imprime 'jonas'
console.log(true || 'jonas'); // el primer elemento es verdadero, se imprime true
console.log(undefined || null); // los dos elementos son falsos, se imprime null

//no importa cuantos elementos este evaluando este operador, apenas se encuentre uno verdadero ese sera el que se imprimira(cortocircuito), si no se encuentra ningun elemento verdadero imprimira el ultimo de los elementos. esto tiene sentido ya que este operador nesecita que solo 1 sea verdadero para ser verdadero.
console.log(undefined || 0 || '' || 'hola' || null);

//veamos a continuacion un ejemplo mas practico de este operador, supongamos que queremos establecer un numero predeterminado de visitas si es que no hubiesen visitas en nuestro objeto restaurant.
const invitados1 = restaurant.numInvitados ? restaurant.numInvitados : 10;
//podemos observar en este operador ternario que si existe esta propiedad sera esa la que tomara si no existe sera el valor de 10 (predeterminado) el que tomara
console.log(invitados1);

//pero podemos usar el cortocircuito para determinar esta misma situasion de una manera mas sencilla, y funciona devido a lo anterior (cortocircuito)
const numInvitados2 = restaurant.numInvitados || 10;
console.log(numInvitados2);

//IMPORTANTE si el numero de invitados es 0 este ejercicio no resultara ya que el valor de cero es un valor falso, por lo que imprimira 10. veremos una solucion para este tipo de problemas mas adelante

console.log('---operador AND (&)---');

//lo que realiza este operador es exactamente lo opuesto al operador 'or'. se observa que el cortocircuito ahora se ejecuta al encontrar un valor falso
console.log(0 && 'jonas');
//al ser los 2 falsos imprimira el ultimo
console.log(7 && 'jonas');

//IMPORTANTE literalmente lo opuesto al operador 'or' y este comportamiento tiene logica ya que se necesita que todos los operandos sean verdaderos para que se establesca el resultado en verdadero, un solo valor falso y sera falso el resultado.

console.log('hola' && 23 && null && 'jonas');

//veamos otro ejemplo: supongamos que no sabemos si el metodo 'ordenPizza' existe, pues usariamos una declaracion  para comprobarlo
if (restaurant.ordenPizza) {
  restaurant.ordenPizza('tomates', 'jamon');
}
//podemos realizar esto de una manera mas cencila. si el primer operando (no exite, es indefinido etc), pues se realizara el cortocircuito, pero si existe osea es true, entonces seguira evaluando y devolvera el ultimo operando que en este caso es la llamada a la funcion.
restaurant.ordenPizza && restaurant.ordenPizza('jamon', 'pepinos');

*/

/*
//* PATRON DE DESCANZO Y PARAMETROS
//este patron de descanso tiene la misma sintaxis que el operador de propagacion, la forma para saber cual es cual es que el operador de propagacion siempre operara del lado derecho del signo igual y el patron de descanso lo hara del lado izquierdo

//incluso podemos usarlo en conjunto con la destructuracion recordar que esta tambien actua del laldo izquierdo del signo igual
const [a, b, ...otros] = [1, 2, 3, 4, 5];
//vemos que a y b toman el valor de los 2 primeros valores del array quedando como variables separadas y el resto queda enpaquetado dento del nuevo array 'otros'.
console.log(a, b, otros);

//veamos otro ejemplo en el cual tambien comprabamos que podemos usar estas 3 sintaxis (desestructuracion, operador de propagacion y patron de descanso) al mismo tiempo
const [pizza, , risoto, ...otraComida] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
//IMPORTANTE tener en cuenta que el patron de descanso toma toda la matriz despues de la ultima variable por lo que no incluye ningun elemento que haya sido omitido como es el caso. es por esa razon que el patron de desclanso debe ser el ultimo en la estructura de desestructuracion. ESTO NO ESTA PERMITIDO const [pizza, algo, ...otraComida, estoNo] = [].  por la misma razon solo debe haber 1 patron de descanso en una estructura de destructuracion.
console.log(pizza, risoto, otraComida);

//veamos un ejemplo con objetos porque tambien funciona para los objetos, que seria en vez de recopilar los ultimos elementos en una matriz lo hara en un nuevo objeto.

const { sat, ...diasSemana } = restaurant.openingHours;
console.log(sat, diasSemana);

//*ya sabemos como funciona este patron de descanso con la estructura de destructuracion ahora veamos como funciona con las funciones.

//lo que hacemos aca es usar este patron de descanso para agrupar los parametros que e pasamos a una funcion que se conoce como 'rest parameters'
const add = function (...parametros) {
  let suma = 0;
  for (let i = 0; i < parametros.length; i++) {
    suma += parametros[i];
  }
  console.log(suma);
};

add(1, 2);
add(3, 4, 2, 3);
add(8, 6);

//realicemos algo parecido ahora con el operador de propagacion, que pasa si tenemos de hecho un array y queremos que estos numeros del array se tomen como separados tal como lo hicimos en el ejercicio anterior con el patron de descanso
const x = [23, 5, 7];
add(...x); // utilizamos el operador de propagacion(desenpacamos del array) y luego inmediatamente se enpacam en otro array

//veamos otro ejemplo de algo que podriamos usar y para eso agregaremos otro metodo a nuestro restaurant, llamamos a el metodo y le damos una lista de condimentos, el primero sera el comdimento principal que se almacenara en la primera  variable el resto se almacenaran en un array.

restaurant.ordenPizza('tomate', 'aceitunas', 'quesso', 'jamon');


//muchas veces en nuestras funciones tenemos muchos parametros que pueden confundiir a otros incluso a nosotros mismos es por eso que existe una practica en la que podemos pasarle un objeto con algunas propiedades a nuestra funcion la cual se terminaran transformando en sus parametros. esto lo hacemos destructurando inmediatamente este objeto
restaurant.ordenDelivery({
  time: '22:30',
  address: 'guanuco 21',
  mainIndex: 2,
  starterIndex: 2,
});


//* operador de propagacion
console.log('----------------------------');
//es introducido en 2015 y nos ayuda a expandir un array, en otras palabras podemos sacar de un array sus elementos y ponerlos en otro array de manera individual, este operador es muy util cada vez que nesecitemos elementos separados por comas.tambien es util cuando necesitamos pasar varios elementos a una funcion
//EJEMPLO: supongamos que queremos introducir 2 nuevos elementos a este array
const arr = [7, 8, 9];
//esta seria la forma manual de hacerlo
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];

//esta seria la forma de hacerlo con el operador de propagacion
const newArray = [1, 2, ...arr]; 
console.log(newArray);

//supongamos que queremos los elementos de un array , pero solos
console.log(...newArray);

console.log('----------------');

//veamos como funciona con objetos, supongamos que queremos agregar un elemento mas al menu de nuestro restaurante
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
//IMPORTANTE no estamos manipulando el objeto restaurante, simplemente creamos un array nuevo
console.log(newMenu);

console.log('--------------');
//crear copias superficiales es una de las utilidades que tiene este operador ya lo vimos en el ejercicio anterior, pero veamoslo otra vez
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//otra situacion en la que es muy utilizado este operador es para unir 2 o mas arrays
const NuevoMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(NuevoMenu);

//este operarador no solo funciona con los array de hecho funciona con todos los iterables que javascript tiene(arrays, cadenas, mapas, conjuntos), pero no con objetos
const str = 'nelson';
const letras = [...str];
console.log(letras);

//lo que No podemos hacer es por eejemplo usar este operador en una plantilla, porque no es un lugar en el que javascript espere elementos separados por coma. IMPORTANTE: GENERALMENTE SE ESPERA CUANDO CREAMOS UNA NUEVA MATRIZ O CUANDO LE PASAMOS ARGUMENTOS A UNA FUNCION.
//console.log(`${...str}`);

//veamos otro ejemplo con una funcion crearemos una nueva ppropiedad en nuestro restaurante en el que se indique el ingrediente los cuales el usuario ingresara.

const ingredientes = [
  //prompt('escoja Ingredientes a elegir! Ingrediente 1?'),
  //prompt('Ingrediente 2?'),
  //prompt('Ingrediente 3?'),
];
//console.log(ingredientes);
//esta seria la forma de llamar a la funcion sin el operador de propagacion
//restaurant.ordenPasta(ingredientes[0], ingredientes[1], ingredientes[2]);

//esta seria la forma de llamar a la funcion con el operador de propagacion
//restaurant.ordenPasta(...ingredientes);

//*IMPORTANTE: desde 2018 este operador si puede trabajar con objetos, veamos algunos ejemplos
const newRestaurante = {
  fundadoEn: 1990,
  ...restaurant,
  fundador: 'gusepe bertolini',
};
console.log(newRestaurante);

//tambien podemos crear una copia superficial de este objeto
const restauranteCopy = { ...restaurant };
//con esto comprobamos que realmente es una copia ya que los 2 nombres son distintos para cada objeto
restauranteCopy.name = 'Ristorante roma';
console.log(restauranteCopy.name);
console.log(restaurant.name);

//*DESESTRUCTURACION DE OBJETOS
console.log('-----------------------');
/*

//al igual que con las matrizes podemos separar objetos en variables independientes, eso si debemos poner como nombre de las variables exactamente el mismo nombre que tiene en el objeto, de esta manera tampoco sera necesario dejar espacios para saltar elementos.
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//que pasa si ahora queremos darle otro nombre a mis variables, esto se puede jhacer de una manera cencilla, pero siempre hay que hacer la referencia al nombre del objeto.
const {
  name: restorantName,
  openingHours: horas,
  categories: categorias,
} = restaurant;
console.log(restorantName, horas, categorias);

//al igual que con las matricez podemos declarar variables predeterminadas , para los casos en que no sepamos cuantos datos tenga ese objeto
const { menu = [], starterMenu: entrada = [] } = restaurant;

//en este caso la variable 'menu' no existe por ende tomara el array vacio como valor predeterminado, por el contrario lo que hacemos con starterMenu que si existe le cambiamos el nombre y establecemos su valor predeterminado tambien a un array vacio, pero como si existe este no tendra efecto y tomara el valor correspondiente.
console.log(menu, entrada);

//*veamos ahorra la mutacion de variables que ya lo vimos en la destructuracion de matricez, pero que en el caso de los objetos funciona diferente.

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

//si bien esta destructuracion esta  correcta hay que tener en cuenta que cuando comenzamos con llaves solas javascript espera un bloque de codigo el cual no se lo estamos danndo es por eso el error que nos marca. para solucionar esto debemos cerrar toda la estructura entre parentesis
({ a, b } = obj);

//*veamos ahora como podemos desestructurar objetos anidados (un objeto dentro de otro)
const {
  fri: { open: apertura, close: cierre },
} = openingHours;
console.log(apertura, cierre); //como se observa es muy parecidoa a como se realiza con las matricez
*/
//*DESESTRUCTURACION DE MATRICES
/*
//es una caracteristica moderna que basicamente permite descomprimir valores de una matriz u objeto en variables separadas. en otras palabras es DIVIDIR UNA ESTRUCTURA DE DATOS COMPLEJA EN UNA ESTRUCTURA DE DATOS MAS SIMPLE

//para los array (matrizez) lo utilizamos para recupertra sus elementos y almacenarlos en variables de una manera muy facil.

//para realizar una desestructuracion de forma manual lo hariamos de la siguiemte manera
const arr = [2, 4, 5];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//pero ahora con la desestructuracion podemos hacer esto todo de una vez, usamos corchetes por ser un array, el primer elemento de esta estructura sera el primer elemento del array y asi sucesivamente.
//*basicamente javascript sabe que cuando ve esta estructura del lado izquierdo del '=' sabe que debe realizar una desestructuracion, porque a simple vista es un array mas. pero no lo es .
const [x, y, z] = arr;

console.log(x, y, z); //comprobamos que efectivamente asi es
console.log(arr); //importante señalar que el array original no se ve afectado
*/
/*
//veamos algunos otros ejemplos, saquemos de nuestro objeto restaurante los 2 primeras platos de la propiedad 'categorias'

let [primer, segundo] = restaurant.categories;
console.log(primer, segundo);

//pero que pasa si lo que queremos sacar no esta en orden? por ejemplo queremos el primer y tercer elemento de la propiedad categorias, bueno solamente debemos dejar ese elemento que no queremos y lo hacemos dejando en blanco un espacio.
const [primero, , tercero] = restaurant.categories;
console.log(primero, tercero);

//*truco
//SUPONGAMOS QUE EL DUEÑO DEL RESTAURANTE DECIDE CAMBIAR LA PRIORIDAD DE LOS PLATOS Y AHORA PONE LA PIZZA EN PRIMER LUGAR Y LA COMIDA ITALIANA EN SEGUNDO.

//manualmente esto seria algo asi
//const temporal = primer;
//primer = segundo;
//segundo = temporal;
//console.log(primer, segundo);

//pero usando la desestructuracion lo hacemos de la siguiente manera y es mucho mas facil, si lo analizamos primero creamos el array que queremos construir en este caso sera con la pizza primero y el plato italiano segundo y luego simplemente lo desectructuramos. y como sabemos el primer elemento de esta estructura sera el primer elemento del array.
[primer, segundo] = [segundo, primer];
console.log(primer, segundo);
*/
/*
//* otro truco que podemos usar con la desestructuracion es cuando una funcion devuelbe un array, podemos desenpaquetar inmediatamente ese array. ESTO NOS PERMITE DEVOLVER MUCHOS VALORES DESDE UNA FUNCION
console.log('-------------');
//veamos como seria, agregamos un metodo para agregar comida a nuestro objeto restaurante y procedemos a llamrlo

console.log(restaurant.orden(2, 0)); //comprobamos que efectivamente es un array con los elementos indicados

//pero ahora desestructuramos para obtener estas elementos de forma separada
const [starter, main] = restaurant.orden(2, 0);
console.log(starter, main);

//* QUE PASA SI TENEMOS UN ARRAY ANIDADO?
//toma  el array como un elemento mas
console.log('--------------------');
const anidado = [2, 4, [5, 6]];
const [i, , j] = anidado;
console.log(i, j);

//* y que pasa si realmente queremos obtener todos los elementos separados individualmente, bueno la logica a seguir seria realizar una destructuracion dentro de otra, siguiendo el patron del anidado que se tenga.
console.log('--------------------');
const anidado2 = [2, 4, [5, 6]];
const [p, q, [s, t]] = anidado2;
console.log(p, q, s, t);
*/
/*
//*hay situasiones en la que no sabemos la cantidad de elementos que hay en un array, por lo podriamos definir mas variables que elementos en el array
const [a, b, c] = [8, 9];

//obtenemos indefinido porque queremos mostrar un elemento que no hay
console.log(a, b, c);

//para solucionar esto podemos ponerle valores de manera anticipada o predeterminada estos valores solo se tomaran en cuenta cuando en dicha posicion no exista elemento alguno, en este caso le ponemos valores predeteeerminadps a todos, pero solo toma el 'g' que es el valor que no existe los demas tomaran el valor normal que les corresponda
const [d = 1, f = 1, g = 1] = [8, 9];
console.log(d, f, g);
*/
