// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

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

export function renderGallery(data, galleryContainer, page, totalImg){
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

        //Відображення на сторінці зображень
        galleryContainer.insertAdjacentHTML("beforeend", images);  
    
        //Відображення на сторінці кнопки "Завантажити ще", якщо не отримано усі зображення
        if(page * 15 <= totalImg){
            document.querySelector('.btn-more-container').style.display = 'flex';
        } 
        else{
            document.querySelector('.btn-more-container').style.display = 'none';
        }

        lightbox.refresh();
}