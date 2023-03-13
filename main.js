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
let pizza = new Product(1.1, "Pizza", 4, "starter", "img/pizza.jpg");
let shrimps = new Product(1.2, "Shrimps", 5, "starter", "img/shrimps.jpg");
let noodles = new Product(1.3, "Noodles", 3, "starter", "img/noodles.jpg");
let sushi = new Product(1.4, "Sushi", 3, "starter", "img/sushi.jpg");

/* Main courses */
let chicken_rice = new Product(2.1, "Chicken with rice", 12, "main", "img/chicken_with_rice.jpg");
let chirashi = new Product(2.2, "Chirashi", 17, "main", "img/chirashi.jpg");
let paella = new Product(2.3, "Paella", 25, "main", "img/paella.jpg");
let sandwich = new Product(2.4, "Club Sandwich", 12, "main", "img/sandwich.jpg");

/* Desserts */
let pancake = new Product(3.1, "Pancakes", 7, "dessert", "img/pancakes.jpg");
let bizcochuelo = new Product(3.2, "Bizcochuelo", 5.5, "dessert", "img/bizcochuelo.jpg");
let muffin = new Product(3.3, "Muffin", 6, "dessert", "img/muffin.jpg");
let yogurt = new Product(3.4, "Yogurt", 6, "dessert", "img/yogurt.jpg");

/* Drinks */
let water = new Product(4.1, "Still/Sparkling water", 3, "drink", "img/water.jpg");
let lemonade = new Product(4.2, "Lemonade", 3, "drink", "img/lemonade.jpg");
let juice = new Product(4.3, "Juice", 3.5, "drink", "img/juice.jpg");

/* Wines */
let redWine = new Product(5.1, "Red wine", 20, "alcohol", "img/redWine.jpg");
let whiteWine = new Product(5.2, "White wine", 30, "alcohol", "img/whiteWine.jpg");
let cocktail = new Product(5.3, "Cocktail", 18, "alcohol", "img/cocktail.jpg");

let menu = []
menu.push(pizza)
menu.push(shrimps)
menu.push(noodles)
menu.push(sushi)
menu.push(chicken_rice)
menu.push(chirashi)
menu.push(paella)
menu.push(sandwich)
menu.push(pancake)
menu.push(bizcochuelo)
menu.push(muffin)
menu.push(yogurt)
menu.push(water)
menu.push(lemonade)
menu.push(juice)
menu.push(redWine)
menu.push(whiteWine)
menu.push(cocktail)

let categories = ["starter", "main", "dessert", "drink", "alcohol"]; //could be user later on if I want to split the menu into diff categories.

let cart = []; //create the cart as an empty list. Will be adding products later on.

if(localStorage.getItem("cart")) cart = JSON.parse(localStorage.getItem("cart"));

const productContainer = document.getElementById("productContainer");

const showProducts = () => {
    menu.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12"); //responsive according to bootstrap measures
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${product.img}" class = "imgProducts" alt = "${product.name}">
                            <div class="infoProducts">
                                <hr>
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
            Toastify( {
                text: "Added to cart :)",
                duration: 2000, 
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
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
                                <hr>
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
            Toastify( {
                text: "Deleted from cart :(",
                duration: 2000, 
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
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
    productInCart.quantity === 1 ? deleteFromCart(id) : productInCart.quantity--;
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

showCart() //this one is to display the cart that is stored in localStorage even if I refresh the page.

const emptyCart = document.getElementById("emptyCart");

emptyCart.addEventListener("click", () => {
    emptyWholeCart();
    Toastify( {
        text: "Cart is now empty :(",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
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


