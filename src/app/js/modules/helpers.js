// mudal nome para helpers

import Store from './Store';

const defaultCover = './assets/cover-undefined.png';

// renderiza mensagem de livro concluído
export function bookCompleted(idTarget, book) {
  const bookContainer = document.getElementById(idTarget);
  const btnContainer = bookContainer.querySelector('[data-bookitem="btn"]');
  const btnUpdate = bookContainer.querySelector('[data-book="update"]');

  // tá atualizando todos os itens
  console.log(book.currPag, book.pagesTotal);
  if (book.currPag >= book.pagesTotal) {
    const completedText = document.createElement('p');
    completedText.innerText = 'Concluído!';
    completedText.classList.add('completed_book');
    btnContainer.insertAdjacentElement('afterbegin', completedText);
    btnUpdate.remove();
    book.completed = true;
    Store.updateBook(book.id, book);
  }
}

// retorna o html do modal
export function modalStructure(book) {
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

// retorna o html da lista de livros
export function bookListStructure(book) {
  return `
  <div class="book_list__item__img">
    <img src="${book.cover || defaultCover}" alt="${book.title}">
  </div>
  <div class="book_list__item__info" data-book="info">
    <h3>${book.title} <span class="book_id" data-book="bookId">#${
    book.id
  }</span></h3>
    <p class="prevision" data-book="previsionDate">Previsão de término: <span>${
      book.prevision
    }</span></p>
    <div class="progress">
      <div class="progress__info">
        <p class="pages"><span data-book="currPage">${book.currPag || 0}
          </span> páginas de ${book.pagesTotal}</p>
        <p class="percentage" data-book="percentage">${book.percentage || 0}%
        </p>            
      </div>
      <div class="progress__bar">
        <span data-book="progressBar"></span>
      </div>
    </div>  

    <div class="book_list__item__btn" data-bookItem="btn">
      ${
        book.completed
          ? '<p class="completed_book">Concluído</p>'
          : '<button class="btn btn--red update" data-book="update">Atualizar</button>'
      }
      <i class="fa-solid fa-trash-can delete"></i>
    </div>
  </div>
`;
}

function daysToSeconds(days) {
  return Math.floor(days * 24 * 60 * 60);
}

export function dateFormating(totalPages, pagesPerDay) {
  if (totalPages <= 0 || pagesPerDay <= 0) return '00/00/0000';

  const dateNow = new Date();
  const previsionDays = totalPages / pagesPerDay;
  const secondsFromDays = daysToSeconds(previsionDays);

  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);
  const datePreview = dateNow.toLocaleDateString('pt-BR');

  return datePreview;
}

export function clearInputFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#totalPages').value = '';
  document.querySelector('#pagesPerDay').value = '';
  const inputCover = document.querySelector('#cover');
  const iconImg = document.querySelector('.fa-image');
  const imgPreview = document.querySelector('[data-image="preview"]');

  imgPreview && imgPreview.remove();
  const datePrevision = document.querySelector('[data-from="prevision"]');
  datePrevision.innerText = '00/00/0000';
  iconImg.style.display = 'block';
  inputCover.removeAttribute('disabled');
}
export function getProgressPerc(currPag, totalPages) {
  return ((currPag / totalPages) * 100).toFixed();
}
