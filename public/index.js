let totalProducts = 0

const totalProductsEl = document.querySelector('.total-products')
function updateTotalProducts() {
    totalProductsEl.innerHTML = ++totalProducts
}

const addToShoppingCartButtons = document.querySelectorAll('.add-to-cart')
addToShoppingCartButtons.forEach(addToCart => {
    addToCart.addEventListener('click', addToCartClicked)
})

function addToCartClicked(event) {
    const button = event.target
    const item = button.closest('.card')
    const name = item.querySelector('.card-content').textContent
    const price = item.querySelector('.price').textContent
    const img = item.querySelector('.img').src
    addItemToShoppingCart(name, price, img)
    updateTotalProducts()
}

function addItemToShoppingCart(name, price, img) {
    console.log({ name, price, img })
}