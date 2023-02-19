'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

let inputLoginUsername = document.querySelector('.login__input--user');
let inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

console.log('----COMENSANDO APLICASION-----');

//* COLOCANDO LOS MOVEMENTS EN LA INTERFAZ. es una buena practica en una aplicasion como esta hecer todo con funciones y no simplemente codificar en el contexto global
const displayMovements = function (movimientos) {
  //RECORDAR que innerHtml contiene todos los elementos del html y textContex solo posee el texto, por eso lo usamos , en otras palabras vaciamos todo del contenedor y luego agregamos los nuevos elementos.
  containerMovements.innerHTML = '';
  movimientos.forEach(function (mov, i) {
    //escribimos esto fuera ya que lo necesitaremos 2 veces(interfaz y css)
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //mostramos los movimientos de la cuenta account1, copiamos el html necesario y reemplazamos sus valores estaticos(html) dinamicos.
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
                    <div class="movements__value">${mov}€</div>
                  </div>`;
    //ahora necesitamos adjuntar esta plantilla html a la interfaz de la aplicasion y lo hacemos dentro del contenedor donde estan estos elementos. para esto usamos el metodo 'insertAdjacentHTML()' el cual recibe 2 parametros string (posicion en la cual quereemos nuestro html, y el string propiamente tal)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//esta llamada solo debe activarse cuando se valide correctamente el usuario
//displayMovements(account1.movements);

//* SUMANDO LOS MOVIMIENTOS para poder imprimier el resultado en nuestra interfaz grafica
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acu, eleA) {
    return acu + eleA;
  }, 0);
  labelBalance.textContent = `${balance} €`;
};
//lo mismo con esta funcion solo debe llamarse una vez que el usuario sea validado correctamente
//calcDisplayBalance(account1.movements);

//*calcalando el IN,OUT
//le pasamos una cuenta completa ya que de ella sacamos los movimientos y el interes
const calcDisplaySumary = function (cuenta) {
  const incomes = cuenta.movements
    .filter(mov => mov > 0)
    .reduce((acum, mov) => acum + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const out = cuenta.movements
    .filter(mov => mov < 0)
    .reduce((acum, mov) => acum + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  //supongamos que en este banco se gana un interes del 1.2% cada vez que se relaiza un deposito
  const interestings = cuenta.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * cuenta.interestRate) / 100)
    .filter((mov, i, arr) => {
      console.log(arr);
      return mov >= 1;
    })
    .reduce((acu, mov) => acu + mov, 0);
  labelSumInterest.textContent = `${interestings} €`;
};
//lo mismo con esta funcion solo debe ser llamada una vez que el usuario alla ingresado correctamente a su cuenta
//calcDisplaySumary(userActual);
//* CREANDO LOS NOMBRES DE USUARIO. esta funcion la comentare porque la funcion que necesitamos deveria ser capaz de recorrer el array 'accounts' y hacer lo mismo para cada una de las cuentas
/*
//lo que necesitamos son sus iniciales ese sera el nombre de usuario (stw)
const user = 'Steven Thomas Williams';
const creandoUsuario = function (nombre) {
  //pasamos a minuscula y luego dividimos por un espacio en blanco
  const userName = nombre.toLowerCase().split(' ');
  //recorremos el array y obtenemos la primera letra de cada palabra para luego almacenarla en un nuevo array, esto es justamente lo que hace el metodo MAP, por ultimo unimos estas letras y creamos un string.
  const nuevoUser = userName
    .map(function (ele) {
      return ele[0];
    })
    .join('');
  return nuevoUser;
};
console.log(creandoUsuario(user));
*/
const creandoUsuario = function (acco) {
  acco.forEach(function (acc) {
    //creamos una nueva propiedad en cada objeto que va ser igual a el owner con todos los cambios ya le hicimos
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (ele) {
        return ele[0];
      })
      .join('');
  });
};
creandoUsuario(accounts);
//no estamos creando un valor nuevo por lo tanto no es necesario retornar nada, solo estamos manipulando el array original para crear algo con el, por lo que para poder visualizar el resultado final de nuestra funcion debemos imprimir el array
console.log(accounts);

//* IMPLEMENTANDO EL USER Y CREANDO EL PIM
//primero creamos el controlador de evento del btn-login. en un principio el comportamiento predeterminado de este boton que esta en un elemento tipo formulario es que intente enviar un formullario. esto provoca que la pagina se recargue. pues debemos evitar eso, y lo hecemos pasandole el objeto 'evento' a la funcion como parametro para luevo invocar a su metodo 'preventDefault()'. con esto evitamos que el formulario sea enviado.

//definimos esta variable afuera porque la necesitaremos mas tarde en nuestra aplicasion(la usaremos en otras partes del codigo)
let userActual;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  //lo que hacemos aca es validar que el usuario ingresado corresponda a un usuario valido, RECORDAR que la propiedad 'username' la creamos cuando creamos el usuario
  userActual = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(userActual);

  //ahora validamos que el pin coincida con el usuario dueño de ese pim.IMPORTANTElos elementos input siempre retornaran un string por lo que hay que transformar ese valor a number.
  //si ingresamos solo un usuario valido obtendremos su objeto, pero si ingresamos un usuario y pim correctos podremos ingresar a nuestra cuenta, pero si ingresamos un usuario invalido obtendremos un error y eso es porque el metodo find ha devuelto un indefinido, porque no se logro validar ningun usuario por lo tanto no se puede validar el pim con un valor indefinido. ese error debemos solucionarlo porque es un error en nuestro codigo, esto lo podemos hacer usando el cortocircuito (&&) (si el elemento es falso se generara el cortocircuito), pero podemos hacerlo mejor usando el 'encadenamiento opcional' RECORDAR que este dejaraa seguir con el codigo siempre y cuando su elemento exista
  if (userActual?.pin === Number(inputLoginPin.value)) {
    //mostramos la interfaz
    containerApp.style.opacity;
    labelWelcome.textContent = `Bienvenido/a de nuevo ${userActual.owner}`;
    //volvemos la opacidad al 100 solo cuando se valide correctamente el usuario
    containerApp.style.opacity = 100;
    //limpiamos los input y quitamo el foco del raton
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    //mostramos los movimientos(cuenta)
    displayMovements(userActual.movements);
    //mostramos el resumen
    calcDisplayBalance(userActual.movements);
    //mostramos la suma
    calcDisplaySumary(userActual);
  }
});

console.log('-----FIN DE LA APLICASION-----');
// LECTURES

/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);*/

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
//*los arrays u matrices son objetos en javascript y tienen acceso a metodos que nos ayudaran a trabajar con estos
let arr = ['a', 'b', 'c', 'd', 'e'];

//el metodo SLICE, nos permitira tomar un pedazo del array devolviendonolos en un nuevo array, sin modificar el array original. este metoodo recibe 2 parametros el inicio y  el final que no lo incluye.
console.log(arr.slice(2));

//si no indicamos el final tal como lo vimos en el ejemplo anterior este tomara hasta el ultimo elemento, teniendo en cuenta que el final no se incluye podemos decir que la longitud del slice siempre sera el final menos el inicio.
console.log(arr.slice(2, 4));

//tambien tenemos numeros negativos, en este caso el inicio. siempre el -1 sera el ultimo elemento, si tenemos un -2 como en el ejemplo tomara los 2 ultimos elementos
console.log(arr.slice(-2));
console.log(arr.slice(-1));

//pero tambien podemos tener el final negativo, en este caso comenzara desde el elemento 0 hasta el elemento que no este incluido en los 2 ultimos, en otras palabras los 2 ultimos elementos no se extraeran.
console.log(arr.slice(1, -2));

//en conclusion el metodo slice nos permite hacer una copia superfial de un array, si queremos hacer una copia completa del array simplemente no agregamos nada
console.log(arr.slice());
//recordar que tambien podemos hacer esto con el operador de propagacion. ¿cual usar? eso es desicion de cada programador
console.log([...arr]);

//*tambien tenemos el metodo SPLICE, que funciona de la misma manera que el metoodo slice la diferencia es que este si cambia la matriz original.
let arr1 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr1.splice(2));
//podemos observar que a diferencia del slice este metodo muta el array original, en otras palabras podemos agregar o quitar elementos del array original devolviendonos el mismo
console.log(arr1);

//un caso tipico de al usar el splice es eliminar un elemento de array
arr1.splice(-1);
console.log(arr1);

//pero que mute el array original no es la unica diferencia, este metodo recibe 3 parametros, inicio, cuantos elementos queremos eliminar, y el final
let arr2 = ['a', 'b', 'c', 'd', 'e'];
arr2.splice(2, 2, 2);
console.log(arr2);

//* metodo REVVERSE
//como su nombre lo indica este nos devolvera el mimo array, el original con sus elementos al revez
const arr3 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr3.reverse());

//* metodo CONCAT
//nos permitira unir arrays, tal como se observa en este ejemplo, sin mutar el array original
const letters = arr.concat(arr3);
console.log(letters);

//el ejemplo anterior tambien podriamos hacerlo de la siguiente forma
console.log([...arr, ...arr3]);

//* metodo JOIN
//que nos permitira unir elementos de un array atravez de un simbolo que le pasemos. devolviendonos solo los elementos.
console.log(letters.join('-'));

//* existe un nuevo metodo disponible desde la version 2022 que es el 'AT' method, QUE NO MUTA EL ARRAY ORIGINAL este metodo nos permitira abtener un determinado elemento sin tener que recurrir a la forma tradicional tal como se muestra en el ejemplo
//forma tradicional
const arr4 = [23, 11, 64];
console.log(arr4[0]);
//con el nuevo metodo
console.log(arr4.at(0));

//* pero hay una particularidad que hace muy util la utilizacion de este metodo a la forma tradicional de obtener un elemento, en especial el ultimo elemento. supongamos que no conocemos la longitud de el array y queremos obtener el ultimo elemnento. tenemos 2 formas de hacerlo de forma yradicinal que se ve mucho.
//esta es una forma de ahcerlo
console.log(arr4[arr4.length - 1]);
//esta es otra forma de hacerlo
console.log(arr4.slice(-1)[0]);

//* pero con este nuevo metodo solo debemos especificar el -1 tal como en el metodo slice, pero en esta ocasion no sera necesario el corchete para obtener solo el elemento.
console.log(arr4.at(-1));

//IMPORTANTE este metodo tambien funcina para los string
console.log('juan'.at(0));
console.log('juan'.at(-1));

//* VEAMOS AHORA EL METODO 'FOREACH' para recorrer un arry, ya hemos visto como recorrer un array con el metodo ForOf

//trabajaremos con el array de la applicasion del banco que haremos
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//esta es la forma en lo que hariamos con el metodo forOf que ya conocemos(para quitar el signo - usamos el metodo math.abs)para obtener el valor adsoluto.
for (const movement of movements) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
}
console.log('------forEach');
// con esta nueva forma de recorrer que pareciera que es casi lo mismo, pero veremos mas adelante con la practica que en realidad es mas sencillo. en realidad este metodo es una funcion de orden superior ya que recibe una funcion como parametro(callBack)
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`you deposited ${movement}`);
  } else {
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
});

//pero aun no termnamos, hay mas caracteristicas de este ciclo forEach, por ejemplo cuando queremos obtener el indice del elemento actual. trecirdemos primero como obteniamos este con el ciclo forOf
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
  }
}

console.log('------forEach-----');
//pero con este nuevo ciclo realizar esto es mas sencillo, y esto se debe a que esta funcion mo solo devuelve el elemento actual si no que devuelbe en cada  iteracion el indice y el  array completo que estamos recorriendo, pero claro estas obciones son obsionales lo que si importa saber el el orden en que estos dato se entregan. primero el primer elemmento siempre sera el elementoa altual, el segundo parametro sera el indice y el tercero sera la matriz.
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: you withdrew ${Math.abs(movement)}`);
  }
});

