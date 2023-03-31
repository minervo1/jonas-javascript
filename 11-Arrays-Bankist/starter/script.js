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
//IMPORTANTE cada uno de estos objetos son exactamente los mismos objetos que tenemos arriba y al utilizar este array en las diferentes funciones que tenemos y acceder a estos elementos les pondremos otros nombres, pero seguiran siendo las cuentas originales, es por esa razon que podemos crear ppropiedades nuevas en estas cuentas directamente desde una funcion ya que estamos utilizando el objeto en si. esto es asi porque solo creamos referencias en el heat siguen todas apuntando al mismo objeto.
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
//le pasamos un segunda parametro sort para ordenar el array y lo establecemos en false osea en el orden en que esta normalmente.
const displayMovements = function (movimientos, sort = false) {
  //RECORDAR que innerHtml contiene todos los elementos del html y textContex solo posee el texto, por eso lo usamos , en otras palabras vaciamos todo del contenedor y luego agregamos los nuevos elementos.
  containerMovements.innerHTML = '';

  //solo cambiara a true cuando se haga clik en el boton 'sort', como sort muta el array original devemos hacer una copia antes(slice)
  const movs = sort ? movimientos.slice().sort((a, b) => a - b) : movimientos;
  movs.forEach(function (mov, i) {
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

//* SUMANDO LOS MOVIMIENTOS (saldo total de la cuenta)para poder imprimier el resultado en nuestra interfaz grafica
//al igual que con  la funcion 'creandoUsuario' debemos pasarle la cuenta completa y desde alli sacamos los movimientos. ademas de crear una nueva propedad en este objeto que sera el saldo de la cuenta;  ya que lo que necesitaremos mas adelande
const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce(function (acu, eleA) {
    return acu + eleA;
  }, 0);
  acc.balance = balance;
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
      //console.log(arr);
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
    //creamos una nueva propiedad en cada objeto que va ser igual a el owner con todos los cambios que ya le hicimos
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

//esta funcion agrupara
const updateUI = function (ua) {
  //mostramos los movimientos(cuenta)
  displayMovements(ua.movements);
  //mostramos el resumen
  calcDisplayBalance(ua);
  //mostramos la suma
  calcDisplaySumary(ua);
};

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
    labelWelcome.textContent = `Bienvenido/a de nuevo ${
      //usamos split para sacar solo el nombre
      userActual.owner.split(' ')[0]
    }`;
    //volvemos la opacidad al 100 solo cuando se valide correctamente el usuario
    containerApp.style.opacity = 100;
    //limpiamos los input y quitamo el foco del raton
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    //llamamos a la funcion que actualizara nuestra interfaz
    updateUI(userActual);
  }
});

btnTransfer.addEventListener('click', function (ev) {
  ev.preventDefault();
  //obtenemos  el valor del input especificamente la cantidad  a tranferir
  const amount = Number(inputTransferAmount.value);
  //obtenemos el valor del input que resivira el dinero
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiveAcc);
  //limpiamos los campos de el dinero y el usuario receptor
  inputTransferAmount.value = inputTransferTo.value = '';
  //debemos validar que el monto a transferir sea un valor positivo y que se cuente con dinero para realizar dicha transferencia
  if (
    amount > 0 &&
    userActual.balance >= amount &&
    receiveAcc &&
    receiveAcc.username !== userActual.username
  ) {
    //realizamos la yransferencia
    userActual.movements.push(-amount);
    receiveAcc.movements.push(amount);

    //actualizamos la interfaz
    updateUI(userActual);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //obtenemos el monto del prestamo
  const amount = Number(inputLoanAmount.value);

  //realizamos la condicion para obtener este prestamo, este nos dice que debe haber al menos 1 deposito que sea iagual o mayor al prestamo solicitado
  if (amount > 0 && userActual.movements.some(nov => nov >= amount * 0.1)) {
    //las 2 condiciones deben ser ciertas , pero dentro de some solo un elemento basta paraa que el metodo devuelva true. si pasa agregamos el valor solicitado a la cuenta
    userActual.movements.push(amount);
    //luego debemos actuallizar la interfaz
    updateUI(userActual);
  }
  //limpiamos el input
  inputLoanAmount.value = '';
});
//*eliminando cuentas
//el metodo findIndex es similar al metodo indexOf, solo que este ultimo es mas simple en cambio con el metodo findIndex podemos crear sentencias mas complejas y no necesariamente con el signo igual si no que cualquier valor que retorne falso u true.
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    userActual.username === inputCloseUsername.value &&
    userActual.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === userActual.username
    );
    //console.log(index);
    accounts.splice(index, 1);
    //ocultando la interfaz
    containerApp.style.opacity = 0;
  }
  //limpiamos los input
  inputCloseUsername.value = inputClosePin.value = '';
});
//debemos conservar el orden normal, solo si hacemos click cambiamos el valor
let sorted = false;

