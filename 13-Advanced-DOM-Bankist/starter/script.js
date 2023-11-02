'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const seccion1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  //RECORDAR que este metodo evita el conportamiento predeterminado del html se, en este caso el comportamiento que queremos evitar es al darle click al boton 'open account' cuando este apenas se ve , esto generara que aparesca nuestro modal, pero tambien que la pagina vuelva al tope(arriba). esto sucede cuando tenemos un link y este posee un hipervinculo (href : #)tal cual aparece en el HTML.
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//la variable 'btnsOpenModal' es una nodeList ya que fue generada por el 'querySelectorAll' (variaos elementos seleccionados a la vez)RECORDAR  que una nodeList es algo parecido a un array, pero posee menos metodos que este.sin enbargo uno de los metodos que posee es el forEach que es el que nos interesa
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//*este codigo agrega un evento a cada uno de los botones, pero, es de la vieja escuela, ahora tenemos una mejor oopcion que es el (forEach)
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//!implementamos el desplazamiento sueve (scroll)

//*PRIMERO VEREMOS LA FORMA ANTIGUA Y LUEGO VEREMOS OTRA MAS MODERNA. seleccionamos el botom 'lear more' (.btn--scroll-to) y la seccion a la cual nos desplazaremos(#section--1) NOTA estas selecciones estan en la parte superior del codigo junto con todas las demas

//creamos el detector de eventos para el boton, IMPORTANTE para poder desplazarnos necesitamos saber las coordenadas (x,y)en este caso de la seccion1, obtenemos estas coordenadas atravez de nuestro metodo 'getBoundingClientRect()'
btnScrollTo.addEventListener('click', function (eve) {
  /*
  //este metodo en este caso nos muestra la distancia que hay entre la parte superior y el comienzo de la seccion 1.
  const coordenadas = seccion1.getBoundingClientRect();
  console.log(coordenadas);
  //* pero si obtenemos las coordenadas del evento (botom), las distancias que se muestran (ejes x , y) corresponden a la distancia entre el bordde izquierdo de la pagina web hasta el BOTON 'lear more' y el eje Y desde el BOTON 'lear more' hasta el borde superior de la pagina web, IMPORTANTE el metodo 'getBoundingClientRect' es relativo al tamaño de la pagina VISUAL.
  console.log(eve.target.getBoundingClientRect()); //IMPORTANTE target nos permite acceder a las propiedades del objeto

  //si queremos obtener las coordenadas del desplazamiento en si, osea lo que nos movemos tomando en cuenta eje x desde la izquierda de la pantalla y eje Y desde el borde superior de la pantalla
  console.log('Nos Desplazamos...(x/y) ', window.scrollX, window.scrollY);

  //ya que estamos  viendo coordenadas tambien podemos obtener el alto y el ancho de nuestro sitio web.
  console.log(
    'Altura y Ancho de la pantalla...',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //!finalmente necesitamos saber esto porque necesitamos estas coordenadas para poder desplazarnos hasta la seccion1, que es lo que haremos finalmente ahora.
  //*con esta funcion global que esta disponible en el objeto windows nos desplazamos el equivalente a la distancia que hay de el borde izquierdo (en este caso es 0, porque no hay desplazamiento horizontal(x)) y del borde superior hasta el comienzo de la seccion1 (Y)(left(x), top(y)) son unas de sus propiedades).
  //vemos que funciona, pero solo al primer click ya que al segundo click ya no funciona, esto se debe a que estas propiedades son relativas a la pantalla visual de la pagina y no al documento. en otras palabras si nos posicionamos justo al borde superior y a la izquierda(x = 0, y= 0) nos desplazara correctamente hasta el comienzo de la seccio1, pero si nos situamos en otra posicion de la pantalla la distancia entre el borde superior en ese momento y posicion y la seccion1 sera menor desplazandonos solo el resto de la distancia total (distancia total (Y) = 500 px) si nos situamos en otra parte de la pantalla (distancia total (Y) va a ser menor = 300) por lo que se desoplazaria solo 500-300 = 200 px.
  //* para solucionar esto devemos sumarle el desplazamiento actual a la propiedad top, de esta manera simpre nos desplazaremos la misma distancia independiente de la posicion en la que estemos visualmente.
  // window.scrollTo(
  //   coordenadas.left + window.scrollX,
  //   coordenadas.top + window.scrollY
  //);
  // ahora podemos mejorar esto, pasandole un objeto en vez de solo argumentos y como todo objeto nesecitamos expresar las propiedades en este caso (left, top) y una en especial que nos permitira este movimiento suave que es 'behavior'.
  // window.scroll({
  //   left: coordenadas.left + window.scrollX,
  //   top: coordenadas.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  */
  //! ahora veremos la forma actual de hacerlo en la que no realizamos los calculos manualmennte nosotros mismos,  si no que se calcularan automaticamente
  //solo necesitamos el elemento  al cual nos queremos desplazar y llamar al metodo 'scrollIntoView' y pasarle un objeto con la propiedad que necesitemos
  seccion1.scrollIntoView({ behavior: 'smooth' });
});

//! implementamos la delegacion de eventos
//*primero lo haremos sin hacer delegacion de eventos para ver cuales son los problemas que tendremos con este enfoque.
//* si observamos este codigo funciona, el problema que genera este codigo es que estamos creando copias iguales de la misma callback function para cada uno de nuestro link, lo cual es imnecesario, porque con 3 botones no hay problema, pero si son 100 esto afectaria el rendimiento de la memoria

//seleccionamos los 3 link con los que queremos trabajar en este caso los 3 poseen la misma clase asi que podemos seleccionarlos todos de una vez, esta nos devolvera una nodeList la cual queremos recorrer para implementar un controlador de eventos en cada uno de estos links
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     //vemos que de forma predeterminada al realizar el click nos  lleva a secciones diferentes  de la pagina, esto  se debe a las anclas que posee el codigo html (#section--1, etc) debemos evitar este comportamiento.
//     e.preventDefault();
//     //ahora si podemos implemetar el desplazamiento suave, utilizamos el metodo getAttribute porque solo quiero una parte del url (solo el href) porque usaremos esta como si fuese un selector.
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//NOTA para implementar la delegacion de eventos debemos saber que esta se efectua desde abajo hacia arriba (burbujeo), por lo que deveremos 1-adjuntar un controlador de eventos a un padre comun a estos 3 elementos que seria en este caso (nav__links). 2-determinar el elemento que origino el evento RECORDAR que esto lo podemos saber gracias a 'target'
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //console.log(e.target);
  //ahora SOLO NOS INTERESAN LOS 3 LINKS con los que trabajaremos por lo que deveremos filtrar cualquier otro click que no tenga que ver con estos 3. en este caso lo haremos teniendo en cuenta que la clase para estos 3 elementos es la misma.
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//! incorporando el componente de pestañas
//seleccionamos todos los elementos que nos interesan (las pestañas, el contenido de cada pestaña y el contenedor de las pestañas)
const pestañas = document.querySelectorAll('.operations__tab');
const contenedorPestañas = document.querySelector('.operations__tab-container');
const contenidoPestañas = document.querySelectorAll('.operations__content');

//esto es una mala practica, porque si tuvieramos muchas mas pestañas 30 o mas tendriamos 30 copias de la misma funcion y no seria un codigo 100% eficiente, para  eso aprendimos la delegacion de eventos
//pestañas.forEach(t => t.addEventListener('click', () => console.log('tab')));

//DELEGACIONN DE EVENTOS RECORDAR que para hacer uso de esta debemos adjuntar un controlador de eventos a un elemento comun a los elementos que nos interesan, en este caso seria 'contenedorPestañas'. ahora tenemos que tener en cuenta que dentro de estos botones o pestañas tambien tenemos otro elemento (<span>01</span>) este se ve reflejado por el numero que posee cada pestaña, por lo que si hacemos click sobre ese numero el elemento seleccionado seria este elemento 'span', pero lo que queremos es que independiente en donde hagamos click queremos el elemento pestaña porque necesitamos trabajar con el atributo 'data-tab'presente en ese elemento
//RECORDAR que 'target' nos permite saber el elemento que origino la llamada a la funcion.
//una forma de solucionnarlo seria hacer un recorrido del DOM,(DOM traversing) osea seleccionando el padre de este elemento 'span', esto solucionaria el botom del elemento span, pero si hacemos click sobre la pestaña misma vemos que el elemento mostrado es su padre en este  caso el elemento 'div'
// contenedorPestañas.addEventListener('click', function (e) {
//   const clicked = e.target.parentElement;//del elemento que origino el evento seleccionamos a su padre mas directo(DOMtraversing)
//   console.log(clicked);
// });

