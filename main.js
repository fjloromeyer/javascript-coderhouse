const VAT = 0.21; //Value added tax = 21%

class Product{
    constructor(name, price, category){
        this.name = name;
        this.price = price;
        this.category = category;
    }

    sumVAT() {
        return this.price * (1+VAT);
    }
};

/* Starters */
let meatEmpanada = new Product("meat empanada", 4, "starters");
let provoleta = new Product("provoleta", 5, "starters");
let chorizo = new Product("chorizo", 3, "starters");
/* Main courses */
let meatSchnitzel = new Product("meat schnitzel", 12, "main courses");
let tbone = new Product("tbone", 17, "main courses");
let asado = new Product("asado", 25, "main courses");
/* Desserts */
let panqueque = new Product("panqueque", 7, "desserts");
let iceCream = new Product("ice cream", 5.5, "desserts");
let strawberries = new Product("strawberries", 6, "desserts");
/* Drinks */
let stillWater = new Product("still water", 3, "drinks");
let sparklingWater = new Product("sparkling water", 3, "drinks");
let soda = new Product("soda", 3.5, "drinks");
/* Wines */
let catenaZapata = new Product("catena zapata", 20, "wines");
let elEnemigo = new Product("el enemigo", 30, "wines");
let terrazas = new Product("terrazas reserva malbec", 18, "wines");

/* alert("Welcome to La taberna de Federico!")
let mensajeInicial = prompt("What dishes do you want to order today?") */

/* console.log("The price of meat empanada is " + meatEmpanada.price + " and adding the VAT the total would be " + meatEmpanada.sumVAT()); */



let selection = {} /* acá tengo que meter los objetos que el usuario seleccionó que quiere comer */

function theCheck() {
    let j = 0
    for (const i in selection) {
        j = j + i.price
    }
    return j
}
let totalGross = theCheck()
console.log("The total of the whole meal would be " + totalGross + " USD.");
let suggestedTip = 0.1*totalGross;
let tip = parseInt(prompt("Do you want to add a tip? (we suggest 10%, that would be " + suggestedTip + " USD."));

function calcTip(){
    let finalTip = 0;
    if (tip >= 0) {
        finalTip == tip;
        }
    else {
        finalTip == 0
    };
    return finalTip
}

let totalNet = totalGross + calcTip()
console.log("The total of the meal plus tip would be " + totalNet + " USD.")