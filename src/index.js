import './sass/main.scss';
import NewsApiService from './js/new-api-service';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import photosTemplates from './templates/photos.hbs';
import LoadMoreBtn from './js/button-load-more';

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-input'),
    searchBtn: document.querySelector('.search-button'),
    loadBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
    
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
}); 

// let lightbox = new SimpleLightbox(".gallery a");
// lightbox.on('show.simplelightbox', function () {});


const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadMore);


function onSearch(event) {
    event.preventDefault();

    clearPhoto();    
        
    newsApiService.nameQuery = event.currentTarget.elements.searchQuery.value;
    
    if ( newsApiService.nameQuery === '') {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    refs.form.value = '';
    return;
    }
    newsApiService.resetPageNumber();
    newsApiService.fetchPhoto().then(addMarkup);
    loadMoreBtn.show();

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





