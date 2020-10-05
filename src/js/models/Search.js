import { elements } from '../views/base';
import Axios from 'axios';

//IFP3YAh05Trh2MIgq5c6RQYDP2IkqrnE api key
//"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

export default class Search {
    constructor (query) {
        this.query = query;
        this.currentState = 'searching';
        this.limit = 20;
        this.offset = 0;
        this.numberOfPages = 5;
        this.currentPage = 1;
        this.pageStart = 1;
        this.totalCount = 0;
        this.currentGif = '';
    }

    async getResultsFromQuery() {
        const results = await Axios(`http://api.giphy.com/v1/gifs/search?q=${this.query}&api_key=IFP3YAh05Trh2MIgq5c6RQYDP2IkqrnE&limit=${this.limit}&offset=${this.offset}`);

        this.totalCount = await results.data.pagination.total_count;
        this.resultsData = results.data.data;
    }

    async getResultsFromCurrentState() {
        const results = await Axios(`http://api.giphy.com/v1/gifs/${this.currentState}?api_key=IFP3YAh05Trh2MIgq5c6RQYDP2IkqrnE&limit=${this.limit}&offset=${this.offset}`);

        this.totalCount = results.data.pagination.total_count;
        this.resultsData = results.data.data;
    }

    setCurrentState(state) {
        this.currentState = state;
    }

    setOffset() { 
        this.currentPage === 1 ? 
        this.offset = 0 : this.offset = (this.currentPage - 1) * this.limit - 1; 
    }

    changeCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    calculateLastPage() {
        const rest = this.totalCount % this.limit;
        let lastPage = (this.totalCount - rest) / this.limit; 
        if ( rest !== 0 ) lastPage = lastPage + 1;
        
        this.lastPage = lastPage;
    }

    changePageStart(pageNumber) {
        if (pageNumber === this.pageStart + this.numberOfPages || 
            pageNumber === this.pageStart - this.numberOfPages) {
                this.pageStart = this.currentPage; 
        }

        if (pageNumber === this.lastPage) {
            if (this.lastPage % this.numberOfPages !== 0) {
                this.pageStart = this.lastPage + 1 - this.lastPage % this.numberOfPages;
            } else {
                this.pageStart = this.lastPage + 1 - this.numberOfPages;
            }
        } else if (pageNumber === 1) this.pageStart = 1;
    }

    changeCurrentGif(gifID) {
        const gif = this.resultsData.find(element => gifID === element.id);
        this.currentGif = gif;
    }
}