//IMPORTANTE a tener en cuenta a la hora de usar un ciclo o el otro es que en el ciclo forEach no es posible usar las sentencias 'continue' o 'breack', en otras palabras no se puede detener el ciclo una  vez que comienza. a diferencia del ciclo for of que si podemos usar estas sentencias.

console.log('------Trabajando con forEach en Maps Y Sets------');
//*ahora pasamos a ver como funciona este nuevo ciclo con los maps y set, que es bantante similar para no decir que es lo mismo ya que los maps tienen otras caracteristicas y este ciclo forEach se adapta muy bien a ellas.

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//al momento de usar el ciclo forEach con un mapa este recibira 3 argumentos al igual que con los array , pero en este caso el primer elemento sera el valor actual, el egundo sera la llave y el tercero sera el mapa completo en si
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//al trabajar con set es lo mismo, pero como sabemos, los set no tienen keys ni tampoco indices entonces basicamente el segundo parametros(key) es un valor imnecesario que podemos omitir con el Guion-bajo que en javascripr significa que es un valor innecesario. RECORDAR que este set recibe solo valores iterables
const currenciesUnique = Set(['usd', 'gbp', 'eur', 'cl']);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/
/*
console.log('---METODO MAp---');
//este metodo nos devolvera un nuevo array con el resultado de la operacion especificada en su callBack funcion, la cual se aplicara a cada uno de los elementos del array.
const movimientos = [200, 450, -400, 3000, -650, -130, 70, 1300];
//lo que queremos hacer es pasar todos estos valores que estan digamos en euros pasarlos a dolar, digamos que cada euro equivale a a 1.1 dolar
const eurToUsd = 1.1;

//este metodo o function callback recibe 3 parametros al igual que forEach el valor actual el indice y el nuevo array
const movimientosUsd = movimientos.map(function (mov) {
  return mov * eurToUsd;
});

console.log(movimientos);
console.log(movimientosUsd);

//realizamos lo mismo, pero ahora utilizamos una funcion flecha como callBack
const movimientosUsd2 = movimientos.map(mov => mov * eurToUsd);
console.log(movimientosUsd2);

//realizamos lo mismo con un ciclo for of solo para ver la diferencia, vemos que devemos crear nosotros el array y alli poder almacear estos datos con la operacion especificada
const movimientosUSD = [];
for (const mov of movimientos) {
  movimientosUSD.push(mov * eurToUsd);
}
console.log(movimientosUSD);

//tal como se especifico mas arriba este metodo recibe 3 parametros los cuales usaremos en este ejemplo
const movimientosDescription = movimientos.map((mov, i, arr) => {
  if (mov > 0) {
    //IMPORTANTE se puede tener mas de un return en lla misma funcion siempre y cuando solo 1 sea el que se devuelba.
    return `movement ${i + 1} : you depositsd ${mov}`;
  } else {
    return `movement ${i + 1} : you withdrew ${Math.abs(mov)}`;
  }
});
console.log(movimientosDescription);

//este ejemplo se muestra como se puede mejorar el codigo del ejercicio recien visto, ya que las 2 cadenas son casi identicas por lo que podemos usar un operador ternario.

const movimientosDescription1 = movimientos.map(
  (mov, i, arr) =>
    `movimiento ${i + 1}: you ${mov > 0 ? 'deposited' : 'withtdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movimientosDescription1);

//* usar forEach y el metodo map son enfoques muy distintos. con el forEach imprimimos en consola individualmente algo para cada elementos mientras recorre el array, pero con el metodo map usamos una funcion callBack para detornar estos cadenas y luego imprimir el resultado final. pareciera ser lo mismo, pero en realidad a medida que se entinda mas este lenguaje nos daremoos cuenta que son muy distintos.
*/
/*
console.log('----METODO FILTER----');
// este metodo nos permite filtrar los elementos dado una cierta condicion. y para eso usamos una funcion de llamada(callback) este tambien tiene acceso al elemento actual, su indice y el objeto en si.
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const depositos = movements2.filter(function (mov) {
  return mov > 0;
});
console.log(movements2);
console.log(depositos);

//realizamos lo mismo con el ciclo for of solo para ver la diferencia
const positivos = [];
for (const mov of movements2) {
  if (mov > 0) {
    positivos.push(mov);
  }
}
console.log(positivos);
console.log(movements2);

//pequeño desafio crear un array de retiros
const retiros = movements2.filter(function (ele) {
  return ele < 0;
});
console.log(retiros);
*/

