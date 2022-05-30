export default class NewsApiService {
    constructor() {
        this.name = "";
        this.pageNumber = 1;
    }

    fetchPhoto() {
        const key = '27631880-b0639dc61f111cbc90b791bd4';
        const url = `https://pixabay.com/api/?key=${key}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.pageNumber}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.incrementPageNumber();
                
                return data.hits;
            });
    }

    
    // async function fetchPhoto() {
    //     const axios = require('axios');
    //     const key = '27631880-b0639dc61f111cbc90b791bd4';
    //     const url = `https://pixabay.com/api/?key=${key}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.pageNumber}`;
    //     const photos = await axios.get(url);
    //     return photos;
        
    // }
    
    incrementPageNumber() {
        this.pageNumber += 1;
    }

    resetPageNumber() {
        this.pageNumber = 1;
    }

    get nameQuery(){
        return this.name;
    }

    set nameQuery(newName) {
        this.name = newName;
    }
}