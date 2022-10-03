class Entrada {
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
const eventoGuetta = new Entrada(1,"Guetta", "general", 15500, "./img/guetta.jpg",2);
const eventoMarco = new Entrada(1,"Marco Carolla", "general", 10500, "./img/marco.webp",3);

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
                                            <button id= "botonEliminar${element.id}" class="btn btn-danger">Eliminar Carrito</button>
                                         </div>
                                       </div>
                                     </div> `

        containerCards.appendChild(card)

        let botonCompra = document.getElementById(`botonCompra${element.id}`);
        let botonEliminar = document.getElementById(`botonEliminar${element.id}`)

        console.log(botonCompra);
        console.log(botonEliminar);

        botonCompra.addEventListener("click", ()=>{
         agregoAlCarrito(element.id);   

        })

        
        botonEliminar.addEventListener("click", ()=>{
        eliminarDeCarrito(element.id)

        })

        
});

const totalCompra = document.getElementById("totalCompra");
const numeroDeEntradas = document.getElementById("cantidad de entradas");
const btnDisminuir = document.getElementById("disminuir");

const carritoCompras = [];

const agregoAlCarrito = (id)=>{

    const boleta = arrayEntradas.find(entrada => entrada.id === id);
    carritoCompras.push(boleta);

    console.log(carritoCompras);

    let valorTotal = 0;
    carritoCompras.forEach(element => {
        valorTotal += element.precio * element.cantidad
    });
    
    totalCompra.innerText = valorTotal;
    numeroDeEntradas.innerHTML =carritoCompras.length
   
};



   

const eliminarDeCarrito = (id) =>{
    
    const boleta = carritoCompras.find(entrada => entrada.id === id);
    console.log(boleta);
    carritoCompras.splice(carritoCompras.indexOf(boleta),1);
    console.log(carritoCompras);

    const reducirArray = carritoCompras.reduce((acc,entrada) => acc + entrada.precio, 0);
  
    console.log(reducirArray)

    totalCompra.innerText = reducirArray; 
    numeroDeEntradas.innerText = carritoCompras.length  

};
















        
   