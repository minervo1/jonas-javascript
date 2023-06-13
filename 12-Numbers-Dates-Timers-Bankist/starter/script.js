'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-05-02T17:01:17.194Z',
    '2023-04-11T23:36:17.929Z',
    '2023-05-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-05-01T14:43:26.374Z',
    '2020-04-25T18:49:59.371Z',
    '2020-05-03T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
//esta funcion recibira una fecha y nos devolvera esa fecha formateada para que la podamos usar donde sea necesario, esta funcion la construimos porque ya estabamos acumulando mucho codigo repletido, tambien necesitaremos la propiedad locale por lo que debe recibirla como segundo parametro
const formatMovementDate = function (date, locale) {
  const daysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const diasPasadosEntre = daysPassed(new Date(), date);
  console.log(diasPasadosEntre);
  if (diasPasadosEntre === 0) return 'today';
  if (diasPasadosEntre === 1) return 'yesterday';
  if (diasPasadosEntre <= 7) return `${diasPasadosEntre} days ago`;
  //reemplazamos este codigo por el codigo donde utilizamos nuestra API de internacionalizacion

  /*
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  */
  //en este caso no necesitamos ni hora ni minutos por lo que el objetos de obciones no es necesario
  return new Intl.DateTimeFormat(locale).format(date);
};

//*como estabamos escribiendo lo mismo muchas veces lo mejor es crear una funcion y luego llamarla
//esta varible nos formatea cada movimiento de esta manera el signo de lamoneda se pondra de manera automatica sin tener que escribirlo nosotros en el codigo como lo teniamos antes IMPORTANTE la configuracion de la moneda es independiente de la region, debemos establecerla nosotros  mismos  si no se seguira usando por defecto la configuracion local que dice que es (pt-PT) en el caso de

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
//IMPORTANTE ahora implementaremos las fechas en cada uno de estos movimientos, para esto lo mejor que podemos hacer es pasar la cuenta completa y no solo los movimientos, para asi luego poder obtener estas fechas
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  //como estamos recorriendo este arreglo y creando esta plantilla html directamente, solo debemos agregar un nuevo elemento ese elemento esta en nuestro html y es 'movements__date', pero para eso debemos tambien recorrer este array de fechas lo cual tambien realizamos al ponerlo dentro de este forEach.
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //necesitamos convertir estas fechas a el objeto fechas solo asi podremos usar los metodos para crear nuestra fecha formateada
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale); //le pasamos el segundo parametro que es nuestra propiedad locale
    //*recorremos el array 'movementsDates' al cual debemos transformar en una fecha (objeto) en la cual podremos usar nuestros metodos para crear finalmente como ya sabemos una cadena formateda. IMPORTANTE como ya tenemos acceso al i este sera el mismo para los movimientos y para las fechas, en otras palabras el i apuntara al  mismo lugar tanto para los movimientos como las fechas o estaran en la misma posicion porque es el mismo indice.

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements, //* es en este tipo de cambios que podemos ver la utilidad de tener todo separado en funciones ya que solo debemos cambiar solo en un lugar
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

//funcion que cerrara la sesion del usuario despues de algun tiempo
const startLogOutTimer = function () {
  const tick = function () {
    //queremos mostrar un reloj por lo tanto deveremos transformar el tiempo en minutos y segundos, por lo que 1 minuto sera el tiempo dividido por 60 y lo que sobre seran los segundos, usamos el 'trunc' para obtener solo el valor unico (1). transformamos a string para poder usar el metodo pasStart
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    //sacamos los segundos con el operador de resto
    const sec = String(time % 60);
    //en cada llamada a la funcion callback (cada 1 segundo)imprimimos en la interfaz el temporizador
    labelTimer.textContent = `${min}: ${sec}`;

    //cuando el temporizador llega a 0 segundos cerramos la sesion del usuario, lo hacemos usando el metodo clearInterval RECORDAR que para limpiar el temporizador 'DE TIEMPO DE ESPERA ESTABLECIDO' usamos clearTimeOut.
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Buelba a iniciar sesion para continuar, ${
        currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 0;
    }
    //una vez verificado haber llegado a cero segundos disminuimos un segundo, porque recordemos que sera de mas a menos hacia, hasta llegar a cero
    time--;
  };
  //establecemos el tiempo hasta que se pierda la sesion
  let time = 20;
  //llamamos al temporizador a cada segundo, porque basicamente sera un cronometro que comenzara en 100 y llegara hasta 0, eso es lo que es un temporizador en realidad.
  tick();
  const timer = setInterval(tick, 1000);
  //ahora devemos resolver un problema ya que al iniciar sesion con otro usuario se activara otro temporizador y tendremos 2 o mas temporizadores, superpuestos, por lo tanto deveremos verificar si  existe un temporoizador ya activo y eliminarlo, para eso debemos retornar ese temporizador para poder eliminarlo.
  return timer;
};
///////////////////////////////////////
// Event handlers, la razon de tener estas variables afuera como variables globales es que persistan entre diferentes inicios de sesion, de lo contrario la variable desaparecera
let currentAccount, timer;

