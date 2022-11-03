'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 12,
    },
    fri: {
      open: 11,
      close: 13,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },
  orden: function (starterIndex, mainIndex) {
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
//* patron de descanso y parametros
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
