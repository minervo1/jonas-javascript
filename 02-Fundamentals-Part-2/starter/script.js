//comenzar un script en modo estricto es buena practica ya que nos ayudara a evitar errores. 1-inpidiendo realizar ciertas cosas y 2- mostrandonos errores visibles que sin este modo no serian visibles.
'use strict';

console.log('---Modo estricto---');
/*
//veamos un ejemplo sencillo de lo que este MODO ESTRICTO nos ayudaria. introducimos el nombre de la variable 'tieneLicencia'de manera erronea en la linea 8 podemos apreciar que sin el modo estricto este error no es informado, pero con el modo activado en consola si nos aparece el error
let tieneLicencia = false;
const pasoPrueba = true;

if (pasoPrueba) tieneLicencia = true;
if (tieneLicencia) console.log('Puedo conducir');

//otra cosa que hace este modo estricto es introducir una lista de palabras reservadas que podrian en un futuro utilizarce en javascript. podemos observar que nos advierte de que esta palabra podria ser usada en javascript en un futuro, lo que podria producir un error.

//const interface = 'Audio';
//const private = 234;
*/

console.log('---Funciones---');
/*
//las funciones son piezas de codigo completas, osea que es un codigo que realiza algo
function registra() {
    console.log('esta funcion solo imprime esta cadena');
}

//las funciones podemos llamarlas, invocarlas o usarlas cuantas veces las nesecitemos
registra();
registra();
registra();

//otras cosas que puedden hacer las funcioens es devolver datos u nosotros pasarle datos, y haci utilizar esos datos en nuestro codigo u datos que sean generados pasarcelos a esta.
//EJEMPLO una analogia de una funcion podria ser una maquina que resibe frutas y devuelbe un elado. asi podriamos ver a una funcion que resibe como parametros datos. veamos este ejemplo en la practica

//esta funcuion recibe 2 parametros (manzanas y naranjas) y crea helado el cual es un valor que devuelbe
function procesadorHelado(manzanas, naranjas) {
    const helado = `helado con ${manzanas} manzanas y ${naranjas} naranjas.`;
    return helado;
}

//este valor devulelto debemos capturarlo por asi decirlo, podemos hacerlo usando una variable, en la cual almacenaremos el valor devuelto por esta y para eso debemos llamar a la funcion. pasandole los argumentos(valores) que tendran estos paremetros.
const heladoFrutas = procesadorHelado(4, 3);
console.log(heladoFrutas);
//o simplemente podemos imprimir inmediatamente este valor en consola
console.log(procesadorHelado(4, 3));

//la funcion que creamos es una funcion genemmrica por lo que podemos llamar a esta funcion con diferentes valores 
const heladoFrutas1 = procesadorHelado(1, 6);
console.log(heladoFrutas1);

//NOTA una de las funciones principales que tienen las funciones es que nos ayudan a mantener un codigo mas limpio al permitir no escribir el mismo codigo una y otra vez.ya que con las funciones podemos reutilizar este codigo.       
*/
console.log('---function expression and declarations---');
/*
//*en javascript hay 2 formas de declarar o escribir un funcion lo que hemos visto hasta ahora es la funcion declaratoria que es donde uso la palabra function seguido del nombre de la funcion veamos un ejemplo mas de este tipo de funcion.

//a diferencia de la funcion que vimos anteriormente nos damos cuenta que no es necesario almacenar el dato generado o devuelto en una variable podemos simplemente enviarlo tal como se muesra en el ejemplo, pero sigue siendo una funcion generica
function calcAge(birthYeah) {
    return 2022 - birthYeah;
}

const age = calcAge(1999);
console.log(age);

//* ahora veamos la misma funcion , pero escrita como funcion expression, seguimos usando la palabra clave, pero ahora es una funcion sin nombre,(funcion anonima)la cual almacenamos en una variable y esta variable sera la que contenga la funcion o sera la funcion mejor dicho. en otras palabras esta funcion es una expresion y toda expresion produce un valor entonces almacenamos este valor en una variable. y la razon por la cual podemos hacer esto es porque en javascript las funciones es un valor.

const calcAge1 = function (birthYeah) {
    return 2022 - birthYeah;
}
const age1 = calcAge1(1999);
console.log(age1);

//* a las funciones declarativas podemos llamarlas ANTES de ser DEFINIDAS, pero las funciones expresiones NO
//NOTA el uso de una o de otra funcion es cosa de gustos

const age2 = calcAge2(1999);
console.log(age);

function calcAge2(birthYeah) {
    return 2022 - birthYeah;
}
*/
console.log('---funciones flechas---');
/*
//de hecho exite una tercera forma de declarar funciones que son las funciones flechas esta se agrego en ES6. esta funcion es otra forma mas corta de escribir una funcion expresion
//EJEMPLO 
const calcAge2 = function (birthYeah) {
    return 2022 - birthYeah;
}

//funcion flecha, podemos observar que como cualquier funcion expresion esta se almacena en una variable que pasara en efecto a ser la funcion propiamente tal, seguido de los parametros que le pasemos y lo que quereemos calcular. toodo con este mismo formato. especialmente util para funciones censillas.
const calcAge3 = birthYeah => 2022 - birthYeah

const age3 = calcAge3(1999);
console.log(age3);

//ahora esta funcion flecha se vuelve un poco mas compleja al momento de tener mas lineas de codigo u mas parametros que resibe. podemos observar que a medida que necesitemos mas codigo si sera necesario tener los corchetes al igual que la palabra clave RETURN, que solo se podra omitir cuanddo tengamos 1 linea de codigo como en el ejemplo anterior.
const añosParaJubilar = añoNacimiento => {
    const edad = 2022 - añoNacimiento;
    const jubilacion = 65 - edad;
    return jubilacion;
}

//recordar que podemos almacenar este dato devuelto como no hacerlo
console.log(añosParaJubilar(1999));

//y que pasa si tenemos mas lineas de codigo, pero ademas tenemos mas parametros, bueno en ese caso tendremos que encerrarlos entre parentesis
const añosParaJubilar1 = (añoNacimiento, nombre) => {
    const edad = 2022 - añoNacimiento;
    const jubilacion = 65 - edad;
    return `${nombre} se retira en ${jubilacion} años mas`;
}

const quienJubila = añosParaJubilar1(1999, 'nelson');
console.log(quienJubila);

//IMPORTANTE lo que si debemos tener en cuenta al momento de querer usar una u otra es que este tercer tipo de escribir una funcion (Funcion flecha) No obtienen la palabra clave THIS. esto se vera mas adelante.
*/
console.log('---funciones llamando a otras funciones---');
/*
// en este ejemplo al llamar al procesador de jugo se ejecutara eta funcion. que a su vez llamara a la funcion cortarFruta.

function cortadoraDeFruta(fruta) {
    return fruta * 4;
}

function procesadorJugo(manzanas, naranjas) {
    const trozosManzana = cortadoraDeFruta(manzanas);
    const trozosNaranja = cortadoraDeFruta(naranjas);
    return `Jugo de fruta hecho con ${trozosManzana} trozoz de manzana y ${trozosNaranja} trozos de naranja`;
}
console.log(procesadorJugo(3, 4));
//?porque no multiplicar directamente en la primera funcion
//si quisieramos obtener menos o mas piezas esto seria sencillo teniendo solo un par de lineas de codigo, pero si tuvieramos muchas mas, ya no seria tan cencillo ya que tendriamos que reemplazar ese numero cada parte que corresponda. en cambio con una fuincion solo tendriamos que hacerlo en un lugar. ademas obtendremos menos codigo repetido mas ordenado.
*/

