/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/js/modules/Book.js":
/*!************************************!*\
  !*** ./src/app/js/modules/Book.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Book)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");



var Book = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function Book(id, cover, title, author, pagesTotal, pagesPerDay, prevision) {
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Book);

  this.id = id;
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.pagesTotal = pagesTotal;
  this.pagesPerDay = pagesPerDay;
  this.prevision = prevision;
  this.completed = false;
});



/***/ }),

/***/ "./src/app/js/modules/Store.js":
/*!*************************************!*\
  !*** ./src/app/js/modules/Store.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



var Store = /*#__PURE__*/function () {
  function Store() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Store);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Store, null, [{
    key: "getBooks",
    value: function getBooks() {
      var books;
      if (localStorage.getItem('books') === null) books = [];else books = JSON.parse(localStorage.getItem('books'));
      return books;
    }
  }, {
    key: "addBook",
    value: function addBook(book) {
      var books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, {
    key: "removeBook",
    value: function removeBook(id) {
      var books = Store.getBooks();
      books.forEach(function (book, index) {
        if (+book.id === +id) books.splice(index, 1);
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, {
    key: "updateBook",
    value: function updateBook(id, book) {
      var books = Store.getBooks();
      books.forEach(function (bookEl, index) {
        if (bookEl.id === id) {
          books.splice(index, 1);
          books.push(book);
        }

        localStorage.setItem('books', JSON.stringify(books));
      });
    }
  }]);

  return Store;
}();



/***/ }),

/***/ "./src/app/js/modules/UI.js":
/*!**********************************!*\
  !*** ./src/app/js/modules/UI.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Book__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Book */ "./src/app/js/modules/Book.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Store */ "./src/app/js/modules/Store.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/app/js/modules/helpers.js");



/* eslint-disable indent */




var UI = /*#__PURE__*/function () {
  function UI() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, UI);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(UI, null, [{
    key: "displayBooks",
    value: function displayBooks() {
      var books = _Store__WEBPACK_IMPORTED_MODULE_3__["default"].getBooks();
      books.forEach(function (book) {
        return UI.addBookToList(book);
      });
    }
  }, {
    key: "addBookToList",
    value: function addBookToList(book) {
      var bookList = document.querySelector('[data-book="list"]');
      var bookItem = document.createElement('article');
      bookItem.setAttribute('id', book.id);
      bookItem.classList.add('book_list__item');
      bookItem.innerHTML = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.bookListStructure)(book);
      bookItem.dataset.book = 'item';
      bookList.insertAdjacentElement('afterbegin', bookItem);
      UI.updateProgressBar(book.id, book.percentage || 0);
    } // trocar para utils

  }, {
    key: "getInputsValue",
    value: function getInputsValue() {
      var _inputCover$nextEleme;

      var inputCover = document.querySelector('#cover');
      var inputTitleValue = document.querySelector('#title').value;
      var inputAuthorValue = document.querySelector('#author').value;
      var inputTotalPagesValue = document.querySelector('#totalPages').value;
      var inputPagesPerDayValue = document.querySelector('#pagesPerDay').value;
      var imgBlob = inputCover === null || inputCover === void 0 ? void 0 : (_inputCover$nextEleme = inputCover.nextElementSibling) === null || _inputCover$nextEleme === void 0 ? void 0 : _inputCover$nextEleme.attributes.src.nodeValue;
      var datePrevision = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.dateFormating)(inputTotalPagesValue, inputPagesPerDayValue);
      var id = Math.floor(Math.random() * 9999999);
      return {
        id: id,
        imgBlob: imgBlob,
        inputTitleValue: inputTitleValue,
        inputAuthorValue: inputAuthorValue,
        inputTotalPagesValue: inputTotalPagesValue,
        inputPagesPerDayValue: inputPagesPerDayValue,
        datePrevision: datePrevision
      };
    }
  }, {
    key: "addBookData",
    value: function addBookData() {
      var formContainer = document.querySelector('[data-form="container"]');

      var _UI$getInputsValue = UI.getInputsValue(),
          id = _UI$getInputsValue.id,
          imgBlob = _UI$getInputsValue.imgBlob,
          inputTitleValue = _UI$getInputsValue.inputTitleValue,
          inputAuthorValue = _UI$getInputsValue.inputAuthorValue,
          inputTotalPagesValue = _UI$getInputsValue.inputTotalPagesValue,
          inputPagesPerDayValue = _UI$getInputsValue.inputPagesPerDayValue,
          datePrevision = _UI$getInputsValue.datePrevision; // validate


      if (inputTitleValue === '' || inputTotalPagesValue === '' || inputTotalPagesValue <= 0 || inputPagesPerDayValue === '' || inputPagesPerDayValue <= 0) {
        // alerta de error
        UI.showAlert('Por favor, preencha os campos marcados com *.', 'error', formContainer, 'beforeend');
      } else {
        var book = new _Book__WEBPACK_IMPORTED_MODULE_2__["default"](id, imgBlob, inputTitleValue, inputAuthorValue, inputTotalPagesValue, inputPagesPerDayValue, datePrevision); // renderiza livro

        UI.addBookToList(book); // adiciona livro no localStorage

        _Store__WEBPACK_IMPORTED_MODULE_3__["default"].addBook(book); // limpar campos do form

        (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.clearInputFields)();
        location.reload(); // alerta de sucesso

        UI.showAlert('Livro adicionado!', 'success', formContainer, 'beforeend');
      }
    }
  }, {
    key: "deleteBook",
    value: function deleteBook(element) {
      if (element.classList.contains('delete')) {
        // remove livro do localStorage
        var id = document.querySelector('[data-book="bookId"]').innerText.substring(1);
        _Store__WEBPACK_IMPORTED_MODULE_3__["default"].removeBook(id); // remover livro da UI

        element.parentElement.parentElement.parentElement.remove(); // alerta de error

        var formContainer = document.querySelector('[data-form="container"]');
        UI.showAlert('Livro removido!', 'success', formContainer, 'afterend');
      }
    }
  }, {
    key: "showAlert",
    value: function showAlert(message, className, container, position) {
      var messageDiv = document.createElement('div');
      messageDiv.className = "alert alert-".concat(className);
      messageDiv.appendChild(document.createTextNode(message));
      container.insertAdjacentElement(position, messageDiv);
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 4000);
    }
  }, {
    key: "bookModalRender",
    value: function bookModalRender(container, book, id) {
      if (book.id === +id) {
        container.innerHTML = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.modalStructure)(book);
      } else console.log('logica errada');
    } // renderiza modal na tela

  }, {
    key: "bookUpdateModal",
    value: function bookUpdateModal(target, modalContainer, idTarget) {
      var body = document.querySelector('body');

      if (target.classList.contains('update')) {
        modalContainer.style.display = 'grid';
        body.style.overflowY = 'hidden';
        var books = _Store__WEBPACK_IMPORTED_MODULE_3__["default"].getBooks();
        books.forEach(function (book) {
          if (+book.id === +idTarget) {
            UI.bookModalRender(modalContainer, book, idTarget);
          }
        });
      }
    }
  }, {
    key: "closeModal",
    value: function closeModal(element) {
      var modalContainer = document.querySelector('[data-modal="container"]');
      var body = document.querySelector('body');
      var form = document.querySelector('[data-modal="form"]');
      var modalInput = document.querySelector('[data-modal="prevision"]');
      var modal = modalContainer.querySelector('.modal');

      if (element.classList.contains('cancel') || element.classList.contains('backdrop')) {
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
  }, {
    key: "updateProgressBar",
    value: function updateProgressBar(id, percentage) {
      var element = document.getElementById(id);
      var percentageHolder = element.querySelector('[data-book="percentage"]');
      var progressBar = element.querySelector('[data-book="progressBar"]');
      percentageHolder.innerText = "".concat(percentage, "%") || 0;
      progressBar.style.width = "".concat(percentage, "%");
    }
  }, {
    key: "updateProgressBarModal",
    value: function updateProgressBarModal(percentage) {
      var progressBarHolder = document.querySelector('[data-modal="progressBar"]');
      var percentageHolder = document.querySelector('[data-modal="percentage"]');
      progressBarHolder.style.width = "".concat(percentage, "%");
      if (percentage > 100) percentageHolder.innerText = '100%';else percentageHolder.innerText = "".concat(percentage, "%") || 0;
    }
  }, {
    key: "updateDate",
    value: function updateDate(id, date) {
      var element = document.getElementById(id);
      var dateHolder = element.querySelector('[data-book="previsionDate"] span');
      dateHolder.innerText = date;
    }
  }, {
    key: "updateCurrPage",
    value: function updateCurrPage(id, page) {
      var element = document.getElementById(id);
      var currPageHolder = element.querySelector('[data-book="currPage"]');
      currPageHolder.innerText = page;
    }
  }]);

  return UI;
}();