//FINGIENDO estar siempre conectado, esto lo hacemos para no tener que estar ingresanndo las iniciales y la contraseña a cada rato
//currentAccount = account1;
//updateUI(currentAccount);
//containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //experimentando con API de internacionalizacion, esta nos ayudara a formatear nuestras horas y fechas al formato que se utiliza en nuestro pais de manera automatica. ademas de muchas otras cosas que podemos hacer con esta. para esto debemos usar el espacio de nombre para esta API (Intl) y luego llamar a la funcion 'DateTimeFormat' y lo que debemos pasarle a esta funcion es algo llamado 'cadena de configuracion regional' que basicamente es el idioma y la locasion(pais) y luego llamar a format y pasarle la fecha que queremos transformar
    const now = new Date();

    //como se menciono esta API de internacionalizacion nos permite realizar varias cosas ahora si queremos agregar otras cosas debemos agregarle un objeto por ejemplo para tener la hora tambien. este objeto debemos pasarlo como segundo argumento a nuestra function.
    //* se observa que este objeto funciona y aparece la hora ,pero la fecha ya no esta, esto es facil ya que como la fecha ya esta configurada solo debemos agregarlas al objeto y listo esto seria el (dia, mes y año) . aparte de 'numeric' y 'long' existe otros que podemos usar por ejemplo para resumir la fecha
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', //no necsariamente se puden representar como numeros
      year: 'numeric',
      weekday: 'long', //le podemos agregar mas objetos
    };
    //comento este codigo porque esta reemplazado mas abajo
    //labelDate.textContent = new Intl.DateTimeFormat('es-CL', options).format(
    //  now
    //);
    //* otra cosa que se suele hacer mucho y es que en vez de hacer esta configuracion usando esta API , simplemente configurar segun el navegador que se este usando
    const localeNav = navigator.language; //esta variable la pondriamos como primer argumento reemplazandola por el idioma y el pais
    console.log(localeNav); //como se observa en consola se formateara al español

    //si nos fijamos en los objetos que tenemos definidos en nuestro codigo, tenemos definido la localia en portugal para jonas y americana para jessica davis, pues usemos esta configuracion para nuestras cuentas. solo debemos reemplazar el primer argumento(es-CL) de la function 'DateTimeFormat' por usuario actual.nombre de la propiedad
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    /*
    //creamos la fecha actual
    const now = new Date();
    //podemos observar que el formato no es el esperado, para manipular el formato debemos 'obtener'(get) el año, mes y dia de manera separada
    //labelDate.textContent = now;
    const day = `${now.getDate()}`.padStart(2, 0); //podemos observar que esto no afecta si la fecha ya cuenta con 2 caracteres
    const month = `${now.getMonth() + 1}`.padStart(2, 0); //aca si afecta porque solo hay un caracter
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    
    //ahora que tenemos nuestros datos por separado podemos construir nuestra cadena con el formato que deseemos, //*ahora se suele poner un 0 cada vez que el numero sea de un caracter en el caso del dia y mes. eso lo podemos realizar directamente al momento de obtener ese valor tal como se ve arriba.
    //IMPORTANTE la hora se mantendra estatica , solo se actualizara cuando recarguemos la pagina, esto se soluciona agregando un temporizador que lo veremos mas adelante en el curso, por ahora lo dejaremos asi.
    labelDate.textContent = ` Fecha : ${day}/${month}/${year} , ${hour}: ${min}`;
    */
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //comprobamos si es que ya existe un temporizador corriendo de ser asi lo detenemos
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //en cada transferencia u prestamo el nuevo movimiento se agrega correctamente al array movements, pero al revisar nuestro array movementsDay este le faltaba 1 elemento la fecha que acompaña a cada movimiento. RECORDAR que trabajamos recorriendo el array movemments y movementsDay al mismo tiempo,pero cada vez que agragabamos un nuevo movimiento las fechas no se agregaban a nuestro array movementsDay por ende es necesario agregar estas fechas nuevas a nuestro array movementsDay de forma manual para que asi al recorrer estos arrays puedan ser leidas.
    currentAccount.movementsDates.push(new Date().toISOString());
    //el que recibe el prestamo tambien esta agregando un nuevo movimiento
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);

    //la idea de el temporizador es que cierre sesion cuando nota una INACTIVIDAD, pero cuando realizamos algo nuestro temporizador deveria volver a reiniciarse y comenzar nuevamente. en este caso cuando realizamos una transferencia
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //redondeamos hacia abajo el valor del prestamo
  const amount = Math.floor(inputLoanAmount.value); //no es necesario convertir ya que el metodo floor realiza conversion de tipo

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    //usamos la funcion 'setTimeOut' para simular el tiempo de espera que se toma el banco en aprobar un prestamo
    setTimeout(function () {
      currentAccount.movements.push(amount);
      //agregamos una nueva fecha a nuestro array movementsDay, como esto es un prestamo lo realiza el banco
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      //detenemos y receteamos el temporizador cuando se realiza un prestamo
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

console.log('------------fin de  la aplicasion-------------');

/*
//*converting y checking Numbers
//internamente javascript convierte todos los numeros a punto flotante,no importa si realmente los escribimos como enteros, internamente seran decimales, es por eso que solo existe un solo tipo para representar a todos los numeros, tambien javascript maneja el formato de 64 bits en base 2, esto significa que se almacenan en binario (ceros y unos). en este formato en base 2 (0 a 1) es muy dificil representar algunas fracciones que en el formato en base 10 (0 a 9) seria muy facil como por ejemplo (0.1)
console.log(23 === 23.0);

//el resultado de esto seria 0.3, en formato en base 10, pero en base 2 nos devuelte otra cosa
console.log(0.1 + 0.2);

//y asi como por ejemplo 10/3 seria para nosotros inposible llegar al resultado final ya que tendriamos 3.33333 infinito asi es para javascript dar con la exactitud que algunas fracciones requieren en su base 2. tenemos que saber que en algunas fracciones javascript no podra llegar al resultado preciso y esto puede causar algunos problemas como este.
//el resultado de esto deviera ser true.
console.log(0.1 + 0.2 === 0.3);

//sabiendo todo esto ahora es momento de seguir, sabemos que para convertir de String a numero lo hacemos asi
console.log(Number('23'));

//pero tambien  lo podemos hacer asi, esto es posible ya que cuando javascript ve este signo + aplica 'coercion de tipos' osea lo convierte implicitamente y automaticamente RECORDAR que la coersion la aplacara cada vez que hallan 2 tipos de datos diferentes convirtiendo uno de ellos para que coincida con el otro y que la operacion se puede realizar EJP: 'yo + tengo + 23 + años', javascrpt convertira el numero a string.esto tambien sucede en las plantillas literales
console.log(+'23');

//*parsing

//el Parsing (analisis) es como una especie de coersion mas detallada ya que intentara eliminar los simbolos innecesarios
console.log(Number.parseInt('30x'));
//para que surja efecto el simbolo debe estar despues del numero,  si no es a si nos arrojara NaN (numero invalido)
console.log(Number.parseInt('x30'));

//ahora este metodo 'parseInt' acepta un segundo parametro que es 'regex' es basicamente el sistema decimal que estemos usando que en la mayoria de los casos es en base 10. es conveniente ponerlo ya que en algunas ocasiones podria causar problemas.
console.log(Number.parseInt('12a#', 10));

//tambien tenemos este metodo para numeros decimales. IMPORTANTE no es necesario agregar Number antes de usar estos metodos, pero en javascript moderno se recomienda hacerlo ya que proporciona algo llamado 'nombres de espacio'
console.log(Number.parseFloat('2.3rem', 10));
console.log(parseInt('2.3rem', 10));

//veamos el metodoo isNaN que basicamente pregunta si es un NaN, nos sirve para saber si un numero es un numero realmente
console.log(Number.isNaN(20)); //el resultado es false porque 20 si es un numero
//el resultado tambien es un false que que es una expresion regular RECORDAR que NaN significa 'numero invalido'
console.log(Number.isNaN('30'));

//este valor si que es un numero invalido
console.log(Number.isNaN(+'20#'));

//este es otro ejemplo de lo que pareciera ser un NaN, pero no lo es, por ahora. ya que dividir por cero no esta permitido en matematicas ya que nos da un valor infinito, pero infinito sigue siendo una expresion reguplar.
console.log(Number.isNaN(23 / 0));

//*esto es algo confuso ya que hemos visto que hay numeros que en realidad deverian ser tomados como numeros invalidos, pero no es asi , por lo tanto usar isNaN para saber si un numero es realmente un numero no es la mejor manera, para solucionar esto tenemos otro metodo llamado 'isFinite'
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(23 / 0));

//tambien tenemos el isInteger
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23.1));
*/

console.log('OPERACIONES MATEMATICAS AND ROUNDING(REDONDEO)');
/*

//raiz cuadrada
console.log(Math.sqrt(25));
//lo mismo lo podemos hacer de la siguiente manera
console.log(25 ** (1 / 2));

//ahora la unica forma de obtener la raiz cuadrada es de la siguiente manera
console.log(8 ** (1 / 3));

//veamos como obtener el valor maximo de un conjunto de numeros
console.log(Math.max(5, 7, 8, 34, 1, 33));

//este operador realiza coersion de tipo
console.log(Math.max(5, 7, 8, '34', 1, 33));
//pero no parsing
console.log(Math.max(5, 7, 8, '34x', 1, 33));

//para el operador min corren las mismas reglas que para el max
console.log(Math.min(5, 7, 8, 34, 1, 33));

//tambien tenemos constantes en el metodo Math o en el espacio de nombre de Math
console.log(Math.PI);

//por lo que podemos realizar algunas operaciones como calcular el area de un circulo, en este ejemplo con un radio de 10

console.log(Math.PI * Number.parseFloat('10px') ** 2);

//y como hemos vistos anteriormente podemos generar numeros aleatorios con nuestro metodo 'random'
console.log(Math.random()); //nos da numeros entre 0 y 1

//pero sabemos que debemos eliminar la parte decimal ademas de especificar hasta que numero queremos. al eliminar la  parte decimal EJP:(0.56) debemos compensar eso para que los numeros sigan siendo hasta el 6, para eso debemos sumarle un 1
console.log(Math.trunc(Math.random() * 6) + 1);

//con los conocimientos hasta ahora podemos hacer una funcion que nos permita generar numeros aleatorios entre 2 diferentes numeros dados. si nos damos cuenta toda la operacion despues del '*' (que es el numero al que quemremos que llegue(max)) nos da como resultado el numero max
const randonInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};
console.log(randonInt(2, 8));

//* redondeo a numeros enteros, todos estos metodos realizan coercion de tipos

//metodo TRUNC, este metodo sacara la parte decimal siempre
console.log(Math.trunc(23.3));

//metodo ROUND este metodo redondeara al entero mas cercano
console.log(Math.round(23.9)); //en este caso  24
console.log(Math.round(23.4)); //en este caso 23

//metodo CEIL este metodo redondeara al entero que sigue arriba
console.log(Math.ceil(23.5)); //24
console.log(Math.ceil(23.3)); //34

//metodo floor este metodo redondeara al entero que lo posee u redondeara siempre hacia abajo
console.log(Math.floor(23.9)); //23
console.log(Math.floor(23.4)); //23

//hay algunas deferencias cuando trabajamos con numeros negativos, en este sentido es mejor FLOOR que TRUNC ya que redondeara no inporta si se trabaja con positivos u negativos de hecho usemos esto en nuestra funcion
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

//* redondeo a numeros decimales

//este metodo necesita como parametro la cantidad de decimales que tendra, si no le pasamos o si le pasamos un cero este redondeara sin decimales al entero mas cercano. y tener mucho cuidado ya que este devolvera siempre un string.
//IMPORTANTE sabemos que los numeros son primitivos y los valores primitivos no tienen metodos, lo que pasa es que javascript transformara estos en un tipo de objeto y es en este objeto al que podemos llamar a estos metodos, para luego volver a dejarlos como primitivos.
console.log((2.4).toFixed(0));
console.log((2.7).toFixed(3));
console.log(+(2.745).toFixed(2)); //el '+ gatillara una convercion de tipo
console.log(Number((2.745).toFixed(2)));
*/

console.log('OPERADOR DE RESTO');

/*
//este operador basicamente devuuelve el resto de una division, pero tiene algunas caracteristicas especiales que hay que ver por separdo IMPORTANTE tener en cuenta que la division que realiza este operador '%' no es completa osea retornara el primer entero o mejor dicho la division la realizara hasta el primer entero. por lo que retornara el resto hasta ese punto.
console.log(13 % 5); //el resto sera 3

//en este ejemplo la division nos da como resultado 2.5, pero es la division completa en este caso el resto seria 0, pero el operador '%' no realiza la operacion completa solo llegaria hasta el resultado 2,  por lo que el resto es 1 (2 * 2 = 4 para llegar a 5 falta 1 ). esto es inportante tenerlo en cuenta ya que podriamos esperar un resultado distinto al  que nos entrega.
console.log(5 / 2); // 2.5
console.log(8 % 3); // el resto era 0
console.log(8 / 3);

//lo que se suele hacer mucho en programacion es determinar si un numero es par u impar. y este metodo nos ayuda con eso, un numero par es aquel que su resto es 0 y si el resto no es cero es un numero impar.

const isEven = function (n) {
  return n % 2 === 0;
};

console.log(isEven(8)); //true /par
console.log(isEven(23)); //false /impbar
console.log(isEven(514)); //true /par

// veamos otro ejemplo, cambiaremos el color de todas las segunndas filas de estos movimientos segun sean pares u impares, en otras palabras se pintaran todas las filas que sean pares. como sabemos seran pares si el resto de su division es 0, y como estamos comparando el indice de los movimientos (0 ,1, 2, 3, 4) tendremos pares e inpares alternados tal como se muestra en el eejemplo.

//EJP
console.log(0 % 3);
console.log(1 % 3);
console.log(2 % 3);
console.log(3 % 3);
console.log(4 % 3);
console.log(5 % 3);
console.log(6 % 3);
console.log(7 % 3);
console.log(8 % 3);
console.log(9 % 3);

//creamos un evento en alguna parte de nuestra aplicasion, RECORDAR que esto retornara una 'modeList' asi que la transformaremos a un array.recorremos este array y evalamos el resto en cada indice

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/
console.log('---------OPERADOR _ O SEPARADORES NUMERICOS-----------');
/*
//desde javascrip 2021 tenemos un operador que nos ayudara a entender mejor los numeros.
//por ejemplo tenemos un numero muy grande, el cual no podemos separarlo ni por comas ni por puntos, por lo que se hace muy dificil de entender, pues este operador '_' nos ayudara a nosotros y a otros programadores a entender de que numero es exactamente. el motor de javascript no lo reconocera asi que no hay problemas de ponnerlo en el lugar que nosotros queramos.
const diameter = 287_460_000000;
console.log(diameter);

const pricePesos = 345_99;
console.log(pricePesos);

//se hace mas facil de entender de que valor es el numero
const transferencia = 14_00;
const transferencia1 = 1_400;

//* debemos tener en cuenta algunas limitaciones EJP. no podemos usar el guieon bajo al comienzo ni al fianl del numero, este debe estar entre numeros.  tampoco funcionara cuando queramos convertir de string a numeros.

//const PI = 3._1415; //esto dara un error
//console.log(PI);

//console.log(Number('230_000')); // esto tambien dara un error

*/
console.log('workinng whit BigInt');
/*
//este operador es uno de los operadores primitivos del que no  hemos hablado hasta ahora. como sabemos las operaciones con numeros en javascript se representan en base 2 de 64 Bits eso quiere decir que hay 64 ceros o unos para representar los numeros, pero en realidad solo se utilizan 53 ya que los otros se usan para los decimales, por lo que hay un limite en cuanto a lo grande que puede llegar a ser un numero, de hecho este lo podemos calcular.
console.log(2 ** 53 - 1); //el -1 es porque los numeros comienzan desde  el cero y el 2 es porque se trabaja en base 2(0-1) en javascript

//este numero maximo tambien lo tenemos en el espacio de nombres de 'Number'
console.log(Number.MAX_SAFE_INTEGER); // como se observa es el mismo numero

//en conclusion este numero es el mas grande que javascript puede representar con precision y seguridad , un numero mas grande javascript tendria problemas para representarlo y podria generar ciertos errores.

//pero este nuevo operador integrado en 2020 'BigInt' vino para ayudarnos con eso, porque en la practica es probable que tengamos que trabajar con numeros mas grandes, podriamos obtener un numero mas grande desde una API por ejemplo y sin este operador no tendriamos como almacenar ese numero.

//este numero en consola se lee hasta cierto punto, javascript no lo puede representar con precision porque es muy grande
console.log(32253455346787045905394239535000);

//si agregamos una n al final sera un numero BigInt y javascript lo reconocera, y la consola lo podra mostrar completo y resaltado con otro color IMPORTANTE este numero puede ser tan grande como nosotros queramos
console.log(32253455346787045905394239535000n);

//tambien podemos usar  la funcion BigInt, puede que un numero muy grande no coincida con el numero real, pero en este caso si funciona
console.log(BigInt(3225345534678704));

//podemos realizar operaciones de forma habitual con este operador, no interfiere con las ooperaciones
console.log(10000n + 10000n);

console.log(23345345645000n * 245000n);

//lo que NO podemos realizar es combinar BigInt con numeros regulares
const huge = 350908767890324454000n;
const num = 23;
//* esto no funcionara, en este caso este operador no trabaja con BigInt, al igual que otros operadores
//console.log(Math.sqrt(16n));

//console.log(huge + num);//esto nos da error (no se pueden conbinar estos tipos de numeros)

//es aqui donde la funcion BigInt es de gran utilidad
console.log(huge + BigInt(num));

//claro que tenemos  algunas excepciones cuando trabajamos con el operador de comparacion y el operador + cuando trabajamos con cadenas
console.log(20n > 15); //(true)esto funciona como se esperaba

console.log(20n === 20); //(false)esto tambien actua de manera esperada ya que el operador de igualdad tripe  NO realiza coerccion de tipo

console.log(20n == 20); // (true)en este caso javascript si realiza coercion de tipo

//tambien tenemos excepciones cuando trabajamos con concatenaciones, podemos observar que el numero BigInt es convertido a string
console.log(huge + ' es muy grande numero');

//por ultimo veamos las divisiones, sabemos que 10 / 3 es 3.3333
console.log(10 / 3);

//pero como BigInt es un entero, este devovera el entero mas cercano, ya que si hacemos esto de  forma normal obtendremos 3.3333 infinito
console.log(10n / 3n);
console.log(11n / 3n); //simplemente corta la parte decimal y os devuelbe el entero
*/
console.log('-----------FECHAS Y HORAS---------------');
/*
//en javascripot debemos crear las fechas y estas se puedenn crear de 4 formas. todas utilizan el constructor new , pero varian los parametros que pueden aceptar
//*1-
const now1 = new Date();
console.log(now1);

//*2- simplemente le pasamos una cadena, pero con mucho cuidado ya que no siempre javascript podra interpretar esta cadena con la fecha correcta,  tal como se aprecia en este ejemplo
console.log(new Date('december 18, 2022'));

//pero si la cadena fue creada por javascript claro que no tendremos problemas
console.log(new Date(account1.movementsDates[0]));

//*3-
//podemos pasarle a este constructor el año, mes, dia, hora, minutos hasta los segundos, eso si debemos tener en cuenta que el mes javascropt lo trabaja comenzando desde el cero, en este caso tenemos mes = 10 que deveria ser octubre, pero nos aparece noviemmbre porque comienza del cero
console.log(new Date(2030, 10, 19, 15, 23, 12));

//lo bueno que podemos rescatar es que javascript corrige automaticamente el dia, ejemplo: noviembre solo tiene 30 dias. y como se observa jasvascrpt lo corregira pasando al siguiente dia diciembre 1
console.log(new Date(2037, 10, 31, 23, 12, 10));

//*4-
//finalmente tambien podemos pasarle la cantidad de milesegundos transcurridos desde el comienzo del tiempo Unix
//*tiempo Unix es un sistema para la descripción de instantes de tiempo: se define como la cantidad de segundos transcurridos desde la medianoche UTC del 1 de enero de 1970
console.log(new Date(0)); //0 milesegundos despues de esta fecha, en este caso me muestra una fecha anterior eso es porque actualmente estoy con el nuevo hoario de verano

//ahora crearemos una fecha 3 dias despues de esta fecha: 3 dias despues, los dias estan conpuestos de 24 horas , las horas estan conpuestas de 60 minutos y cada minuto esta compuesto por 60 segundos todo eso por 1000 segundos
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//*este numero que acabamos de crear 3*24*60*60*10000 = 259200000 es llamado la 'marca de tiempo' y es y sera muy util en futuras lecciones.
//las fechas que acabamos de crear son un tipo especial de objetos en javascript por lo que tienen sus propios metodos al igual que los array, mapas o string

const future = new Date(2030, 10, 19, 15, 23);
console.log(future);

//metodos que pueden ser muy utiles de vez en cuando
console.log(future.getFullYear()); //obtenemos el año
console.log(future.getMonth()); //obtenemos el mes,  recordar que el mes comienza del 0 en este caso es noviembre
console.log(future.getDate()); //obtenemos el dia del mes
console.log(future.getDay()); // obtenemos el dia de la semana
console.log(future.getHours()); //horas
console.log(future.getMinutes()); //minutos
console.log(future.getSeconds()); // segundos

//tambien podemos formatear esta fecha, con el metodo 'toISOString' que sigue un standar internacional, muy util cuando queramos transformar una fecha para guardarla en algun lado
console.log(future.toISOString());

//tambien podemos obtener la 'marca de tiempo' que son los milesegundos que han pasado desde la fecha 1 enero de 1970 hasta la fecha dada en este caso 2037
console.log(future.getTime());

//teniendo este tiempo podemos revertirlo, para saber exactamente la fecha a la que corresponde este tiempo
console.log(new Date(1921342980000));

//las marcas de tiempo son importantes es por eso que tambien tenemos un metodo especial para saber la marca de tiempo desde la fecha actual osea desde el 1 de enero del 1970 el momento actual. y para eso solo necesitamos crear una nueva fecha, solo 'Date'.
console.log(Date.now());

//por ultimo tambien tenemos las versiones en SET de todos los metodos que acabamos de ver (digamos que para fechas futuras), en este ejemplo solo veremos el año , pero aplica para todas
//*El setter lo que hace es asignar un valor y el getter se encarga de recibir un valor.
future.setFullYear(2040);
console.log(future);
*/
console.log('--------FECHAS--------- ');
/*
//algo que podemos realizar con fechas es calcular por  ejemplo los dias transcurridos entre 2 fechas, esto es posible gracias a la marca de tiempo que conocimos antes esta se expresa en milesegundos y aparece cada vez que tratamos de covertir una fecha a un numero.

const future = new Date(2023, 4, 2, 15, 23);
console.log(Number(future));
console.log(+future); //recordar que '+' realiza lo mismo que 'Number'

//como podemos observar podemos realizar algunos calculos con esta marca de tiempo a la que podemos convertir o transformar en horas, dias etc
//sabiendo esto podemos crear una funcion que acepte 2 fechas y nos devuelba los dias que hay entre estas 2 fechas, para esto debemos dividir el resultado de esa resta por el resultado que se muestra a continuacion que basicamente realiza el paso de milesegundos a segundos(1000), luego pasa a minutos(60) luego a horas(60) y por ultimo a dias(24).
//* el Math.abs (valor adsoluto) es para no estar suponiendo que la fecha2 sea posterior a fecha1, tomando el valor adsoluto no importa que fecha es posterior o primera siempre dara el mismo resultado.
const daysPassed = function (date1, date2) {
  return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
};

const resultado = daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(resultado);

//en el caso que queramos realizar calculos mas precisos que incluyan por ejemplo los cambios de hora de verano, tendriamos que usar una libreria como MOMENT.JS, ahora si queremos incluir la hora en el ejemplo podemos hacerlo de la siguiente manera
const daysPassed1 = function (date1, date2) {
  return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
};

const resultado1 = daysPassed1(
  new Date(2037, 3, 4, 10, 9),
  new Date(2037, 3, 14)
);
//si no tuvieramos el math.round nos arrojaria un numero decimmal algo asi 9.2323, porque basicamente esta considerando las horas y los minutos
console.log(resultado1);
*/
console.log('---------FORMATEANDO NUMEROS CON API-------------');
/*
//claro esta que tambien podemos usar un objeto para darle mas opciones a nuestro formato, en este caso tenemos mas opciones para darle como se aprecia definimos un estilo y luego definimos como sera ese estilo.
const option = {
  style: 'currency', // aparte de la unidad, tambien tenemos el porcentage y la moneda 
  unit: 'mile-per-hour', //podemos revisar todas las unidades en la documentacion oficial
  currency: 'CLP',
  useGrouping: false, //podemos observar que esta propiedad que podemos activar o desactivar nos muesyra los puntos u comas que separan al numero
};

//al igual que con la API para formmatear fechas y hora, podemos  formatear numeros, que es lo que haremos en nuestra aplicasion mas adelante
const num = 3884764.23;

//le pasamos a esta funncion 'NumberFormat'el idioma y la region para luego llamar a format, lo que nos regresa es el numero en el formato que se usa segun la configuracion regional dada.
console.log('Germany:', new Intl.NumberFormat('de-DE', option).format(num));
console.log('Syria  :', new Intl.NumberFormat('ar-SY', option).format(num));
console.log('US:     ', new Intl.NumberFormat('en-US', option).format(num));
//tambien como ya vimos podemos usar el idioma segun el navegador que se este usando
console.log('Browser: ', new Intl.NumberFormat(navigator.language).format(num));
*/

console.log('--------TEMPORIZADORES------------');
/*
//tenemos 2 tipos se temporizadores el primero 'TEMPORIZADOR DE TIEMPO DE ESPERA ESTABLECIDO' este se ejecuta solo una vez despues de un tiempo definido, mientras que el 'TEMPORIZADOR DE INTERVALO' siguira funcionando hasta que lo detengamos

//simulamos el tiempo que transcurre desde que pedimos una pizza, esta funcion 'setTimeout'es una funcion de orden superior ya que recibe una callback function, esta callback es basicamente un argumento y como segundo argumento le pasaos el tiempo(milesegundos) que pasara hasta que se ejecute la funcion 'setTimeout'. //!se suele decir que 'programamos esta funcion para ser llamada o ejecutada 3 segundos en el futuro'¡ j
//*que pasaria si quisieramos pasarle argumentos a nuestra callback function, como no somos notrotros los que llamamos a esta funcion ((a,b ))se hace complejo. pues los argumentos que pasemos despues del tiempo de espera seran los argumentos de nuestra funcion de orden superior y podremos acceder a estos argumentos atravez de los argumentos de nuestra funcion callback. tal como se muestra en el ejemplo.
setTimeout(
  (ingre1, ingre2) => {
    console.log(`aqui esta su pizza 🍕 con ${ingre1} y ${ingre2}`);
  },
  3000,
  'tomates',
  'aceitunas'
);

//*es importante entender que una vez que el codigo llega a la linea de la funcion esta se llama, pero el codigo que hubiese se seguira ejecutando miestras se espera detras de escena hasta que se cumpla el tiempo en este caso 3 segundos , esto lo podemos comprobar ya que inmediatamente se ejecuta esta linea de codigo y despues aparace el texto. este mecanismo se conoce como JAVASCRIPT ASINCRONICO
console.log('esperando');

//veamos un punto importante ya que podemos parar el tiempo de ejecusion, en otras palabras podemos suprimir la ejecusion de la funcion.

//aca tenemos los ingredientes en un array y accedemos a ellos usando el operador de propagacion RECORDAR que este  sacara los elementos y los pondra separados por coma, tal como lo tenemos en el ejemplo anterior.
const ingredientes = ['aceitunas', 'tomates'];
const pizzaTimer = setTimeout(
  (ingre1, ingre2) =>
    console.log(`aca esta su pizza 🍅con ${ingre1} y ${ingre2}`),
  3000,
  ...ingredientes
);
console.log('esperando...');

//podemos observar que el codigo nunca se ejecuta, solo el primero donde No cortamos el tiempo de ejecusion
if (ingredientes.includes('tomates')) clearTimeout(pizzaTimer);

//!Realizamos lo mismo ahora utilizando como callback una funcion declarativa
const ingredientes2 = ['aceitunas', 'espinacas'];
const tiempoEsperaPizza = setTimeout(
  function (ingrediente1, ingrediente2) {
    console.log(`Esta lista su pizza 🍕 con ${ingrediente1} y ${ingrediente2}`);
  },
  3000,
  ...ingredientes2
);
if (ingredientes2.includes('espinacas')) clearTimeout(tiempoEsperaPizza);

//*VEAMOS AHORA EL TEMPORIZADOR DE INTERVALO
//hasta ahora nuestra funcion de tiempo de espera, ejecuta nuestra funcion despues de cierto tiempo que nosotros le damos, pero ejecuta la funcion solo una vez. que pasa si quiero ejecutar la funcion cada 5 segundos o cada 10 minutos, aca es donde entra nuetro segundo temporizador de intervalo.

/*setInterval(() => {
  const now = new Date();
  console.log(now);
}, 4000);
*/
//*creando reloj
/*setInterval(() => {
  const date = new Date();
  const hora = date.getHours();
  const minutos = date.getMinutes();
  const segundos = date.getSeconds();
  console.log(`${hora}: ${minutos}: ${segundos} H:M:S`);
}, 1000);*/

//*otra solucion al reloj
/*
setInterval(
  () =>
    console.log(
      Intl.DateTimeFormat(navigator.locale, { timeStyle: 'medium' }).format(
        new Date()
      )
    ),

  1000
);*/
