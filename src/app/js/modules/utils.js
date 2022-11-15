import Store from './Store';

// renderiza mensagem de livro concluído
export function bookCompleted(book) {
  const btnUpdateContainer = document.querySelector('[data-bookItem="btn"]');
  const btnUpdate = btnUpdateContainer.querySelector('button');

  if (+book.percentage === 100) {
    btnUpdate.remove();
    const completedText = document.createElement('p');
    completedText.innerText = 'Concluído!';
    completedText.classList.add('completed_book');
    btnUpdateContainer.insertAdjacentElement('afterbegin', completedText);

    // tá atualizando todos os itens
    const books = Store.getBooks();
    books.forEach((book) => {
      book.completed = true;
      Store.updateBook(book.id, book);
    });
  }
}

// retorna o html do modal
export function modalStructure(book) {
  const defaultCover = './assets/cover-undefined.png';

  return `
  <div class="modal" data-modalBookId="${book.id}">
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
          book.currPag || book.pagesPerDay
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
        <p data-modal="percentage">${book.percentage || '0'}%</p>
        <div class="progress__bar">
        <span data-modal="progressBar" style="width:${book.percentage}%"></span>
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
