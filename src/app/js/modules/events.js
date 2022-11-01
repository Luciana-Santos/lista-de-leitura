import { dateFormating, dateFormatingModal } from './dateFormating';
import Store from './Store';
import UI from './UI';

export default function initEvents() {
  const ImgPreview = document.querySelector('[data-form="imgPreview"]');
  const inputCover = document.querySelector('#cover');
  const clearFormBtn = document.querySelector('[data-form="removeBtn"]');
  const bookList = document.querySelector('[data-book="list"]');

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

  // remove livro renderizado
  bookList.addEventListener('click', ({ target }) => UI.deleteBook(target));

  // abrir modal de atualizar livro
  bookList.addEventListener('click', ({ target }) => {
    UI.bookUpdateModal(target);
    renderDatePreviewModal();
  });

  // cancelar atualização de leitura
  const modalContainer = document.querySelector('[data-modal="container"]');
  modalContainer.addEventListener('click', ({ target }) => {
    UI.closeModal(target);
  });

  const inputTotalPagesValue = document.querySelector('#totalPages').value;
  const inputPagesPerDayValue = document.querySelector('#pagesPerDay');
  const datePrevision = document.querySelector('[data-from="prevision"]');

  inputPagesPerDayValue.addEventListener('change', ({ target }) => {
    datePrevision.innerText = dateFormating(inputTotalPagesValue, target.value);
  });

  function renderDatePreviewModal() {
    const modalDatePrevision = document.querySelector(
      '[data-modal="prevision"]',
    );
    const dateContainer = document.querySelector('[data-modal="date"]');
    const totalPages = document.querySelector('[data-modal="totalPages"]');

    if (modalDatePrevision && dateContainer && totalPages) {
      modalDatePrevision.addEventListener('change', ({ target }) => {
        dateContainer.innerText = dateFormatingModal(
          target.value,
          totalPages.innerText,
        );
        const progressBar = document.querySelector(
          '[data-modal="progressBar"]',
        );
        const percentageHolder = document.querySelector(
          '[data-modal="percentage"]',
        );
        UI.updateProgressBar(
          target.value,
          totalPages.innerText,
          progressBar,
          percentageHolder,
        );

        const books = Store.getBooks();
        books.forEach((book) => {
          book.currPag = target.value;
          book.percentage = UI.getPregressPerc(
            target.value,
            totalPages.innerText,
          );
          book.prevision = dateContainer.innerText;
          Store.updateBook(book.id, book);
        });

        const bookProgressBar = document.querySelector(
          '[data-book="progressBar"]',
        );
        const bookPercentageHolder = document.querySelector(
          '[data-book="percentage"]',
        );
        UI.updateProgressBar(
          target.value,
          totalPages,
          bookProgressBar,
          bookPercentageHolder,
        );
      });
    }
  }

  modalContainer.addEventListener('click', ({ target }) => {
    if (target.classList.contains('confirm')) {
      const totalPages = document.querySelector('[data-modal="totalPages"]');

      UI.closeModal(target);
    }
  });
}
