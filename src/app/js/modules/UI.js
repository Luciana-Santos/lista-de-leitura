import Book from './Book';
import dateFormating from './dateFormating';
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
        <h3>${book.title}</h3>
        <p class="prevision">Previsão de término: <span>${
          book.prevision
        }</span></p>
        <div class="progress">
          <p>306 páginas de ${book.pagesTotal} <span>74%</span></p>
          <div class="progress__bar">
            <span></span>
          </div>
        </div>

        <div class="book_list__item__btn" data-bookItem="btn">
          <button class="btn btn--red update">Atualizar</button>
          <i class="fa-solid fa-trash-can delete"></i>
        </div>
      </div>
    `;

    bookList.insertAdjacentElement('afterbegin', bookItem);
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
    const id = Date.now();
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
        'Por favor, preecha os campos marcados com *.',
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
      element.parentElement.parentElement.parentElement.remove();

      // remove livro do localStorage
      const { id } = UI.getInputsValue();
      console.log(id);
      Store.removeBook(id);

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
}
