// 1. Product Data (10 Items)
const products = [
    { id: 1, name: "Wireless Mouse", price: 6000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608061/IMG-20260117-WA0007_mzjrpu.jpg" },
    { id: 2, name: "Keyboard", price: 4500, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608146/IMG-20260117-WA0008_mhtxlm.jpg" },
    { id: 3, name: "Monitor", price: 150000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608147/IMG-20260117-WA0009_fn7oyt.jpg" },
    { id: 4, name: "USB-C Cable", price: 1500, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608147/IMG-20260117-WA0010_e4ckya.jpg" },
    { id: 5, name: "Headphones", price: 6000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608061/IMG-20260117-WA0006_ezr4mw.jpg" },
    { id: 6, name: "Webcam", price: 25000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608061/IMG-20260117-WA0002_e2wopf.jpg" },
    { id: 7, name: "Laptop Stand", price: 1000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608062/IMG-20260117-WA0003_l3g3k1.jpg" },
    { id: 8, name: "Desk Lamp", price: 5000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608061/IMG-20260117-WA0004_b03r4v.jpg" },
    { id: 9, name: "External Drive", price: 3000, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608060/IMG-20260117-WA0001_tysscp.jpg" },
    { id: 10, name: "Mousepad", price: 2500, image: "https://res.cloudinary.com/dpjnyojeo/image/upload/v1768608061/IMG-20260117-WA0005_ochjma.jpg" }
];

let cart = [];

// 2. Initialize the Store
const productGrid = document.getElementById('product-grid');

function displayProducts() {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img">   
        <h3>${product.name}</h3>
            <p>₦${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(card);
    });
}

// 3. Cart Functions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }
    renderCart();
}

// 4. Update the UI
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        totalDisplay.innerText = '0.00';
        return;
    }

    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ₦${item.price} x ${item.quantity}
            </div>
            <div>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    totalDisplay.innerText = total.toFixed(2);
}

function showConfirmation() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const overlay = document.getElementById('confirmation-page');
    const orderIdSpan = document.getElementById('order-id');
    const summaryDiv = document.getElementById('order-summary');
    
    // 1. Generate a random Order Number
    orderIdSpan.innerText = Math.floor(Math.random() * 1000000);

    // 2. Show a quick summary of what they bought
    let summaryHtml = "<strong>Items:</strong><ul>";
    cart.forEach(item => {
        summaryHtml += `<li>${item.name} x {item.quantity}</li>`;
    });
    summaryHtml += `</ul><strong>Total Paid: ₦${document.getElementById('total-price').innerText}</strong>`;
    summaryDiv.innerHTML = summaryHtml;

    // 3. Display the overlay
    overlay.style.display = 'flex';
}

function closeConfirmation() {
    // 1. Hide the overlay
    document.getElementById('confirmation-page').style.display = 'none';

    // 2. Clear the cart data
    cart = [];

    // 3. Update the UI
    renderCart();
}

// Start the app
displayProducts();
