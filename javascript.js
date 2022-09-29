class Entrada {
    constructor(nombre, zona, precio, imagen,id) {
        this.nombre = nombre;
        this.zona = zona;
        this.precio = (precio * 1.15).toFixed(0); //ticket service incluido
        this.imagen= imagen;
        this.id = id;
    }
}


const eventoCirque = new Entrada("Cirque", "general", 10000, "./img/cirque.jpg",1);
const eventoGuetta = new Entrada("Guetta", "general", 20500, "./img/guetta.jpg",2);
const eventoMarco = new Entrada("Marco Carolla", "general", 14500, "./img/marco.webp",3);

const arrayEntradas = [];

arrayEntradas.push(eventoCirque);
arrayEntradas.push(eventoGuetta);
arrayEntradas.push(eventoMarco);


console.log(arrayEntradas);

const containerCards = document.getElementById("containerCards");



arrayEntradas.forEach(element => {
    const card = document.createElement("div")
        card.innerHTML = `<div class="row">
                                       <div class="col-md-4 mb-4">
                                         <div class="card">
                                        <div class="card-header">
                                          <h5>Disponible</h5  >
                                         </div>
                                      <img src="${element.imagen}" class="card-img-top" alt="...">
                                         <div class="card-body">
                                                    <h5 class="card-title">$${element.precio} AR</h5>
                                            <p class="card-text">Agregar un texto </p>
                                            <button id= "botonCompra${element.id}" class="btn btn-info">Comprar entrada</button>
                                         </div>
                                       </div>
                                     </div> `

        containerCards.appendChild(card)

        let botonCompra = document.getElementById(`botonCompra${element.id}`);

        console.log(botonCompra);

        botonCompra.addEventListener("click", ()=>{
            agregoAlCarrito(element.precio)

        })
    
});

const numeroDeEntradas = document.getElementById("cantidad de entradas");

const totalCompra = document.getElementById("totalCompra");

const carritoCompras = [];

const agregoAlCarrito = (id)=>{
    const boleta = arrayEntradas.find(entrada => entrada.precio === id);
    carritoCompras.push(boleta);

    console.log(carritoCompras)

    let valorTotal = 0;

    carritoCompras.forEach(item => {
         valorTotal = item.precio 


        totalCompra.innerText = valorTotal
        
    });

    

}



const btnAumentar = document.getElementById("aumentar");

const btnDisminuir = document.getElementById("disminuir");
















        
   