//para solucionar esto conocimos hace poco una propiedad que nos cae como anillo al dedo para este problema y esta es 'closest' RECORDAR que este nos selecciionara el padre mas lejano que este mas arriba en el DOM, segun el string que le entreguemos, en este caso le pasamos el mismo elemento por lo que nos arrojara ese elemento. ahora surge un problema ya que si hacemos click en alguna parte de nuestro contenerdor de pestañas nos arrojara 'NULL' y un error esto se debe a que no encuentra un padre que coincida con 'operations__tab'  porque nosotros al poner la misma clase como string en el closest solo hasta hay buscara. porque lo que deveremos ignorar cualquier click que produsca un 'null'.
contenedorPestañas.addEventListener('click', function (e) {
  //el elemento target que origino la llamada de la funcion es el mismo que posee nuestro metodo closest es por eso que devuelve lo mismo
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //RECORDAR que classList nos permite agregar u quitar clases a elementos, en este caso agregamos la clase 'operations__tab--active' a todos los botones o pestañas. NOTA para ignorar cualquier click que se pudiera efectuar en nuestro contenedor de pestañas podemos hacer esto
  //if (clicked) {
  //clicked.classList.add('operations__tab--active');
  //}
  //pero hoy en dia podemos hacer algo mas moderno llamado 'clausula de proteccion' que es lo mismo que hicimos arriba. en este caso producto del click en nuestro contenedor nos dara NULL este recordemos que es un elemento 'falso' por lo que al ingresar a este if se convertira en true y retornara esta. en otras palabras se saldra y lo que venga despues no se ejecutara, si el valor es verdadero osea al hacer click el valor seguira siendo falso y todo seguira normal. por esa razon sigue apareciendo el NULL,pero no mas el error.
  if (!clicked) return;
  //al momento de hacer click en elguna de estas pestañas queremos activar la clase 'operations__tab--active' que es la que posee los efectos, pero para eso antes deveriamos quitarselas a todos y solo al hacer click activarla para ese elemento
  pestañas.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //!activamos el contenido de cada pestaña
  //devemos saber que la informacion sobre que contenido debe mostrarse esta en nuestro atributo 'data-tab' esta posee un numero segun la pestaña que fue activada, este numero es el que usaremos. IMPORTANTE (DATA-ALGO) es una caracteristica de html5 que nos permite almacenar datos y luego poder obtener estos datos con javascript especificamente con el metodo DATASET
  console.log(clicked.dataset.tab); //imprimimos este numero de la propiedad 'data-tab' con la ayuda de dataset
  //entonces al hacer click en algun boton ejp el numero 2(segundo boton) entonces deveremos seleccionar el elemento (contenedor) con la clase 'operations__content--2' que es la clase que corresponde al contenido de cada pestaña,pero reemplazamos el numero 2 por clicked(almacena la informacion de que pestaña fue activada).dataset(reemplazamos data por dateset que nos permite sacar los datos de).tab. IMPORTANTE solo se remeplaza la palabra 'data' (ya que los datos se almaceman en lo que viene despues del guion. en este caso tab).
  //finalmente le agregamos la clase 'operations__content--active' que es la que posee el contenido visible. vemos que funciona, pero la idea es que al activar un contenido los otros se oculten y no que esten los 3 activos. pues deveremos hacer lo mismo que hicimos con las pestañas quitarles a todas esta clase antes de agregarle la clase a una.
  contenidoPestañas.forEach(c =>
    c.classList.remove('operations__content--active')
  );
  //RECORDAR que al escribir en html algo como esto_es--2 significa que podemos reemplazar ese 2 por otra cosa, esto es una caracteristica u tecnica muy poderosa
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//! pasando argumentos a los controladores de eventos (esto es gracias al metodo 'bind') sin este metodo dejaria de ser una funcion.
//!EFECTO DESVANECEDOR DE LINKS
//tenemos comentado mas abajo 2 callBack function que son casi identicas (una cuando ponemos el mause y otro cuando lo sacamos)y eso no es un buen codigo asi que necesitamos REFACTORIZAR para eso debemos comparar estas 2 callBackfunction y determinar que es lo igual y lo que es diferente en este caso es simple ya que lo unico que cambia es la opacidad. NOTA al refactorizar lo que se suele hacer es crear una nueva funcion

const handleHover = function (e /*opacity*/) {
  //IMPORTANTE CON EL METODO BIND LE HEMOS CAMBIADO MANUALMENTE EL OBJETO AL QUE DEBE APUNTAR THIS, PERO EL EVENTO SIGUE SIENDO EL ELEMENTO ACTUAL
  //#console.log(this, e.currentTarget);
  //queremos hacer algo cada vez que el mouse pase por encima de los enlaces por lo tanto, devemos seleccionar solo estos elementos(enlaces) recordar que el controlador esta asociado a un padre y no a los elementos en si
  if (e.target.classList.contains('nav__link')) {
    //si el elemento que origino el evento posee una clase llamada 'nav__link' entonces almacename esa informacion en la variable 'link'
    const link = e.target;
    //tenemos al elemento que origino el evento (1 elemento) ahora devemos seleccionar a sus hermanos usando DOM traversing (seleccionamos a los hijos accediendo a un padre comun y desde alli seleccionamos a los hijos) en este caso no queremos a todos los hijos solo a los con la clase 'nav_link'. tambien usamos closest porque cada nav__link tiene un padre nav__item y necesitamos a un padre comun no individualmente por lo que deveremos ir al siguiente padre que es 'nav_links', pero no hay problema de ir mas lejos asi que seleccionamos 'nav'
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //tambien deveremos seleccionar el logo (aunque este efecto en el logo no lo encuentro necesario). NOTA podriamos haver seleccionado este logo atravez de className, pero para practicar el DOMtraversing lo hacemos asi
    const logo = link.closest('.nav').querySelector('img');
    //por ultimo deveremos cambiar la opacidad de estos links para que estos cambios sean visibles, si alguno de los liks es diferente al link que origino el evento entonces disminuye su opacidad al 50% lo mismo con el logo que es solo 1 elemento separado
    //IMPORTANTE USANDO UN TERCER METODO PODEMOS REEMPLAZAR LA OPACIDAD POR LA PALABRA THIS, YA QUE ESTA EN ESTE PUNTO ESTA APUNTANDO A LA OPACIDAD YA QUE ESO LE DIJIMOS AL PARAMETRO BIND, EN OTRAS PALABRAS CAMBIAMOS MANUALMENTE EL OBJETO AL QUE DEBE APUNTAR THIS,POR LO QUE EL PARAMETRO OPACITY YA NO ES NECESARIO.
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//sabemos que adjuntar un controlador de eventos cuando tenemos muchos elementos no es una buena practica, por lo que usar delegacion de eventos es el paso a seguir, en este ejemplo debemos encontrar un elemento comun a todos los links incluso al logo porque tambien queremos este efecto en el
const nav = document.querySelector('.nav');
//* mouseEnter funciona casi de la misma manera, pero no burbujea por lo que no podriamos usar delegacion de eventos
//¿le pasamos directamente la funcion 'hanleHover' que posee todo el codigo?
//NOTA la respuesta es NO, porque el lissener espera una funcion si le pasamos esta funcion asi devemos pasarle los argumentos tambien ('evento' y la 'opacidad') al hecer esto se transformara en un valor regular y dejara de ser una funcion, por lo que la solucion sera pasarle una funcion regular y dentro de ella llamar a esta funcion 'handleHover' con sus argumentos,
nav.addEventListener('mouseover', handleHover.bind(0.5));
//#  handleHover(e, 0.5);
//#});

//#  if (e.target.classList.contains('nav__link')) {
//#    const link = e.target;
//#    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//#    const logo = link.closest('.nav').querySelector('img');
//#    siblings.forEach(el => {
//#      if (el !== link) el.style.opacity = 0.5;
//#    });
//#    logo.style.opacity = 0.5;
//#  }

//ahora deveremos desacer estos efectos al momento de retirar el mause de estos links, para eso es que necesitamos de su contraparte 'mouseout'.
//* hacemos lo mismo  con este otro lissener
//IMPORTANTE POR ULTIMO TENEMOS UNA TERCER Y MEJOR FORMA DE REALIZAR ESTE CODIGO YA QUE SI RECORDAMOS EXISTE EL METODO 'BIND' QUE CONVERTIRA O DEVOLVERA UNA FUNCION, POR LO QUE AHORA NUESTRO SEGUNDO PARAMETRO SIGUE SIENDO UNA FUNCION. NOTA si queremos pasar mas de un valor al metodo bind podemos pasarle un array u un objeto
nav.addEventListener('mouseout', handleHover.bind(1));
//#  handleHover(e, 1);

//#});
//#   if (e.target.classList.contains('nav__link')) {
//#     const link = e.target;
//#     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//#     const logo = link.closest('.nav').querySelector('img');
//#     siblings.forEach(el => {
//#       if (el !== link) el.style.opacity = 1;
//#     });
//#     logo.style.opacity = 1;
//#   }

/*
//! navegacion fija(la barra del menu nos seguira al hacer scroll)
//en esta ocasion usaremos el evento 'scroll event' que no es lo mas eficiente, porque se generan demasioados eventos solo al mover el scroll y esto afecta el rendimiento sobre todo en dispositivos moviles,  pero es bueno saber que existe. mas adelante veremos otra manera mas eficiente de hacer esto mismo
//RECORDAR que podemos saber la posicion, tamaño, margenes etc  de un determinado elemento gracias al metodo 'getBoundingClientReact' que nos devolvera un objeto con toda esta informacion
const initialCoords = seccion1.getBoundingClientRect();
//observamos que en este objeto devuelto tenemos una propiedad 'top' que corresponde al valor maximo que posee la pagina(devemos tener la pagina siempre al tope). es este valor el que usaremos
console.log(initialCoords);
//NOTA este evento se encuentra en el objeto window
window.addEventListener('scroll', function () {
  //deveremos obtener la posicion en la que nos encontramos RECORDAR que la posicion comienza en 0 justo en la parte superior de la pantalla y sus valores cambiaran dependiendo del tamaña de esta segun el dipositivo que estemos usando por lo que deveremos calcular este valor dinamicamte.para eso usaremos nuestras coordenadas iniciales
  //#console.log(window.scrollY);

  //NOTA que la barra nos persiga depende de que le pasemos una clase llamada 'stiky' la pregunta es //¿cuando debe comenzar esta barra a seguirnos?
  //pues la respuesta es cuando pasemos la primera seccion que es justo cuando se deja de ver.
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
//! aprendiendo a utilizar la API (observador de intersecciones)
/*
// esta API nos permitira observar si un determinado elemento se cruza o intersecta con otro elemento u con nuestra ventana o pantalla y realizar algo si esto sucede.

//2-esta API recibe 2 parametros(la funcion y el objeto)los cuales podemos pasarle directamente, pero es algo mas limpio tenerlas por separado tal como se muestra mas abajo. esta funcion sera llamada cada vez que el elemento observado se cruze con el root en la interseccion u umbral (threshold) establecida. //* en otras palabras cada vez que la seccion1 se cruze con la ventana en un 10% (cuando se vea el 10% de la seccion se gatillara la callBack y cuando desaparesca el 10% tambien se gatillara) en otras palabras cuando hagamos scroll hacia arriba u abajo. al menos en una primera instancia, NOTA porque veremos que este comportamiento lo podeos modificar.
//esta funcion resibira 2 parametros las ENTRADAS(este sera un arreglo con los elementos que se estan vigilando u en otras palabras sera un arreglo de el o los threshols) y como segundo parametro sera el propio observador(que se utiliza poco)
const funcionCalback = function (entries, obser) {
  entries.forEach(el => {
    console.log(el);
  });  
};
//este objeto primero necesita la propiedad RAIZ(que es el elemento que se cruzara con el objetivo), como segunda propiedad esta el limite u umbral(porcentaje de interseccion del root (en que se llamara a la funcion callback))
const objeto = {
  root: null, //en este caso sera la ventana, (pero podemos pasarle un elemento especifico)
  threshold: [0, 0.2],
};
//1-para eso primero debemos crear este observador, deveremos pasarle una callback function y un objeto en la cual podremos definir algunas propiedades
const observador = new IntersectionObserver(funcionCalback, objeto);
//ahora le decimos a este observador que es lo que quiero que observe, que sera la seccion 1,igual que el ejemplo anterior
observador.observe(seccion1);
*/
//! ahora que aprendimos como funciona esta API la usaremos para implementar nuestra navegacion fija u pegajosa
// lo que necesitamos en nuestra aplicasion es que en el instante en que el 'header' desaparesca de la vista(pantalla) se active o se vea el menu, por lo que primero deveremos selecciona este elemento (header) y despues crear nuestro observador,
//seleccionamos el elemento objetivo
const header = document.querySelector('.header');

//IMPORTANTE obteniendo el rootMargin de manera dinamica,esto es inportante ya que los valores podrian cambiar segun el dispositivo que se este usando vemos que dentro de las propiedades de este objeto tenemos esta 'height' (altura), pues es esta la que deveremos pasarle a la propiedad 'rootMargin'.
const rootMargiinDinami = nav.getBoundingClientRect().height;
console.log(rootMargiinDinami);

//tanto la funcion como el objeto que recibe el observador los creamos aparte, aunque podriamos crearlos directamente en el observador, esta vez solo se los pasaremos
const barraPegajosa = function (entradas) {
  //usamos la desestructuracion para sacar del array esta entrada (solo1 porque hay un solo 'threshold')
  const [entra] = entradas; //recordar que esto es lo mismo que 'entradas[0]'
  //console.log(entra);
  //la logica a implementar es simple tenemos que darnos cuenta que como el 'sthreshold' esta en 0, la interseccion se dara inmediatamente, pero la que nos interesa es la que se dara cuando el header desaparesca es hay cuando queremos implementar la barra , si nos fijamos la propiedad isIntersecting cuando la necesitamos esta es false, pues es esta condicieon u valor el que usaremos.
  if (!entra.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const objetoObservador = {
  root: null, //la pantalla sera el elemento que interceptara a el elemento objetivo(header)
  threshold: 0,
  //esta propiedad (rootMargin) nos agregara un % en pixeles que le indiquemos a nuestro elemento objetivo en este caso le ponemos -90, por lo que le quitara 90 pisxeles por lo que nuestra funcion se disparara un poco antes de llegar a desaparecer, pero tener este numero asi no es una buena idea, lo ideal es que este valor lo obtengamos de manera dinamica. NOTA que es lo que tenemos mas arriba
  //rootMargin: '-90px',
  rootMargin: `${-rootMargiinDinami}px`,
};
//creamos a nuestro observador
const observador = new IntersectionObserver(barraPegajosa, objetoObservador);
//le indicamos al observador cual es el objeto que debe observar
observador.observe(header);

//! REVELANDO ELEMENTOS (API observador de intersecciones)
// esta vez haremos que a medida que nops desplazamos con el scroll vayan apareciendo las secciones de una manera elegante, estos efectos provienen de los estilos css, para eso incorporamos la clase 'section--hidden' a cada una de nuestras secciones. esta clase les da una opacidad del 0 % y un transform de 8rem, por lo que cuando le quitemos esta clase estas secciones apareceran con un hermoso efecto.

//creamos de manera separada la funcion que resivira el observador, en esta oportunidad si necesitaremos del observador
const revealSection = function (entradas, observador) {
  //usamos la desestructuracion RECORDAR que es lo mismo que hacer entradas[0]
  const [entra] = entradas;
  //podemos ver que nuestro observador posee la propiedad target(elemento que origina la accion) esta propiedad sera importante ya que queremos que solo la seccion1 que se cruza aparesca y a medida que hacemos scroll hacia abajo aparescan las demas
  //console.log(entra);
  //podemos observar que todas las secciones aparecen con el efecto esperado menos la seccion1, esto se debe a que siempre se gatilla un primer evento sin siquiera hacer scroll, pero podemos notar que este evento no se cruza (isIntersecting = false), pues usaremos esta condicion para decirle a javascript que solo llame a la funcion cuando realmente un elemento se cruze.
  //if (entra.isIntersecting) entra.target.classList.remove('section--hidden');

  //pero usemos lo que hemos aprendido hasta ahora 'clausula de proteccion' recordemos como funciona esta propiedad con este ejemplo 'si la seccion no se intercepta entonces retorname' esto significa que se detendra el codigo y no se ejecutara nada mas dentro de este if, si no se cumple la condicion pues el codigo seguira ejecutandose de manera normal
  if (!entra.isIntersecting) return;
  entra.target.classList.remove('section--hidden');

  //por ultimo y para terminar si nos fijamos en la consola mientras estamos haciendo scroll el observador sigue observando a la seccion1 aunque esta ya halla pasado su codigo, en otras palabras se estan generando muchas observaciones de un elemento que ya no deveria seguir siendo observado. y aunque podriamos quitar el console.log para  que no se impriman, estas seguiran ejecutandose llenando la consola imnecesariamente con cientos de estos observadore. lo que ya no es necesario porque el codigo ya se ejecuto, lo que haremos es dejar de observar una vez que se agrega u quita esta clase.
  sectionObserver.unobserve(entra.target);
};
//creamos al observadopr
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  //queremos que la seccion se muestre No inmediatamente si no que un poco despues en este caso un 15% (cuando la seccion este dentro de la pantalla en un 15% queremos llamar a la funcion)
  threshold: 0.15,
});

//basicamente podemos seleccionar todas las secciones en un solo observador porque tienen el mismo nombre de clase RECORDAR que el forEach nos devolvera una NodeList
const allsection = document.querySelectorAll('.section');
//ahora podemos recorrer esta NodeList, RECORDAR que usamos 'forEach' cada vez que queramos recorer algo sin tener que generar un array
allsection.forEach(function (section) {
  //le decimos al observador que es lo que debe observar, en este caso es una nodelist de 4 secciones.
  sectionObserver.observe(section);
  //aprovechando que estamos recorriendo todas las secciones, es una mejor manera de programar agregando y eliminando las clases  atravez de la programacion con javascript y no directamente en el HTML. asi que eliminaremos esta clase 'section--hidden' del html
  section.classList.add('section--hidden');
});

//! REVELANDO IMAGENES
//* unas de las cosas mas importantes de una buena pagina u aplicasion web es el rendimiento y las imagenes juegan un papel muy importante en este, por lo tanto es bueno tener estrategias para que estas no enlentescan nuestra aplicasion. la estrategia que veremos hoy se llama 'IMAGENES DE CARGA DIFEREIDA' utilizando claro nuestra API de observador de intercepciones.
//podriamos seleccionar todas las imagenes, pero en realidad solo en 3 imagenes queremos este efecto y esas imagenes poseen en comun una propiedad llamada 'data-src' y las seleccionamos asi.
const imgTargets = document.querySelectorAll('img[data-src]');

//creamos la funcion que resivira este observador
const loadImg = function (entries, observer) {
  //usamos desestructuracion para obtener las entradas que en este caso es solo 1
  const [entry] = entries;
  //console.log(entry);
  //RECORDAR que al movernos arriba u abajo se generaran estas intersecciones ya sea que realmente se interceptan o no, y queremos que solo al ser interceptadas hagon algo. por lo tanto usamos 'la clausula de proteccion'
  if (!entry.isIntersecting) return;

  //reemplazamos el src por data-src´, en otras palabras reemplazamos la imagen de baja resolucion por la de alta resolucion RECORDAR que esta propiedad 'data-algo' es una caracteristica que nos permite guardar datos y luego poder recuperarlos con javascript. EXPLICASION: el dato o la data es la imagen o lo que viene despues del sigo igualdad, el nombre con el que se identifica esta data es lo que viene despues del guion y para obtener esta data usamos la propiedad 'dataset'
  //* del elemento que se cruza en este momento obtengo su atributo csr(imagen de baja resolucion). este lo reemplazo por la imagen que se cruza en este momento (alta resolucion), obtengo su data del atributo data-src
  entry.target.src = entry.target.dataset.src;
  //IMPORTANTE no podemos quitar inmediatamente el filtro una vez hecho el cambio ya que este cambio se realiza detras de escena y puede ocurrir que al quitar este filtro la imagen aun no se cargue completamente. para evitar algun problema podemos usar el evento 'load' este evento se dispara en este caso una vez que la imagen haya cargado completamente, entonces podemos escuchar este evento y hacer algo cuando ocurra. ASI NOS ASEGURAMOS QUE LA IMAGEN ESTE CARGADA 100%
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  //y ahora que ya se realizo el trabajo no queremos seguir observando
  observer.unobserve(entry.target);
};

//creamos nuestro observador de imagenes
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

//necesitamos implementar lo mismo para cada imagen asi que recorremos esta NodeList
imgTargets.forEach(img => {
  imgObserver.observe(img);
});
//! IMPLEMENTANDO EL COMPONENTE DESLIZANTE
//en este momento tenemos los 4 componentes deslizantes uno encima del otro , lo primero que deveremos hacer es poner estos elementos uno al lado del otro, esto lo lograremos usando la propiedad css 'transform' esta nos permitira rotar, escalar, sesgar etc. en este caso queremos trasladarlos NOTA podemos tener dentro de nuestro 'slider' lo  que queramos (parrafos, fotos, etc).
//primero selecionamos estos elementos que poseen la clase 'slide'
const slides = document.querySelectorAll('.slide');
//ahora seleccionamos los botones
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

//creamos fuera de la funcion una variable que contenga la imagen actual, esta nos servira tanto para el boton derecho como el izquierdo
let curSlide = 0;
//creamos una variable que contenga la cantidad maxima de imagenes, para asi poder usarla en las funciones y poder detener el deslizamiento
const maxImg = slides.length;

//* solo para efectos practicos y para poder ver todas las imagenes y lo que estamos haciendo reduciremos la escala del slider y moveremos estas un poco a la izquierda
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-400px)';
// slider.style.overflow = 'visible';
//ahora recorremos estas 'slides' para darle a cada uno de ellos las coordenadas de traslado que queremos (coordenadas iniciales 0, 100, 200)en este caso en el eje x, estas coordenadas se implementan en %. NOTA la imagen que se muestra siempre esta en su 0% de traslado, por lo que la primera imagen sera la que posea un 0% (visible) , la segunda esta justo despues en un 100%, la que le sigue esta justo despues osea en un 200% y la ultima estara en un 300% esto es asi porque cada imagen tiene un 100% de ancho. de esta manera quedaran una al lado de la otra hacia la derecha si alguna imagen quedara a la izquerda seria un numero negativo -100% por ejemplo
slides.forEach(
  (sli, indice) => (sli.style.transform = `translateX(${100 * indice}%)`)
);

//pasando a la siguiente imagen(derecha), adjuntamos el escucha al boton y le sumamos 1 a la imagen actual
btnRight.addEventListener('click', function () {
  //RECORDAR que la propiedad length mustra la cantidad de elementos reales que hay, pero los indices comienzan del 0 , por lo tanto maxImg es 4, pero al llegar al indice 3 (imagen 4) debe terminar por eso el -1
  if (curSlide === maxImg - 1) {
    curSlide = 0;
  } else curSlide++;
  //si analizamos todo el codigo. en una primera instancia la imagen 1 corresponde con el indice 0 y  %0, pero cuando pasa la primera tendremos 1 imagen a la izquierda una al centro (visible) y 2 a la derecha y eso es lo que queremos conseguir ahora(-100%, 0%, 100%, 200%). en este punto la imagen mostrada posee el indice 1 y al comenzar la iteracion el indice sera 0, por lo tanto 0 -1 = -1 * 100 = -100 luego en una segunda iteracion el indice sera 1 por lo tanto 1 - 1 = 0 * 100 = 0%, en la tercera iteracion el indice sera 2. 2 - 1 = 1 * 100 = 100% y por ultumo 3 - 1 = 2 * 100 = 200%.  justo lo que queremos.
  //* ahora deveremos indicarle a javascript que al llegar a la ultima imagen vuelva a comenzar, si no seguira moviendose a la derecha y mostrando cuadros vacios.
  slides.forEach(
    (sli, indice) =>
      (sli.style.transform = `translateX(${100 * (indice - curSlide)}%)`)
  );
  activeDot(curSlide);
});
//*implementar el boton izquierdo es adsolutamente lo mismo la unica diferencia esta en que deveremos movernos a la  izquierda para eso deveremos restarle 1 a la imagen actual

//recorremos las imagenes para darles a cada una el porcentage de desplazamiento que queremos(0%, 100%, 200%, 300%)
slides.forEach(
  (sli, indice) => (sli.style.transform = `translateX(${100 * indice}%)`)
);
//desplazamos las imagenes hacia la izquierda
btnLeft.addEventListener('click', function () {
  if (curSlide === 0) {
    curSlide = maxImg - 1;
  } else curSlide--;

  //* ahora deveremos indicarle a javascript que al llegar a la ultima imagen vuelva a comenzar si no seguira mostrando cuadros vacios
  slides.forEach(
    (sli, indice) =>
      (sli.style.transform = `translateX(${100 * (indice - curSlide)}%)`)
  );
  activeDot(curSlide);
});

//ahora crearemos un evento para poder deslizarnos atravez de las flechas del teclado por lo que usaremos 'keydown' (inmediatamente una vez presionada la tecla) RECORDAR para manejar eventos del teclado lo hacemos directamente sobre el documento
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') {
    if (curSlide === maxImg - 1) {
      curSlide = 0;
    } else curSlide++;

    slides.forEach(
      (sli, indice) =>
        (sli.style.transform = `translateX(${100 * (indice - curSlide)}%)`)
    );
  } else {
    if (e.key === 'ArrowLeft') {
      if (curSlide === 0) {
        curSlide = maxImg - 1;
      } else curSlide--;
    }

    slides.forEach(
      (sli, indice) =>
        (sli.style.transform = `translateX(${100 * (indice - curSlide)}%)`)
    );
  }
  activeDot(curSlide);
});

