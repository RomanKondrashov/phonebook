import controlModule from '/phonebook/modules/controlModule.js';
import {
  renderPhoneBook,
  renderContacts,
} from '/phonebook/modules/renderModule.js';
import * as storageModule from '/phonebook/modules/storageModule.js';

const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
  sortUpToDown,
} = controlModule;


const {
  getStorage,
} = storageModule;


{
  const data = getStorage('phoneData');

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      thead,
    } = renderPhoneBook(app, title);

    if (getStorage('sortField')) {
      sortUpToDown(getStorage('sortField'));
    }

    // функционал
    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);


    thead.addEventListener('click', e => {
      if (e.target.closest('.sort')) {
        const sortFiled = e.target.closest('.sort').dataset.sort;

        sortUpToDown(sortFiled);
        app.innerHTML = '';
        init(selectorApp, title);
      }
    });
  };
  window.phoneBookInit = init;
}