//creamos la accion cuando se realiza la accion sobre el botom 'sort'
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //llamamos a la funcion y establecemos el valor del parametro sort
  displayMovements(userActual.movements, !sorted);
  //luego de cambiar a true deemos volver a dejarlo como estaba para volver al orden normal
  sorted = !sorted;
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
/*
console.log('metodos SOME');

const numeros = [34, -133, 44, 60, 1200, -22];

//vemos que este metodo INCLUDE nos permite saber si un determinado valor esta o no en nuestro array devolviendonos true o false, utilizando el operador de igualdad, pero que pasa si queremos saber si hay numeros positivos, usando el operador de igualdad no podremos saber esto.
console.log(numeros.includes(-130));

//es aca donde entra el metodo SOME este nos permitira ingresar una condicion que permite ir mas alla de la igualdad ya que recibe una callback function, devolviendonos true o false.
const anyDeposits = numeros.some(non => non > 1000);
console.log(anyDeposits);

console.log('metodo EVERY');
//some y every son muy similares la diferencia entre ellos es que con every tal como su nombre lo indica todos los elemetos jhddeben pasar la condicion para retornar true. a diferencia de some que basta con que solo 1 pase la condicion.

//por ejemplo podemos preguntar si todos son depositos o si todos son retiros
console.log(numeros.every(mov => mov > 0));

//probemos con la cuenta que si tiene solo depositos
console.log(account4.movements.every(mov => mov > 0));

//hasta ahora hemos escrito la function callback directamente como argumento en nuestros metodos, pero esto no es obligatorio podemos excribir perfectamente esta funcion afuera y luego pasarla.

//funcion callback separada
const deposit = mov => mov > 0;

//metodo
console.log(numeros.some(deposit));
console.log(numeros.every(deposit));
console.log(numeros.filter(deposit));
*/

/*
console.log('metodos FLAT Y FLATMAP');

const arr = [[1, , 2, 3], [4, 5, 6], 7, 8];
//el metodo flat nos permitira sacar los elementos que se encuentren anidados dentro de un array devolviendonos todos los elementos del array en 1 solo array, pero solo funcionara de manera predeterminada con el primer nivel de profundidad. en otras palabras un array dentro de otro.
console.log(arr.flat());

// para casos donde hay mas de 1 array anidado podemos agregarle a nuestro metodo flat el nivel 2 donde podra sacar los elementos que esten en ese nivel osea una array dentro de otro dentro de otro
const arrMuyAnidado = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrMuyAnidado.flat(2));

const aa = [[1, [2, [3]]], [4, [5, [6]]], 7, 8];
console.log(aa.flat(3));

//veamos un ejemplo mas real, supongamos que el banco quiere sumar todos los movimientos de todas las cuentas, primmero tenemos que sacar todos los movimientos y dejarlos en un solo array
//1- primero obtenemos solo los movimientos
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

//una vez que tenemos todos los movimientos obtenemos nuestro array unico
const allMovements = accountMovements.flat();
console.log(allMovements);

//y por ultimo sumamos todos los movimientos del array
const sumaTotal = allMovements.reduce(function (acum, value) {
  return acum + value;
});
console.log(sumaTotal);

//sumando de la manera tradicional
let suma = 0;
for (let i = 0; i < allMovements.length; i++) {
  suma = suma + allMovements[i];
}
console.log(suma);

//sumando con el bucle for of

for (const i of allMovements) {
  let suma = 0;
  suma = suma + i;
}
console.log(suma);

//en vez de hacer varios pasos separados, podemos realizar u mejor dicho utilizar el encadenamiento de metodos
const sumaDeMovimientos = accounts
  .map(ale => ale.movements)
  .flat()
  .reduce((acu, valor) => acu + valor, 0);

console.log(sumaDeMovimientos);

//* es muy comun usar map y luego flat, es por eso que se introdujo el metodo flatMat que combina los 2 metodos lo que ahorra codigo y mejora el rendimiento. eso si este metodo solo llega a el primer nivel de profundidad si necesitamos ir al segundo nivel de profundidad (anidacion) debemos usar el mmetodo flat.
const sumaDeMovimientos2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(sumaDeMovimientos2);
*/