console.log('---recapitulacion sobre las funciones.---');
/*
//primero: transformaremos esta funcion flecha a una funcion expresion normal. segundo: la variable edad la construiremos en una funcion separada, la cual sera llamada dentro de la otra funcion, tal cual lo hicimos en la leccion anterior.

function edad(añoNacimiento) {
    return 2022 - añoNacimiento;
}
const añosParaJubilar1 = function (añoNacimiento, nombre) {
    const edad1 = edad(añoNacimiento);
    const jubilacion = 65 - edad1;
    if (jubilacion <= 0) {
        return `${nombre} ya esta jubilado`;
    } else {
        return `${nombre} se retira en ${jubilacion} años mas`;
    }

}
console.log(añosParaJubilar1(1999, 'nelson'));
console.log(añosParaJubilar1(1950, 'maria'));
*/

console.log('---estructura de datos----ARRAYS--');
/*
//* en javascript existen 2 grandes e importantes estructuras de datos una son las array y la otra son los objetos

//supongamos que queremos almacenar algunos nombres de personas, lo hariamos de la siguiente manera
const persona1 = 'carlos';
const persona2 = 'pedro';
const persona3 = 'maria';
//pero que pasa si tenemos una gran cantidad de personas, realiarlo ya no seria tan facil ni practico. es qui donde entran las array, los cuales son como una variable mas grande, podremos almacenar en ellas una gran cantidad de datos, todos juntos
const personas = ['carlos', 'pedro', 'maria'];

//tambien tenemos otra forma de crear una array. si nos damos cuenta, esta es una funcion, este metodo no es tan utilizado como el anterior(sintraxis literal).
const años = new Array(1999, 2000, 22, 2022);

//una vez que tenemos nuestro array creado, necesitamos sacar estos elementos para ocuparlos e alguna manera. esto lo realizamos de la siguiente manera.
console.log(personas[0]);
console.log(personas[1]);

//otra cosa que podemos obtener es el numero de datos u elementos que hay en el array
console.log(personas.length);

//otra utilidad que podemos obtener con esta propiedad LENGTH es obtener el ultimo elemento de un array, esto es muy util cuando tenemos array con una cantidad de elementos muy grande.sabemos que los array comienzan del cero, pero la propiedad length no toma en cuenta esto, solo nos devuelve la cantidad de elementos, por lo tanto podemos obtener el elemento con los corchetes, para luego pasarle la cantidad de elementos que serian 'personas.length -1' el -1 es porque al escribir dentro de los corchetes, este ahora si tomara el cuenta el cero, por lo que hay que restarle uno, para que nos arroje el ultimo elemento.
console.log(personas[personas.length - 1]);

//analizando el codigo poddremos deducir que dentro de los corchetes podremos escribir cualquiere expresion RECORDAR que una expresion es algo que produce un valor.
//por otro lado usando los corchetes no solo podrremos aobter los elementos si no que podemos editar
personas[2] = 'miguel';
console.log(personas);// el elemento en la posicion 2(maria) fue reemplazado por 'miguel'

//IMPORTANTE solo los valores primitivos no pueden ser cambiados al declararlos con CONST, pero los array no son valores primitivos, es por eso que podemos cambiar elementos de el a pesar de ser definido como const.
//RECORDAR que todos son datos primitivos execto los objetos y los array

//ahora lo que REALMENTE NO podemos hacer es reemplazar el array completo.
//personas = ['camila', 'pedro', 'etc'];

//como javascript espera expresiones podemos introducir toda clase de variables u operaciones incluso otros array.
//supongamos que queremos almacenar informacion acerca de una persona. nombre, edad, profesion. amigos etc

const primerNombre = 'nelson';
const nelson = [primerNombre, 'rodriguez', 2022 - 1989, 'programador', personas];
console.log(nelson);

//realizemos nuestro primer ejercicio con array. con nuestra funcion para calcular edades,  supongamos que tenemos un array de años de naciomiento y queremos calcular la edad usando algunos de ellos.
const calcAge = function (birthYeah) {
    return 2037 - birthYeah;
}
const añoNacimiento = [1990, 1967, 2002, 2010, 2018];
const edad1 = calcAge(añoNacimiento[0]);
const edad2 = calcAge(añoNacimiento[3]);
const edad3 = calcAge(añoNacimiento[añoNacimiento.length - 1]);//el ultimo del array
console.log(edad1, edad2, edad3);

//asi como comenzamos con un array podemos terminar con otro nuevo, almacenemos las edades obtenidas en un nuevo array. RECORDAR que podemos escribir cualquier expresion dentro de un array.
const edades = [calcAge(añoNacimiento[0]), calcAge(añoNacimiento[3]), calcAge(añoNacimiento[añoNacimiento.length - 1])];
console.log(edades);
*/

