import { elements, clearContent, renderLoader, elementStrings, scrollToTop, scrollToEnd } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as selectedView from './views/selectedView';
import * as pageView from './views/pageView';
import * as navigationView from './views/navigationView';

const state = {

};

/*to-do-list 
1. search를 하지 않았을 때 gifs class에 있는 모든 요소가 render 되지 않도록 변경
2. url 주소 page와 gif 주소를 구분
*/

const searchControl = async () => {
    //get userinput
    let query = searchView.userInputValue();
    let currentState;

    if (!query) return;
    //clear all gifs
    selectedView.clearSelectedGifContainer();
    clearContent(elements.gifsList);
    clearContent(elements.pages);

    //display loader 
    renderLoader(elements.gifsList);

    //create new object for query
    state.search = new Search(query);

    //set the offset for pagination, calculate last page to get the results from api call 
    await state.search.getResultsFromQuery();
    state.search.calculateLastPage();

    //change url without reloading
    history.pushState(state, null, `/?query=${query}`);

    //clear loader
    clearContent(elements.gifsList);

    //display gifs
    if (state.search.totalCount === 0) {
        searchView.renderNoContent();
    } else {
        searchView.renderGifs(state.search.resultsData);

        //render pages
        pageView.renderPages(
            state.search.pageStart,
            state.search.numberOfPages,
            state.search.lastPage,
            state.search.currentPage
        );
    }

    console.log(state.search);
}

const navigationControl = async () => {

    const [__, navigation] = window.location.hash.split('#state=');
    let currentState;

    if (!navigation) return;

    currentState = navigationView.getCurrentStateFromNavigation(navigation);

    //clear 
    selectedView.clearSelectedGifContainer();
    clearContent(elements.gifsList);
    clearContent(elements.pages);

    //create new state    
    state.search = new Search();
    state.search.setCurrentState(currentState);
    if (state.search.currentState === 'random') {}
    await state.search.getResultsFromCurrentState();
    state.search.calculateLastPage();

    //change url without reloading
    history.pushState(state, null, `/?${navigation}`);

    //clear loader
    clearContent(elements.gifsList);

    //render gifs
    searchView.renderGifs(state.search.resultsData);

    //render pages
    pageView.renderPages(
        state.search.pageStart,
        state.search.numberOfPages,
        state.search.lastPage,
        state.search.currentPage
    );

    console.log(state.search);
}

const pageControl = async event => {

    let [__, pageNumber] = window.location.hash.split('page=');

    if (!pageNumber) return;

    pageNumber = parseInt(pageNumber);

    //clear gifs from last page
    clearContent(elements.gifsList);
    clearContent(elements.pages);

    //render loader
    renderLoader(elements.gifsList);

    //change current page, setting offset following current page    
    state.search.changeCurrentPage(pageNumber);
    state.search.changePageStart(pageNumber);
    state.search.setOffset();
    await state.search.getResultsFromQuery();

    history.pushState(state, null, null);

    //clear loader
    clearContent(elements.gifsList);

    //render gifs following current page
    searchView.renderGifs(state.search.resultsData);

    //render pages
    pageView.renderPages(
        state.search.pageStart,
        state.search.numberOfPages,
        state.search.lastPage,
        state.search.currentPage
    );

    console.log(state.search);
}

const loadControl = async () => {

    if (!window.history.state) return;

    const loadedState = window.history.state;
    state.search = new Search(loadedState.search.query);

    Object.assign(state.search, loadedState.search);

    // if there is no any results and page is reloaded, render first Search 
    if (state.search.totalCount === 0) return;

    clearContent(elements.gifsList);

    searchView.renderGifs(loadedState.search.resultsData);

    //render pages
    pageView.renderPages(
        loadedState.search.pageStart,
        loadedState.search.numberOfPages,
        loadedState.search.lastPage,
        loadedState.search.currentPage
    );

    //making selected gif be able to stay still when page is reloaded
    gifsControl();

}

const gifsControl = () => {
    //scroll to top everytime hash is changed
    scrollToTop();

    //clear selected gif container
    selectedView.clearSelectedGifContainer();

    const [__, gifID] = window.location.hash.split('#id=');

    if (!gifID) return;

    //change current gif object
    state.search.changeCurrentGif(gifID);

    history.pushState(state, null, null);

    //render original gif file when gif is selected
    selectedView.renderOriginalGif(state.search.currentGif);

    console.log(state.search);
}

const controlCopy = event => {
    if (!event.target.closest(elementStrings.copy__button)) return;

    const currentGifURL = state.search.currentGif.images.original.url;
    const tempElem = document.createElement('textarea');
    
    tempElem.value = currentGifURL;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);
    
}

const locationControl = event => {
    const location = event.target;

    if (location.closest(elementStrings.to_top)) {
        scrollToTop();
    } else if (location.closest(elementStrings.to_end)) {
        scrollToEnd();
    }
}


//event listener

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    searchControl();
});

window.addEventListener('load', loadControl);

[pageControl, gifsControl]
    .forEach(control => window.addEventListener('hashchange', control));

elements.gifsContainer.addEventListener('click', controlCopy);

elements.locationButtonContainer.addEventListener('click', locationControl);


//navigation
elements.navIcon.addEventListener('click', navigationView.toggleNavigation );

[elements.navBackground, elements.navBackButton]
    .forEach(element => element.addEventListener('click', navigationView.removeNavigation ));

window.addEventListener('hashchange', navigationControl);

/* implement route using hashchange */
