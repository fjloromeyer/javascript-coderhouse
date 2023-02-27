const VAT = 0.21; //Value added tax = 21%
const date = new Date()
class Product{
    constructor(id, name, price, category, img){
        this.id = id
        this.name = name;
        this.price = price;
        this.category = category;
        this.img = img;
        this.quantity = 1;
    }

    sumVAT() {
        return this.price * (1+VAT);
    }
};

//create function to know if something is a float or not.
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

/* Starters */
let meatEmpanada = new Product(1.1, "Meat empanada", 4, "starter", "img/pancakes.jpg");
let provoleta = new Product(1.2, "Provoleta", 5, "starter", "img/pancakes.jpg");
let chorizo = new Product(1.3, "Chorizo", 3, "starter", "img/pancakes.jpg");
/* Main courses */
let meatSchnitzel = new Product(2.1, "Meat schnitzel", 12, "main", "img/pancakes.jpg");
let tbone = new Product(2.2, "T-bone steak", 17, "main", "img/pancakes.jpg");
let asado = new Product(2.3, "Argentinian asado", 25, "main", "img/pancakes.jpg");
/* Desserts */
let panqueque = new Product(3.1, "Panqueque with Dulce de Leche/Apple", 7, "dessert", "img/pancakes.jpg");
let iceCream = new Product(3.2, "Ice cream", 5.5, "dessert", "img/pancakes.jpg");
let strawberries = new Product(3.3, "Strawberries with cream", 6, "dessert", "img/pancakes.jpg");
/* Drinks */
let stillWater = new Product(4.1, "Still water", 3, "drink", "img/pancakes.jpg");
let sparklingWater = new Product(4.2, "Sparkling water", 3, "drink", "img/pancakes.jpg");
let soda = new Product(4.3, "Soda", 3.5, "drink", "img/pancakes.jpg");
/* Wines */
let catenaZapata = new Product(5.1, "Catena Zapata", 20, "wine", "img/pancakes.jpg");
let elEnemigo = new Product(5.2, "El Enemigo", 30, "wine", "img/pancakes.jpg");
let terrazas = new Product(5.3, "Terrazas Reserva Malbec", 18, "wine", "img/pancakes.jpg");

let menu = []
menu.push(meatEmpanada)
menu.push(provoleta)
menu.push(chorizo)
menu.push(meatSchnitzel)
menu.push(tbone)
menu.push(asado)
menu.push(panqueque)
menu.push(iceCream)
menu.push(strawberries)
menu.push(stillWater)
menu.push(sparklingWater)
menu.push(soda)
menu.push(catenaZapata)
menu.push(elEnemigo)
menu.push(terrazas)

let categories = ["starter", "main", "dessert", "drink", "wine"]; //could be user later on if I want to split the menu into diff categories.

let cart = []; //create the cart as an empty list. Will be adding products later on.

if(localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"));
}

const productContainer = document.getElementById("productContainer");

const showProducts = () => {
    menu.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12"); //responsive according to bootstrap measures
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${product.img}" class = "card-img-top imgProducts" alt = "${product.name}">
                            <div>
                                <h5> ${product.name} </h5>
                                <p> ${product.price} USD</p>
                                <button class = "btn colorButton" id="button${product.id}" > Add to cart </button>
                            </div>
                        </div>
                        `
        productContainer.appendChild(card);
        
        //Add products to the cart: 
        const button = document.getElementById(`button${product.id}`);
        button.addEventListener("click", () => {
            addToCart(product.id);
            showCart();
        })
    })
}

showProducts();

const addToCart = (id) => {
    const productInCart = cart.find(product => product.id === id)
    if(productInCart) {
        productInCart.quantity++;
    } else {
        const product = menu.find (product => product.id === id);
        const cartItem = {...product}
        cart.push(cartItem);
    }
    calcTotal();
    
    localStorage.setItem("cart", JSON.stringify(cart));
}

const cartContainer = document.getElementById("cartContainer");

const showCart = () => {
    cartContainer.innerHTML = "";
    cart.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${product.img}" class = "card-img-top imgProducts" alt = "${product.name}">
                            <div>
                                <h5>${product.name}</h5>
                                <p>Quantity: ${product.quantity}.</p>
                                <p>Price per unit: ${product.price} USD.</p>
                                <p>Subtotal: ${product.price * product.quantity} USD.</p>
                                <button class = "btn colorButton" id="+${product.id}" > + </button>
                                <button class = "btn colorButton" id="-${product.id}" > - </button>
                                <button class = "btn colorButton" id="delete${product.id}" > Delete </button>
                            </div>
                        </div>
                        `
        cartContainer.appendChild(card);

        const plusButton = document.getElementById(`+${product.id}`);
        plusButton.addEventListener("click", () => {
            addOneUnit(product.id);
        })

        const minusButton = document.getElementById(`-${product.id}`);
        minusButton.addEventListener("click", () => {
            deleteOneUnit(product.id);
        })

        const deleteButton = document.getElementById(`delete${product.id}`);
        deleteButton.addEventListener("click", () => {
            deleteFromCart(product.id);
        })
    })
    calcTotal();
}