console.log('operasiones basicas con arrays---METHODS----');
/*
//javascript tiene funciones integradas que podemos aplicar directamente a nuestras arrays a estas se les conoce como METODOS. 

//EJEMPLO 1: PUSH este metodo nos permite agregar elementos al final de un array. se muta la raiz original.
const amigos = ['franco', 'maria', 'ricardo'];
amigos.push('manuel');
console.log(amigos);

//sabemos que las funciones devuelben algo en este caso lo que devuelve este metodo es la longitud del array. por lo tanto podemos almacenar ese dato en una variable. por lo general esto no se realiza , pero en caso de que nesecitaramos ese dato ya sabemos que se genera con este metodo.
const nuevaLongitud = amigos.push('nelson');
console.log(nuevaLongitud);

//EJEMPLO 2: UNSHIFT asi como tenemos este metodo que agreyga al final del array, tambien tenemos otro que agrega al comienzo del array. y al igual que el push tambien nos devolvera la nueva longitud.  
amigos.unshift('camila');
console.log(amigos);

//EJEMPLO 3: POP este metodo elimina el ultimo elemento del array, pero este no nesecita ningun argumento para hacerlo porque simplemente no es necesario.
amigos.pop();
console.log(amigos);

//lo que devuelte este metodo no es la nueva longitud si no el elemento eliminado
const elementoEliminado = amigos.pop();
console.log(amigos);
console.log(elementoEliminado);

//EJEMPLO 4: SHIFT por ultimo eliminemos el primer elemento del array, al igual que el anterior devuelve el elemento eliminado.
amigos.shift();
console.log(amigos);

//tenemos una cantidad muy grande de metodos, pero estamos revisando los mas relevantes. sigamos con un metodo que nos ayudara a conocer la posicion en la que se encuentra en el array.
//EJEMPLO 5: indexOf nos devolvera la posicion que ocupa determinado elemento dentro del array
console.log(amigos.indexOf('franco'));

//si intentamos obtener la posicion de un elemento que no existe obtendremos un (-1)
console.log(amigos.indexOf('pedro'));

//veamos un metodo muy similar al indexOf, pero mas moderno y este es
//EJEMPLO 6: INCLUDE este metodo nos devolvera true si es que elemento se encuentra u false si es que no se encuentra en el array.
console.log(amigos.includes('franco'));
console.log(amigos.includes('juana'));

//este metodo utiliza el metodo de igualdad estricta eso significa RECORDAR que No realiza coersion en otras palabras no convierte el valor automaticamente. por lo tanto si escribimos mal obtendremos valores erroneos
console.log(amigos.includes('Franco'));// escribimos la primera letra en mayusculas

//metodo muy util para usarlo con declaraciones como if else
if (amigos.includes('franco')) {
    console.log('franco es tu amigo');
} else {
    console.log('franco no es tu amigo');
}
*/

