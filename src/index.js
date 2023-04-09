import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import PixabayApiService from './js/fetchimages';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search_input'),
  button: document.querySelector('.search_btn'),
  gallery: document.querySelector('.gallery'),
};

const newPixabayApiService = new PixabayApiService();

refs.form.addEventListener('submit', handleSearchImages);

async function handleSearchImages(event) {
  event.preventDefault();

  newPixabayApiService.query = event.currentTarget.searchQuery.value.trim();
  console.log(newPixabayApiService.query);
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
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, something went wrong...');
  }
}

function createImagesMarkup(images) {
  return images.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
              <div class="photo-img-wrap>
              <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
             </div>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>${downloads}
                </p>
              </div>
            </div>`;
  }).join('');
}