const addOneUnit = (id) => {
    const productInCart = cart.find(product => product.id === id)
    productInCart.quantity++;
    calcTotal();
    showCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}

const deleteOneUnit = (id) => {
    const productInCart = cart.find(product => product.id === id);
    if (productInCart.quantity === 1) {
        deleteFromCart(id);
    } else {
        productInCart.quantity--;
    }
    calcTotal();
    showCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}

const deleteFromCart = (id) => {
    const productInCart = cart.find(product => product.id === id);
    const index = cart.indexOf(productInCart);
    productInCart.quantity = 1;
    cart.splice(index, 1);
    calcTotal();
    showCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}

const total = document.getElementById("total");
total.innerHTML = `0 USD.` //I want the total to say 0 on the HTML when there are no products in the cart.

const calcTotal = () => {
    let totalPrice = 0; 
    cart.forEach(product => {
        totalPrice += product.price * product.quantity;
    })
    total.innerHTML = `${totalPrice} USD.`;
    localStorage.setItem("total", totalPrice)
}

const emptyCart = document.getElementById("emptyCart");

emptyCart.addEventListener("click", () => {
    emptyWholeCart();
})

const emptyWholeCart = () => {
    cart = [];
    calcTotal();
    showCart();

    //LocalStorage:
    localStorage.clear();
}

const checkout = document.getElementById("checkout");

checkout.addEventListener("click", () => {
    window.location.assign("/checkout.html")
})


//THE WHOLE LOGIC BELOW IS FOR THE PREVIOUS PROJECT, WITH ALERTS, PROMPTS AND LOOPS --> THIS WAS CHANGED AFTER 2ND DEADLINE.


/* alert("Welcome to La taberna de Federico!")
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
    alert("You should not be consulting this menu, you should already know our prices!")
}

// going through the menu list and if the ID entered by the client matches the ID of one of our objects in the menu, get the price and sum it in sumPrices
function cost (foodId) {
    for (i=0; i<menu.length; i++) {
        if (menu[i].id == foodId) {
            sumPrices = sumPrices + menu[i].price
            alert("Ordering this will cost you " + sumPrices + " USD.") //later on adding feature to put as many dishes as one wants and summing all to have the check
        }
    }
}

cost(selection)

// if the user is an employee do nothing. If it is a client and selected a wrong ID, ask to select again.
if (sumPrices === 0 && access === "employee") {
    pass
} else if (sumPrices === 0) {
    let selectionNew = 0
    const menuIds = [1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3]
    while (isFloat(selectionNew) === false || menuIds.includes(selectionNew) === false) {
        selectionNew = parseFloat(prompt("You didn't choose a correct dish. Please enter only the ID at the left of the name of the dish that you want to order, for example 1.2"))
    }
    cost(selectionNew)
}

// suggest a tip and take into account if the user types a float with comma or dot.
let suggestedTip = 0.1*sumPrices;
let tip
if (access === "employee") {
    pass
} else {
    tip = prompt("Do you want to add a tip? (we suggest 10%, that would be " + suggestedTip + " USD. Please enter only the value, example: 1.2.");
    if (tip.includes(",")){
        tip = tip.replace(",",".")
    }
    tip = parseFloat(tip)
}

// if a string is typed in the previous prompt, no tip would be the default.
if (tip/1 != tip) {
    alert("In that case, I understand that no tip would be included.")
}

// do not take into account tips that are negative, no tip would be the default.
function calcTip(money){
    let finalTip;
    if (money >= 0) {
        finalTip = money;
    } else {
        finalTip = 0
    };
    return finalTip
}

//calculate and inform the total net of the whole meal.
let totalNet = sumPrices + calcTip(tip)
alert("The total of the meal plus tip would be " + totalNet + " USD.") */