console.log('----METODO REDUCE----');
/*
//usamos este metodo para redicir todos los elementos de un array en un solo valor
const movements3 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// a diferencia de la callback de los metodos 'map' y 'reduce' esta callback recibe 2 parametros el primero seran los datos propios del objeto comenzando primero por un acumulador(acumulador, elemennto actual, indice y el objeto en si) el segundo parametro que recibe este metodo sera el inicio de este acumulador en la primera iteracion del ciclo
const balance = movements3.reduce((acum, ele) => acum + ele, 0);
console.log(balance);

//realizamos lo mismo ahora con el ciclo forof o en otras palabras lo hacemos manualmente
let acumulador = 0;
for (const mov of movements3) {
  acumulador += mov;
}
console.log(acumulador);

//tambien podemos realizar otras cosas no solo sumar, por ejemplo podemos obtener un valor especifico como el valor maximo. comenzamos estableciendo el acumulador igual al primer elemento(200). entonces en la primera iteracion preguntra es 200 mayor a 200 la respuesta es no por lo que pasara al esle donde retornaremos el valor actual, en la siguiennte iteracion el valor actual sera 450 y el acuomulador sera 200 en este caso el acumulador otra vez no es verdadero por lo que pasara al else y retornara el valor actual que sera ahora nuestro nuevo acumulador.
//*IMPORTANTE como en cada iteracion devemos devolver algo para el el acumulador siga haciendo su trabajo, al devolver el valor actual este sera el nuevo valor del acumulador
const max = movements3.reduce(function (acu, actu) {
  if (acu > actu) return acu;
  else return actu;
}, movements3[0]);
console.log(max);
*/

