/* class Entrada {
    constructor(cantidad, nombre, zona, precio, imagen,id) {
        this.cantidad = cantidad
        this.nombre = nombre;
        this.zona = zona;
        this.precio = precio
        this.imagen= imagen;
        this.id = id;
    }
}


const eventoCirque = new Entrada(1,"Cirque Du Soleil", "general", 12000, "./img/cirque.jpg",1);
const eventoGuetta = new Entrada(1,"David Guetta", "general", 15500, "./img/guetta.jpg",2);
const eventoMarco = new Entrada(1,"Marco Carolla", "general", 10500, "./img/marco.webp",3);

const arrayEntradas = [];

arrayEntradas.push(eventoCirque);
arrayEntradas.push(eventoGuetta);
arrayEntradas.push(eventoMarco);

console.log(arrayEntradas); */

const listaEntradas = "JSON/entradas.json";

const containerCards = document.getElementById("containerCards");

const totalCompra = document.getElementById("totalCompra");

const totalCompraModal = document.getElementById("totalCompraModal");

const numeroDeEntradas = document.getElementById("cantidadEntradas");

const productosModal = document.getElementById("productosModal");

const btnFinalizarCompra = document.getElementById("finalizarCompra");

const btnVaciarCarrito = document.getElementById("vaciarCarrito");

let carritoCompras = [];

let arrayFetch;

let total = 0;

let entradaStorage = JSON.parse(localStorage.getItem("carritoCompras"));

if (localStorage.getItem("carritoCompras")) {
  carritoCompras = entradaStorage;
  /*  for(let i= 0; i < entradaStorage.length; i++ ){
    carritoCompras.push(entradaStorage[i]);
    
  } */
  renderizarCarrito();
  getTotal();
}

//*Integro FETCH

fetch(listaEntradas)
  .then((response) => response.json())
  .then((entrada) => {
    arrayFetch = entrada;
    console.log(entrada);
    entrada.forEach((element) => {
      const card = document.createElement("div");
      card.innerHTML = `<div>
                             <div class="col d-flex justify-content-center mb-4">
                                 <div class="card shadow mb-1 bg-white rounded" style="width: 20rem;">
                                   <div class="card-header text-success">
                                      <h5>Disponible</h5>
                                   </div>
                                     <img src="${element.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-text">$${element.precio} AR</h5>
                                    <p class="card-text">Agregar un texto </p>
                                    <button id= "botonCompra${element.id}" class="btn btn-info">Comprar entrada</button>
                                </div>
                             </div>
                        </div> `;
      containerCards.appendChild(card);

      let botonCompra = document.getElementById(`botonCompra${element.id}`);
      console.log(botonCompra);

      //*Boton para agregar productos al carrito de compra

      botonCompra.addEventListener("click", () => {
        agregoAlCarrito(element.id);
        /* TOASTIFY */
        Toastify({
          text: `Entrada ${element.nombre} agregada al carrito`,
          offset: {
            x: 10,
            y: 30,
          },
          duration: 1000,
          stopOnFocus: true,
          style: {
            background: "70, 86, 125",
          },
        }).showToast();
      });
    });
  })
  .catch((error) => console.log(error))
  .finally(() => console.log("Proceso Finalizado"));

const agregoAlCarrito = (id) => {
  const boleta = arrayFetch.find((entrada) => entrada.id === id);

  carritoCompras.includes(boleta)
    ? boleta.cantidad++
    : carritoCompras.push(boleta);
  console.log(carritoCompras);

  //*Agrego producto al storage
  addLocalStorage();

  renderizarCarrito();

  getTotal();
};

function getTotal() {
  let valorTotal = carritoCompras.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  let totalCantidades = carritoCompras.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  numeroDeEntradas.innerHTML = totalCantidades;
  totalCompra.innerText = valorTotal;
  totalCompraModal.innerText = valorTotal;
}

//*Funcion mostrar productos en ventana modal
function renderizarCarrito() {
  productosModal.innerHTML = "";
  carritoCompras.forEach((element) => {
    productosModal.innerHTML += `
    <div class="container">
     <div class="row">
       <div class="col">
         <p> ${element.nombre} </p>
       </div>
      <div class="col-sm-auto">
        <span id="cantidadModal">${element.cantidad}</span>
      </div>
      <div class="col col-sm-2">
        <button class="btn btn-danger" onclick="eliminoProd(${element.id})">X</button>
      </div>
    </div>`; //*Llamado a la funcion eliminarProducto
  });
  productosModal.innerHTML;
}

//*Funcion eliminar productos
function eliminoProd(id) {
  let boleta = carritoCompras.find((item) => item.id === id);
  boleta.cantidad > 1
    ? boleta.cantidad--
    : carritoCompras.splice(carritoCompras.indexOf(boleta), 1);
  addLocalStorage();

  renderizarCarrito();

  getTotal();

  console.log(carritoCompras);
}

//*Funciones JSON y localStorage

function addLocalStorage() {
  localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
}

//*Finalizo la compra
btnFinalizarCompra.addEventListener("click", () => {
  Swal.fire({
    icon: "question",
    iconColor: "#fcf300",
    title: "Estas a un paso de vivir tu proximo evento",
    text: `Quieres continuar con tu compra?`,
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#bf0603",
  }).then((result) => {
    if (result.isConfirmed) {
      carritoCompras.splice(0, carritoCompras.length);
      renderizarCarrito();
      getTotal();
      addLocalStorage();
      console.log(carritoCompras);
      Swal.fire({
        icon: "success",
        title: "Gracias por elegirnos disfruta de tu evento",
        backdrop: "#000000",
      });
    }
  });
});

btnVaciarCarrito.addEventListener("click", ()=>{
  carritoCompras.splice(0, carritoCompras.length);
    renderizarCarrito();
    getTotal();
    addLocalStorage();
    console.log(carritoCompras);
})
