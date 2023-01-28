/** OBJETOS **/

//Hasta este momento del curso, yo tenia que pedir datos a un alumno: 

let nombreAlumno = "Samuel";
let apellidoAlumno = "Tocaimaza";
let edad = 23; 
let cuotaAlDia = true;
let carrera = "Programación"; 


let alumnoSamuel = {
    nombre: "Samuel",
    apellido: "Tocaimaza",
    edad: 21,
    carrera: "Programación",
    cuota: true
}

let firuPerro = {
    nombre: "Firulais",
    apellido: "Coderdog", 
    edad: 5, 
    raza: "callejero", 
    color: "negro"
}

let auto = {
    marca: "Ford",
    modelo: "ka", 
    fabricacion: 2019,
    km: 50000,
    precio: 3000000
}

console.log(alumnoSamuel);
console.log(typeof alumnoSamuel);
console.log(firuPerro);
console.log(auto);

// ¿Cómo accedo a cada propiedad del objeto? 

console.log(auto.precio);

//Utilizo el nombre del objeto, luego el . (punto) y de esta manera puedo acceder a sus propiedades. 

//objeto.propiedad

console.log(auto.marca);

//Otra forma de hacerlo es con corchetes []

console.log(auto["modelo"]);

// ¿Puedo asignar nuevos valores a estas propiedades? 

console.log("Vamos a modificar el precio del auto");

auto.precio = 4000000;

console.log(auto.precio);
console.log(auto);

const yerba = {
    nombre: "Andresito",
    precio: 500, 
    cantidad: 10
};

console.log(yerba);

yerba.precio = 600;

console.log(yerba);

//Cuando trabajamos con valores: number, string, boolean, null. Estos se denominan valores primarios.. y accedemos directamente al valor. 

//Pero cuando trabajamos con objetos accedemos a una referencia de ese valor, por eso nos permite entrar y modificar las propiedades a pesar de declararlo con const.

/** FUNCIONES CONSTRUCTORAS **/

//en js, el constructor de un objeto es una función que usamos para crear un nuevo objeto cada vez que sea necesario. 

function Persona(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad; 

    this.saludar = function () {
        console.log("Hola, soy " + this.nombre);
    }
}


//MÉTODOS Y FUNCIONES
//Las funciones en JS son generalmente de acceso global, y los métodos son únicamente para ser invocados por los objetos que la contienen.

/* let nombre = prompt("Ingrese el nombre de su hijo:");
let apellido = prompt("Es tu mismo apellido?:");
let edadHijo = prompt("Te acordas de la edad?: ");

const persona1 = new Persona(nombre, apellido, edadHijo); */
const persona2 = new Persona("Victoria", "Tocaimaza", 7);

//Utilizamos el método saludar: 

persona2.saludar();

/* console.log(persona1); */
console.log(persona2);

/*** CLASES ***/

//Las clases en JS proveen una sintaxis más CLARA y simple para crear objetos. Son un equivalente al empleo de la función constructora y permite definir distintos tipos de métodos. 

class Producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio; 
    }

    sumaIva() {
        return this.precio * 1.21;
    }
}

const fideos = new Producto("Fideos Marolio", 100);

console.log(fideos);

console.log("El precio de los fideos es de: " + fideos.precio + " y con el iva incluido es de: " + fideos.sumaIva());

//Métodos en objetos JS (toLowerCase() y toUpperCase() )

let frase = "Hola, sOy Un sTRing";
let fraseDos = "HOLA, SOY UN STRING EN MAYUS";

console.log(frase.toUpperCase()); //HOLA, SOY UN STRING

console.log(fraseDos.toLowerCase()); //hola, soy un string en mayus

//Length es una propiedad que nos devuelve la cantidad de caracteres que tiene un string. 

console.log(frase.length);

//OPERADOR IN Y FOR ... IN

const homero = {
    nombre: "Homero",
    apellido: "Simpson",
    edad: 39, 
    profesion: "Inspector de Seguridad Nuclear2"
}; 

//El operador in nos permite saber si un objeto tiene una propiedad o no. 
//Retorna true o false. 

console.log("nombre" in homero); //true
console.log("apellido" in homero); //true
console.log("casado" in homero); // false

//FOR.. IN

//Nos permite recorrer las propiedades de un objeto. 

for ( let propiedad in homero) {
    console.log(propiedad);
}

//Y si quisiera mostrar por consola cada propiedad con su valor: 

for (let propiedad in homero) {
    console.log(propiedad + ": " + homero[propiedad]);
}
