const url = 'http://localhost:3000'

let productSelected = []
let productSelectedCounter = 0

var totalPurchase = document.querySelector('.total-purchase')
const seeker = document.querySelector('#seeker')
const loader = document.querySelector('.loader-container')
const productContainer = document.querySelector('.product-container')
const summaryContainer = document.querySelector('.summary-container')

function seekerEventListener() {
    let delayTimer
    seeker.addEventListener('input', (event) => {
        clearTimeout(delayTimer)
        delayTimer = setTimeout(_ => {
            displayProducts(event.target.value)
        }, 600)
    })
} seekerEventListener()

function displayProducts(filter) {
    productContainer.innerHTML = ''
    loader.classList.remove('d-none')
    let uri = filter
        ? '/products?filter=' + filter
        : '/products'
    fetch(url + uri).then(response => response.json())
        .then(data => {
            loader.classList.add('d-none')
            this.renderProducts(data)
        })
        .catch(err => {
            console.log('·> ' + filter, err)
            displayProducts()
        })
} displayProducts()

function renderProducts(products) {
    products.forEach(pro => {
        productContainer.innerHTML += `
            <product-card class="col-xs-3 p-3 fadeIn"
                id="${pro.id}"
                name="${pro.name}"
                img="${pro.url_image || 'assets/default-img.jpg'}"
                price="${pro.price}">
            </product-card>`
    })
    setTimeout(_ => refreshEventListener(), 0)
}

const homeBtn = document.querySelector('.logo')
function homeEventListener() {
    homeBtn.addEventListener('click', () => {
        if (productContainer.classList.contains('d-none')) {
            productContainer.classList.remove('d-none')
            summaryContainer.classList.add('d-none')
            const allProductsRendered = summaryContainer.querySelectorAll('purchase-summary')
            allProductsRendered.forEach(product => product.parentNode.removeChild(product))
        }
    })
}

const totalProductsEl = document.querySelector('.total-products')
function updateTotalProducts() { totalProductsEl.innerHTML = productSelectedCounter }

const summaryBtn = document.querySelector('.btn-shopping-cart')
function summaryListener() { summaryBtn.addEventListener('click', displaySummary) }
summaryListener()

function displaySummary() {
    if (productSelectedCounter <= 0 || !summaryContainer.classList.contains('d-none')) return
    productContainer.classList.add('d-none')
    summaryContainer.classList.remove('d-none')
    let total = 0
    productSelected.forEach(prod => {
        total += Number(prod.price) * Number(prod.quantity)
        summaryContainer.innerHTML += `
            <purchase-summary 
                name="${prod.name}" id="${prod.id}"
                img="${prod.img || 'assets/default-img.jpg'}"
                total="${prod.total}"
                price="${prod.price}"
                quantity="${prod.quantity}">
            </purchase-summary>`
    })
    setTimeout(_ => {
        addListenerButtons()
        totalPurchase = document.querySelector('.total-purchase')
        totalPurchase.innerHTML = total
    }, 0)
}

function addListenerButtons() {
    const decreaseButtons = document.querySelectorAll('.btn-decrease')
    decreaseButtons.forEach(addToCart => {
        addToCart.addEventListener('click', (event) => { modifySelected(event, false) })
    })
    const addButtons = document.querySelectorAll('.btn-add')
    addButtons.forEach(addToCart => {
        addToCart.addEventListener('click', (event) => { modifySelected(event, true) })
    })
}

function modifySelected(event, isPLus) {
    const button = event.target
    const item = button.closest('.summary')
    const total = item.querySelector('.product-total')
    const quantity = item.querySelector('.product-quantity')
    const price = item.querySelector('.product-price').textContent
    const id = item.querySelector('.id').textContent
    this.plusOrSubtract(isPLus, quantity, total, price, id)
}

function plusOrSubtract(isPLus, quantity, total, price, id) {
    if (!isPLus && Number(quantity.textContent) > 0) {
        --productSelectedCounter
        totalPurchase.innerHTML = Number(totalPurchase.innerHTML) - Number(price)
        total.innerHTML = Number(total.textContent) - Number(price)
        quantity.innerHTML = Number(quantity.textContent) - 1
        updateProductSelectedList(isPLus, id)
    } else if (isPLus) {
        ++productSelectedCounter
        totalPurchase.innerHTML = Number(totalPurchase.innerHTML) + Number(price)
        total.innerHTML = Number(total.textContent) + Number(price)
        quantity.innerHTML = Number(quantity.textContent) + 1
        updateProductSelectedList(isPLus, id)
    }
    setTimeout(_ => updateTotalProducts(), 0)
}

function refreshEventListener() {
    const addToShoppingCartButtons = document.querySelectorAll('.add-to-cart')
    addToShoppingCartButtons.forEach(addToCart => {
        addToCart.addEventListener('click', addToCartClicked)
    })
    homeEventListener()
}

function addToCartClicked(event) {
    const button = event.target
    const item = button.closest('.card')
    const id = item.querySelector('.id').textContent
    const name = item.querySelector('.card-content').textContent
    const price = item.querySelector('.price').textContent
    const img = item.querySelector('.img').src
    addItemToShoppingCart(id, name, price, img)
    updateTotalProducts()
}

function addItemToShoppingCart(id, name, price, img) {
    ++productSelectedCounter
    const product = productSelected.find(prod => prod.id === id)
    if (!product) {
        productSelected.push({ id, name, price, total: Number(price), img, quantity: 1 })
    } else {
        product.quantity = ++product.quantity
        product.total += Number(price)
    }
}

function updateProductSelectedList(isPlus, id) {
    const product = productSelected.find(prod => prod.id === id)
    if (isPlus) ++product.quantity
    else --product.quantity
    setTimeout(_ => {
        if (product.quantity < 1)
            productSelected = productSelected.filter(prod => prod.id !== id)
    }, 0)
}

class ProductCard extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name')
        const price = this.getAttribute('price')
        const img = this.getAttribute('img')
        const id = this.getAttribute('id')

        this.innerHTML = `
            <div class="card">
                <span class="id d-none">${id}</span>
                <div class="card-img">
                    <img class="img" src="${img}">
                </div>
                <div class="card-content px-4">${name}</div>
                <div class="card-footer px-4">
                    <span>$<span class="price">${price}</span></span>
                    <button class="add-to-cart d-center">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `
    }
}

class PurchaseSummary extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute('id')
        const img = this.getAttribute('img')
        const name = this.getAttribute('name')
        const price = this.getAttribute('price')
        const total = this.getAttribute('total')
        const quantity = this.getAttribute('quantity')

        this.innerHTML = `
            <div class="row center-xs mt-3 summary">
                <span class="product-price d-none">${price}</span>
                <span class="id d-none">${id}</span>
                <div class="col-xs-2 fadeIn"><img class="summary-img" src="${img}"></div>
                <div class="col-xs-4 product-name">${name}</div>
                <div class="col-xs-1 d-center">Uni.<span class="product-quantity ml-2">${quantity}</span></div>
                <div class="col-xs-1 product-price-cont">$<span class="product-total">${total}</span></div>
                <div class="col-xs-1 product-actions d-center">
                    <button class="btn-add mr-2"><i class="fas fa-plus"></i></button>
                    <button class="btn-decrease"><i class="fas fa-minus"></i></button>
                </div>
            </div>
        `
    }
}

window.customElements.define('product-card', ProductCard)
window.customElements.define('purchase-summary', PurchaseSummary)