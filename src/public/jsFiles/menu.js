
function addToCart(cartButton) {
  let quantityControl = cartButton.previousElementSibling;
  let cartText = cartButton;
  let quantityElement = quantityControl.querySelector('.quantity');
  
  // Set the quantity to 1 as soon as it's added
  quantityElement.textContent = '1';
  
  // Display the + and - buttons
  quantityControl.style.display = 'flex';
  
  // Change the text to "Added"
  cartText.textContent = " Added";
}

function increaseQuantity(button) {
  let quantityElement = button.previousElementSibling;
  let quantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = quantity + 1;
  updateCartText(quantityElement);
}

function decreaseQuantity(button) {
  let quantityElement = button.nextElementSibling;
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 0) {
    quantityElement.textContent = quantity - 1;
  }
  if (quantity === 1) {
    // Hide the quantity controls if the number is reduced to 0
    let quantityControl = button.closest('.quantity-control');
    quantityControl.style.display = 'none';
    
    // Change the "Added" text back to "Add to Cart"
    let cartText = quantityControl.nextElementSibling;
    cartText.textContent = 'Cart';
  }
  updateCartText(quantityElement);
}

function updateCartText(quantityElement) {
  let cartText = quantityElement.closest('.add-to-cart').querySelector('.cart-text');
  let quantity = parseInt(quantityElement.textContent);
  cartText.textContent = quantity > 0 ? ` Added ` : 'Cart';
}
