// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

//Іморт функцій
import { renderGallery } from './js/render-functions';
import { getImages } from './js/pixabay-api';

const form = document.querySelector ('form');
const searchInput = document.querySelector ('input');
const galleryContainer = document.querySelector('.gallery');
const loaderElem = document.querySelector('.loader-container');
const loaderMoreElem = document.querySelector('.loader-more');
const moreBtn = document.querySelector('.btn-more');

let searchValue = '';
let page = 1;
let totalImg = 0;

//Подія відправлення форми
form.addEventListener('submit', event => {
    //Спрацьовує як перший запит (запит першої сторінки)
    event.preventDefault();
    searchValue = searchInput.value.trim();
    //Вихід, якщо не вказано умову пошуку
    if(!searchValue){
        iziToast.error({
            timeout: 1000,
            message: "Please enter a search value",
            position: 'topRight',
            });     
            return;           
    }
    searchInput.value = '';
    galleryContainer.innerHTML = '';
    page = 1; //Виконати запит першої сторінки для нового слова пошуку
    totalImg = 0; //Перед першим запитом = 0
    callPixabayAPI();
});

//Подія натискання кнопки
moreBtn.addEventListener('click', event => {
    page = page + 1;
    callPixabayAPI();
});

async function callPixabayAPI(){
    showLoader(); //Показати лоадер
    const data = await getImages(searchValue, page);
    if (data.hits.length === 0){
        iziToast.error({
            timeout: 1000,
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
            });
    }
    else{
        //Якщо пошук був для першої сторінки - фіксація кількості зображень
        if(page == 1) {
            totalImg = data.totalHits;
        }

        renderGallery(data, galleryContainer, page, totalImg);

        if(page > 1){
            const height = galleryContainer.firstElementChild.getBoundingClientRect().height;
            window.scrollBy({ top: height * 2, behavior: 'smooth' });
        }

        if(page * 15 > totalImg && totalImg > 15){
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                }); 
       }

    }
    hideLoader();//Сховати лоадер
}

function showLoader() {
    if(page == 1){
        loaderElem.style.display = 'flex';
    }
    else{
        loaderMoreElem.style.display = 'inline-block';
    }
}

function hideLoader() {
    if (page == 1){
        loaderElem.style.display = 'none';
    }
    else{
        loaderMoreElem.style.display = 'none';
    }
}


