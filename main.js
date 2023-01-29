    
function runHtmlBeforeJavascript() {
    const VAT = 0.21; //Value added tax = 21%

    class Product{
        constructor(number, name, price, category){
            this.number = number
            this.name = name;
            this.price = price;
            this.category = category;
        }

        sumVAT() {
            return this.price * (1+VAT);
        }
    };

    /* Starters */
    let meatEmpanada = new Product(1.1, "Meat empanada", 4, "starters");
    let provoleta = new Product(1.2, "Provoleta", 5, "starters");
    let chorizo = new Product(1.3, "Chorizo", 3, "starters");
    /* Main courses */
    let meatSchnitzel = new Product(2.1, "Meat schnitzel", 12, "main courses");
    let tbone = new Product(2.2, "T-bone steak", 17, "main courses");
    let asado = new Product(2.3, "Argentinian asado", 25, "main courses");
    /* Desserts */
    let panqueque = new Product(3.1, "Panqueque with Dulce de Leche/Apple", 7, "desserts");
    let iceCream = new Product(3.2, "Ice cream", 5.5, "desserts");
    let strawberries = new Product(3.3, "Strawberries with cream", 6, "desserts");
    /* Drinks */
    let stillWater = new Product(4.1, "Still water", 3, "drinks");
    let sparklingWater = new Product(4.2, "Sparkling water", 3, "drinks");
    let soda = new Product(4.3, "Soda", 3.5, "drinks");
    /* Wines */
    let catenaZapata = new Product(5.1, "Catena Zapata", 20, "wines");
    let elEnemigo = new Product(5.2, "El Enemigo", 30, "wines");
    let terrazas = new Product(5.3, "Terrazas Reserva Malbec", 18, "wines");

    const menu = [meatEmpanada, provoleta, chorizo, meatSchnitzel, tbone, asado, panqueque, iceCream, strawberries, stillWater, sparklingWater, soda, catenaZapata, elEnemigo, terrazas]

    alert("Welcome to La taberna de Federico!")
    access = prompt("Are you a client or an employee?").toLowerCase() //asking if it is a client or not

    // if it is not a client or an employee, ask again as many times as necessary until client or employee is answered.
    while(access !== "client" && access !== "employee"){
            alert("Intruder!!!")
            access = prompt("Let's try again... are you a client or an employee?").toLowerCase() //putting the prompt in lower case.
    }

    // if the user is a client, asking what he wants. If it is an employee, get out of here.
    let selection
    let sumPrices = 0
    if (access === "client"){
        selection = prompt("Let's begin then! Have a look at the menu and tell me the ID of what you want to order today.")
    } else if (access === "employee"){
        console.log(access)
        alert("You should not be consulting this menu, you should already know our prices!")
    }
    
    // going through the menu list and if the ID entered by the client matches the ID of one of our objects in the menu, get the price and sum it in sumPrices
    for (i=0; i<menu.length; i++) {
        if (menu[i].number == selection) {
            sumPrices = sumPrices + menu[i].price
            alert("Ordering this will cost you " + sumPrices + " USD.") //later on adding feature to put as many dishes as one wants and summing all to have the check
        }
    }

    // if the user is an employee do nothing. If it is a client and selected a wrong ID, asking to select again.
    if (sumPrices === 0 && access === "employee") {
        pass
    } else if (sumPrices === 0) {
        alert("You didn't choose a correct dish. Please enter only the ID at the left of the name of the dish that you want to order, for example 1.2")
    }

    let suggestedTip = 0.1*sumPrices;
    let tip = parseFloat(prompt("Do you want to add a tip? (we suggest 10%, that would be " + suggestedTip + " USD. Please enter only the number."));
    console.log(tip)

/*     while(access !== "client" && access !== "employee"){
        alert("Intruder!!!")
        access = prompt("Let's try again... are you a client or an employee?").toLowerCase() //putting the prompt in lower case.
    } */

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

    let totalNet = sumPrices + calcTip()

    console.log("The total of the meal plus tip would be " + totalNet + " USD.")
}

const elemento = document.getElementById("beginOrder")
elemento.addEventListener("click", runHtmlBeforeJavascript)