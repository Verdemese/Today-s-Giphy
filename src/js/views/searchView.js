import { elements, elementStrings } from './base';

export const userInputValue = () => elements.searchInput.value;

export const renderGifs = (gifs) => {
    let markup; 

    gifs.forEach(gif => {
        markup = `
        <li class="gif" id="gif-${gif.id}">
            <a href="#id=${gif.id}">
            <img class="gif__image" src="${gif.images.downsized.url}">
        </li>
        `;

        elements.gifsList.insertAdjacentHTML('beforeend', markup);
    });
}

export const renderNoContent = () => {
    const markup = `
        <div class="no-content">
            <p>'${userInputValue()}'</p>
            <p>There is no result😅</p>
        </div>
    `;

    elements.gifsList.insertAdjacentHTML('beforeend', markup);
}


