/* eslint-disable indent */
import Book from './Book';
import Store from './Store';
import {
  bookListStructure,
  clearInputFields,
  dateFormating,
  modalStructure,
} from './helpers';

export default class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.querySelector('[data-book="list"]');
    const bookItem = document.createElement('article');
    bookItem.setAttribute('id', book.id);

    bookItem.classList.add('book_list__item');

    bookItem.innerHTML = bookListStructure(book);
    bookItem.dataset.book = 'item';

    bookList.insertAdjacentElement('afterbegin', bookItem);

    UI.updateProgressBar(book.id, book.percentage || 0);
  }

  // trocar para utils
  static getInputsValue() {
    const inputCover = document.querySelector('#cover');

    const inputTitleValue = document.querySelector('#title').value;
    const inputAuthorValue = document.querySelector('#author').value;
    const inputTotalPagesValue = document.querySelector('#totalPages').value;
    const inputPagesPerDayValue = document.querySelector('#pagesPerDay').value;
    const imgBlob = inputCover?.nextElementSibling?.attributes.src.nodeValue;
    const datePrevision = dateFormating(
      inputTotalPagesValue,
      inputPagesPerDayValue,
    );
    const id = Math.floor(Math.random() * 9999999);

    return {
      id,
      imgBlob,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
      datePrevision,
    };
  }

  static addBookData() {
    const formContainer = document.querySelector('[data-form="container"]');

    const {
      id,
      imgBlob,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
      datePrevision,
    } = UI.getInputsValue();

    // validate
    if (
      inputTitleValue === '' ||
      inputTotalPagesValue === '' ||
      inputTotalPagesValue <= 0 ||
      inputPagesPerDayValue === '' ||
      inputPagesPerDayValue <= 0
    ) {
      // alerta de error
      UI.showAlert(
        'Por favor, preencha os campos marcados com *.',
        'error',
        formContainer,
        'beforeend',
      );
    } else {
      const book = new Book(
        id,
        imgBlob,
        inputTitleValue,
        inputAuthorValue,
        inputTotalPagesValue,
        inputPagesPerDayValue,
        datePrevision,
      );

      // renderiza livro
      UI.addBookToList(book);

      // adiciona livro no localStorage
      Store.addBook(book);

      // limpar campos do form
      clearInputFields();

      location.reload();

      // alerta de sucesso
      UI.showAlert('Livro adicionado!', 'success', formContainer, 'beforeend');
    }
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      // remove livro do localStorage
      const id = document
        .querySelector('[data-book="bookId"]')
        .innerText.substring(1);
      Store.removeBook(id);

      // remover livro da UI
      element.parentElement.parentElement.parentElement.remove();

      // alerta de error
      const formContainer = document.querySelector('[data-form="container"]');
      UI.showAlert('Livro removido!', 'success', formContainer, 'afterend');
    }
  }

  static showAlert(message, className, container, position) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${className}`;
    messageDiv.appendChild(document.createTextNode(message));

    container.insertAdjacentElement(position, messageDiv);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 4000);
  }

  static bookModalRender(container, book, id) {
    if (book.id === +id) {
      container.innerHTML = modalStructure(book);
    } else console.log('logica errada');
  }

  // renderiza modal na tela
  static bookUpdateModal(target, modalContainer, idTarget) {
    const body = document.querySelector('body');

    if (target.classList.contains('update')) {
      modalContainer.style.display = 'grid';
      body.style.overflowY = 'hidden';

      const books = Store.getBooks();
      books.forEach((book) => {
        if (+book.id === +idTarget) {
          UI.bookModalRender(modalContainer, book, idTarget);
        }
      });
    }
  }

  static closeModal(element) {
    const modalContainer = document.querySelector('[data-modal="container"]');
    const body = document.querySelector('body');
    const form = document.querySelector('[data-modal="form"]');
    const modalInput = document.querySelector('[data-modal="prevision"]');
    const modal = modalContainer.querySelector('.modal');

    if (
      element.classList.contains('cancel') ||
      element.classList.contains('backdrop')
    ) {
      modalContainer.style.display = 'none';
      body.style.overflowY = 'scroll';
      form.reset();
    }
    if (modalInput.value === '' && element.classList.contains('confirm')) {
      UI.showAlert('Insira a página atual.', 'error', modal, 'beforeend');
    }
    if (modalInput.value !== '' && element.classList.contains('confirm')) {
      modalContainer.style.display = 'none';
      body.style.overflowY = 'scroll';
      form.reset();
    }
  }

  static updateProgressBar(id, percentage) {
    const element = document.getElementById(id);
    const percentageHolder = element.querySelector('[data-book="percentage"]');
    const progressBar = element.querySelector('[data-book="progressBar"]');

    percentageHolder.innerText = `${percentage}%` || '0';
    progressBar.style.width = `${percentage}%`;
  }

  static updateProgressBarModal(percentage) {
    const progressBarHolder = document.querySelector(
      '[data-modal="progressBar"]',
    );
    const percentageHolder = document.querySelector(
      '[data-modal="percentage"]',
    );

    progressBarHolder.style.width = `${percentage}%`;
    if (percentage > 100) percentageHolder.innerText = '100%';
    else percentageHolder.innerText = `${percentage}%` || '0';
  }

  static updateDate(id, date) {
    const element = document.getElementById(id);
    const dateHolder = element.querySelector(
      '[data-book="previsionDate"] span',
    );

    dateHolder.innerText = date;
  }

  static updateCurrPage(id, page) {
    const element = document.getElementById(id);
    const currPageHolder = element.querySelector('[data-book="currPage"]');

    currPageHolder.innerText = page;
  }
}
