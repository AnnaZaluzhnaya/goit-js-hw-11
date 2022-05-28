import './sass/main.scss';
import NewsApiService from './js/new-api-service'
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import photosTemplates from './templates/photos.hbs'

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-input'),
    searchBtn: document.querySelector('.search-button'),
    loadBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
    
};

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadMore);


function onSearch(event) {
    event.preventDefault();

    clearPhoto();
    newsApiService.nameQuery = event.currentTarget.elements.searchQuery.value;
    newsApiService.resetPageNumber();
    newsApiService.fetchPhoto().then(addMarkup);

}

function onLoadMore() {
    newsApiService.fetchPhoto().then(addMarkup);
}

function addMarkup(photos) {
    refs.gallery.insertAdjacentHTML('beforeend', photosTemplates(photos));
}

function clearPhoto() {
    refs.gallery.innerHTML = "";
}





