const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templatecarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => {
    fetchData()
});

cards.addEventListener('click', e => {
    addcarrito(e)
});

items.addEventListener('click', e => {
    btnAumentarDisminuir(e)
})

// Traemos Productos
const fetchData = async () => {
        const res = await fetch('api.json')
        const data = await res.json()
        console.log(data)
        pintarCards(data)
    }


const pintarCards = data => {
    data.forEach(producto => {
        console.log(producto)
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addcarrito = e => {
    console.log(e.target)
    console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')) {
        setcarrito(e.target.parentElement)
        console.log(e.target.parentElement)
    }
    e.stopPropagation()
}

const setcarrito = Object => {
    console.log(Object)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    console.log(producto)
    pintarCarrito()
}

const pintarCarrito = () => {
    console.log(carrito)
    items.innerHTML = ''
    Objeto.values(carrito).forEach(producto => {
        templatecarrito.querySelector('th').textContent = producto.id
        templatecarrito.querySelectorAll('td')[0].textContent = producto.title
        templatecarrito.querySelectorAll('td')[1].
        templatecarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        
        //botones
        textContent = producto.cantidad
        templatecarrito.querySelector('.btn-info').dataset.id= producto.id
        templatecarrito.querySelector('.btn-danger').dataset.id = producto.id
        
        const clone = templatecarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    
    pintarFooter()
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">carrito vacío con innerHTML</th>
        `
        return
    } 

    //Sumar cantidad y sumar total
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    console.log(nCantidad)
    console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    
    footer.appendChild(fragment)

    const boton = document.getElementById('vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito ={}
        pintarCarrito()
    })
}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}