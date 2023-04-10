import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import PixabayApiService from './js/fetchimages';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search_input'),
  button: document.querySelector('.search_btn'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more')
};

const newPixabayApiService = new PixabayApiService();

refs.form.addEventListener('submit', handleSearchImages);
refs.btnLoadMore.addEventListener('click', handleBtnLoadMore);


async function handleSearchImages(event) {
  event.preventDefault();

  newPixabayApiService.query = event.currentTarget.searchQuery.value.trim();
  console.log(newPixabayApiService.query);//запит
  newPixabayApiService.resetPage();
  refs.gallery.innerHTML = '';

  try {
    const response = await newPixabayApiService.fetchGallery();
    const hits = response.data.hits;

    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    const imagesMarkup = createImagesMarkup(hits);
    refs.gallery.innerHTML = imagesMarkup;

    const lightbox = new SimpleLightbox('.photo-img');
    lightbox.on('error', (error) => console.log(`SimpleLightbox error: ${error.message}`));
  } 
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}

function createImagesMarkup(images) {
  return images.map(({ webformatURL, tags, likes, views, comments, downloads}) => {
    return `<div class="photo-card">
              <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info-wrap">
             
              <ul class="info-list">
                <li class="info-item">
                  <span class="info-descr">Likes: ${likes}</span>
                </li>
                <li class="info-item">
                  <span class="info-descr">Views: ${views}</span>
                </li>
                <li class="info-item">
                  <span class="info-descr">Comments: ${comments}</span>
                </li>
                <li class="info-item">
                  <span class="info-descr">Downloads: ${downloads}</span>
                </li> 
                </ul>  
            
                 </div>
            </div>`
  }).join('');
}

async function handleBtnLoadMore() {
  try {
    const response = await newPixabayApiService.fetchGallery();
    const hits = response.data.hits;//масив зображень отриманих з API 
    const totalHits = response.data.totalHits;//кількість зображень, які були знайдені згідно з запитом користувача.
    const elements = document.querySelectorAll('.photo-card');
    if (elements.length === totalHits) {
      refs.btnLoadMore.classList.add('is-hidden');//ховає кнопку load more
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }

    const nextPageMarkup = createImagesMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', nextPageMarkup);
   
   
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}





