const list = document.getElementById("listGames");
const productList = "./json/productos.json";
// Carrito de compras

let cart = [];

if(localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"))
}

// Cards de cada producto, utilizando JSON local




fetch(productList)
.then(response => response.json())
.then(data => {data
    data.forEach(product =>{
        list.innerHTML += `
            <div class ="card text-center  col-xl-3 col-md-6 col-xs-12 p-2 m-3 "> 
            <h2 class="game-name-text">${product.name} </h2>
            <img src=" ${product.img}" class = "imgProduct " alt="${product.name}">
            <p class="price">Precio:$ ${product.price} </p>
            <p> ${product.id} </p>
            <button id="buttonToCart${product.id}" class="btn btn-color" >Agregar al carrito </button>
            </div>
        `
        

        fetch(productList)
        .then(response => response.json())
        .then(cart =>{
            const toCart = document.getElementById(`buttonToCart${product.id}`);
            toCart.addEventListener("click", ()=>{
                addToCart(product.id)
                console.log("funca")
            })
        })
    })
    
})

.catch(error => console.log(error))
.finally( ()=> console.log("Proceso finalizado"))


// Agregar al carrito
const addToCart = (prodId) => {
    const item = productList.find( (prod) => prod.id === prodId)
    cart.push(item)
    console.log(cart)
}






//EventListener


