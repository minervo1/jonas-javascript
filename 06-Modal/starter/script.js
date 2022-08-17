'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');
//en este caso cuando varios elementos coinciden en este caso con la misma clase nesecitamos seleccionarlas todas. si usamos el 'querySelector' solo tomara el primer elemento
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal); //nos devuelve algo llamado 'NodeList'

/*este nodeList es parecido a un array, en este caso podemos usarlo como un array y recorrerlo para que nos de los 3 botones que estan en esta variable, y como sabemos para obtener el elemento  debemos acceder a su propiedad
for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
}
*/

//ahora debemos adjuntar un 'addEventListener' a cada boton para que con la funcion adjunta le indiquemos que debe hacer. pero si miramos mas detalladamente no es necesario hacerlo por separado para cad uno de los botones
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', function () {
    //lo que nesecitamos es que se muestra la ventana modal que esta oculta, para esto usamos la propiedad classList que posee algunos metodos, especificamente el metodo 'remove' y le pasamos la clase que queremos remover.
    modal.classList.remove('hidden');
    //hacemos lo mismo para mostrar la clase overlay que tambien esta oculta
    overlay.classList.remove('hidden');

    //modal.style.display = 'block'; tambien podriamos haber manipulado directamente accediendo a los estilos y mostrando el display
  });
}

/*este codigo funciona, pero tenemos codigo repetido, mejoremoslo un poco
closeModalBtn.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});
overlay.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});*/

//de esta manera tenemos menos lineas de codigo, simplemente se creo una funcion con el codigo repetido y esta se le paso al addEventListener reemplazandola por la funcion anonima que teniamos antes.
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//algo que ocurre en aplicasiones reales es que al presionar la tecla ESC tambien podemos salir o cerrar en este caso la ventana modal. en este caso en especial como es un evento que ocurre fuera de la aplicasion se suelen llamar eventos globales. porque no se utilizo ningun elemento del DOM
document.addEventListener('keydown', function (e) {
  //console.log(e.key);

  //si el valor asociado a la propiedad KEY es igual a nombre de la tecla y si la variable modal NO contiene la clase 'hidden(osea que es visible la ventana)
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