console.log('---OBJETOS---');
/*
//hasta ahora hemos visto como podemos utilizar y acceder a los elementos de un array, pero solo por la posicion que ocupan. es aqui donde entran los objetos ya que gracias a estos podemos hacer referencia a los valores propiamemnte tal atraves de una clasve.
//con los objetos podemos definir pares(clave-valor) en ottras palabras a cada valor podemos asignarle una clave y es esta clave la que usamos para obtener ese valor.

//EJEMPLO: asi es como construimos un array y accedemos a sus valores u hacemos referencia a ellos atravez de la posicion que ocupan dentro del array
const nelsonArray = ['nelson', 'rodriguez', 2037 - 1999, 'profesor', ['franco', 'cristian', 'maria']];

//asi es como construimos un objeto, podemos asignarle a cada valor una clave y acceder a este a travex de ella. IMPORTANTE: entonces decimos que este objeto posee 5 propiedades.
//esta es la manera literal de crear un objeto porque estamos escribiendo todo el contenido directamente, pero hay otras formas de crear objetos.
const nelsonObjeto = {
    primerNombre: 'nelson',
    apellido: 'rodriguez',
    edad: 2037 - 1999,
    profesion: 'profesor',
    amigos: ['franco', 'cristian', 'maria']

}
//*usamos objetos cuando queremos agrupar, tal como lo hariamos con los arrays, pero otra diferencia aparte de que podemos crear (clave-valor) es que en los objetos no importa el orden en el que esten los elementos a la hora de acceder a ellos. en los array el orden si es  importante ya que accedemos a ellos a travex de sus posiciones. ,IMPORTANTE esto nos dice que usaremos mas los array para obtener datos mas estructurados y los objetos para datos no estructurados.
*/
console.log('---notacion de punto vs corchetes');
/*
const nelsonObjeto = {
    primerNombre: 'nelson',
    apellido: 'rodriguez',
    edad: 2037 - 1999,
    profesion: 'profesor',
    amigos: ['franco', 'cristian', 'maria']

}
//con esto basicamente obtenemos el mismo objeto, y notar que sus propiedades estan en orden alfabetico
console.log(nelsonObjeto);

//veamos ahora como obtener estos valores(propiedades) de los objetos. primero usarmos el punto para luego usar los corchetes. la gran diferencia entre estas 2 es que con los corchetes podemos ingresar cualquier expresion que queramos no necesariamente la clave tal cual. 
console.log(nelsonObjeto.primerNombre);
console.log(nelsonObjeto['primerNombre']);

//incluso podemos llegar a la clave atravez de alguna operacion. veamos esto con otro ejemplo.
const nombreKey = 'primer';
//obtenemos la clave atravez de una operacion, la que finalmente nos dara acceso a nuestra propiedad
console.log(nelsonObjeto[nombreKey + 'Nombre']);

//?cuando usar uno o el otro
//eso dependera en el momento dada la complejidad del codigo usaremos una o la otra

//veamos otro ejemplo sobre los objetos
const interesadoPor = prompt('Que es lo que le gustaria saber de nelson? elija entre: primerNombre, apellido, edad, profesion, u amigos');
console.log(interesadoPor);

//esto no funcionara ya que el objeto no posee ninguna clave o ppropiedad llamada 'interesadoPor' por lo que nos devolvera indefinido ya que o encuentra la propiedad que se busca. 
console.log(nelsonObjeto.interesadoPor);

//en cambio con los corchetes si ya que este si acepta todo tipo de expresiones,  en este caso fue necesario usar los bracket, pero en otras puede que no se necesite y usaremos el punto.
console.log(nelsonObjeto[interesadoPor]);

//RECORDAR que INDEFINIDO es un valor falso al igual que (NULL,NaN, 0, ""). por lo que podemos aprovechar eso para validar cuanndo alguien ingresa algo que no esta en la lista(solo en ese caso).
if (nelsonObjeto[interesadoPor]) {
    console.log(nelsonObjeto[interesadoPor]);
} else {
    console.log('Escoge nuevamente u escribe bien por favor: primerNombre, apellido, edad, profesion, amigos');
}

//veamos ahora como podemos agregar elementos a nuestro objeto
nelsonObjeto.direccion = 'chile';
nelsonObjeto['twitter'] = '@nel12';
console.log(nelsonObjeto);//observamos que ya se encuentras 2 nuevas propiedades 

//DESAFIO DE LA CLASE: REALIZAR ESTA ORACION SACANDO LOS VALORES CORRESPONDIENTES DEL OBJETO
//*'nelson tiene 3 amigos y su mejor amigo es franco'
//esta sentencia funciona ya que el punto y los corchetes tienen una alta prodecencia y se ejecutan de izquierda a derecha
console.log(`${nelsonObjeto.primerNombre} tiene ${nelsonObjeto.amigos.length} amigos y su mejor amigo es ${nelsonObjeto.amigos[0]}`);
*/
console.log('---metodos de los objetos---');
/*
//* sabemos que los objetos son como los array, podemos almacenar todo tipo de datos incluso pueden tener array e incluso podemos tener objetos dentro de un objeto.
//*RECORDAR que las funciones son valores osea es un valor eso significa que podemos construir (clave-valor) siendo una funcion un valor. eso significa que podemos agregar funciones a los objetos.
const nelsonObject = {
    primerNoombre: 'nelson',
    apellido: 'rodriguez',
    añoNaciomiento: 1999,
    profesion: 'profesor',
    amigos: ['franco', 'maria', 'pedro'],
    tieneLicencia: true,
    //la sintaxis a una funcion expresion es muy similar con la salvedad de que 'calcAge' ya no es una variable, si no que pasa la propiedad del objeto 'nelsonObject'. otro punto es que necesitamos de una funcion expresion para usarla cono propiedad.IMPORTANTE cualquier funcon que se adjunte a un objeto se le denomina METODO. y los metodos son propiedades de los objetos
    calcAge: function (añoNacimiento) {
        return 2037 - añoNacimiento;
    }
};
// podemos obtener el metodo como cualquier otra propiedad ,porque de hecho lo es.
console.log(nelsonObject.calcAge(1999));
//de esta manera lo obtenemos con corchhetes
console.log(nelsonObject['calcAge'](1999));

//ahora debemos tener en cuenta que este año de naciomiento ya se emcuentra definido en nuestro objeto, por lo que seria ideal obtener este dato desde hay. para no tenerlo repetido, pues veamos como seria para realizarlo. esto es posible ya que javascript nos da acceso en cada metodo a una variable especial llamada THIS.
const nelsonObject1 = {
    primerNoombre: 'nelson',
    apellido: 'rodriguez',
    añoNaciomiento: 1999,
    profesion: 'profesor',
    amigos: ['franco', 'maria', 'pedro'],
    tieneLicencia: true,
    //THIS apuntara al objeto que llama al metodo en otras palabras this apuntara al objeto en  el que esta contenido el metodo en este caso this apuntara al objeto 'nelsonObject1'
    calcAge: function () {
        //veamos que es realmente la palabra this dentro de este contexto, es el propio objeto 'nelsonObject1'
        console.log(this);
        return 2037 - this.añoNaciomiento;

    }
};
//por lo tanto ya no necesitamos pasarle el argumento al momento de obtener el paremetro, ya que el objeto que esta llamando al metodo es el objeto 'nelsonObject1' basicamente lo que esta antes del punto.
console.log(nelsonObject1.calcAge());

//pero si lo probamos en otro contexto esta palabra apunta a otro objeto
console.log(this);

//?pero porque usar la palabra this y no directamente 'nelsonObject1.añoNacimiento'
//bueno esto funcionaria bien, pero no es una buena practica ya que el nombre de el objeto podria cambiar y luego tendriamos que cambiar todo manualmente en cada lugar donde se haga referencia a este objeto.

//EJEMPLO: veamos como podemos ser lo mas eficiente posible, supongamos que en nuestra aplicasion debemos llamar varias veces a la funcion edad, pues esto no es ningun problema, pero no es lo mas eficiente ya que el calculo para obtener la edad se realizaria cada vez que se llama a la funcion, pues esto se puede mejorar ya que podemos hacer el calculo 1 sola vez y luego obbtenerlo donde lo necesitemos.
const nelsonObject2 = {
    primerNoombre: 'nelson',
    apellido: 'rodriguez',
    añoNaciomiento: 1999,
    profesion: 'profesor',
    amigos: ['franco', 'maria', 'pedro'],
    tieneLicencia: true,
    //podemos crear una nueva propiedad dentro del mismo metodo (funcion)esta propiedad en este caso es la edad. por lo que tendremos que llamar una vez a esta funcion para  crear esta propiedad y luego solo obtendremos esta. como propiedad.
    calcAge: function () {
        this.edad = 2037 - this.añoNaciomiento;
        return this.edad;
    }
};
//al llamar a la funcion se realizara el calculo y se crea esta nueva propiedad llamada edad
console.log(nelsonObject2.calcAge());
//luego, como el calculo ya esta hecho podemos obtener la propiedad creada y usarla en los lugares donde la necesitemos sin la necesidad de volver a realizar el calculo otra vez. 
console.log(nelsonObject2.edad);
console.log(nelsonObject2.edad);

//OTRO DESAFIO DEL VIDEO, escribir un metodo que devuelba una frase como esta 'nelson es un profesor de 38 años de edad y tiene/no licencia de conducir'

const nelsonObject3 = {
    primerNombre: 'nelson',
    apellido: 'rodriguez',
    añoNacimiento: 1999,
    profesion: 'profesor',
    amigos: ['franco', 'maria', 'pedro'],
    tieneLicencia: false,
    calcAge: function () {
        this.edad = 2037 - this.añoNaciomiento;
        return this.edad;
    },
    obtenerResumen: function () {
        //tambien podriamos haber llamada a la funcion 'nelsonObject2' y haber obtenido la edad desde alli ya que ya fue calculada.
        this.resumen = `${this.primerNombre} es un ${this.profesion} de ${2037 - this.añoNacimiento} años que ${this.tieneLicencia ? 'tiene' : 'no'} licencia de conducir`;
    }
};

nelsonObject3.obtenerResumen();
console.log(nelsonObject3.resumen);
//RECORDAR: que anteriormente usamos algunos metodos con con array como PUSH, POP, SHIFT, UNSHIFT y muchos mas si lo pensamos bien esto nos dice que los array tambien son objetos que poseen sus propios metodos
*/

