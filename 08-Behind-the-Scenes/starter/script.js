'use strict';
/*
function calcAge(añoNacimiento) {
  const edad = 2022 - añoNacimiento;
  console.log(primerNombre);
  return edad;
}

//si ponemos la variable 'primerNombre' despues de haber llamado a la funcion obtendremos un error de referencia que dira que no se puede tener accesos a la variable despues de haber llamado a la funcion, porque no buscara mas abajo en el cokdigo
const primerNombre = 'nelson';
calcAge(1991); //vemos que a pesar de que la variable 'primer-nombre' no esta dentro de scope de la funcion, aun asi el resultado es el esperado gracias al scope-chain
*/
/*
function calcAge1(añoNacimiento) {
  const edad = 2022 - añoNacimiento;

  function printEdad() {
    const output = `${primerNombre} tu tienes ${edad}, naciste en el año ${añoNacimiento}`;
    console.log(output);

    if (añoNacimiento >= 1981 && añoNacimiento <= 1996) {
      var millenial = true;
      //que pasa si tenemos la variable en este bloque javascript no buscara afuera porque la encontrara en su propio bloque ,or lo tanto el string apatrecera con este nombre, pero el string anterior que esta en la primera funcion seguira siendo nelson ya que no puede mirar hacia adentro solo puede buscar esa variable afuera y afuera esta la variable definida en 'nelson'. //*es por ese motivo que podemos tener variables con el mismo nombre u parametros iguales en diferentes funciones porque simplemente pertenecen a bloques diferentes por lo tanto no generan problemas.
      const primerNombre = 'pedro';
      const str = `¡Oh tu eres un millenial! ${primerNombre}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    //esta llamada a la funcion nos dara un error ya que los argumentos 2 y 7 no pueden acceder a los parametros a y b, esto demuestra que las funciones tambien poseen alcanse de bloques, pero solo en modo stricto si desactivamos el modo estricto veremos que si podemos llamar a la funcion.
    //add(2, 7);

    // esta linea nos dara un error ya que el 'scope- chain' no puede ir de afuera hacia adentro para buscar esa variable.
    //console.log(str);
    //pero si definieramos esta u otra variable con 'VAR' y luego trataramos de imprimirla desde afura si tendriamos acceso ya que solo LET Y CONST  crean bloques 'VAR INGORA LOS BLOQUES'
    console.log(millenial);
  }
  printEdad();
  return edad;
}
const primerNombre = 'nelson';
calcAge1(1991);

//esta linea nos dara un error ya que el 'scope-chaint' solo se ejecuta de adentro a hacia afuera por lo que el ambito global no puede tener acceso a la variable edad. lo mismo pasara si llamamos a la funcion printEdad en este ambito global.
//console.log(edad);
*/

//HOISTING Y TDZ (ZONA TEMPORAL DE LA MUERTE) EN PRACTICA
/*
console.log(me);
console.log(job);
console.log(year);

//tal como se esperaba la variable declarada con var sufre el hoistin, pero es declarada como undefined la variables deffinidas con let y const sufren del hoisting, pero se encuentran en esta zona en donde no pueden ser accesibles
var me = 'nelson';
let job = 'teacher';
const year = '1991';
*/

//*veamos que pasa con las funciones
/*
//tal como se esperaba, la unica funcion a la que podemos acceder antes de que sea declarada es la funcio declarativa, las demas por tener let o const entraran en esta zona temporal en la cual no podran ser accesibles(RECORDAR que las funciones son tratadas como una varible mas)

console.log(addDeclara(2, 3));
console.log(addExpres(2, 3));
console.log(addArrow(2, 3));

function addDeclara(a, b) {
  return a + b;
}
//para el caso de una funcion definida con var el mensaje sera 'addExpres no es una funcion' ya que esta se establecio en indefinida por lo que estamos tratando de llamar a una funcion entre commillas llamada indefinida, pero la llamamos con otro nombre 'addExpres'.
var addExpres = function (a, b) {
  return a + b;
};
//pero las funciones a si como las variables definidaas con let o const sufren del hoisting, pero son puestas en esta zona de la muerte temporal, por lo que no pueden ser accedidas hasta que se lea el codigo donde realmente estan escrita
const addArrow = (a, b) => a + b;
*/

