
const getStorage = key => {
  const result = JSON.parse(localStorage.getItem(key));
  if (result) {
    return result;
  } else {
    return [];
  }
};

const setStorage = (key, argObj) => {
  const newVal = getStorage(key);
  newVal.push(argObj);
  localStorage.setItem(key, JSON.stringify(newVal));
};

const removeStorage = phoneToDel => {
  const newWal = getStorage('phoneData');
  // eslint-disable-next-line eqeqeq
  const filteredArray = newWal.filter(value => value.phone != phoneToDel);
  localStorage.setItem('phoneData', JSON.stringify(filteredArray));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
};