/***/ }),

/***/ "./src/app/js/modules/events.js":
/*!**************************************!*\
  !*** ./src/app/js/modules/events.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initEvents)
/* harmony export */ });
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/app/js/modules/Store.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/app/js/modules/UI.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/app/js/modules/helpers.js");



function initEvents() {
  // elementos globais
  var btnAddBook = document.querySelector('[data-form="btn"]');
  var ImgPreview = document.querySelector('[data-form="imgPreview"]');
  var inputCover = document.querySelector('#cover');
  var clearFormBtn = document.querySelector('[data-form="removeBtn"]');
  var bookList = document.querySelector('[data-book="list"]');
  var modalContainer = document.querySelector('[data-modal="container"]');
  var inputPagesPerDayValue = document.querySelector('#pagesPerDay');
  var books = _Store__WEBPACK_IMPORTED_MODULE_0__["default"].getBooks();
  var idTarget; // renderiza capa na área de input

  var handleImgPreview = function handleImgPreview(_ref) {
    var target = _ref.target;
    var iconImg = document.querySelector('.fa-image');
    var image = document.createElement('img');
    image.src = target.result;
    iconImg.style.display = 'none';
    image.dataset.image = 'preview';
    inputCover.setAttribute('disabled', '');
    ImgPreview.appendChild(image);
  }; // pega os dados do input da imagem


  var handleImgPreviewData = function handleImgPreviewData(_ref2) {
    var target = _ref2.target;
    var file = target.files[0];
    var reader = new FileReader();

    if (file) {
      reader.addEventListener('load', function (e) {
        return handleImgPreview(e);
      });
      reader.readAsDataURL(file);
    }
  };

  inputCover.addEventListener('change', function (e) {
    return handleImgPreviewData(e);
  });
  clearFormBtn.addEventListener('click', function (e) {
    e.preventDefault();
    (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.clearInputFields)();
  }); // função que irá lidar com a parte
  // da previsão de leitura no form principal

  function handleDatePrevisionMainForm(_ref3) {
    var target = _ref3.target;
    var formTotalPagsValue = document.querySelector('#totalPages').value;

    if (formTotalPagsValue && target.value) {
      var datePrevisionHolder = document.querySelector('[data-from="prevision"]');
      datePrevisionHolder.innerText = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.dateFormating)(formTotalPagsValue, target.value);
    }
  } // abrir modal


  function handleUpdateModal(_ref4) {
    var target = _ref4.target;
    idTarget = target.parentElement.parentElement.querySelector('[data-book="bookId"]').innerText.substring(1);
    _UI__WEBPACK_IMPORTED_MODULE_1__["default"].bookUpdateModal(target, modalContainer, idTarget);
    handleModalPrevisionDate(target);
  }

  var dateContainer;
  var dateModal; // função que renderiza a previsão de leitura no modal

  function handleModalPrevisionDate() {
    var modalDatePrevision = document.querySelector('[data-modal="prevision"]');
    dateContainer = document.querySelector('[data-modal="date"]');
    var totalPages = document.querySelector('[data-modal="totalPages"]');
    var modal = modalContainer.querySelector('.modal');
    var btnConfirm = document.querySelector('[data-modal="confirm"]');

    if (dateContainer) {
      modalDatePrevision.addEventListener('change', function (_ref5) {
        var target = _ref5.target;

        if (target.value > totalPages.innerText || target.value <= 0) {
          _UI__WEBPACK_IMPORTED_MODULE_1__["default"].showAlert('Página atual inválida.', 'error', modal, 'beforeend');
          btnConfirm.setAttribute('disabled', true);
        } else {
          btnConfirm.removeAttribute('disabled');
          dateContainer.innerText = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.dateFormating)(totalPages.innerText, target.value);
          var percentage = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.getProgressPerc)(target.value, totalPages.innerText);
          _UI__WEBPACK_IMPORTED_MODULE_1__["default"].updateProgressBarModal(percentage);
          dateModal = target.value;
          dateContainer = document.querySelector('[data-modal="date"]');
        }
      });
    }
  } // fecha o modal e passa informações


  modalContainer.addEventListener('click', function (_ref6) {
    var target = _ref6.target;

    if (target.classList.contains('confirm')) {
      _UI__WEBPACK_IMPORTED_MODULE_1__["default"].closeModal(target);
      books.forEach(function (book) {
        book.currPag = dateModal;
        book.percentage = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.getProgressPerc)(book.currPag, book.pagesTotal);
        book.prevision = dateContainer.innerText;

        if (+idTarget === book.id) {
          _Store__WEBPACK_IMPORTED_MODULE_0__["default"].updateBook(+idTarget, book);
          _UI__WEBPACK_IMPORTED_MODULE_1__["default"].updateProgressBar(book.id, book.percentage);
          _UI__WEBPACK_IMPORTED_MODULE_1__["default"].updateDate(book.id, book.prevision);
          _UI__WEBPACK_IMPORTED_MODULE_1__["default"].updateCurrPage(book.id, book.currPag);
          (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.bookCompleted)(+idTarget, book);
        }
      });
    }
  });
  bookList.addEventListener('click', function (e) {
    e.preventDefault();
    handleUpdateModal(e);
    _UI__WEBPACK_IMPORTED_MODULE_1__["default"].deleteBook(e.target);
  });
  modalContainer.addEventListener('click', function (_ref7) {
    var target = _ref7.target;
    _UI__WEBPACK_IMPORTED_MODULE_1__["default"].closeModal(target);
  });
  inputPagesPerDayValue.addEventListener('change', function (e) {
    handleDatePrevisionMainForm(e);
  });
  document.addEventListener('DOMContentLoaded', _UI__WEBPACK_IMPORTED_MODULE_1__["default"].displayBooks);
  btnAddBook.addEventListener('click', function (e) {
    e.preventDefault();
    _UI__WEBPACK_IMPORTED_MODULE_1__["default"].addBookData();
  });
}

