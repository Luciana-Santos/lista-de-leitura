import dateFormating from './dateFormating';
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
  bookList.addEventListener('click', ({ target }) =>
    UI.bookUpdateModal(target),
  );

  // cancelar atualização de leitura
  const modalContainer = document.querySelector('[data-modal="container"]');
  modalContainer.addEventListener('click', ({ target }) =>
    UI.cancelUpdate(target),
  );

  const inputTotalPagesValue = document.querySelector('#totalPages').value;
  const inputPagesPerDayValue = document.querySelector('#pagesPerDay');
  const datePrevision = document.querySelector('[data-from="prevision"]');

  inputPagesPerDayValue.addEventListener('change', ({ target }) => {
    datePrevision.innerText = dateFormating(inputTotalPagesValue, target.value);
  });
}
