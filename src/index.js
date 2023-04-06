import axios from "axios";
import { fetchimages } from './js/fetchimages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35093181-a8049340061a9729261476a01';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search_input'),
    button: document.querySelector('.search_btn'),
    gallery: document.querySelector('.gallery'),

}    
  
    async function fetchGallery(value) {
        try {
             return await axios.get(`${BASE_URL}/?key=${API_KEY}&q=null&image_type=photo&orientation=horizontal&safesearch=true&colors=turquoise`);
        } catch (err) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return err;
        }
     }

refs.form.addEventListener('submit', handleSearchImages);

function handleSearchImages(event) {
    event.preventDefault();
    console.log(event);
    


}



// function createImagesMurkup(images) {
// images.map(({webformatURL, tags, likes, views, comments, downloads }) => {return `<div class="photo-card">
//   <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>`
// }).join('')
//     console.log(images);
// }
// console.log(createImagesMurkup());
