//VARIABLES
const nombre = document.getElementById("nombre");
const minimo = document.getElementById("minimo");
const maximo = document.getElementById("maximo");
const ingredientes = document.getElementById("ingredientes");

//contenedor para los resultados
const resultado = document.getElementById("resultado");

//genero el objeto con los datos de la busqueda
const datosBusqueda = {
  nombre: "",
  minimo: "",
  maximo: "",
  ingredientes: "",
};

//////////////////EVENTS/////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  getLocalStorage()
  mostrarPizzas(pizzas); //muestra las pizzas al cargar la pagina
});

//event listener para los select de datosBusqueda
nombre.addEventListener("change", (e) => {
  datosBusqueda.nombre = e.target.value;
  filtrarPizza();
  saveLocalStorage(datosBusqueda)
})
minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarPizza()
  saveLocalStorage(datosBusqueda)
})
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarPizza()
  saveLocalStorage(datosBusqueda)
})
ingredientes.addEventListener("change", (e) => {
  datosBusqueda.ingredientes = e.target.value;
  filtrarPizza()
  saveLocalStorage(datosBusqueda)
})




////////////////FUNCTIONS////////////////////////////////

//////////////funcion de mostrar los pizzas con sus caracteristicas
const mostrarPizzas = (pizzas) => {
  limpiarHTML() //BORRO EL HTML QUE ESTABA ANTES
  

  //itero sobre el array de pizzas
  pizzas.forEach((pizza) => {
    const pizzaHTML = document.createElement("p");

    //agrego el html que va a contener pizzaHtml desde los datos del array de objetos
    pizzaHTML.textContent = `
        ${pizza.nombre} - $${pizza.precio} - ${pizza.ingredientes}
    `;
    //inserto el html(pizzaHTML) en donde yo elijo, en este caso donde esta el id resultado
    resultado.appendChild(pizzaHTML);
  });
  
  
};



// limpiar html
const limpiarHTML = () => {
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
  }
}




/////////////Funcion que filtra en base a la busqueda///////////////////
function filtrarPizza(){
  const resultado = pizzas.filter(filtrarNombre).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarIngredientes)
  //si hay algo entonces muestra las pizzas
  if(resultado.length){
    mostrarPizzas(resultado)
  }else{
    limpiarHTML()
    //si no hay coincidencia limpia la pagina y muestra el error
    Toastify({
    text: "Pizza no encontrada 😞",
               duration: 3000,
               gravity: "top",
               position: "right",
               style: {
                   borderRadius: "5rem",
                   padding: "2rem",
                   fontSize: "2rem",
                   background: "linear-gradient(to right, #00b09b, #96c92d)"
               },
               borderRadius: "5rem",
           }).showToast();
  }
  
}



////////////////////////Funciones para cada busqueda/////////////////

function filtrarNombre(pizza) {
  if(datosBusqueda.nombre){
    return pizza.nombre === datosBusqueda.nombre;
  }
  return pizza;
  
}

function filtrarMinimo(pizza) {
  if(datosBusqueda.minimo){
    return pizza.precio >= datosBusqueda.minimo;
  }
  return pizza;
}

function filtrarMaximo(pizza) {
  if(datosBusqueda.maximo){
    return pizza.precio <= datosBusqueda.maximo;
  }
  return pizza;
}

function filtrarIngredientes(pizza) {
  if(datosBusqueda.ingredientes){
    return pizza.ingredientes === datosBusqueda.ingredientes;
  }
  return pizza;
}

/////////////////////////local storage/////////////////////
function saveLocalStorage(datosBusqueda) {
 localStorage.setItem("busquedas", JSON.stringify(datosBusqueda));
}

function getLocalStorage(){
  JSON.parse(localStorage.getItem("busquedas"));
 }






 
