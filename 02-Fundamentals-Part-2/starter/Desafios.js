'use strict';
console.log('---Desafio n° 1');
//¡Volvamos a los dos equipos de gimnasia, los delfines y los koalas! Hay un nuevo disciplina de la gimnasia, que funciona de otra manera. Cada equipo compite 3 veces y luego se calcula el promedio de las 3 puntuaciones (así que una puntuación media por equipo). Un equipo solo gana si tiene al menos el doble de la puntuación media del otro equipo. De lo contrario, ¡ningún equipo gana!

//Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
//Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

//TIPS
//Para calcular el promedio de 3 valores, súmalos todos juntos y divide por 3 Para verificar si el número A es al menos el doble del número B, verifica A >= 2 * B. Aplica esto a los puntajes promedio del equipo 😉.

//TAREAS
//1. Cree una función de flecha 'calcAverage' para calcular el promedio de 3 puntajes
const calcAverage = (punt1, punt2, punt3) => (punt1 + punt2 + punt3) / 3;
//2. Usa la función para calcular el promedio de ambos equipos
const puntageDelfines = calcAverage(85, 54, 41);
const puntageKoalas = calcAverage(23, 34, 27);
console.log(puntageDelfines, puntageKoalas);

//3. Cree una función 'checkWinner' que tome el puntaje promedio de cada equipo como parámetros ('avgDolhins' y 'avgKoalas'), y luego registra el ganador a la consola, junto con los puntos de victoria, según la regla anterior. Ejemplo: "Koalas ganan (30 vs. 13)"
const checkWinner = function (proDelfines, proKoalas) {


    if (proDelfines >= proKoalas * 2) {
        return `ganan los Delfines 🏆${proDelfines} a ${proKoalas}`
    } else if (proKoalas >= proDelfines * 2) {
        return `ganan los kalas 🏆${proKoalas} a ${proDelfines}`
    } else {
        return `no hay ganadores 😔: koalas ${proKoalas} delfines ${proDelfines}`
    }
}
//4. Utilice la función 'checkWinner' para determinar el ganador de los Datos 1 y Datos 2
console.log(checkWinner(puntageDelfines, puntageKoalas));
//como es una funcion generica ademas recordemos que las funciones son independientes (no ls importa de donde provienen los argumentos)podemos ingresar cualquier numero que mnosotos queramos
console.log(checkWinner(33, 112));
//5. Ignora los sorteos esta vez

console.log('---DESAFIO N° 2---');
//Steven todavía está construyendo su calculadora de propinas, usando las mismas reglas que antes: Propina 15% de el billete si el valor del billete está entre 50 y 300, y si el valor es diferente, la propina es 20%.
// 1. Escriba una función 'calcTip' que tome cualquier valor de factura como entrada y devuelva la propina correspondiente, calculada en base a las reglas anteriores (puede consultar el código del primer desafío de la calculadora de propinas si es necesario). Usa la función escriba lo que más le guste. Pruebe la función utilizando un valor de factura de 10
const calcTip = boleta => boleta >= 50 && boleta <= 300 ? boleta * 0.15 : boleta * 0.20;
console.log(calcTip(10));

// 2. ¡Y ahora usemos arreglos! Entonces cree una matriz 'facturas' que contenga los datos de prueba abajo
const boletas = [125, 555, 44];
//3. Cree una matriz de 'propinas' que contenga el valor de la propina para cada factura, calculado a partir de la función que creaste antes
const propinas = [calcTip(boletas[0]), calcTip(boletas[1]), calcTip(boletas[2])];
console.log(propinas);
//4. Bonificación: cree una matriz 'total' que contenga los valores totales, por lo que la factura + propina.
const total = [boletas[0] + propinas[0], boletas[1] + propinas[1], boletas[2] + propinas[2]];
console.log(total);

//Test data: 125, 555 and 44.

//Sugerencia: recuerde que una matriz necesita un valor en cada posición y ese valor puede ser en realidad el valor devuelto de una función! Entonces puedes simplemente llamar a una función como matriz valores (así que no almacene los valores de punta en variables separadas primero, sino directamente en el nuevo matriz) 😉

