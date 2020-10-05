import { elements, elementStrings } from './base';

export const renderOriginalGif = originalGif => {
    let markup = `
        <div class="selected-gif__page" id="${originalGif.id}">
            <div class="selected-gif__container">
                <img class="selected-gif" src="${originalGif.images.original.url}" height="${originalGif.images.original.height}px" width="${originalGif.images.original.width}px">
            </div>
            <div class="copy">
                <input type="text" value="${originalGif.images.original.url}" readonly>
                <button class="copy__button">copy</button>
            </div>
            <div class="download">
                <button class="button download__button">Download</button>
            </div>
        </div>
        `;

    elements.gifsContainer.insertAdjacentHTML('afterbegin', markup);
};

export const clearSelectedGifContainer = () => {
    const index = [...elements.gifsContainer.childNodes]
        .find(element => element.className === elementStrings.selected_gif__page);

    if (index) elements.gifsContainer.removeChild(index);
}