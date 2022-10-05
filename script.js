const API = 'https://api.thecatapi.com/v1/images/search?limit=3'

// Los ENDPOINTS son las rutas que tiene una api para dar contenido especifico
// Ejemplo
// api.com/breeds
// api.com/categories
// api.com/images
// api.com/images/michi34

// Los QUERY PARAMETERS  sirven para hacer un filtro de la especificacion de contenido
// Que estamos pidiendo, estariamos haciendo un filtro del filtro 
// Los query parameters se utilizan en los endpoints
// HAY QUE REVISAR LA DOCUMENTACION DE LA API PARA VER QUE ENDPOINTS
// SOPORTAN QUE QUERIES
// Ejemplo, los queries se hacen con ?
// api.com/categories?search=fun
// api.com/images/michi34?format=png
// format y search son tipos de filtros y son los que se tienen
// que checkear en la api para ver cuales aceptan
// Twitter acepta uno de text

const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const button = document.querySelector('button')


// Yo lo hice asi
async function fetchData(apiUrl) {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    return data;
}

const getResults = () => {
    const results = fetchData(API)

    results.then(data => {
        console.log(data)
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
    })
}
// ============================

// el maestro lo hizo asi
async function reload() {
    const res = await fetch(API)
    const data = await res.json()

    img1.src = data[0].url
}
// ============================

button.addEventListener('click', getResults)
getResults()



 