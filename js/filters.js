import { createRandomIndexFromRangeGenerator } from './utils.js';
import { renderPhotosList } from './pictures.js';
import { getData, } from './api.js';
import { showDownloadDataErrorMessage } from './utils.js';
const filterTabs = document.querySelectorAll('.img-filters__button');
const imgFilter = document.querySelector('.img-filters');

const showImgFilter = () => {
  imgFilter.classList.toggle('img-filters--inactive');
};

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const filterTypeDictionary = {
  default: (a, b) => a - b,
  discussed: (a, b) => b.comments.length - a.comments.length,
};
const filterImgDataByFilterType = (evt) => {
  const currentFilter = evt.target.getAttribute('id').split('-')[1];
  filterTabs.forEach((tab) => tab.classList.remove('img-filters__button--active'));
  evt.target.classList.toggle('img-filters__button--active');
  const filterCb = filterTypeDictionary[currentFilter];
  const pictures = document.querySelectorAll('.picture');
  const randomPictures = [];

  if (currentFilter !== 'random') {
    pictures.forEach((picture) => picture.remove());
    getData()
      .then((data) => {
        const filteredData = data.slice().sort(filterCb);
        renderPhotosList(filteredData);
      })
      .catch(() => showDownloadDataErrorMessage());
    return;
  }
  const getRandomImages = createRandomIndexFromRangeGenerator(1, 10);
  getData()
    .then((data) => {
      pictures.forEach((picture) => picture.remove());
      for (let i = 0; i < 10; i++) {

        randomPictures.push(data[getRandomImages()]);
      }
      renderPhotosList(randomPictures);
    });
};

const debounced = debounce(filterImgDataByFilterType);
imgFilter.addEventListener('click', debounced);
export { showImgFilter };
