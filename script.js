const API = 'https://api.thecatapi.com/v1/images/search'
const queryParameter = '?limit=3'
const API_KEY = 'live_TYj5SIoubXBpSyW2Ax1ftQetdUJcN72RyJJswjHvWOVnPHQ06oj7h61L5SjWUUgI'
const queryApiKeyParameter = `?api_key=${API_KEY}`
const API_FAVORITES = `https://api.thecatapi.com/v1/favourites${queryApiKeyParameter}`

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
// ========= Para poder poner otro query parameter se usar el &

const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const button = document.getElementById('nextPhotoBtn')


// Yo lo hice asi
async function fetchData(apiUrl) {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    return data;
}

const getResults = () => {
    const results = fetchData(`${API}${queryParameter}&${queryApiKeyParameter}`)

    results.then(data => {
        console.log(data)
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
    })
}


async function getFavoriteMichis() {
    const results = await fetchData(API_FAVORITES)
    console.log('results', results)
}
getFavoriteMichis()
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
 