console.log('---ciclo for---');
/*
//*sabemos que el bloque if-else es una estrutura de control, pero hay mas estructuras de control y una de ellas el el CICLO FOR. este nos permitira repetir alguna instruccion las veces que le indiquemos evitando escribir dicha instrucion varias veces.
console.log('levantamiento de pesas 1');
console.log('levantamiento de pesas 2');
console.log('levantamiento de pesas 3');
console.log('levantamiento de pesas 4');
console.log('levantamiento de pesas 5');

//podemos dividir el ciclo for en 3 partes, la primera es el contador que se debe iniciar en donde uno quiera en este caso desde la repeticion n° 1, la segunda parte es la condicion logica que se evalua antes de continuar con el ciclo en este caso queremos que llegue a la repeticion 5 y se detenga hay. y la tercera parte es aumentar el valor de la variable ya que si no se mantendra en 1 y la condicion nunca llegara a ser falsa.
//el valor de la variable debe ser let porque sera actualizada en cada vuelta
for (let repe = 1; repe <= 5; repe++) {
    console.log(`levantamiento de pesas n° : ${repe}`);
}
*/
console.log('---bucles en arrays---');
/*
//una de los usos mas comunes de los ciclos es recorrer un array
const nelsonArray1 = [
    'nelson',
    'rodriguez',
    2037 - 1991,
    'profesor',
    ['franco', 'peter', 'tomas'],
    true
];
//como sabemos los array comienzan desde el 0, por otro lado necesitamos que se imprima hasta que haya recorrido el array. y por ultimo debemos incrementar nuestra variable.

for (let i = 0; i < nelsonArray1.length; i++) {
    console.log(nelsonArray1[i], typeof nelsonArray1[i]);
}
//lo que realizamos anteriormente fue solo recorrer un array. lo que haremos ahora sera recorrerlo y ademas crear un nuevo array para almacenar el tipo de dato. para eso deberemos crear este nuevo array antes, fuera del ciclo, para luego usarlo y establecerlo.
const tipo = [];
for (let i = 0; i < nelsonArray1.length; i++) {
    console.log(nelsonArray1[i], typeof nelsonArray1[i]);
    tipo[i] = typeof nelsonArray1[i];

}
console.log(tipo);

//tenemos varias formas de llenar un array con datos, la que vimos recien es 1, veamos ahora otra.
const tipo2 = [];
for (let i = 0; i < nelsonArray1.length; i++) {
    console.log(nelsonArray1[i], typeof nelsonArray1[i]);
    //nesecitamos el elemento al final del array y no al comienzo(unshift)
    tipo2.push(typeof nelsonArray1[i]);
}
console.log(tipo2);

//veamos otro ejemplo
const años = [1991, 2007, 1969, 2020];
const edades = [];

for (let i = 0; i < años.length; i++) {
    edades.push(2037 - años[i]);
}
console.log(edades);

//por ultimo veamos 2 declaraciones muy inportantes CONTINUE Y BREACK

for (let i = 0; i < nelsonArray1.length; i++) {
    //CONTINUE nos permite saltar u omitir el ciclo actual, en este caso solo queremos imprimir en consola el tipo de dato que sea string. cualquier otro tipo de dato se omitira osea se aplicara el continue.
    if (typeof nelsonArray1[i] !== 'string') continue
    console.log(nelsonArray1[i], typeof nelsonArray1[i]);
}
//console.log(nelsonArray1[i]);

//por el contrario lo que realiza la declaracion BREACK es salir completamente del ciclo ,  no del actual si no que de todo el ciclo

//supongamos que queremos que al encontrar el primer numero no imprima nada mas y se salga del ciclo. pues eso es lo que hace imprime solo hasta que encuentra el numero para salirse sin imprimir el numero.
for (let i = 0; i < nelsonArray1.length; i++) {
    if (typeof nelsonArray1[i] === 'number') break
    console.log(nelsonArray1[i], typeof nelsonArray1[i]);
}
*/
console.log('---recorriendo array hacia atraz y ciclo dentro de otro ciclo---');
/*
const nelsonArray2 = [
    'nelson',
    'rodriguez',
    2037 - 1991,
    'profesor',
    ['franco', 'peter', 'tomas'],
    true
];

//recorramos este array de atras  para adelante, ahora queremos que el contador comience en el ultimo elemento del array en este caso seria en la (6 elementos -1) = (longitud -1). y queremos que se detenga cuando sea menor a 0. por ultimo disminuimos el contador.
for (let i = nelsonArray2.length - 1; i >= 0; i--) {
    console.log(i, nelsonArray2[i]);
}

//bicle dentro de otro bucle. volvamos al problema de las repeticiones de ejercicios, supongamos qque ahora tenemos 3 ejercicios diferentes y queremos que cada uno de ellos se repita 5 veces.
for (let i = 1; i < 4; i++) {
    console.log(`comenzando ejercicio n° ${i}`);
    for (let ejer1 = 1; ejer1 <= 5; ejer1++) {
        console.log(`sentadilla`);


    }
    for (let e = 1; e <= 5; e++) {
        console.log(`flexiones`);
    }
}
*/
console.log('---ciclo while---');
/*
//y aqui tenemos la otra estructura de control, el ciclo while, paa este cicle aun necesitaremos los 3 componentes que usamos en el ciclo FOR, un contador, una condicion y el incremento o decremento del contador, pero  a diferencia de del for en el while solo podremos especificar 1 patrametro, la condicion , el contador se devera declarar fuera del ciclo y el contador deveremos agregarlo dentro del ciclo antes de el termino de este.
for (let repe = 1; repe <= 5; repe++) {
    console.log(`levantamiento de pesas n° : ${repe}`);
}

// lo mismo , pero con el ciclo while
let repe1 = 1;
while (repe1 <= 5) {
    console.log('levantamiento de pesas 🏋️‍♀️');
    repe1++;
}
//*el ciclo while a diferencia del for NO nesecita del contador, puede funcionar sin el. el condicional tampoco esta sujeto al contador podemos escribir cualquier tipo de condicion esto hace que el ciclo WHILE sea mucho mas versatil lo que significa que se puede usar en muchas y diferentes cituasiones 

//*IMPORTANTE el numero aleatorio que generara el Math.random() sera entre el 0 y 1(0.966 = 1) por lo tanto si lo multiplicamos por 6 nos dara un numero decimal entre el 0 y el 6 todos con decimales, pero no queremos el numero 0 por eso se le suma 1 de esa manera tendremos un numero entre 1 y 6. si lo multiplicamos por 7 obtendriamos un numero entre el 0 y 7, pero no queremos el 7 tampoco, es por eso que en esta ocasion que suponemos que tiramos los dados es el codigo que nesecitamos. y con el Math.truc quitamos los decimales y solo dejamos el entero.

//veamos un ejemplo del uso del while sin tener un contador que incrementar, este ciclo lo usaremos cuando no sabemos la cantidad de veces que el ciclo debe funcionar, tal como en este caso.
let dado = Math.trunc(Math.random() * 6) + 1;

while (dado !== 6) {
    console.log(`tu dado es: ${dado}`);
    dado = Math.trunc(Math.random() * 6) + 1;
    if (dado === 6) console.log('el ciclo ha terminado porque salio un 6');
}
*/