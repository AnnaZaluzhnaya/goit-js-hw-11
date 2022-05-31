import './sass/main.scss';
import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import photosTemplates from './templates/photos.hbs';
import LoadMoreBtn from './js/button-load-more';


const refs = {
    form: document.querySelector(".search-form"),
    buttonLoad: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
}

const KEY = '27631880-b0639dc61f111cbc90b791bd4';
const URL = "https://pixabay.com/api/";

let page = 1;
let searchQuery = "";
let countImages = 0;
const perPage = 40;


let lightbox = new SimpleLightbox(".gallery a");
lightbox.on('show.simplelightbox', function () { });

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

async function fetchApi(searchQuery, page){
    try{
        const response = await axios.get(`${URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
        const images = response.data;
        if(images.hits.length===0){
            throw new Error();
        } 
      
        return images;
         } catch (error) {
        console.log(error);
    }
}

function resetPage(){
    page = 1;
}

function incrementPage(){
    page += 1;
}

function resetGallery(){
    refs.gallery.innerHTML = "";
}

refs.form.addEventListener("submit", event=>{
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value;
    resetPage();
    resetGallery();
        fetchApi(searchQuery, page)
        .then(images => {
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    countImages+=images.hits.length;
    gallaryAdd (images.hits);
            lightbox.refresh();
            if (countImages === images.totalHits) {
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.hide();
            }
            else if (images.hits.length < 40){
                loadMoreBtn.hide();
        }   
            else { 
            loadMoreBtn.show();
            
        }
    }
        
)
        .catch(error => {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            console.log(error);
})
});

refs.buttonLoad.addEventListener("click", event=>{
    event.preventDefault();
    incrementPage();
    
    
    fetchApi(searchQuery, page) 
    .then(images=>{ 
        countImages += images.hits.length;
    gallaryAdd (images.hits);
        lightbox.refresh();
    if(countImages === images.totalHits){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hide();
    }
        else if (images.hits.length < 40){
        loadMoreBtn.hide();
    }
        
    else { 
        loadMoreBtn.show();
        
    } 
        
})
    .catch(error => {
        console.log(error);
    }) 
});

function gallaryAdd (photos){
    refs.gallery.insertAdjacentHTML("beforeend", photosTemplates(photos));
    
}




