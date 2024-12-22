// Definir un array de productos
const productos = [
    { id: 1, name: 'Camisa Anime', description: 'Camisa con diseños de anime, ideal para el verano', price: 3.00, amount: 300 },
    { id: 2, name: 'Audiculares Anime', description: 'Audiculares con diseños de anime, ideal para toda la familia', price: 10.00, amount: 200 },
    { id: 3, name: 'Series de Anime', description: 'Todas las series de anime que puedas imaginar, para ponerte al día en vacaciones', price: 4.00, amount: 5000 },
    { id: 4, name: 'Mangas', description: 'Mangas modernos y actuales, de la mejor calidad', price: 3.00, amount: 300 }
];

// Función para mostrar la descripción amplia del producto
function mostrarDescripcion(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const card = document.querySelector(`.product-item:nth-child(${id})`);
        const descripcionParrafo = document.createElement('p');
        descripcionParrafo.innerText = producto.description;
        card.appendChild(descripcionParrafo);
    }
}

// Función para añadir productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push({
            ...producto,
            quantity: 1 // Añade una propiedad de cantidad
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    const carritoItems = document.getElementById('carrito-items');

    carritoItems.innerHTML = ''; // Limpiamos el contenido previo
    let total = 0;

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.className = 'carrito-item';
            productoElemento.innerHTML = `
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <p>Precio: $${producto.price.toFixed(2)}</p>
                <p>Cantidad: ${producto.quantity}</p>
            `;
            carritoItems.appendChild(productoElemento);
            total += producto.price * producto.quantity;
        });
    }

    const totalContainer = document.getElementById('total-container');
    totalContainer.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;
}

// Ejecutar mostrarCarrito al cargar la página
window.onload = mostrarCarrito;
