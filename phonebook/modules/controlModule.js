
import createModule from '/phonebook/modules/createModule.js';
import storageModule from '/phonebook/modules/storageModule.js';

const {
  getStorage,
} = storageModule;

const data = getStorage('phoneData');

const {
  createRow,
} = createModule;

const {
  setStorage,
  removeStorage,
} = storageModule;

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
        target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      removeStorage(e.target.closest('.contact').dataset.phone);
      e.target.closest('.contact').remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const addContactData = contact => {
  data.push(contact);
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
    setStorage('phoneData', newContact);
  });
};

const sortUpToDown = (field) => {
  data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  localStorage.removeItem('sortField');
  setStorage('sortField', field);
};


export default {
  hoverRow,
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
  sortUpToDown,
  addContactData,
};
