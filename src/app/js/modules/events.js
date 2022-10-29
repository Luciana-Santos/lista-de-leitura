import UI from './UI';

export default function initEvents() {
  const btnAddBook = document.querySelector('[data-form="btn"]');
  const ImgPreview = document.querySelector('[data-form="imgPreview"]');
  const inputCover = document.querySelector('#cover');

  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  btnAddBook.addEventListener('click', (e) => UI.addBookData(e));

  const renderImgPreview = ({ target }) => {
    const image = document.createElement('img');
    image.src = target.result;

    ImgPreview.innerHTML = '';
    ImgPreview.appendChild(image);
  };

  const imgPreviewData = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.addEventListener('load', (e) => renderImgPreview(e));

      reader.readAsDataURL(file);
    }
  };

  inputCover.addEventListener('change', (e) => imgPreviewData(e));
}
