const totalCheckout = localStorage.getItem("total")
const totalBeforePaying = document.getElementById("totalBeforePaying");
const payTotal = document.getElementById("payTotal");
payTotal.innerHTML = `Deliver it now!`
if (totalCheckout){
    totalBeforePaying.innerHTML = `${totalCheckout}`
} else {
    totalBeforePaying.innerHTML = `0`
}