console.log('---Desafio n° 3---');

//¡Volvamos a Mark y John comparando sus IMC! Esta vez, usemos objetos para implementar los cálculos! Recuerda: IMC = masa / altura ** 2 = masa/ (altura * altura) (masa en kg y altura en metros)
//Datos de la prueba: Mark pesa 78 kg y mide 1,69 m de altura. Juan pesa 92 kg y mide 1,95 m. alto.

//1. Para cada uno de ellos, cree un objeto con propiedades para su nombre completo, masa y altura (Mark Miller y John Smith)
const mark = {
    nombre: 'mark Miller',
    masa: 78,
    altura: 1.69,
    calImc: function () {
        this.imc = this.masa / (this.altura ** 2);
        return this.imc;
    }
}
const jonh = {
    nombre: 'jonh smith',
    masa: 92,
    altura: 1.95,
    calImc: function () {
        this.imc = this.masa / (this.altura ** 2);
        return this.imc;
    }
}
//2. Cree un método 'calcBMI' en cada objeto para calcular el IMC (el mismo método en ambos objetos). Almacene el valor de IMC en una propiedad y también devuélvalo del método
//*hecho
//3. Registre en la consola quién tiene el IMC más alto, junto con el nombre completo y el respectivo IMC. Ejemplo: "¡El IMC de John (28,3) es más alto que el de Mark (23,9)!"
const imcJonk = jonh.calImc();
const imcMark = mark.calImc();
console.log(`el IMC de ${mark.nombre} (${mark.imc.toFixed(2)}) es ${mark.imc > jonh.imc ? 'mayor' : 'menor'} que el IMC de ${jonh.nombre} (${jonh.imc.toFixed(2)})`);

console.log('---desafio n° 4---');
//¡Mejoremos aún más la calculadora de propinas de Steven, esta vez usando bucles!
//Datos de prueba: 22, 295, 176, 440, 37, 105, 10, 1100, 86 y 52
//Sugerencias: Llame a 'calcTip' en el ciclo y use el método push para agregar valores al matrices de propinas y totales 😉.

//1. Cree una matriz 'facturas' que contenga los 10 valores de facturas de prueba
let facturas = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
//2. Cree matrices vacías para las propinas y los totales ('propinas' y 'totales')
let propinas1 = [];
let totales = [];
//3. Use la función 'calcTip' que escribimos antes (no es necesario repetirla) para calcular propinas y valores totales (factura + propina) para cada valor de factura en la matriz de facturas. Usa un para bucle para realizar los 10 cálculos!

const calcTip2 = boleta => boleta >= 50 && boleta <= 300 ? boleta * 0.15 : boleta * 0.20;


for (let i = 0; i < facturas.length; i++) {
    const propina = calcTip2(facturas[i]);
    propinas1.push(propina);
    totales.push(propina + facturas[i]);
}
console.log(propinas1);
console.log(totales);

//Bonus:
//4. Bonificación: escriba una función 'calcAverage' que tome una matriz llamada 'arr' como un argumento. Esta función calcula el promedio de todos los números en el formación. ¡Este es un desafío difícil (no lo hemos hecho antes)! Aquí está cómo resuélvelo:
//4.1. Primero, deberá sumar todos los valores en la matriz. Para hacer la suma, comience creando una variable 'suma' que comience en 0. Luego recorra el matriz usando un bucle for. En cada iteración, agregue el valor actual al variable 'suma'. De esta manera, al final del ciclo, tienes todos los valores agregados juntos
//4.2. Para calcular el promedio, divide la suma que calculaste antes por el longitud de la matriz (porque ese es el número de elementos)
//4.3. Llame a la función con la matriz 'totales'



const calcAverage1 = function (arr) {
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
        suma = suma + arr[i];//suma += arr[i]

    }
    return suma / arr.length;

}

console.log(calcAverage1(totales));