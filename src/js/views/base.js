export const elements = {
    html: document.querySelector('html'),
    body: document.querySelector('body'),
    container: document.querySelector('.container'),

    //search input
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),

    //giflist
    gifsContainer: document.querySelector('.gifs'),
    gifsList: document.querySelector('.gifs__list'),

    //page
    pageContainer: document.querySelector('.pagination'),
    pages: document.querySelector('.pages'),

    //location button
    locationButtonContainer: document.querySelector('.location-button__container'),

    //navigation
    navIcon: document.querySelector('.nav__icon'),
    navigation: document.querySelector('.navigation'),
    navBackButton: document.querySelector('.back__button'),
    navBackground: document.querySelector('.nav__background'),
    trendingButton: document.getElementById('trending'),
    RandomButton: document.getElementById('random'),
};

export const elementStrings = {
    loader: 'loader',
    selected_gif__page: 'selected-gif__page',
    copy__button: '.copy__button',
    to_top: '.to-top',
    to_end: '.to-end'
};

export const renderLoader = parent => {
    const loader = `
        <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearContent = element => {
    element.innerHTML = '';
}

//window.scrollTop() doesn't work because of navigation bar.
export const scrollToTop = () => window.scrollTo(0, 0);

export const scrollToEnd = () => {
    const toEnd = elements.body.scrollHeight - window.innerHeight;

    if (toEnd < 0) return; 

    window.scrollTo(0, toEnd);
}

