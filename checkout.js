const totalCheckout = localStorage.getItem("total")
const totalBeforePaying = document.getElementById("totalBeforePaying");
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
        if(result.isConfirmed) {
            Swal.fire({
                title:"Food is on its way!",
                icon: "success",
                confirmButtonText: "Yaaay!"
            })
        }
    })
})
if (totalCheckout){
    totalBeforePaying.innerHTML = `${totalCheckout}`
} else {
    totalBeforePaying.innerHTML = `0`
}