// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";




const form = document.querySelector ('form');
const searchInput = document.querySelector ('input');
const galleryContainer = document.querySelector('.gallery');
const loaderElem = document.querySelector('.loader-container');

const lightbox = new SimpleLightbox('.gallery a', {
    aptions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    fadeSpeed: 150,
    captionSelector: "img",
    captionDelay: 250,
    });       
    lightbox.on('show.simplelightbox');

//Подія відправлення форми
form.addEventListener('submit', event => {
    event.preventDefault();
    const searchValue = searchInput.value;
    searchInput.value = '';
    galleryContainer.innerHTML='';
    getImages(searchValue);
});

//Пошук зображень
function getImages(searchValue){
    showLoader(); //Показати лоадер
    const apiKey = "42469788-7d7013196b534fb1bad6f4ac3";
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
        
    })

    .then(data => { //Успішне виконання запиту
        if (data.hits.length === 0) { //Відcутні зображення
            iziToast.error({
            timeout: 1000,
            // transitionIn: 'fadeInUp',
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        });
        }
        else {  //Отримано зображення
            const images = data.hits.
            map(data => {
                return `
                <li class="gallery-item"><a href="${data.largeImageURL}">
                <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
                <ul class="gallery-image-data">
                <li class="data-quantity"><b>Likes </b>${data.likes}</li>
                <li class="data-quantity"><b>Views </b>${data.views}</li>
                <li class="data-quantity"><b>Comments </b>${data.comments}</li>
                <li class="data-quantity"><b>Downloads </b>${data.downloads}</li>
                </ul>
                </li>`;
            }).join('');

            
            //Відображення на сторінці
        galleryContainer.insertAdjacentHTML("beforeend", images);


        lightbox.refresh();
        }
    })
    .catch(error => {
        console.log(error); //Помилка виконання запиту
    })
    .finally(() => {
        hideLoader(); //Сховати loader
    });
}

function showLoader() {
    loaderElem.style.display = 'flex';
}

function hideLoader() {
    loaderElem.style.display = 'none';
}