/*

//*ahora que hemos estudiado estos 3 metodos. podemos aprender a que no es necesario trabajar con elllos de forma individual, podemos utilizarlos encadenandolos uno tras otro. podemos hacer esto mentras se retorne un array
//supongamos que queremos todos los depositos pero transpasados a dolar y finalmente su suma
const movements4 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//si tenemos algun  error al momneto de utilizar este encadenamiento debemos fijarnos en el array devuelto del el metodo anterior y eso lo hacemos consultando la consola en el metodo que resive ese array. de esta menra sabremos de donde proviene el error ya que este encadenamiento es como un sistema de tuberias que se unen.

const totalDepositsUSD = movements4
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acu, mov) => acu + mov, 0);
console.log(totalDepositsUSD);
*/

/*
console.log('----FIND METHOD----');
//* al igual que los metodos map, filter y reduce este tambien recibe una callback function, pero a diferencia de map y filter este no devolvera un nuevo array si no que devolvera el primer elemento que satisfaga la condicion.
const movements5 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firsEleme = movements5.find(mov => mov < 0);
console.log(movements5);
console.log(firsEleme);

//veamos este objeto ahora trabajando con nuestro objeto 'ACCOUNST', porque al trabajar con objetos con este metodo es realmente facinante, porque podemos buscar u encontrar en determinado elemento atravez de alguna propiedad que este tenga.
const cuentas = accounts.find(acc => acc.owner === 'Jessica Davis');
//observamos que obtenemos solo el objeto perteneciente a la condicion que le dimos
console.log(cuentas);

//realizamos el mismo ejemplo usando el ciclo forof solo para ver la diferencia.
let cuenta1;
for (const mov of accounts) {
  if (mov.owner === 'Jessica Davis') {
    cuenta1 = mov;
  }
}
console.log(cuenta1);
*/
