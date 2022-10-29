import Book from './Book';

export default class UI {
  static displayBooks() {
    const StoreBooks = [
      {
        title: 'Senhor dos Aneis: A sociedade do Anel',
        author: 'JRR Tolkien',
        pagesTotal: 576,
        pagesPerDay: 60,
        prevision: '04/11/2022',
        cover:
          'https://i.pinimg.com/564x/38/9b/2a/389b2a9b8f9a154735f3096bc0d1f19a.jpg',
      },
      {
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
    const inputCover = document.querySelector('#cover').value;
    const inputTitleValue = document.querySelector('#title').value;
    const inputAuthorValue = document.querySelector('#author').value;
    const inputTotalPagesValue = document.querySelector('#totalPages').value;
    const inputPagesPerDayValue = document.querySelector('#pagesPerDay').value;

    return {
      inputCover,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
    };
  }

  static addBookData(e) {
    e.preventDefault();
    const {
      inputCover,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
    } = UI.getInputsValue();

    const book = new Book(
      inputCover,
      inputTitleValue,
      inputAuthorValue,
      inputTotalPagesValue,
      inputPagesPerDayValue,
    );

    console.log(book);
  }
}