//*ahora crearemos los puntos, para que podamos desplazarnos atravez de ellos tambien
//este elemento div que contiene los puntos esta vacio por lo que deveremos implementar html dentro de el
const dotContainer = document.querySelector('.dots');

//cada imagen debe tener estos botones. NOTA el atributo data-slide es importante para poder pasar de una imagen a otra atravez de estos puntos
const createDost = function () {
  slides.forEach(function (_, i) {
    //RECORDAR INSERTADJACENHTML resibe 2 argumentos la posicion relativa al elemento(antes,despues,en el elemento etc y el texto u cadena propiamente tal).
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDost();

//* esta funcion le dara al boton activo un fondo diferente y este codigo lo usaremos tanto cuando nos desplacemos atravez de estos botones como cuando nos desplazamos con el teclado u las flechas de la fotografia en si. por eso lo escribimos al comienzo del todo.

//al igual que como lo hicimos antes lo mejor al momento de implemetar una clase activa es quitarle a todos los botones la clase activa y solo darsela al que le corresponda
const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  //para activar la clase tambien necesitamos del atributo data--slice ademas de la clase propiamente tal
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activeDot(0);
//ahora haremos funcionar estos botones, en esta ocasion No usaremos forEach para agregar a cada boton un escucha, si no que usaremos 'delegasion de eventos', en este caso el padre comun es nuestro 'dotContainer'.
dotContainer.addEventListener('click', function (e) {
  //si el elemento que origina el evento posee la clase 'dots__dot'
  if (e.target.classList.contains('dots__dot')) {
    console.log('dot');
    //este codigo lo mejoramos usando la desestructuracion en este caso de objetos
    //const slide = e.target.dataset.slide;
    const { slide } = e.target.dataset;
    //recorremos las imagenes y a cada una le damos el traslado que corresponda segun el indice de nuestros botones, es el mismo codigo de antes, solo lo cambiamos la imagen actual por el indice actual de cada boton.
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    activeDot(slide);
  }
});

//=> FIN DE LA APLICASION

console.log('seleccionar, crear y eliminar elementos');
/*
//!seleccionando elementos

//si queremos seleccionar todo el documento html, en otras palabras toda la pagina web, esta es la manera de hacerlo, EJP si quisieramos agragr estilos a toda la pagina web no basta con seleccionar 'document' deveremos seleccionar 'documentElement'.
console.log(document.documentElement);

//claro que podemos seleccionar los elementos por separado
console.log(document.head);
console.log(document.body);

//este como ya sabemos nos seleccionara el primer elemento que coincida
const header1 = document.querySelector('.header');
console.log(header1);

//si queremos seleccionar varios elementos a la vez o todos(deben tener misma clase) los elementos. este nos devolvera una nodeList
const allSelection = document.querySelectorAll('.section');
console.log(allSelection);

//si queremos seleccionar en base a el ID esta es la forma de hacerlo, RECORDAR el ID identifica a determinado elemento como unico, no puede haver otro ID con el mismo nombre a difereencia de CLASS que si puede tener varios elementos con el mismo nombre. tambien debemos recordar que no necesitamos el selector de elemento (. , #) ese es solo para 'querySelector'.
document.getElementById('section--1');

//si queremos por ejemplo seleccionar atravez del nombre de la etiqueta EJP:los botones, este metodo nos devolvera una 'htmlColection' que basicamente es un tipo de coleccion debil ya que si algun elemento del DOM llegara a cambiar esta coleccion cambiaria automaticamente tambien EJP: supongamos que selecionamos esta coleccion y luego eliminamos un boton nuestra coleccion tambien cambiaria. esto puede ser util en algunas ocasiones.
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

//tambien tenemos un metodo para seleccionar clases sin la necesidad de utilizar el selector solo el nombre de la clase. este tambien nos devolvera un 'htmlCollection', por lo  que generalmente lo almacenariamos en algunna variable.
console.log(document.getElementsByClassName('btn'));

//! creando e insertando elementos

//*podemos insertar codigo usando el metodo 'insertAdjacentHTML' que vimos en la aplicasion BANKIST 'RECORDAR que este metodo insertara el codigo en una posicion especifica que le indiquemos este metodo acepta 2 parametros(string) la posicion y el html escogido. dentro de las posiciones que tenemos podemos encontrar (afterbegin, afterend, beforebegin, beforeend)

//pero, veamos otras formas de crear y insertar elementos, por ejemplo tenemos este metodo que creara un elemento y al cual deveremos pasarle el nombre de la etiqueta y este nos devolvera ese elemento, el cual almacenamos en la variable message, para insertarlo en nuestra html deveremos hacerlo manualmente, pero, antes de insertarlo podemos hacer cosas con el.
const message = document.createElement('div');

//nuestra variable 'message' ahora representa un elemento en el DOM, por lo que podemos seleccionarla y usarla como elemento que es. en este ejemplo agregamos una clase llamada 'cookie-message'
message.classList.add('cookie-message');
// message.textContent = 'we use cookie for improved functionality and analytics';

//tambien podemos insertar el texto con toda sus etiquetas RECORDAR que podemos usar textContent y innerHTML tanto para leer como modificar contenido, aunque es mejor practica usar textContent para leer y innerHTML para modificar.
//le agregamos algo de html antes de insertarlo al DOM este sera un botton como se puede apreciar
message.innerHTML =
  'we use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//*IMPORTANTE LO QUE ACABAMOS DE HACER FUE CREAR UN ELEMENTO (DIV) AL CUAL LE AYADIMOS UNA CLASE LLAMADA 'COOKIE-MESSAGE' LE AGREGAMOS UN MENSAJE Y AGREGAMOS UN BOTON TODO ATRAVEZ DE PROGRAMACION, ahora solo debemos insertar este elemento en nuestro pagina, 'PREPEND' insertara el elemento como primer hijo del elemento padre(HEADER)
//header.prepend(message);

//tambien podemos insertar como ultimo hijo, IMPORTANTE podemos notar que prevalece el ultimo hijo,(append) esto sucede porque este alemento esta vivo dentro del DOM por lo tanto no puede estar en 2 lugares al mismo tiempo, en este caso 'append' movio este elemento de la parte superior a la inferior, simplemente porque es la ultima linea de codigo que hay.
//*entonces podemos deducir que no solo sirven para insertar elementos si no que podemos mover elementos.
//header.append(message);

//pero, //¿que pasaria si realmente quisieramos insertar varias copias del mismo elemento?
//tendriamos que copiar el elemento primero, lo hacemos directamente, y ahora podemos ver este boton tanto arriba(primer hijo) como abajo(ultimo hijo)
//header.append(message.cloneNode(true));

//pero, nos quedan 2 metodos mas 'before' y el 'after' y como sus nombres lo indican estos nos permitiran insertar antes y despues del encabezado. IMPORTANTE a simple vista pareciese que ser primer hijo es lo mismo que insertar un elemento antes del encabezado, pero no es asi, debemos mirar los elementos de la consola y nos daremos cuenta que efectivamente este elemento esta fuera del encabezado antes del mmismo en cambio ser hijo estas dentro del encabezado como primer elemento de este.
header1.before(message);

//!por ultimo veamos la eliminacion de elementos
//este metodo que nos permite eliminar es reciente, antes de este metodo para eliminar un hijo deveriamos acceder al padre para eliminar al hijo
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //esta es la forma antigua por decirlo asi de eliminar un elemento
    //message.parentElement.removeChild(message);
  });
*/
console.log('-------styles, atributes, clases------');

/*
//! Estilos
//todavia hay algunas cosas basicas que devemos aprender y otras reforzar comenzando con los estilos, primero recordemos cosas basicas como establecer un estilo a un elemento.

//obtenemos el elemento (en este caso no es necesario volver a crear o obtener este elemento porque ya lo tenemos) directamente escribiendo el elemento punto style y luego la propiedad.
//*debemos tener en cuenta que establecer un estilo de esta manera (directamente en el codigo)se denominan estilos en linea, los cuales pasan a formar parte inmediatamente del DOM, pero debemos tener cuidado ya que solo los estilos establecidos de esta manera podran ser leidos.
message.style.backgroundColor = '#37389d';
message.style.width = '120%';

//*ejemplo
//vemos que no obtenemos nada, porque 'height' no fue escrito de esa forma en linea
console.log(message.style.height);
//pero si leemos un estilo que haya sido configurado como estilo en linea si podremos leerlo
console.log(message.style.width);

//*pero siempre hay una solucion o casi siempre para algun problema y esta no es la ecepxion si queremos acceder a las propiedades de algun elemento cualquiera que este sea, podremos hacerlo llamanddo a la function 'getComputedStyle'. esta nos dara la propiedad incluso si es que no esta en nuestro css, ya que esta funcion la sacara directo de la pagina web.
console.log(getComputedStyle(message).height); //esta propiedad (height) no la definimos nosotros en ningun lugar aun asi obtenemos su propiedad desde la pagina web porque esta si debe tener esta de manera indirecta sin haberla definido nosotros

//ahora aumentemos esa altura (height) sumandole un valor, pero RECORDAR que todo el valor devuelto u obtenido de esta funcion 'getComputedStyle' es un STRING al cual intentamos  sumar un numero lo cual no funcionara. deveremos transformar esta cadena a un numero para que pueda sumar este valor
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px'; //aca sumara los valores numericos y eliminara lo que no sea numero

console.log(getComputedStyle(message).height); //al volver a leer esta propiedad nos devolvera el valor sumado junto al px, porque recordemos que esta funcion nos devolvera un string.

//!PROPIEDADES PERSONALIZADAS (variables css)
//usar variables en css tiene el mismo sentido que tienen las variables en javascript, poder establecer u cambiar valores en varios lugares al mismo tiempo solo con modificar la variable.

//*las variables preestablecidas estan en nuestro archivo css (siempre al comienzo) siempre bajo el elemento :ROOT eso es equivalente a decir que estan en nuestro document en javascript, por lo que usando la funcion 'setProperty' podremos cambiar por ejjemplo el color de una variable y en la pagina se modificara en varios lugares. porque esta variable estaba presente en varios lugares de el codigo de la pagina.
//IMPORTANTE podemos establecer cualquier propiedad  usando esta funcion 'setProperty',pero notar que la propiedad debe escribirse con el guion y no usando camelCase, pero es mas sencillo hacerlo como lo tenemos arriba sin esta funcion. ('message.style.backgrounColor = red').
message.style.setProperty('background-Color', 'red');

//aca usamos este metodo para modificar una propiedad personalizada, vemos que su codigo es diferente (sin camelcase) y debe ser si o si con 'setProperty' cuando se trata de propiedades personalizadas
document.documentElement.style.setProperty('--color-primary', '#33F8F5');

//! Atributos (class, id, type, src, target, href, alt ETC) de un elemento
//al igual que los estilos podremos leer estos atributos directamente desde nuestro js

const logo = document.querySelector('.nav__logo');
//una vez que obtenemos nuestro elemento podremos acceder a nuestros atributos, en este caso nuestro elemento es una imagen y se espera que una imagen tenga un nombre y una direccion. si no la tuviera javascript las crearia ya que las necesita para poder implementar la imagen en la pagina.
console.log(logo.alt);
//notar que la url que obtenemos es la adsoluta (html), osea la url que nos llevara directo a donde esta esa imagen u lo que sea. la url relativa es la que tiene que ver en donde esta ese archivo en nuestro pc.  si queremos obtener la url relativa (que tenemos en nuestro pc) deveremos usar nuestro metodo 'getAttribute'
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className);

//pero que pasa si agregamos un atributo que no es tan comun, no es estandar, por ejemplo (designer) en nuestro html, pues javascript no lo reconoce como una propiedad standar de una imagen y nos arroja undefined
console.log(logo.designer);

//pero como sabemos, igual podemos leer esta propiedad 'designer' de otra manera, usamos nuestra metodo get(obtener)attribute.
console.log(logo.getAttribute('designer'));

//asi como podemos leer estos atributos tambien podemos establecerlos
logo.alt = 'hermoso logo';

//y asi como tenemos get tambien tenemos set(setear= crear)en este ejemplo creamos una nueva propiedad y establecemos su nombre
logo.setAttribute('company', 'Bankist');

//el tema de la direccion absoluta y relativa tambien ocurre en algunos casos con el atributo HREF, en este caso una sola direccion absoluta
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//pero los link de nuestra pagina por ejemplo (Features, Operations, Testimonials) si nos daran resultados diferentes
const otroLink = document.querySelector('.nav__link--btn');
console.log(otroLink.href);
console.log(otroLink.getAttribute('href'));

//por ultimo tenemos atributos especiales, que son los 'atributos de datos' que siempre deven comenzar con la palabra (data-) segudo del nombre de la propiedad tal como esta en nuestro html, IMPORTANTE devemos tener en cuenta que devemos cambiar la notacion con guion(-) a camelCase al momento de trabajar en javascript.
console.log(logo.dataset.versionNumber); //vemos que obtenemos nuestro numero 3.0, estos datos siempre se almacenaran en el objeto 'dataset'.y usaremos este tipo de datos cada vez que necesitemos almacenar datos en la interfaz de usuario en otras palabras en nuestro html

//finalmente para terminar esta leccion hablaremos de las clases, que ya hemos visto durate el curso, RECORDAR podemos tener varias clases tal como se muestra en este ejemplo
logo.classList.add('clase1', 'clase2');
logo.classList.remove('g');
logo.classList.toggle('w');
logo.classList.contains('f');

//*asi como podemos leer una clase usando 'className' tambien podemo establecer (set)una clase nueva, pero esto no se debe usar, es una mala practica ya que anularia todas las clases existentes
logo.className = 'nelson';
*/

console.log('types of events and event handlers');
/*
//ya sabemos trabajar con eventos, pero 'addEventListener' no es el unico metodo que tenemos para escuchar un evento. NOTA a saber que independiente de que escuchemos o no un evento estos siempre estan oocurriendo

//seleccionamos el h1 que es como la portada de nuestro banco
const h1 = document.querySelector('h1');

//el evento 'mouseenter' se acciona cuando el mause pasa por el elemento u ingresa en el
h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener : great! you are reading the heading');
});

//*otra manera de adjuntar un escucha a un evento es, dentro del evento 'mouseenter' hay una propiedad llamada 'onmouseenter' por lo que podemos establecer directamente esta propiedad al elemento y llamar a la funcion. IMPORTANTE por cada evento existe una propiedad como 'ommouseenter', pero esta manera de escuchar eventos es antigua hoy en dia se usa 'addEventListener', pero siempre es bueno saber esto por si nos topamos algun codigo asi.
h1.onmouseenter = function (e) {
  alert('addEventListener : great! you are reading the heading');
};

//NOTA 'addEventListener' es bueno por 2 motivos principales. el primero porque nos permite tener multiples ayentes(contraladores) para un mismo evento, simplemente cambiando la funcion, cosa que con la forma antigua no es posible porque la segunda funcion anularia la primera.
h1.addEventListener('mouseenter', function (e) {
  alert('addEventListener : otra accion para el mismo evento');
});

//NOTA el segundo motivo y que no hemos realizado hasta ahora es que podemos eliminar un controlador(oyente) si es que ya no lo necesitamos, pero para eso debemos tener la funcion separada de la funcion padre 'addEventListener'. como la eliminacion la tenemos debajo de la alerta esta se ejecutara una sola vez, pero no mas, pero no necesariamente este codigo debe estar dentro de la funcion //EJEMPLO podemos eliminar este controlador despues de cierto tiempo
const alertH1 = function (e) {
  alert('addEventListener: Genial estas leyendo el encabezado');
  //h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//en este ejemplo eliminamos el controlador despues de 5 segundos
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

//finalmente hay una tercera forma de manejar eventos, anque no es buena practica y no se recomienda. solo la veremos para saber de que se trata y consiste en usar una propiedad directamente sobre el archivo html especificamente sobre el elemento. esto es casi lo mismo que hicimos antes con la propiedad 'onmouseeEnter' a la cual le asignamos esta propiedad directamente al elemento y luego le asignamos una funcion. //=> ir a al HTML a este elemento h1
*/
console.log('burbujeo y captura de proppagacion de eventos');
/*
//* entendamos como funciona un evento. al producirse un evento este se genera primero en la raiz del documento en el elemento padre de todos los elementos, luego este evento viaja atravez de sus elementos hijos principales como pueden ser (el body, una seccion, un parrafo) hasta llegar al elemento objetivo en lo que se llama 'FASE DE CAPTURA', una vez alcanzado el elemento objetivo comienza la 'FASE OBJETIVO' es esta fase donde hemos estado trabajando con nuestros controladores de eventos. una vez terminada esta face, comienza la 'FACE DE BURBUJEO' en la que el evento buelve por la misma ruta hasta llegar al documento raiz pasando nuevamente por los elementos principales. lo IMPORTANTE de todo esto es que en realidad el evento esta pasando o sucediendo en cada uno de los elementos por los que pasa, por lo que podriamos adjuntar el mismo controlador de eventos en alguno de estos elementos padres y obtendriamos el mismo resultado que para el elemento objetivo. esto es para la mayoria de los eventos, hay algunos que solo se pueden manejar en el elemento objetivo(no poseen fase de captura ni burbujeo). algo a saber tambien es que podemos hacer esto solo en la fase de burbujeo, en la fase de captura es mas complejo, pero como ya sabemos igual se puede. todo este conportamiento nos permitira implementar patrones muy potentes en nuestro codigo

//!burgujeo en practica.
//lo que haremos es colorear algunos elementos para ver el como se comporta el burbujeo, primero creamos los numeros del rgb de forma aleatoria
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// siguiendo el patron de los numeros aleatorios configuramos para el color
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

//*seleccionamos los elementos (el link, el contenedor de los links y el encabezado completo). lo que hay que entender es este caso es que solo dandole click a un solo enlace (nav__link) los otros 2 (nav__links, nav) tambien reaccionan. esto se debe a el burbugeo que parte de la fase de ejecusion hacia arriba
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('link', e.target, e.currentTarget);

  //otra cosa que podemos hacer es detener la propagacion del evento, en otras palabras que no ocurra el burbujeo, podemos observar que solo cambia de color el nav__link los otros no, osea el evento no se propago. no es una buena practica, pero aveces puede ayudar a solucionar algunos problemas
  //e.stopPropagation();
});
//*esto lo podemos comprobar haciendo click solo con el nav__link y todos sus padres reaccionaran , pero si realizamos click a un padre el hijo no reaccionara solo el padre de este. esto queda demostrado en la consola con el elemento target que nos mostrara donde se realizo el evento o donde se origino el evento.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('container', e.target, e.currentTarget);
});
//*currenTarget nos mostrara el elemento al cual esta asociado el contralador de evento en este caso si nos mostrara el elemento actual en el que ocurrio el evento, si nos damos cuenta la palabra THIS tambien apunta al elemento al cual esta asociado al objeto.en este caso los 2 son lo mismo y seran lo mismo en cualquier contralador de eventos.
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('encabezado', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  }
  //al implementar este tercer parametro en 'tru'e dejara de escuchar el burbujeo y escuchara en la fase de captura, el true hace una especie de cambio, (de forma predeterminada es como si pusieramos como tercer parametro FALSE)lo podemos corroborar realisando el click veremos que ahora en consola lo primero que aparece o el primer evento es en el encabezado
  //true
);

//IMPORTANTE falta mencionar ¿que pasa con la 'face de captura'? como vimos esta face esta preconfigurada para que los contraladores de eventos no escuchen durante esta face(decendente) esto es asi porque esta face es irrelevante no tiene utilidad en cambio la face de burbujeo si puede ser muy util ya que nos permite la 'DELEGACION DE EVENTOS'. sin enbargo si aun queremos escuchar durante esta face podemos hacerlo, necesitaremos agregar un tercer parametro en nuestro controlador de eventos, este puede ser TRUE O FALSE
*/
console.log('DOM TRAVERSING');
/*
//como su nombre lo indica 'atravesando el DOM' son una serie de propiedades que nos brinda el DOM y que nos permitiran acceder a diferentes elementos haciendo referencia a otros elementos que estan directa u indirectamente relacionados con ellos (padres, hijos, abuelos).

//en este ejemplo trahajaremos con el 'h1' de nuestra aplicasion
const h1 = document.querySelector('h1');

//*lo primero sera ir hacia abajo en otras palabras con los elementos hijos. en este ejemplo y como ya sabemos podemos usar el querySelector en los elementos en si, en este caso se nos muestran todos los hijos de este que cuenten con la clase señalada, pero si huvieran otros elementos que no sean hijos y que contengan esta clase, estos no se mostraran, esto aplica tanto para querySelector como querySelectorAll
console.log(h1.querySelectorAll('.highlight')); //no inporta que tan lejos esten estos hijos siempre ira por todos los hijos

//en ocasiones solo necesitaremos hijos directos y para esto podemos usar 'children', esta nos devolvera un HTMLColection que recordemos que es una coleccion que se actualiza automaticamente
console.log(h1.children);

//tambien podemos obtener los nodos que estan involucrados, y de esta menera obtener los hijos directos tambien , pero esta ya no se utiliza nucho es mejor usar 'children' y como sabemos los nodos pueden ser cualquier cosa
console.log(h1.childNodes);

//si queremos acceder a el primer hijo podemos hacerlo asi,podemos observar que el primer y ultimo hijo son los que cambian de color
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';

//* ahora atravesaremos el DOM hacia arriba. trabajaremos con los padres, siguiendo los ejemplos que arriba tenemos:
//para padres directos podemos usar 'parentNode' que en este caso nos dara el mismo resultado que 'parentElement' ya que coincide porque es el padre
console.log(h1.parentNode);

//si queremos el elemento en especifico el padre y no el nodo tenemos 'parentElement' aunque como mencione arriba, en este caso es lo mismo, porque el padre directo tambien es un nodo.
console.log(h1.parentElement);

//tambien podriamos nesecitar algun elemento que no sea el padre directo, tal vez el padre de todo o en otras palabras el primer elemento el mas lejano o el bisabuelo para que se entienda.
//EJEMPLO supongamos que tenemos muchos encabezados(header), osea antes del encabezado directo (padre)de h1 tenemos mas encabezados con la clase (header) pero solo queremos el encabezado mas lejano a este elemento(h1), el abuelo de todos los headers, pues usariamos la propiedad 'closest' (el mas cercano) esta recibe una cadena que sera el padre a buscar. y para notar que esto resulta le cambiamos el color a este padre lejano RECORDAR que las propiedades personalizadas(css) comienzan con la palabra var seguido del color personalizado en este caso lo igualamos a la propiedad personalizada que tenemos en nuestro css '--gradient-secondary'
h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closest buscara al padre mas lejano del elemento especificado cambiandole el color de fondo

//algo a tener en cuenta, si el elemento que estamos buscando (string que resibe la propiedad closest) coincide con el elemento (el elemento que llama a closest en este ejemplo H1) sera este elemento el que nos retornara, porque simplemente ese seria el padre mas cercano EL PROPIO ELEMENTO
h1.closest('h1').style.background = 'var(--gradient-primary)';

//NOTA si pensamos bien, podemos deducir que 'closest' es lo opuesto a 'querySelector' y 'querySelectorAll' porque ambos reciben una cadea como entrada estos 2 buscaran los hijos no importa lo profundos que esten y 'closest' buscara a los padres no importa lo muy arriba que esten en el DOM

//* ahora vallamos hacia el lado, buscamos hermanos
//para los hermanos solo podemos acceder a ellos si son hermanos directos (anterior y siguiente) y no el que sigue del siguiente u anterior
console.log(h1.previousElementSibling); //en este caso es null porque no tiene hermanos anteriores solo un padre
console.log(h1.nextElementSibling); //pero si tiene el hermano siguiente, que es el h4

// igual que con los otros metodos tambien podemos obtener los nodos hermanos de este elemento
console.log(h1.previousSibling);
console.log(h1.nextSibling);

//pero que pasa si queremos obtener u saber todos los hermanos de una vez, pues podemos hacer un truco que es pasar al elemento padre y obtener los hermanos(hijos) de este
console.log(h1.parentElement.children); // y observamos a todos los hermanos

//solo por diversion, le cambiaremos el tamaño a todos los hermanos, excepto el propio h1. RECORDAR que una 'htmlColection' es como un array en otras palabras es un iterable por lo que podemos almacenarla en un array y recorrerla. y redujimos el tamaño de todos los hermanos excepto h1 al 50%
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

console.log('ciclo de vida de algunos eventos del DOM en la pagina web');
//con ciclo me refiero desde que se accede a la pagina web hasta que se abandona dentro de este ciclo tenemos otros eventos que se generan, los cuales tambien podemos escuchar

//! contenido del DOM cargado(DomContentLoad)
// este evento lo genera el document una vez que el html es analizado completamente, en otras palabras una vez que el html se ha cargado y convertido en en esta estructura de arbol llamado DOM. IMPORTANTE este evento no espera a que se carguen las imagenes u otros recursos externos, solo html y javascriot deben estas cargados.

//podemos observar atravez de la pestaña RED todo lo que carga y lo que se demora, en realidad nuestro codigo deveria ejecutarse una vez que el DOM este construido, y eso es asi ya que tenemos nuestro script justo al final del cuerpo del cocument
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML COMPLETO y el DOM construido', e);
});

//! evento de carga
//este evento se dispara no solo cuando el html y javascriot estan cargados si no que tambien las imagenes, css  y recursos externos lo esten, hay se disparara este evento. este a diferencia del anterior se genera en la ventana windows
window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

/*
//la siguiente funcion debemos usarla solo cuando sea necesario, no debemos abusar de este tipo de mensajes
//! antes de abondonar la pagina
// este evento se activa justo antes de que se abandone la pagina. por ejemplo se activara inmediatamente despues de presionar la x de la pagina, lo cual nos puede servir para preguntar si estamos seguros de querer abandonar la pagina
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  //NOTA para una confirmacion de salida debemos establecer el valor de retorno del evento en una cadena vacia, esto es por razones historicas
  e.returnValue = '';
});
*/

console.log('Carga eficiente de scripts: aplazar y asíncrono');
//ahora profundisaremos un poco mas acerca de el evento 'DOMContentLoaded' y las diferentes maneras de cargar script en html. hasta ahora hemos visto la manera tradicional de incluir archivos javascript en html, (<script src=algo.js>) al final de nuestro Body, tambien podemos agregar el atributo ASYNC (<script async src=algo.js) o agregar el atributo  'DEFER =aplazar' (<script defer src=algo.js>). cada una de estas formas influiran en la manera en la que se obtine los archivos javascript (descargarlo y ejecutarlo)

//podemos implementar esta etiqueta en el ebcabezado u al final del cuerpo que es la manera mas habitual de hacerlo, son estas 2 las que compararemos

//* si colocamos el script sin atributos (async, defer)en el head el proceso de carga sera el siguiente: se comenzara a analizar osea se comenzara a crear el DOM a partir de los elementos HTML que esten presentes, pero una vez que encuentre un script el analisis se detendra para descargar y ejecutar este script una vez terminado el script de ejecutarse seguira construyendo el DOM. una vez finalizado se ejecutara el evento 'contenido del DOM cargado' se activara. esto no es lo ideal ya que nesecitamos que el DOM esta 100% construido antes de que se comience a ejecutar nuestro codigo javascript. por lo tando ES UNA MALA PRACTICA COLOCAR EL SCRIPT EN EL ENCABEZADO. sin enbargo poner el script al final del cuerpo tampoco es perfecto si bien el DOM se construye antes de que se ejecute el codigo, el script podria haberse descargado antes mientras el HTML se sigue analizando.

//entonces aca entran los atributos //¿ para que sirven?
// el proceso de carga cuando usamos javascript asincronico(ASYNC) en el encabezado. el srcipt se carga al mismo tiempo que se crea el DOM, esto ya es una ventaja sin enbargo el analisis del html se sigue deteniendo para ejecutar el script (sincronico)

//¿ y que pasa cuando agregamos el atributo defer?
//cuando usamos el atributo defer en el encabezado el proceso de carga es el siguiente: se analiza y carga el script de forma asincronica igual que con el atributo ASYNC, pero la ejecusion del script se aplaza hasta el termino del analisis del HTML en otras palabras hasta que el DOM este construido.

//* en resumen el tiempo de carga entre estos 2 atributos es casi identico la diferencia esta en que con 'DEFER' el analisis del HTML nunca se detiene, lo que se detiene es la ejecusion del script hasta el final una vez que el donm esta construido. NOTA usar estos atributos en el body no tiene sentido ya que al estar el script al final del body, el DOM siempre estara listo antes de que se ejecute el script.
//* en otras palabras y comparando estos 2 atributos podemos decir que con 'ASYNC' el evento 'contenido del DOM cargado' no esperara a que se descargue y ejecute el script. (por lo general este evento espera a que se ejecuten todos los script) por lo tanto este evento se ejecura tan pronto se termine de analizar el HTML se haya ejecutado o no los script.
//* por otro lado al usar 'DEFER' este evento (contenido del DOM cargado) esta obligado a activarse despues de que se haya descargado y ejecutado todo el script hay que decir que esta es la forma mas tradicional en que este evento funciona. otro aspecto muy importante a tener en cuenta es que los script asincronicos no garantizan su ejecusion en el orden exacto en el que se encuentran en el codigo. (el script que se descarga primero se ejecuta primero) por otro lado usar DEFER garantiza que los script se ejecuten en el orden en el que estan escritos en el codigo y eso es lo que idealmente queremos que suceda.
//NOTA en conclusion sobre estos 2 atributos usar DEFER en el encabezado es la mejor solucion si necesitas que la secuencia de comandos sea la que esta escrita en el codigo EJEMPLO como cuando usamos librerias de terceros Y  queremos que nuestro codigo interactue con el codigo de estas librerias, ahora si  el orden en el que se ejecuten los script no es relevante puedes usar ASYNC EJEMPLO Sscriot  de terceros como google analitcs u script de anuncios, basicamente cualquier codigo que no tenga que interactuar con nuestro propio codigo esta bien.
//NOTA tener en cuenta que los navegadores mas modernos admiten estos 2 atributos, si algun usuario esta usando un navegador mas antiguo es posible que tenga problemas de rendimiento en estos casos siempre es bueno asegurarse y poner el scriop al final del body. y no en el HEAD
