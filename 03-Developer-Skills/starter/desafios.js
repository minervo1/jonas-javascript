console.log('---Desafio n° 1---');
//Dada una serie de temperaturas máximas pronosticadas, el termómetro muestra una cuerda con las temperaturas dadas. Ejemplo: [17, 21, 23] imprimirá "... 17ºC en 1  días... 21ºC en 2 días... 23ºC en 3 días..."

//Test data:
//Data 1: [17, 21, 23]
//Data 2: [12, 5, -5, 0, 4]

//1. Cree una función 'printForecast' que tome una matriz 'arr' y registre un cadena como la anterior a la consola. Pruébelo con ambos conjuntos de datos de prueba.
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

//*si todas las matricez tuvieran el mismo largo seria mas facil realizar esto
console.log(`${data1[0]}0°C... ${data1[1]}0° C... etc`);

//*pero no es el caso ya que la segunda data posee una cantidad deferente de elementos y necesitamos una matriz que funcione para cualquier matriz quese le entregue.

const printForecast = function (arr) {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        str += `${arr[i]}°C en ${i + 1} dias, ...`;
    }
    return str;
};
const string = printForecast(data2);
console.log('...', string);


//2. Utilice el marco de resolución de problemas: comprenda el problema y divídalo en sub-problemas!