/*
console.log('ordenando arrays---- metodo sort');
//hay muchas formas de ordenar un arrays, pero lo haremos con las herramientas que javascript nos da, en este caso el metodo SORT que nos ordenara de manera alfabetica tomando en cuenta la primera letra de cada palabra
//este mmetodo IMPORTANTE MUTARA EL ARRAY ORIGINAL en otras palabras no crea una copia.
const owners = ['jonas', 'zack', 'adam', 'martha'];
console.log(owners.sort());

//veamos ahora que ocurre con numeros. de manera predeterminada el metodo sort transformara todo a cadena y luego comparara y luego ordenara. esto funciona de la siguiente manera, para poder ordenar a nuestro gusto un array con  numeros deveremos usar una callback function en esta podremos especificar como queremos que se ordenen.

const movements6 = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements6.sort());

//*esto lo hara comparando a y b que son los parametros que deveremos pasarle a la funcion a y b son basicamente el valor actual y el valor siguiente si el resultado de la comparacion arroja un vallor  menor a cero A ira primero que B y si arroja un numero mayor a cero sera B que ira primero que A. teniendo en cuennta esto podremos ordenar nuestro array,
//return < 0, a, b (mantenemos el orden)
//return > 0, b, a (cambiamos el orden)
const aa = movements6.sort(function (a, b) {
  //esta sentencia funciona ya que si A es mayor a B el resultado siempre sera positivo lo mismo para si B es mayor a A el resultado de esta comparacion siempre sera negativo. por lo tanto si retornamos algo negativo simpre , esto lo ordenara ascendentemente y si le devolvemos algo positivo el orden sera descendente.
  return a - b;
});
console.log(aa);

//si lo analizamos bien el ejercicio anterior es como hacer esto, como estamos ordenando ascendentemente debemos poner los valores mas bajos primero, por lo tanto en los valores comparados en el primer caso(200 y 450) A es menor a B por lo tanto debemos mantener ese orden, pero en el segundo caso (450, -400) B debe ir antes que A por lo tanto hay que cambiar el orden.
const movements7 = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements7.sort((a, b) => {
  if (a > b) return 1; //cambiamos el orden
  if (a < b) return -1; //mantenemos el orden
});
//recordar que se muta el array
console.log(movements7);

const movements8 = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements8.sort((a, b) => b - a);
console.log(movements8);
*/

