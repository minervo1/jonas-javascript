// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*
//* tal como el nombre lo indica en esta seccion aprenderemos algunas habilidadeds que todo desarrollador debe implementar para hacer mas eficiente  su codigo.
//* tal como se vio en la leccion anterior usaremos la estrategia para resolver problemas de forma practica.

//* este es el caso u problema
//Trabajamos para una empresa que construye un termómetro inteligente para el hogar. nuestra tarea más reciente es esta: 'dado un conjunto de temperaturas de un día, calcule la amplitud de la temperatura. tenga en cuenta que a veces puede haber un error del sensor.'

const temperaturas = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
//1- entendiendo el problema
//?que es la amplitud ?
//=> es la diferencia entre el promedio del minimo con el maximo

//? como calculo el max y el minimo? 
//=> en la funcion esta la respuesta

//?que es un error de sensor y como se deveria ver cuando ocurre? 
//=> ya sabemos como se ve este error es un string

//2- dividiendo el problema
//?como ignoro el error
//=> en este caso ignoramos el error con la sentencia continue
//?como encuentro el minimo y el maximo valor?
//=> la funcion lo explica si se analiza
//?calcular la diferencia entre estos y devolver el valor
//=> es simplemente una resta

const amplitud = function (tem) {
    let max = tem[0];
    let min = tem[0];

    for (let i = 0; i < tem.length; i++) {
        const tempeActual = tem[i];
        if (typeof tempeActual !== 'number') continue;

        if (tempeActual > max) max = tempeActual;
        if (tempeActual < min) min = tempeActual;

    }
    console.log(max, min);
    return max - min;

};
console.log(amplitud(temperaturas));

//supongamos que ahora el gerente de la empresa nos dice que la funcion debe resibir 2 array
//* 1- entendiendo el problema
//?debo implementar 2 veces la misma funcionalidad?
//=> no podemos unir las 2 array en uno solo

//* 2- dividiendo elññ problema en subProblemas
//?como uno 2 matrizes?
//=> usamos el metodo concat();

const amplitudNueva = function (tem1, tem2) {
    const tem3 = tem1.concat(tem2);
    let max = tem3[0];
    let min = tem3[0];

    for (let i = 0; i < tem3.length; i++) {
        const tempeActual = tem3[i];
        if (typeof tempeActual !== 'number') continue;

        if (tempeActual > max) max = tempeActual;
        if (tempeActual < min) min = tempeActual;

    }
    console.log(max, min);
    return max - min;

};
console.log(amplitudNueva([2, 3, 2, 3, 24], [23, 7, 21, -1]));
*/
console.log('---Depurando con la consola y breakpoints---');

//*veremos ahora de manera practica como depurar introducioendo un error a proposito ennuna funcion
//supongamos que tenemos una funcion que toma la temperatura del usuario en celciius y la transforma a grados kelvin

const medicionCelsius = function () {
    const medicion = {
        type: 'temperatura',
        unidad: 'celsius',
        //3-corregimos el problema
        //valor: Number(prompt('Grados Celsius: ')),
        valor: 10,
    };
    //2-encontramos el problema
    console.log(medicion);//aca poddemos ver el problema

    //otra forma de mostrar objetos
    //console.table(medicion);

    console.log(medicion.valor);//observamos que el nuumero que imprime es el correcto
    const kelvin = medicion.valor + 273;
    return kelvin;
}

//1-identificamos el error
console.log(medicionCelsius());

//*encontremos el error, al parecer nuestro error proviene de nuestro metodo promt, por lo que seria bueno comenzar por hay a ver que pasa, pues nos damos cuenta que no es especificamente el promt, pues veamos el objeto completo para ir descartando. nos damos cuenta ahora cual es el problema podemos observar que el valor que obtenemos del promt es una cadena y no un numero.


//pasemos al suguiente nivel y veamos el DEPURADOR DE GOOGLE CHROME
//como vimos en ciertas ocasiones es bueno utilizar el depurador de la consola del desarrollador

const calTemConError = function (t1, t2) {
    const temperaturas = t1.concat(t2);//uniendo 2 array

    let max = 0;
    let min = 0;

    for (let i = 0; i < temperaturas.length; i++) {
        const temActual = temperaturas[i];
        if (typeof temActual != 'number') continue;
        //* podemos acceder al mismo depurador desde nuestro codigo escribiendo la palabra 'debugger;' y guardamos cambios el navegador detectara automaticamente y abrira la herramieta que acabamos de ver

        //debugger;
        if (temActual > max) max = temActual;
        if (temActual < min) min = temActual;
    }
    console.log(max, min);
    return max - min;
};
const amplitud = calTemConError([3, 5, 1, 9, 4, 5]);
console.log(amplitud);


