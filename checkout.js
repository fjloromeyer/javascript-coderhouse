const btcPriceUI = document.getElementById("btcPriceUI");
const btcPricesEndPoint = "https://criptoya.com/api/btc/usd/1"; //Fetching BTC prices in USD.

let btcPrice = localStorage.getItem("lastBtcPrice"); //I will define the btcPrice as the last price from the localStorage so as to not have a NaN when entering the page.

setInterval(() => {
    fetch(btcPricesEndPoint)
        .then(response => response.json())
        .then(({
            bitso
        }) => {
            btcPrice = bitso.totalAsk; //I store the BTC price in USD in a variable.
            btcPriceUI.innerHTML = `
                <p>@${btcPrice} USD/BTC</p>
            ` //I change the DOM putting the BTC price in the front page.
        })
        .catch(error => console.error(error))
}, 100) //I refresh prices every 0.1 seconds.

const totalCheckout = localStorage.getItem("total")
const totalBeforePaying = document.getElementById("totalBeforePaying");

setInterval(() => {
    if (totalCheckout) {
    let totalPriceBtc2 = totalCheckout/btcPrice
    totalBeforePaying.innerHTML = `Your total is: ${totalCheckout} USD / ${totalPriceBtc2.toFixed(4)} BTC.`
    } else {
    totalBeforePaying.innerHTML = `0`
    }
}, 100)

const payTotal = document.getElementById("payTotal");
payTotal.innerHTML = `Deliver it now!`
payTotal.addEventListener("click", () => {
    Swal.fire({
        title: "Delivery confirmation",
        html: `<div>"Are you sure about this?"</div>`,
        confirmButtonText: "Yes, I want my food!",
        showCancelButton: true,
        cancelButtonText: "Mmm, not really.."
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Food is on its way!",
                icon: "success",
                confirmButtonText: "Yaaay!"
            })
        }
    })
})