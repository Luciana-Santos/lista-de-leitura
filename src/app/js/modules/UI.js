/* eslint-disable indent */
import Book from './Book';
import { dateFormating } from './dateFormating';
import Store from './Store';

export default class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.querySelector('[data-book="list"]');
    const bookItem = document.createElement('article');
    bookItem.classList.add('book_list__item');
    const defaultCover = './assets/cover-undefined.png';

    bookItem.innerHTML = `
      <div class="book_list__item__img">
        <img src="${book.cover || defaultCover}" alt="${book.title}">
      </div>
      <div class="book_list__item__info">
        <h3>${book.title} <span class="book_id" data-book="bookId">#${
      book.id
    }</span></h3>
        <p class="prevision">Previsão de término: <span>${
          book.prevision
        }</span></p>
        <div class="progress">
          <p>${book.currPag} páginas de ${
      book.pagesTotal
    } <span data-book="percentage">${book.percentage}%</span></p>
          <div class="progress__bar">
            <span data-book="progressBar"></span>
          </div>
        </div>  

        <div class="book_list__item__btn" data-bookItem="btn">
          <button class="btn btn--red update">Atualizar</button>
          <i class="fa-solid fa-trash-can delete"></i>
        </div>
      </div>
    `;
    bookItem.dataset.book = 'item';

    bookList.insertAdjacentElement('afterbegin', bookItem);

    const progressBar = document.querySelector('[data-book="progressBar"]');
    const percentageHolder = document.querySelector('[data-book="percentage"]');
    UI.updateProgressBar(
      book.currPag,
      book.pagesTotal,
      progressBar,
      percentageHolder,
    );
  }

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
    const id = Math.floor(Math.random() * 9000);
    console.log(datePrevision);

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

  static addBookData(e) {
    const formContainer = document.querySelector('[data-form="container"]');

    e.preventDefault();
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
      inputPagesPerDayValue === ''
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
      UI.clearInputFields();

      // alerta de sucesso
      UI.showAlert('Livro adicionado!', 'success', formContainer, 'beforeend');
    }
  }

  static clearInputFields() {
    const form = document.querySelector('[data-form="form"]');
    const inputCover = document.querySelector('#cover');
    const iconImg = document.querySelector('.fa-image');
    const imgPreview = document.querySelector('[data-image="preview"]');

    imgPreview && imgPreview.remove();
    const datePrevision = document.querySelector('[data-from="prevision"]');
    datePrevision.innerText = '00/00/0000';
    iconImg.style.display = 'block';
    inputCover.removeAttribute('disabled');
    form.reset();
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
      const bookList = document.querySelector('[data-book="list"]');
      UI.showAlert('Livro removido!', 'success', bookList, 'afterbegin');
    }
  }

  static showAlert(message, className, container, position) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${className}`;
    messageDiv.appendChild(document.createTextNode(message));

    container.insertAdjacentElement(position, messageDiv);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  static bookModalRender(container, book) {
    const defaultCover = './assets/cover-undefined.png';

    container.innerHTML = `
      <div class="modal">
        <div class="modal__book_cover">
          <img src="${book.cover || defaultCover}" alt="${book.title}">
        </div>

        <div class="modal__book_info">
          <span>${book.author || 'Autor não informado'}</span>
          <p>${book.title}</p>
        </div>

        <form class="modal__form" data-modal="form">
          <fieldset>
            <label for="currPag">Pág. Atual:*</label>
            <input type="number" id="currPag" name="currPag" placeholder="${
              book.currPag || 60
            }" data-modal="prevision">
          </fieldset>
          
          <div>
            <span>Pág. Total:*</span>
            <p data-modal="totalPages">${book.pagesTotal}</p>
          </div>
        </form>

        <div class="previsao">
          <p>Previsão de término:</p>
          <p class="data-prevista" data-modal="date">${book.prevision}</p>

          <div class="progress">
            <p data-modal="percentage">0%</p>
            <div class="progress__bar">
              <span data-modal="progressBar"></span>
            </div>
          </div>
        </div>

        <div class="form__btn">
          <button class="btn btn--cancel cancel" data-modal="cancel">Cancelar</button>
          <button class="btn btn--red confirm" data-modal="confirm">OK</button>
        </div>
      </div>
    `;
  }

  static bookUpdateModal(element) {
    const modalContainer = document.querySelector('[data-modal="container"]');
    const books = Store.getBooks();

    const body = document.querySelector('body');
    if (element.classList.contains('update')) {
      modalContainer.style.display = 'grid';
      body.style.overflowY = 'hidden';
      books.forEach((book) => {
        UI.bookModalRender(modalContainer, book);

        const progressBar = document.querySelector(
          '[data-modal="progressBar"]',
        );
        const percentageHolder = document.querySelector(
          '[data-modal="percentage"]',
        );
        UI.updateProgressBar(
          book.currPag,
          book.pagesTotal,
          progressBar,
          percentageHolder,
        );
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

  static getPregressPerc(currPag, totalPages) {
    return ((currPag / totalPages) * 100).toFixed();
  }

  static updateProgressBar(currPag, totalPages, progressBar, percentageHolder) {
    const percentage = UI.getPregressPerc(currPag, totalPages);

    progressBar.style.minWidth = `${percentage}%`;
    percentageHolder.innerText = `${percentage}%`;
  }
}
