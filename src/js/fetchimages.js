import axios from "axios";

export default class PixabayApiService {//клас з методом fetchGallery(),виконує запит до API Pixabay з параметрами:
    constructor() {
        this.searchQuery = '';//пощуковий запит за замовчуванням
        this.page = 1;//початкова сторінка
        this.quantity = 40;//к-сть картинок на сторінці
    }
    
    fetchGallery() {//метод
        const BASE_URL = 'https://pixabay.com/api';
        const API_KEY = '35093181-a8049340061a9729261476a01';
        const response = axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.quantity}`);//get запит до API Pixabay
        this.incrementPage();//метод збільшує значення page += 1
        return response;
    }
    incrementPage() { 
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;//повертають поточне значення searchQuery
    }
    set query(newQuery) {//встановлює нове значення для searchQuery
        this.searchQuery = newQuery;
    }
}
 