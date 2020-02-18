
/**
 * By adding async attribute to script , we need to be sure that the code js is loaded after the body page is   loaded. To do so : 
 * */

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
} else {
    ready()
}

function ready() {

    // Remove item for cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for(var i = 0 ; i < removeCartItemButtons.length ; i++ ) {
        var removeCartItemButton = removeCartItemButtons[i]
        removeCartItemButton.addEventListener('click' ,removeItemFromCart)
           

    }

    // Add item to cart
    var items = document.getElementsByClassName('shop-items')
    for(var j = 0 ; j < items.length ; j++) {
        var addButtons = items[j].getElementsByClassName('btn-primary')
        for(var i = 0 ; i < addButtons.length ; i++){
            var addButton = addButtons[i]
            addButton.addEventListener("click",function(event) {
                var button = event.target
                var shopItem = button.parentElement.parentElement
                var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
                var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
                var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
                addItemToCart(title,price,imageSrc)
                updateCartTotal()
            })
    }
    
    }

    // Change quantity
    var inputCartQuantities = document.getElementsByClassName('cart-item-quantity')
    for(var i = 0 ; i < inputCartQuantities.length ; i++){
        var inputItemQte = inputCartQuantities[i]
        inputItemQte.addEventListener('change' , qteChanged)
    }

    //Purchase
    var purchaseButton = document.getElementsByClassName('btn-purchase')[0]
    purchaseButton.addEventListener('click',function(event){
        alert("Thanks for purchasing")
       var cart = document.getElementsByClassName('cart-items')[0]
       while(cart.hasChildNodes()){
           cart.removeChild(cart.firstChild)
       }
       updateCartTotal()
    })
    
    updateCartTotal()
}

function updateCartTotal(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0 ; i < cartRows.length ; i++) {
        var priceElement =cartRows[i].getElementsByClassName('cart-price')[0]
        var qteElement =cartRows[i].getElementsByClassName('cart-item-quantity')[0]
        
        var price = parseFloat(priceElement.innerText.replace("EUR",''))
        var qte = qteElement.value

        total += qte * price   
    }
    total = Math.round(total * 100 )/100
    var totalPrice = document.getElementsByClassName('cart-total-price')[0]
    totalPrice.innerText = "EUR "+total

}

function addItemToCart(title,price,src) {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var itemsTitle = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0 ; i < itemsTitle.length ; i++) {
        if( itemsTitle[i].innerText == title) {
            alert("This item is already added to the cart")
            return
        }
    }

    var cartRow = document.createElement('div')
    cartRowContent = `
    <div class="cart-row">
                    <div class="cart-column cart-item">
                        <img class="cart-item-image" src="${src}" width="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-column cart-price">${price}</span>
                    <div class="cart-column cart-quantity">
                        <input class="cart-item-quantity" type="number" value="1">
                        <button class ="btn btn-danger" type="button">REMOVE</button>
                    </div>     
                </div>
    `
    cartRow.innerHTML = cartRowContent
    var cart = document.getElementsByClassName('cart-items')[0]
    cart.append(cartRow)

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeItemFromCart)
    cartRow.getElementsByClassName('cart-item-quantity')[0].addEventListener('change',qteChanged)
}

function removeItemFromCart() {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    console.log("Item removed successfully from the cart")
    updateCartTotal()          
}

function qteChanged() {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1
    }
    updateCartTotal()
}