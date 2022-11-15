import dateFormating from './dateFormating';
import Store from './Store';
import UI from './UI';
import { bookCompleted } from './utils';

export default function initEvents() {
  // elementos globais
  const btnAddBook = document.querySelector('[data-form="btn"]');

  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  btnAddBook.addEventListener('click', (e) => UI.addBookData(e));

  const ImgPreview = document.querySelector('[data-form="imgPreview"]');
  const inputCover = document.querySelector('#cover');
  const clearFormBtn = document.querySelector('[data-form="removeBtn"]');
  const bookList = document.querySelector('[data-book="list"]');
  const modalContainer = document.querySelector('[data-modal="container"]');
  const inputPagesPerDayValue = document.querySelector('#pagesPerDay');
  const books = Store.getBooks();

  // renderiza capa na área de input
  const handleImgPreview = ({ target }) => {
    const iconImg = document.querySelector('.fa-image');
    const image = document.createElement('img');
    image.src = target.result;

    iconImg.style.display = 'none';
    image.dataset.image = 'preview';
    inputCover.setAttribute('disabled', '');
    ImgPreview.appendChild(image);
  };

  // pega os dados do input da imagem
  const handleImgPreviewData = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.addEventListener('load', (e) => handleImgPreview(e));

      reader.readAsDataURL(file);
    }
  };
  inputCover.addEventListener('change', (e) => handleImgPreviewData(e));

  clearFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    UI.clearInputFields();
  });

  // função que irá lidar com a parte
  // da previsão de leitura no form principal
  function handleDatePrevisionMainForm({ target }) {
    const formTotalPagsValue = document.querySelector('#totalPages').value;

    if (formTotalPagsValue && target.value) {
      const datePrevisionHolder = document.querySelector(
        '[data-from="prevision"]',
      );
      datePrevisionHolder.innerText = dateFormating(
        formTotalPagsValue,
        target.value,
      );
    }
  }

  let idTarget;

  // abrir modal
  function handleUpdateModal({ target }) {
    idTarget = target.parentElement.parentElement
      .querySelector('[data-book="bookId"]')
      .innerText.substring(1);
    UI.bookUpdateModal(target, modalContainer, idTarget);

    handleModalPrevisionDate(target);
  }

  let dateContainer;
  let dateModal;

  // função que renderiza a previsão de leitura no modal
  function handleModalPrevisionDate(target) {
    const modalDatePrevision = document.querySelector(
      '[data-modal="prevision"]',
    );
    dateContainer = document.querySelector('[data-modal="date"]');
    const totalPages = document.querySelector('[data-modal="totalPages"]');
    const modal = modalContainer.querySelector('.modal');
    const btnConfirm = document.querySelector('[data-modal="confirm"]');

    if (dateContainer) {
      modalDatePrevision.addEventListener('change', ({ target }) => {
        if (target.value > totalPages.innerText || target.value <= 0) {
          UI.showAlert('Página atual inválida.', 'error', modal, 'beforeend');
          btnConfirm.setAttribute('disabled', true);
        } else {
          btnConfirm.removeAttribute('disabled');
          dateContainer.innerText = dateFormating(
            totalPages.innerText,
            target.value,
          );

          const progressBar = document.querySelector(
            '[data-modal="progressBar"]',
          );
          const percentage = UI.getPregressPerc(
            target.value,
            totalPages.innerText,
          );

          UI.updateProgressBarModal(percentage);

          dateModal = target.value;
          dateContainer = document.querySelector('[data-modal="date"]');
        }
      });
    }
  }

  // fecha o modal e passa informações
  modalContainer.addEventListener('click', ({ target }) => {
    if (target.classList.contains('confirm')) {
      UI.closeModal(target);

      books.forEach((book) => {
        book.currPag = dateModal;
        book.percentage = UI.getPregressPerc(book.currPag, book.pagesTotal);
        book.prevision = dateContainer.innerText;
        if (+idTarget === book.id) {
          Store.updateBook(+idTarget, book);
          UI.updateProgressBar(book.id, book.percentage);
          UI.updateDate(book.id, book.prevision);
          UI.updateCurrPage(book.id, book.currPag);

          bookCompleted(book);
        }
      });
    }
  });

  bookList.addEventListener('click', (e) => {
    e.preventDefault();
    handleUpdateModal(e);
    UI.deleteBook(e.target);
  });
  modalContainer.addEventListener('click', ({ target }) => {
    UI.closeModal(target);
  });
  inputPagesPerDayValue.addEventListener('change', (e) => {
    handleDatePrevisionMainForm(e);
  });
}
