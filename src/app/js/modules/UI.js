import Book from './Book';

export default class UI {
  static displayBooks() {
    const StoreBooks = [
      {
        id: 1234,
        title: 'Senhor dos Aneis: A sociedade do Anel',
        author: 'JRR Tolkien',
        pagesTotal: 576,
        pagesPerDay: 60,
        prevision: '04/11/2022',
        cover:
          'https://i.pinimg.com/564x/38/9b/2a/389b2a9b8f9a154735f3096bc0d1f19a.jpg',
      },
      {
        id: 12234,
        title: 'Perdido em Marte',
        author: 'Andy Weir',
        pagesTotal: 489,
        pagesPerDay: 40,
        prevision: '01/11/2022',
        cover:
          'https://1.bp.blogspot.com/-BYonzSS5IQg/VVnWtaZYLII/AAAAAAAACI4/2NLQXx0Jaso/s1600/Book-Review-The-Martian.jpg',
      },
    ];

    const books = StoreBooks;

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
    const id = new Date().getTime();
    const inputCover = document.querySelector('#cover');
    const inputTitleValue = document.querySelector('#title').value;
    const inputAuthorValue = document.querySelector('#author').value;
    const inputTotalPagesValue = document.querySelector('#totalPages').value;
    const inputPagesPerDayValue = document.querySelector('#pagesPerDay').value;
    const imgBlob = inputCover?.nextElementSibling?.attributes.src.nodeValue;

    return {
      id,
      imgBlob,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
    };
  }

  static addBookData(e) {
    e.preventDefault();
    const {
      id,
      imgBlob,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
    } = UI.getInputsValue();

    // validate
    if (
      id === '' ||
      inputTitleValue === '' ||
      inputTotalPagesValue === '' ||
      inputPagesPerDayValue === ''
    ) {
      UI.showAlert('Por favor, preencha os campos marcados com *.', 'error');
    } else {
      const book = new Book(
        id,
        imgBlob,
        inputTitleValue,
        inputAuthorValue,
        inputTotalPagesValue,
        inputPagesPerDayValue,
      );

      console.log(UI.getInputsValue());
      UI.addBookToList(book);

      UI.clearInputFields();
    }
  }

  static clearInputFields() {
    const form = document.querySelector('[data-form="form"]');
    const inputCover = document.querySelector('#cover');
    const iconImg = document.querySelector('.fa-image');
    const imgPreview = document.querySelector('[data-image="preview"]');

    imgPreview && imgPreview.remove();
    iconImg.style.display = 'block';
    inputCover.removeAttribute('disabled');
    form.reset();
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${className}`;
    messageDiv.appendChild(document.createTextNode(message));
    const formContainer = document.querySelector('[data-form="container"]');

    formContainer.insertAdjacentElement('beforeend', messageDiv);

    // setTimeout(() => {
    //   document.querySelector('.alert').remove();
    // }, 3000);
  }
}