/*
console.log('crear y rellenar arrays mediante programacion');

//hasta ahora hemos creado y rellenado arrays de manera manual y litteral.
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//pero tenemos la posibilidad de crear automaticamente sin tener que predefinir sus valores y hay que tener cuidado con esta particularidad de este metodo array ya que puede conducir a errores. pasa que si solo le pasamos un valor este creara un array con la longitud de ese valor, los creara vacios
const x = new Array(6);
console.log(x);

//lamentablemente solo hay un metodo capaz de llenar esos espacios vacios y ese es el metodo FILL, este se parece un poco al metodo slice ya que el primer parametro que acepta es el valor con el que se llenara el array, el segundo parametro sera desde donde quiero comenzar a llenar, y el ultimo sera hasta donde quiero llenar.
x.fill(1, 3, 5);
//este metodo mutara el array por eso podemos ponerlo directamente
console.log(x);

//ahora no solo podemos usar este metodo en estos casos podemos usarlo en cualquier array, en otras palabras podemos rellenar un array ya existente
arr.fill(23, 4, 5);
console.log(arr);

//¿pero que pasa si quiero crear y llenar una matriz con numeros distintos
// en estos casos deberemos usar (Array.from) este recibira al igual que map una callback function con los mismos parametros (elemento actual, indice y el array en si en este orden.RECORDAR que el guion bajo se usa cuando debemos tener el parametro pero en realidad no lo usamos porque no lo  necesitamos.

//el ejercicio anterior podemos hacerlo asi tambien
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

//el mismo  array con la funcion tipica
const a = Array.from({ length: 7 }, function () {
  return 1;
});
console.log(a);

//creando array de 1 a 7
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//el metodo FROM en un comienzo fue creado para convertir estructuras similares a un array (NodeList) a arrays. para ver esto supongamos que solo tenemos los movimientos en la interfaz de usuario y que no tenemos estos datos en ninguna otra parte. pues para obtenerlos tendriamos que utilizar el 'querySelectorAll' que nos devolvera un(NodeList), pero como no es un array no posee muchos de los metodos que estos si tienen para eso tenemos que convertir este NodeList en un array y eso lo logramos con 'FROM'
//*podemos observar que no necesariamente necesitamos de un boton para adjuntar un evento, de hecho lo podemos hacer en cualquier objeto
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  //hay que entender que en este punto nuestra NodeList ya es un array por ende podemos usar el metodo map, si lo hicieramos directamente sin pasar por el from, pues hay si no funcionaria
  console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
});

//el ejemplo recien mostrado lo podemos mejorar de la siguiente manera, podemos poner nuestra funcion directamente como  segundo parametro, como una callback function
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});

//para finalizar de hecho tenemos una segunda forma de transformar la NodeList a un array, claro que tendriamos que realizar el mapeo separadamente, para poder obtener los datos de la interfaz
const movementsUI2 = [...document.querySelectorAll('.movements__value')];
console.log(movementsUI2);
*/

//* por ultimo repaso de algunos metodos vistos hasta ahora
//* ejercicio 1
//sumamos todos los depositos que tenemos en todas las cuentas
const sumaTotalDeIngresosBank = accounts.map(cuen => cuen.movements).flat();

console.log(sumaTotalDeIngresosBank);

//recordemos que cada vez que usamos map y luego flat, podemos reemplazarlos por 'flatMat'. y luego podemos filtrar solo los depositos y luego sumar
const sumaTotalDeIngresosBank1 = accounts
  .flatMap(cuen => cuen.movements)
  .filter(i => i > 0)
  .reduce(function (acumu, ele, i, arr) {
    return acumu + ele;
  }, 0);

console.log(sumaTotalDeIngresosBank1);

//* ejercicio 2
//para este ejercicio queremos saber cuantos depositos de al menos 1000 hay en el banco
const depositosDeMil = accounts
  .map(ele => ele.movements)
  .flat()
  .filter(ele => ele >= 1000).length;
console.log(depositosDeMil);

//esta es otra forma de hacerlo, pero es un poco mas difici, utilizando el metodo reduce, debemos saber que ahora el acumulador sera la cantidad de depositos iguales o superiorrs a 1000
const depositosDeMil1 = accounts
  .flatMap(ele => ele.movements)
  .reduce((acum, ele) => (ele >= 1000 ? acum + 1 : acum), 0);
console.log(depositosDeMil1);