/*
//*en este ejeplo veremos un posible error que podemos cometer si no tenemos cuidado
//EJEMPLO en este ejemplo queremos llamar a la funcion solo cuando el valor de la variable 'numProduct' sea falso osea sea 0 ya que el cero recordemos es un valor falso.

//la razon por la cual la funcion es llamada a pesar de que la variable 'numProduct' esta definida con un valor de 10, es porque en el punto en el que fue llamada (antes) su valor es indefinido ('numProducts = indefinido')porque se declaro con 'VAR' y como recordamos indefinido tambien es una valor falso, y como estamos negando pasa a ser verdadero
if (!numProducts) deleteShopingCart();
var numProducts = 10;

function deleteShopingCart() {
  console.log('all product deleted');
}
*/

/*
//EJEMPLO 2, otra diferencia entre estas varibles con lo que respecta  al hoisting es que var crea una propiedad en el objeto principal osea en el objeto windows, esto lo podemos comprobar analizando este objeto en la consola veremos que la variable x esta presente como propiedad, pero las variables let y const no crean propiedades en el objeto windows

var x = 1;
let y = 2;
const z = 3;

//tambien podemos comprobar esto de esta manera, comprobamos que la varible x es en realidad una propiedad del objeto window, si realizamos lo mismo para otro variable definida con let o const el resultando sera false
console.log(x === window.x); //true
console.log(y === window.y); //false
*/
/*
//* palabra this en practica

//primero veamos esta palabra en el ambito global, en este caso esta palabra apunta al objeto windows
console.log(this);

//veamos ahora como se comporta dentro de una funcion regular, a esto me refiero a una funcion sin ningun objeto adjunto. se observa que esta palbra esta definida como undefine RECORDAR que esto solo aplica si estamos en modo stricto (siempre debemos usar) sin el modo stricto esta palabra apuntaria al objeto window
const calcAge = function (añoNacimiento) {
  console.log(2022 - añoNacimiento);
  console.log(this);
};

calcAge(1991);

//veamos ahora el comportamiento dentro de una funcion flecha, vemos que el resultado es el objeto windows, pero ¿porque? si al igual que la funcion anterior deveria ser indefinido, bueno eso es debido a que la funcion flecha no crea esta palabra si no que la hereda de su contexto mas cercano que en esta caso es el objeto windows por lo tanto no es la palabra this de la funcion la que vemos como resultado es la palabra this del objeto windows por eso no es indefinido.
const calcAge1 = añoNacimiento => {
  console.log(2022 - añoNacimiento);
  console.log(this);
};
calcAge1(1990);
*/
/*
//veamos ahora esta palabra dentro de un objeto, en este caso como ya lo habiamos visto es el objeto jonas el dueño del metodo(funcion) es el el que llama al metodo, por lo que vemos en la consola es el objeto jonas.
const jonas = {
  year: 1991,
  calcAge2: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge2();

//IMPORTANTE hay que tener en cuenta que NO necesariamente la palabra this apuntara al objeto que la posee como en el ejemplo anterior. esta apuntara al objeto que llama al metodo , en otras palabras a lo que esta antes del punto.

const matilda = {
  year: 2017,
};

// como sabemos las funciones son simples valores como una variable, por lo que podemos copiar una funcion a otra, a esto se le llama prestamo (prestamos el metodo de un objeto a otro)
matilda.calcAge2 = jonas.calcAge2;

//entonces ahora que los 2 poseen el metodo, ¿a donde apuntara esta palabra this?, exactamente como lo sabemos la palabra this apuntara al objeto que llama al metodo y no necesariamente al dueño de este, en este caso la edad sera (2037 - 2017) que es el año de nacimiento  de matilda no la de jonas a pesar que esta escrita dentro de el objeto jonas es matilda la que llama al metodo.
//*por eso se dice que THIS es dinamica y no estatica. su valor dependera de donde se llame
matilda.calcAge2();

//al igual que en el ejemplo anterior ponemos esta funcion(metodo) dentro de una variable(f) afuera del objeto (en el contexto global) si analizamos esta variable veremos que en realidad es la funcion
const f = jonas.calcAge2;

//y si llamamos a este metodo, obtendremos indefinido que es el resultado esperado y por su puesto un error porque en este punto this sera indefinido. es indefinido porque 'f' en este punto es la funcion 'jonas.calcAge ' y no podemos acceder a este porque estamos en modo estricto y no tiene padre
f();
*/
/*
//*PRINCIPALES DIFERENCIAS ENTRE LAS FUNCIONES REGULARES Y LA FUNCION FLECHA EN CUANTO AL COMPORTAMIENTO DE LA PALABRA THIS

//sabemos que las funciones flecha no crean su propia palabra this, estas ocupan o heredan la palbra this de su contexto global mas cercano, en este caso el contexto mas cercano es el contexto global.

//*IMPORTANTE podriamos pensar que los brackets del objeto son su contexto mas cercano, pero no , este objeto nelson es solo la forma literal de escribir un objeto NO CREAN SU PROPIO CONTEXTO, es por eso que recibimos indefinido RECORDAR  que debemos usar siempre el modo stricto para que nos de indefinido.

//! recordemos que VAR crea propiedades en el objeto windows por lo que si utilizamos var obtendremos la referencia de la palabra this en este caso si apunta a esta propiedad del objeto window
var firsName = 'matilda';

const nelson = {
  firsName: 'nelson',
  year: 1991,
  calcAge3: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
  greet: () => console.log(`hola ${this.firsName}`),
};
nelson.greet();

//*cuando intentamos acceder a determinada propiedad que no existe en determinado objeto NO obtenemos un error si no que obtenemos undefine esto no lo habiamos visto hasta ahora, ya que vimos que en otros ejemplos con funciones si recibiamos un error al aceder a una funcion que esta indefinida.
*/
/*
//veamos otro ejempplo de posible error de esta palabra THIS (cuando tenemos una funcion dentro de un metodo)

const nelson1 = {
  firsName: 'nelson',
  year: 1991,
  calcAge3: function () {
    //console.log(this);
    console.log(2037 - this.year);
    const self = this; //en este punto aun tenemos accesos a esta palabbra this del objeto nellson1
    const isMillenial = function () {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996); //reemplazariamos this por esta palabra self en esta linea, y a travez de el scope-chain como no encuentra esta palabra self, pero si se encuentra en el entorno de el objeto nelson1. (de esta manera preservamos la palabra this)
      //la otra solucion es usar la funcion flecha ya que esta no posee su propia palabra this, la obtendra de su contexto mas cercano el cual es el del objeto nelson1
    };
    //eta es una llamada regular de una funcion aunque este dentro de un metodo y la regla dice que cualquier llamada regular de una funcion debe ser 'undefine' (no es lo mismo una funcion atada a un objeto que una funcion dentro de un metodo), pero igual esta el error ¿que podemos hacer? tenemos 2 soluciones la primera es la mas antigua que es utilizar una variable extra conocifda como self
    isMillenial();
  },
  greet: () => console.log(`hola ${this.firsName}`),
};
nelson1.greet();
nelson1.calcAge3();
*/
/*

//*por ultimo hablemos de la la palabra clabe que obtienen los argumentos, al igual que la palabra THIS para las funciones regulares tambien existe unna palabra clave para los argumentos de las funciones regulares y esta es 'ARGUMENTS' que nos mostrara basicamente un array con los argumentos que tengamos //IMPORTANTE debemos saber que podemos tener mas argumentos de los parametros que tengamos en la funcion, simplemente no tendran nombres, pero existiran en este array

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 4, 8, 4);

//al igual que con la palabra this las funciones flechas no obtienen esta palabra 'arguments'

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
console.log(addArrow(2, 5));

//IMPORTANTE de todas maneras esta plabra 'arguments ya no es tan importante en javascripts moderno ya que existe una forma mas sencilla de manejar muchos parametros
*/

