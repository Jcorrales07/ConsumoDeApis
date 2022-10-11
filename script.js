const API_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=10';
const API_KEY =
    'live_TYj5SIoubXBpSyW2Ax1ftQetdUJcN72RyJJswjHvWOVnPHQ06oj7h61L5SjWUUgI';
const queryApiKeyParameter = `?api_key=${API_KEY}`;
const API_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const API_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

//investigar AXIOS


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

const divRandomMichis = document.getElementById('randomPhotoMichis');
const button = document.getElementById('nextPhotoBtn');
const errorSpan = document.getElementById('errorSpan');
const btnUpload = document.getElementById('uploadBtn')

// Yo lo hice asi
async function fetchData(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

const getResults = async () => {
    const response = await fetch(`${API_RANDOM}&${queryApiKeyParameter}`);

    const data = await response.json();

    if (response.status !== 200) {
        errorSpan.innerText = `Error: ${response.status}`;
        return;
    }

    data.forEach((item) => {
        let article = document.createElement('article');
        article.innerHTML = `
            <img alt="Foto gatito aleatorio" width="250px" src="${item.url}">
            <button>Guardar en favoritos</button>
        `;
        const button = article.querySelector('button');
        button.addEventListener('click', saveFavoriteMichi.bind(this, item.id));
        divRandomMichis.append(article);
    });
};

async function getFavoriteMichis() {
    const response = await fetch(API_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        },
    });

    const data = await response.json();

    if (response.status !== 200) {
        errorSpan.innerHTML = `Error: ${response.status}`;
    }

    const divFavoriteMichis = document.getElementById('favoritesPhotoMichis');
    const section = divFavoriteMichis.parentNode;

    console.log(divFavoriteMichis.children);

    section.style.display = divFavoriteMichis.children ? 'block' : 'none';
    divFavoriteMichis.style.display = divFavoriteMichis.children
        ? 'block'
        : 'none';
    divFavoriteMichis.innerHTML = '';

    data.forEach((michi) => {
        if (michi.image.url) {
            const article = document.createElement('article');
            const img = document.createElement('img');
            img.src = michi.image.url;
            img.alt = 'Foto de michi en favoritos';
            img.width = '250';
            const button = document.createElement('button');
            button.innerText = 'Quitar de favoritos';
            button.addEventListener(
                'click',
                deleteFavoriteMichi.bind(this, michi.id)
            );
            article.append(img, button);
            divFavoriteMichis.append(article);
        }
    });
}

async function saveFavoriteMichi(id) {
    const res = await fetch(API_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });

    console.log(res);
    getFavoriteMichis();
}

async function deleteFavoriteMichi(id) {
    const res = await fetch(API_DELETE(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });

    getFavoriteMichis();
}

async function uploadMichi() {
    const form = document.getElementById('form')
    console.log(form)
    const formData = new FormData(form)
    console.log(formData)

    console.log(formData.get('file'))

    const res = await fetch(API_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': API_KEY,
        },
        body: formData
    });

    console.log(res)

    const data = await res.json()
    console.log(data)
    saveFavoriteMichi(data.id)
}
// ============================

button.addEventListener('click', getResults);
btnUpload.addEventListener('click', uploadMichi)

getResults();
getFavoriteMichis();