//IMPORTANTE ahora podemos escribir el codigo de arriba reemplazando el (acum + 1), por (acum++) que sabemos que es lo mismo, pero en realidad esto no funcionara no de la manera en que esta escrito y esto se debe a que el operator (++) retornara siempre en valor anterior. esto lo explico a continuacion

let c = 10;
//el resultado sigue siendo 10 al parecer no se sumo nada, pero en realidad no es asi, resulta que este operador devuelve el valor anterior
console.log(c++);
//para observar el cambio debemos volver a imprimir el valor
console.log(c);

//IMPORTANTE por lo tanto en relacion al ejercicio si usamos este operador siempre estara retornando el valor previo a la suma osea siempre retornara 0 y por ende nunca se incrementara, afortunadamente existe una solucion para esto, usando el operador ++ delante de la operacion
const depositosDeMil2 = accounts
  .flatMap(ele => ele.movements)
  .reduce((acum, ele) => (ele >= 1000 ? ++acum : acum), 0);
console.log(depositosDeMil1);

//* ejercicio numero 3
//veamos ahora el poder del metodo reduce, ya que sabemos que este valor final devuelto puede ser cualquier cosa (array, objeto, numero, string) por lo tanto podemos usarlo para reemplazar algunos metodos y retornar en este ejemplo un nuevo array. el objetivo de este ejercicio es devolver un objeto que contenga la suma de los depositos y de los retiros.

//como queremos crear un objeto, pues nuestro acumulador en este caso debe ser un objeto
const sumas = accounts
  .flatMap(ele => ele.movements)
  .reduce(
    (sumas, actu) => {
      actu > 0 ? (sumas.depositos += actu) : (sumas.retiros += actu);
      return sumas;
    },
    { depositos: 0, retiros: 0 }
  );

console.log(sumas);

//este ejercicio lo podemos mejorar un poco de la siguiente manera, eliminamos los duplicados usando los brackets en vez del punto y desestructuramos el objeto tambien
const { depositos, retiros } = accounts
  .flatMap(ele => ele.movements)
  .reduce(
    (sumas, actu) => {
      sumas[actu > 0 ? 'depositos' : 'retiros'] += actu;
      return sumas;
    },
    { depositos: 0, retiros: 0 }
  );

//de esta manera obtenemos solo los valores por separado
console.log(depositos, retiros);

//* ejercicio nummmero 4
//el objetivo del ejercicio es crear una funcion  para convertir cualquier string en un titulo con mayusculas, osea cada letra del comienzo debe estar en mayuscuplas teniendo en cuenta algunas execciones. this is a nice title > This Is a Nice Title, en este caSO 'a' es una excepcion, estas son las conjunciones de 3 letras o menos. También las preposiciones cortas y los artículos se consideran palabras menores.
const convertTitleCase = function (title) {
  const excepcions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(palabra =>
      excepcions.includes(palabra)
        ? palabra
        : palabra[0].toUpperCase() + palabra.slice(1)
    )
    .join(' ');
  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title, but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//dentro de este ejercicio falto agregar una palabra a las excepciones, pero esa palabra genera que la primera palabra del titulo comience con minuscula lo cual no debe pasar nunca es como una excepcion a las excepciones, pues para solucionarlo creamos una funcion que contenga la capitalizacion y esta funcion la llamamos en un principio para realizar la capitaliizacion, pero para dar solucion a este problema la volvemos  a llamar, pero ahora sobre el titulo. de esta manera solo esa palabra sera puesta en mayusculaa  pesar de estar en las excepciones.
console.log('-----------------------------------------------');
const convertTitleCase1 = function (title) {
  //realizamos la capitalizacion separada
  const capitalizacion = str => str[0].toUpperCase() + str.slice(1);

  const excepcions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(palabra =>
      excepcions.includes(palabra) ? palabra : capitalizacion(palabra)
    )
    .join(' ');
  return capitalizacion(titleCase);
};

console.log(convertTitleCase1('this is a nice title'));
console.log(convertTitleCase1('this is a LONG title, but not too long'));
console.log(convertTitleCase1('and here is another title with an EXAMPLE'));