/***/ }),

/***/ "./src/app/js/modules/helpers.js":
/*!***************************************!*\
  !*** ./src/app/js/modules/helpers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookCompleted": () => (/* binding */ bookCompleted),
/* harmony export */   "bookListStructure": () => (/* binding */ bookListStructure),
/* harmony export */   "clearInputFields": () => (/* binding */ clearInputFields),
/* harmony export */   "dateFormating": () => (/* binding */ dateFormating),
/* harmony export */   "getProgressPerc": () => (/* binding */ getProgressPerc),
/* harmony export */   "modalStructure": () => (/* binding */ modalStructure)
/* harmony export */ });
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/app/js/modules/Store.js");
// mudal nome para helpers

var defaultCover = './assets/cover-undefined.png'; // renderiza mensagem de livro concluído

function bookCompleted(idTarget, book) {
  var bookContainer = document.getElementById(idTarget);
  var btnContainer = bookContainer.querySelector('[data-bookitem="btn"]');
  var btnUpdate = bookContainer.querySelector('[data-book="update"]'); // tá atualizando todos os itens

  if (book.currPag >= 100) {
    var completedText = document.createElement('p');
    completedText.innerText = 'Concluído!';
    completedText.classList.add('completed_book');
    btnContainer.insertAdjacentElement('afterbegin', completedText);
    btnUpdate.remove();
    book.completed = true;
    _Store__WEBPACK_IMPORTED_MODULE_0__["default"].updateBook(book.id, book);
  }
} // retorna o html do modal

