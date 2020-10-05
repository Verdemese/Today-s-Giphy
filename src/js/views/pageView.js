import { elements, elementStrings } from './base';

export const renderPages = (pageStart, numberOfPages, lastpage, currentPage) => {
    let markup1, markup2;
    let start = pageStart;
    let end = numberOfPages + start;
    const pageContainer = [];
    for (let i = start; i < end; i++) {
        if (i <= lastpage) pageContainer.push(i);
    }
    
    pageContainer.forEach(element => {
        let markupForLoop = `
            <a href="#page=${element}">
                <li>
                    <button class="button page__button ${currentPage === element ?  'active' : ''}" id="page-${element}">${element}</button>
                </li>
            </a>
        `

        elements.pages.insertAdjacentHTML('beforeend', markupForLoop);
    });

    markup1 = `
        <a href="#page=1">
            <li><button class="button to-first__button"><<</button></li>
        </a>
        <a href="#page=${pageStart - numberOfPages}">
            <li><button class="button prev__button"><</button></li>
        </a>
    `;
    markup2 = `
        <a href="#page=${pageStart + numberOfPages}">
            <li><button class="button next__button">></button></li>
        </a>
        <a href="#page=${lastpage}">
            <li><button class="button to-last__button">>></button></li>
        </a>
    `;

    if (lastpage === 1 || lastpage === 0) {
        markup1, markup2 = '';
    } else if (pageContainer[pageContainer.length - 1] === lastpage) {
        markup2 = '';
    } else if (pageStart === 1) {
        markup1 = '';
    }

    elements.pages.insertAdjacentHTML('afterbegin', markup1);
    elements.pages.insertAdjacentHTML('beforeend', markup2);
}