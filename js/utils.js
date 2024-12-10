const downloadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIndexFromRangeGenerator(min = 1, max = 625) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const isEscapeKey = (evt) => evt.key === 'Escape';

const showDownloadDataErrorMessage = ({ errorDisplayTime = 5000 } = {}) => {
  const errorElement = downloadErrorTemplate.cloneNode(true);
  body.insertAdjacentElement('beforeend', errorElement);
  setTimeout(() => errorElement.remove(), errorDisplayTime);
};

const showUploadDataSucessMessage = ({ errorDisplayTime = 5000 } = {}) => {
  const successElement = uploadSuccessTemplate.cloneNode(true);
  body.insertAdjacentElement('beforeend', successElement);
  setTimeout(() => successElement.remove(), errorDisplayTime);
};


export { getRandomInteger, createRandomIndexFromRangeGenerator, isEscapeKey, showDownloadDataErrorMessage, showUploadDataSucessMessage };

