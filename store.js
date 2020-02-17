
/**
 * By adding async attribute to script , we need to be sure that the code js is loaded after the body page is   loaded. To do so : 
 * */

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)

    for(var i = 0 ; i < removeCartItemButtons.length ; i++ ) {
        var removeCartItemButton = removeCartItemButtons[i]
        removeCartItemButton.addEventListener('click' , function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            console.log("Item removed successfully from the cart")
            updateCartTotal()    
        })
    }
}


function updateCartTotal(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')

    var total = 0
    for(var i = 0 ; i < cartRows.length ; i++) {
        console.log(cartRows[i])
        var priceElement =cartRows[i].getElementsByClassName('cart-price')[0]
        var qteElement =cartRows[i].getElementsByClassName('cart-item-quantity')[0]
        
        var price = parseFloat(priceElement.innerText.replace("EUR",''))
        var qte = qteElement.value

        total += qte * price   
    }
    var totalPrice = document.getElementsByClassName('cart-total-price')[0]
    totalPrice.innerText = "EUR "+total

}