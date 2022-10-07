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
const eventoGuetta = new Entrada(1,"David Guetta", "general", 15500, "./img/guetta.jpg",2);
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
            /* TOASTIFY */
            Toastify ({
                text: `Entrada ${element.nombre} agregada al carrito`,
                offset: {
                    x: 10, 
                    y: 30,
                  },
                duration: 2000,
                stopOnFocus: true,
                style:{
                    background: "70, 86, 125",
                }
    
             }).showToast();
        
            agregoAlCarrito(element.id);   
         

        })

        
        botonEliminar.addEventListener("click", ()=>{
        eliminarDeCarrito(element.id)

        })

        
});

const totalCompra = document.getElementById("totalCompra");
const numeroDeEntradas = document.getElementById("cantidad de entradas");

let carritoCompras = [];


const agregoAlCarrito = (id)=>{

    const boleta = arrayEntradas.find(entrada => entrada.id === id);
    carritoCompras.push(boleta);
    
    console.log(carritoCompras);

    let valorTotal = 0;
    carritoCompras.forEach(element => {
        valorTotal += element.precio * element.cantidad
    });

    //STORAGE

    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
    
    totalCompra.innerText = valorTotal;
    numeroDeEntradas.innerHTML =carritoCompras.length

};



const eliminarDeCarrito = (id) =>{
    
    const boleta = carritoCompras.find(entrada => entrada.id === id);
    console.log(boleta);
    carritoCompras.splice(carritoCompras.indexOf(boleta),1);
    console.log(carritoCompras);

    const eliminoValor = carritoCompras.reduce((acc,entrada) => acc + entrada.precio, 0);
  
    console.log(eliminoValor)

    totalCompra.innerText = eliminoValor; 
    numeroDeEntradas.innerText = carritoCompras.length  


};

const verCarrito = document.getElementById("verCarrito");
const verMicompra = document.getElementById("verMiCompra");


//JSN

verCarrito.addEventListener("click", ()=>{
   mostarMiCompra()
});

const mostarMiCompra = (()=>{
     verMicompra.innerHTML = "";
    const usuarioPaga = JSON.parse(localStorage.getItem("carritoCompras"));
    usuarioPaga.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>Tus entradas</h3>
               <p>evento: ${element.nombre}</P>
               <p>Entrada : ${element.zona}</p>
               <P>Costo Total: ${element.precio}</p>
               `;
        verMicompra.appendChild(div);       
    });
})















        
   