function modalStructure(book) {
  return "\n  <div class=\"modal\" data-modalBookId=\"".concat(book.id, "\">\n    <div class=\"modal__book_cover\">\n      <img src=\"").concat(book.cover || defaultCover, "\" alt=\"").concat(book.title, "\">\n    </div>\n\n    <div class=\"modal__book_info\">\n      <span>").concat(book.author || 'Autor não informado', "</span>\n      <p>").concat(book.title, "</p>\n    </div>\n\n    <form class=\"modal__form\" data-modal=\"form\">\n      <fieldset>\n        <label for=\"currPag\">P\xE1g. Atual:*</label>\n        <input type=\"number\" id=\"currPag\" name=\"currPag\" placeholder=\"").concat(book.currPag || book.pagesPerDay, "\" data-modal=\"prevision\">\n      </fieldset>\n      \n      <div>\n        <span>P\xE1g. Total:*</span>\n        <p data-modal=\"totalPages\">").concat(book.pagesTotal, "</p>\n      </div>\n    </form>\n\n    <div class=\"previsao\">\n      <p>Previs\xE3o de t\xE9rmino:</p>\n      <p class=\"data-prevista\" data-modal=\"date\">").concat(book.prevision, "</p>\n\n      <div class=\"progress\">\n        <p data-modal=\"percentage\">").concat(book.percentage || '0', "%</p>\n        <div class=\"progress__bar\">\n        <span data-modal=\"progressBar\" style=\"width:").concat(book.percentage, "%\"></span>\n      </div>\n      </div>\n    </div>\n\n    <div class=\"form__btn\">\n      <button class=\"btn btn--cancel cancel\" data-modal=\"cancel\">Cancelar</button>\n      <button class=\"btn btn--red confirm\" data-modal=\"confirm\">OK</button>\n    </div>\n  </div>\n");
} // retorna o html da lista de livros

