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

const numeroDeEntradas = document.getElementById("cantidad de entradas");

const productosModal = document.getElementById("productosModal");

let carritoCompras = [];

let total = 0;

//*Integro FETCH

fetch(listaEntradas)
  .then((response) =>  response.json())
  .then((entrada) => {
     entrada.forEach((element) => {
      const card = document.createElement("div");
      card.innerHTML =  `<div>
                             <div class="col d-flex justify-content-center mb-4">
                                 <div class="card shadow mb-1 bg-white rounded" style="width: 50rem;">
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
      //let botonEliminar = document.getElementById(`botonEliminar${element.id}`);

      console.log(botonCompra);
      //console.log(botonEliminar);

      //*Boton para eliminar productos del carrito de compra

     /*  botonEliminar.addEventListener("click", () => {
        eliminarDeCarrito(element.id);
      }); */

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
          duration: 2000,
          stopOnFocus: true,
          style: {
            background: "70, 86, 125",
          },
        }).showToast();
      });

      //*Funcion agregar al carrito de compras

      const agregoAlCarrito = (id) => {
        
        const boleta = entrada.find((entrada) => entrada.id === id);

          if(carritoCompras.includes(boleta)){
            boleta.cantidad ++
          }else{
            carritoCompras.push(boleta);

          }
          //console.log(carritoCompras);
          productosModal.innerHTML = "";
            
         carritoCompras.forEach(element =>{
        //const div = document.createElement("div");
        productosModal.innerHTML +=`<p> ${element.nombre}  Cantidad: <span id="cantidadModal">${element.cantidad}</span></P> <button id= "eliminarProductoModal${element.id}" class="btn btn-danger">X</button>`

        //productosModal.appendChild(div);

        })
        

        

        getTotal()

        //totalCompra.innerText = valorTotal;
        //numeroDeEntradas.innerHTML = carritoCompras.length;

        //*Agrego producto al storage
        //addLocalStorage()

      };

      //mostrarCompraStorage()//*LocalStorage
     
    });
  })
  .catch((error) => console.log(error))
  .finally(() => console.log("Proceso Finalizado"));

  function getTotal(){

    let valorTotal = carritoCompras.reduce((acc, item) => acc + item.precio * item.cantidad,0);
    totalCompra.innerText = valorTotal;
    totalCompraModal.innerText = valorTotal; 

  }

//*Funcion eliminar del carrito de compras
/* const eliminarDeCarrito = (id) => {
  const boleta = carritoCompras.find((entrada) => entrada.id === id);
  console.log(boleta);
  carritoCompras.splice(carritoCompras.indexOf(boleta), 1);
  console.log(carritoCompras);

  const eliminoValor = carritoCompras.reduce((acc, entrada) => acc + entrada.precio,0);

  console.log(eliminoValor);

  totalCompra.innerText = eliminoValor;
  numeroDeEntradas.innerText = carritoCompras.length;


  //*Elimino producto al storage
  addLocalStorage()
}; */



//*Funciones JSON y localStorage

function addLocalStorage(){
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras))
    
}


/* function mostrarCompraStorage () {

  if(localStorage.getItem("carritoCompras")){
      let entradaStorage = JSON.parse(localStorage.getItem("carritoCompras"));
      carritoCompras = entradaStorage
  
      let resultado = entradaStorage.reduce((acc, entrada) => acc + entrada.precio,0);
  
      numeroDeEntradas.innerText = entradaStorage.length
      totalCompra.innerText = resultado
      
  }

} */



const eliminarProductoModal = (id) =>{
  
  const boleta = carritoCompras.find((entrada) => entrada.id === id);
  console.log(boleta);
  carritoCompras.splice(carritoCompras.indexOf(boleta), 1);
  console.log(carritoCompras);

  console.log("Hiciste click");

  agregarCompraModal()


 }

           


    

