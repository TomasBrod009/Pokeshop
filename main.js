const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCart = document.getElementById('template-cart').content
const fragment = document.createDocumentFragment()
let cart = [];

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
cards.addEventListener('click', e =>{
    addToCart(e)
})
items.addEventListener('click', e =>{
    btnAction(e)
})



const fetchData = async () =>{
    try{
        const res = await fetch('./json/productos.json')
        const data = await res.json()
        showCards(data)
    }catch(error) {
        console.log(error);
    }
}

//Cards de productos
const showCards = data =>{
    data.forEach(product =>{
        templateCard.querySelector('h5').textContent = product.name
        templateCard.querySelector('p').textContent = product.price
        templateCard.querySelector('img').setAttribute("src", product.img)
        templateCard.querySelector('.btn').dataset.id = product.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment);
}

const addToCart = e =>{
    if(e.target.classList.contains('btn-buy')){
        setCart(e.target.parentElement)

    }
    e.stopPropagation();
}

const setCart = object =>{
    const product = {
        id: object.querySelector('.btn-buy').dataset.id,
        title: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent,
        quantity: 1
    }
    if(cart.hasOwnProperty(product.id)){
        product.quantity = cart[product.id].quantity + 1
    }
    cart[product.id] = {...product}
    showCart();

}

// Mostrar productos en el carrito

const showCart = () =>{
    console.log(cart)
    items.innerHTML=''
    Object.values(cart).forEach(product =>{
        templateCart.querySelector('th').textContent = product.id
        templateCart.querySelectorAll('td')[0].textContent = product.title
        templateCart.querySelectorAll('td')[1].textContent = product.quantity
        templateCart.querySelector('.btn-info').dataset.id = product.id
        templateCart.querySelector('.btn-danger').dataset.id = product.id
        templateCart.querySelector('span').textContent = product.quantity * product.price

        const clone = templateCart.cloneNode(true)
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);

    showFooter();

}

function showFooter() {
    footer.innerHTML = ''
    if (Object.keys(cart).lenght === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nQuantity = Object.values(cart).reduce((acc, { quantity }) => acc + quantity, 0)
    const nPrice = Object.values(cart).reduce((acc, { quantity, price }) => acc + quantity * price, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nQuantity;
    templateFooter.querySelector('span').textContent = nPrice;
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnEmptyCart = document.getElementById('emptyCart')
    btnEmptyCart.addEventListener('click', () => {
        cart = [];
        showCart();

    })
    // Boton finalizar compra
    const finishBuy = document.getElementById("finish-buy")
    finishBuy.addEventListener('click', ()=>{
        Swal.fire(
            'Compra realizada!',
            'Redireccionando',
            'success'
        ).then( ()=>{
            window.location = "./index.html";
        })
    })
}

//Botones agregar o quitar cantidad
const btnAction = e =>{
    if(e.target.classList.contains('btn-info')){
        const product = cart[e.target.dataset.id]
        product.quantity++
        cart[e.target.dataset.id] = {...product}
        showCart();
    }
    if(e.target.classList.contains('btn-danger')){
        const product = cart[e.target.dataset.id]
        product.quantity--
        if(product.quantity === 0){
            delete cart[e.target.dataset.id]
        }
        showCart();
    }


    e.stopPropagation();
}

function enableDarkMode(){
    let main_body = document.body;
    main_body.classList.toggle("dark-mode");
}




