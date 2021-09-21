//CARRITO DE PRODUCTOS EXTRA:


//titulo
$('#beneficios').append("Seleccioná que beneficios te gustaría agregar a tu seguro.");
$("#beneficios").css("color","black")
$("#beneficios").css("font-size","35px")
 



$(".container").animate({  left:'450px', opacity:'0.85', height:'800px', width:'900px'},"0.3");
                        




//CARRITO DE EXTRAS

window.onload = function () {
    
    class Producto {
        constructor(id, nombre, precio){
            this.id = id,
            this.nombre = nombre,
            this.precio = precio
        }
    }
    
    const productos = [];


productos.push(new Producto (1,"Equipaje Protegido",1000))
productos.push(new Producto (2, "Covid Extra", 900));
productos.push(new Producto (3, "Enfermedades Preexistentes", 1500));
productos.push(new Producto (4, "Seguro para dispositivos móviles", 1000));
productos.push(new Producto (5, "Asistencia Médica para deportes", 2000));
productos.push(new Producto (6, "Cancelación de viaje", 1200));


let carrito = [];
let total = 0;

const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;







function renderizarProductos() {
    productos.forEach((info) => {
        // Estructura

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-5');

     


        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');


        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;


        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = "$" + info.precio;


        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

        // Agregar
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}




    function anyadirProductoAlCarrito(evento) {
        // Añadir el Nodo al carrito
        carrito.push(evento.target.getAttribute('marcador'))

        // Calculo el total
        calcularTotal();

        // Actualizo el carrito 
        renderizarCarrito();

        // Actualizo el LocalStorage
        guardarCarritoEnLocalStorage();
}


function renderizarCarrito() {
    // Limpiar
    DOMcarrito.textContent = '';

    // Quitar los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];

    // Generar los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {

        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = productos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });

        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;

        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}


/**Borrar un elemento del carrito*/

function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();

}

/**
* Calcular el precio total teniendo en cuenta los productos repetidos
*/

function calcularTotal() {

    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    DOMtotal.textContent = total.toFixed(2);
}

/**
* Varia el carrito y vuelve a dibujarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
    // Borra LocalStorage
    localStorage.clear();

}

function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}




//boton realizar compra//

function realizarCompra(){
    swal("Gracias por su compra!");
    vaciarCarrito();

}

var botoncompra = document.getElementById("boton-comprar");
botoncompra.addEventListener("click",realizarCompra);





// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
calcularTotal();
renderizarCarrito();
}






  

  