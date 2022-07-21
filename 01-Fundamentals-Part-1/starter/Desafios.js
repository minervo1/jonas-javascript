console.log("-------desafio n° 1---------");
//*Mark y John están tratando de comparar su IMC (índice de masa corporal), que es calculado usando la fórmula: IMC = masa / altura ** 2  (masa en kg y altura en metros).

//Test data:
//Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
//Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

//1. Almacene la masa y la altura de Mark y John en variables
const alturaMarck = 1.69;
const pesoMarck = 78;
const alturaJohn = 1.95;
const pesoJohn = 92;

//2. Calcule el IMC de ambos usando la fórmula (incluso puede implementar ambos versiones)
let imcMarck = pesoMarck / alturaMarck ** 2;
let imcJohn = pesoJohn / alturaJohn ** 2;
console.log(imcMarck, imcJohn);

//3. Cree una variable booleana 'markHigherBMI' que contenga información sobre si Mark tiene un IMC más alto que John.
let markHigherBMI = imcMarck > imcJohn;
console.log(markHigherBMI);

console.log("-------desafio n° 2--------");

//*Usa el ejemplo de IMC del Desafío #1, y el código que ya escribiste, y mejoralo.

//1. Imprima un buen resultado en la consola, diciendo quién tiene el IMC más alto El mensaje es "¡El IMC de Mark es más alto que el de John!" o "¡El IMC de John es más alto que el de Mark!"
if (imcMarck > imcJohn) {
    console.log("el indice de masa corporal de Marck es mas alto que el de John");
} else {
    console.log("el indice demasa corporal de John es mas alto que el de Marck");
}

//2. Utilice un literal de plantilla para incluir los valores de IMC en los resultados.Ejemplo: "Marcos ¡El IMC (28,3) es más alto que el de John (23,9)!"

console.log(`el indice de masa corporal de Marck (${imcMarck}) es ligeramente mas alto que el de Jphn (${imcJohn})`);

console.log('------desafio n°3------');

//* Hay dos equipos de gimnasia, Dolphins y Koalas. compiten entre sí otras 3 veces. ¡El ganador con el puntaje promedio más alto gana un trofeo!

//Datos de prueba:
//§ Dato 1: Los delfines puntúan 96, 108 y 89. Los koalas puntúan 88, 91 y 110
//§ Bonificación de datos 1: los delfines obtienen 97, 112 y 101. Los koalas obtienen 109, 95 y 123
//§ Bonificación de datos 2: los delfines obtienen 97, 112 y 101. Los koalas obtienen 109, 95 y 106

//1. Calcule el puntaje promedio para cada equipo, usando los datos de prueba a continuación
const promedioDelfines = (96 + 108 + 89) / 3;
const promedioKoalas = (88 + 91 + 110) / 3
//2. Compare los puntajes promedio del equipo para determinar el ganador de la competencia, e imprimirlo en la consola. No olvides que puede haber un empate, así que prueba eso. también (dibujar significa que tienen el mismo puntaje promedio).
if (promedioDelfines > promedioKoalas) {
    console.log('Ganadores Delfines 🎉🐬');
} else if (promedioDelfines < promedioKoalas) {
    console.log('Ganadores Koalas 🎉🐨');
} else {
    console.log('felicidades obtuvieron un empate 😮');
}

//3. Bono 1: Incluya un requisito para una puntuación mínima de 100. Con esta regla, un equipo solo gana si tiene una puntuación más alta que el otro equipo, y al mismo tiempo un puntuación de al menos 100 puntos. Sugerencia: use un operador lógico para probar el mínimo puntuación, así como múltiples bloques else-if 😉
const promedioDelfines1 = (97 + 112 + 101) / 3;
const promedioKoalas1 = (109 + 95 + 123) / 3;
const puntosMinimos = 100;
if (promedioDelfines1 > promedioKoalas1 && promedioDelfines1 >= puntosMinimos) {
    console.log('Delfines ganadores');
} else if (promedioKoalas1 > promedioDelfines1 && promedioKoalas1 >= puntosMinimos) {
    console.log('Ganadores Koalas');
    //* a pesar de que si no se cumplem las 2 anteriores se supondria que son oguales de todas maneras es buena practica asegurarse y comprobarlo explicitamente
} else if (promedioDelfines1 === promedioKoalas1) {
    console.log('Empate');
}
//4. Bonificación 2: ¡La puntuación mínima también se aplica a un empate! Entonces, un empate solo ocurre cuando ambos equipos tienen la misma puntuación y ambos tienen una puntuación mayor o igual a 100 puntos. De lo contrario, ningún equipo gana el trofeo.
const promedioDelfines2 = (97 + 112 + 101) / 3;
const promedioKoalas2 = (109 + 95 + 106) / 3;
if (promedioDelfines2 > promedioKoalas2 && promedioDelfines2 >= puntosMinimos) {
    console.log('Delfines ganadores');
} else if (promedioKoalas2 > promedioDelfines2 && promedioKoalas2 >= puntosMinimos) {
    console.log('Ganadores Koalas');
} else if (promedioDelfines2 === promedioKoalas2 && promedioDelfines2 >= puntosMinimos && promedioKoalas2 >= puntosMinimos) {
    console.log('Empate ambos ganan');
} else {
    console.log('Ninguno de los 2 es ganador😢');
}

console.log('------desafio n° 4------');

//Steven quiere construir una calculadora de propinas muy simple para cada vez que va a comer en un restaurante. En su país es habitual dar una propina del 15% si el valor de la factura está entre 50 y 300. Si el valor es diferente, la propina es del 20%.

//Test data: § Dato 1: Test para valores de factura 275, 40 y 430

//1. Calcula la propina, según el valor del billete. Cree una variable llamada 'propina' para este. No está permitido usar una declaración if/else 😅 (Si te resulta más fácil, puedes Comience con una declaración if/else y luego intente convertirla en un ternario. ¡operador!).
//NOTA para calcular el % de un valor dividimos el % entre 100 y el resultado lo multiplicamos por el valor
let factura = 40;
let propina = factura >= 50 && factura <= 300 ? factura * 0.15 : factura * 0.2;
console.log(propina);


//2. Imprime una cadena en la consola que contiene el valor de la factura, la propina y el valor final (factura + propina). Ejemplo: “El billete fue 275, la propina fue 41,25 y el valor total 316,25”
console.log(`el valor de la factura fue de ${factura} la propina asciende a ${propina} por lo que la cuenta total es ${factura + propina}`);