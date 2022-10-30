import initEvents from './modules/events';
import UI from './modules/UI';

const btnAddBook = document.querySelector('[data-form="btn"]');

initEvents();
document.addEventListener('DOMContentLoaded', UI.displayBooks);
btnAddBook.addEventListener('click', (e) => UI.addBookData(e));