//*pasando a otra seccion veamos una fuente de confusion que tiene que ver con como se guardan los datos en memoria de los typos objetos y primitivos

/*
// en este ejemplo todo funciona como lo esperado
let edad = 30;
let edadAntigua = edad;
edad = 31;
console.log(edad);
console.log(edadAntigua);

//veamos este otro ejemplo utilizando objetos
const yo = {
  name: 'nelson',
  edad: 30,
};

//supongamos que tengo un amigo que se llama igual que yo, pero la edad es diferente, entomces en vez de crear un nuevo objeto copiamos el actual
const amigo = yo;
amigo.edad = 27;
console.log('amigo:', amigo);
console.log('yo', yo);
*/

//*objetos y primitivos en practica
//en este ejemplo todo funciona de manera intuitivamente normal, y eso es devido a que los tipos primitivos se almacenasn en la pila

let lastName = 'willians';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

//pero con los objetos(objetos de referencia) se almacenan de una manera un poco diferente ya que este se almacenara en el Head y la pila (stack)solo mantiene una referencia al objeto que esta almacenado en la memoria del head.
const jessica = {
  firtName: 'jessica',
  lastName: 'willians',
  eage: 26,
};

//suponemos que jessica se casa, pues creamos un objeto para ese caso, por lop que su apellido cambiara, por lo que copiamos el objeto jessica o eso es lo que parece  , pero en realidad solo creamos una referencia a ese objeto (en el stack) que apuntara a ese objeto en el head
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

