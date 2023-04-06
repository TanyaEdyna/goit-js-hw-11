import axios from "axios";

export class PixabayApi {
    #BASE_URL = 'https://pixabay.com/api';
    #API_KEY = '35093181-a8049340061a9729261476a01';
    
    // query = null;
    // page = 2;
    // count = 40;
    
    async fetchGallery() {
        try {
             return await axios.get(`${this.#BASE_URL}/?key=${this.#API_KEY}&q=null&image_type=photo&orientation=horizontal&safesearch=true&colors=turquoise`);
        } catch (err) {
            throw new Error(err.message)
        }
       
    }
}
 





// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.