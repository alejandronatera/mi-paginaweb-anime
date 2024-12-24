// Función para cargar productos desde un JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('productos.json'); // Asegúrate de que el archivo JSON esté en la misma ruta
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

let productos = [];

// Cargar productos y ejecutar funciones necesarias
cargarProductos().then(data => {
    productos = data;
    generarProductos(); // O cualquier otra función que necesite los productos cargados
});

// Función para generar la lista de productos
function generarProductos() {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los productos
    productos.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="./img/${producto.name.replace(/ /g, '').toLowerCase()}.jpg" alt="${producto.name}">
            <h5>${producto.name}</h5>
            <p>${producto.description}</p>
            <p>$${producto.price.toFixed(2)}</p>
            <p>Stock: ${producto.amount} unidades</p>
            <button onclick="mostrarDescripcion(${producto.id})">Mostrar Descripción</button>
            <button onclick="agregarAlCarrito(${producto.id})">Comprar</button>
        `;
        productContainer.appendChild(productItem);
    });
}

// Función para mostrar la descripción amplia del producto
function mostrarDescripcion(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const card = document.querySelector(`.product-item:nth-child(${productos.indexOf(producto) + 1})`);
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

// Mostrar/ocultar el carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
}

// Ejecutar mostrarCarrito al cargar la página (para ocultar por defecto)
window.onload = function() {
    mostrarCarrito(); // Esto oculta el carrito al cargar la página
    cargarProductos().then(data => {
        productos = data;
        generarProductos(); // O cualquier otra función que necesite los productos cargados
    });
};

// Validar el formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
    const nombre = document.getElementById('Nombre').value;
    const apellido = document.getElementById('Apellido').value;
    const email = document.getElementById('Email').value;
    const condiciones = document.getElementById('condiciones').checked;

    if (!nombre || !apellido || !email || !condiciones) {
        alert('Por favor, completa todos los campos obligatorios y acepta los términos y condiciones.');
        event.preventDefault();
    } else if (!validateEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        event.preventDefault();
    }
});

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
}
window.onload = function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nombre = document.getElementById('Nombre').value;
            const apellido = document.getElementById('Apellido').value;
            const email = document.getElementById('Email').value;
            const condiciones = document.getElementById('condiciones').checked;

            if (!nombre || !apellido || !email || !condiciones) {
                alert('Por favor, completa todos los campos obligatorios y acepta los términos y condiciones.');
                event.preventDefault();
            } else if (!validateEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                event.preventDefault();
            }
        });
    }

    mostrarCarrito();
    cargarProductos().then(data => {
        productos = data;
        generarProductos(); 
    });
};