//este comportamiento sucede porque no se creo un nuevo objeto en el head, es solo otro espacio de memoria en el stack que apunta hacia la memoria del head, en otras palabras el identificador apunta al mismo objeto a ese espacio de memoria especifico, por lo que si cambia en uno cambiara en los dos ya que se apunta al mismo objeto. es una de las razones por la cual se puede 'cambiar'  a pesar de estar escrita con CONST porque no cambiamos el valor en si, solo lo cambiamos en el head que es su referencia LO QUE REALMENTE DEBE ESTAR IN ALTERABLE ES SU VALOR EN EL STACK. y eso se mantiene.
console.log('antes de casarse: ', jessica);
console.log('despues de casarce: ', marriedJessica);

//por ejemplo esto No se puede hacer porque en este ejemplo si estariamos cambiando la memoria en el stack y eso si que no se puede hacer al haberla declarado con CONST
//* no es lo mismo cambiar una propiedad que cambiar un objeto completo
//marriedJessica = {};

//veamos otro ejemplo de como si poder copiar un objeto y no solo apuntar al mismo
const jessica2 = {
  firtName: 'jessica',
  lastName: 'willians',
  age: 27,
};
//podemos observar en consola que ahora si existe un objeto completamente nuevo. no hay referencia es un objeto nuevo, se puede apreciar en la consola como ahora si el objeto mantiene sus propiedades y el nuevo objeto adquiere la nueva propiedad de 'Davis'.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('antes de casarce ', jessica2);
console.log('despues de casarce: ', jessicaCopy);

//existe un problema con este 'object.assign' ya que solo puede copiar un objeto cuando se trabaja a nivel superior o en otras palabras cuando tenemos un objeto dentro de otro la copia ya no funcionara, por eso se conoce esta copia como 'supercial'.

//veamos en el siguiente ejemplo lo que acabo de explicar sobre esta copia. recordemos que un array es un objeto
const jessica3 = {
  firtName: 'jessica',
  lastName: 'willians',
  age: 27,
  family: ['alice', 'bob'],
};

const jessicaCopy2 = Object.assign({}, jessica3);
jessicaCopy2.family.push('mary');
jessicaCopy2.family.push('nelson');

//podemos observar que tanto para jessica3 como para su copia sus propiedades en este caso family son las mismas eso significa que NO hay copia es solo otro espacio de memoria que punta al mismo objeto en la memoria head
console.log('antes de casarce ', jessica3);
console.log('despues de casarce: ', jessicaCopy2);