function bookListStructure(book) {
  return "\n  <div class=\"book_list__item__img\">\n    <img src=\"".concat(book.cover || defaultCover, "\" alt=\"").concat(book.title, "\">\n  </div>\n  <div class=\"book_list__item__info\" data-book=\"info\">\n    <h3>").concat(book.title, " <span class=\"book_id\" data-book=\"bookId\">#").concat(book.id, "</span></h3>\n    <p class=\"prevision\" data-book=\"previsionDate\">Previs\xE3o de t\xE9rmino: <span>").concat(book.prevision, "</span></p>\n    <div class=\"progress\">\n      <div class=\"progress__info\">\n        <p class=\"pages\"><span data-book=\"currPage\">").concat(book.currPag || 0, "\n          </span> p\xE1ginas de ").concat(book.pagesTotal, "</p>\n        <p class=\"percentage\" data-book=\"percentage\">").concat(book.percentage || 0, "%\n        </p>            \n      </div>\n      <div class=\"progress__bar\">\n        <span data-book=\"progressBar\"></span>\n      </div>\n    </div>  \n\n    <div class=\"book_list__item__btn\" data-bookItem=\"btn\">\n      ").concat(book.completed ? '<p class="completed_book">Concluído</p>' : '<button class="btn btn--red update" data-book="update">Atualizar</button>', "\n      <i class=\"fa-solid fa-trash-can delete\"></i>\n    </div>\n  </div>\n");
}

function daysToSeconds(days) {
  return Math.floor(days * 24 * 60 * 60);
}

function dateFormating(totalPages, pagesPerDay) {
  if (totalPages <= 0 || pagesPerDay <= 0) return '00/00/0000';
  var dateNow = new Date();
  var previsionDays = totalPages / pagesPerDay;
  var secondsFromDays = daysToSeconds(previsionDays);
  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);
  var datePreview = dateNow.toLocaleDateString('pt-BR');
  return datePreview;
}
function clearInputFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#totalPages').value = '';
  document.querySelector('#pagesPerDay').value = '';
  var inputCover = document.querySelector('#cover');
  var iconImg = document.querySelector('.fa-image');
  var imgPreview = document.querySelector('[data-image="preview"]');
  imgPreview && imgPreview.remove();
  var datePrevision = document.querySelector('[data-from="prevision"]');
  datePrevision.innerText = '00/00/0000';
  iconImg.style.display = 'block';
  inputCover.removeAttribute('disabled');
}
function getProgressPerc(currPag, totalPages) {
  return (currPag / totalPages * 100).toFixed();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/app/js/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/events */ "./src/app/js/modules/events.js");

(0,_modules_events__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map