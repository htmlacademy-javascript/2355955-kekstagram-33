import { isEscapeKey, showUploadDataSucessMessage } from './utils.js';
import { sendData } from './api.js';
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImageEditForm = document.querySelector('.img-upload__overlay');
const closeUploadImageEditFormBtn = uploadImageEditForm.querySelector('.img-upload__cancel');
const imgUploadPreview = uploadImageEditForm.querySelector('.img-upload__preview img');
const imgUpload = imgUploadForm.querySelector('.img-upload__input');
const imgUploadChangeEffectRadioInput = uploadImageEditForm.querySelectorAll('.effects__radio');
const imgUploadEffectValueInput = uploadImageEditForm.querySelector('.effect-level__value');
const scaleControlInput = uploadImageEditForm.querySelector('.scale__control--value');
const sliderLevelEffectElement = uploadImageEditForm.querySelector('.effect-level__slider');
const scaleControlSmallerBtn = uploadImageEditForm.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = uploadImageEditForm.querySelector('.scale__control--bigger');
const inputHashtagField = imgUploadForm.querySelector('.text__hashtags');
const inputCommentField = imgUploadForm.querySelector('.text__description');
const submitButton = uploadImageEditForm.querySelector('.img-upload__submit');
const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',

});

const validateHashtagFieldTemplate = (value) => {
  const suitableTemplate = /^#[a-zа-яё0-9]{1,20}$/i;
  return !value.trim().split(' ').some((tag) => !suitableTemplate.test(tag));
};
const validateMaxHashtagCount = (value) => !(value.trim().split(' ').length > 5);

const validateSameHashtag = (value) => {
  const array = [];
  return value.trim().split(' ').reduce((acc, curr) => {
    if (!acc) {
      return false;
    }
    if (!array.includes(curr)) {
      array.push(curr);
      return acc;
    }
    return false;
  }, true);
};
const validateCommentFiled = (value) => {
  if (!value.trim()) {
    return true;
  }
  return value.length <= 140;

};
pristine.addValidator(inputHashtagField, validateHashtagFieldTemplate, 'введён невалидный хэштег');
pristine.addValidator(inputHashtagField, validateMaxHashtagCount, 'превышено количество хэштегов');
pristine.addValidator(inputHashtagField, validateSameHashtag, 'хэштеги повторяются');
pristine.addValidator(inputCommentField, validateCommentFiled, 'длина комментария больше 140 символов.');

const body = document.getElementsByTagName('body')[0];

const onDocumentClick = (evt) => {
  const uploadDataErrorMessageWrapper = document.querySelector('.error');
  const uploadDataErrorMessageInner = document.querySelector('.error__inner');
  if (uploadDataErrorMessageInner && !uploadDataErrorMessageInner.contains(evt.target)) {
    uploadDataErrorMessageWrapper.remove();
  }
};

const onCloseUploadDataMessageBtn = (errorElement, closeUploadDataErrorMessageBtn) => () => {
  errorElement.remove();
  closeUploadDataErrorMessageBtn.removeEventListener('click', onCloseUploadDataMessageBtn);
  document.removeEventListener('click', onDocumentClick);
};
const showUploadDataErrorMessage = () => {
  const errorElement = uploadErrorTemplate.cloneNode(true);
  body.insertAdjacentElement('beforeend', errorElement);
  const closeUploadDataErrorMessageBtn = errorElement.querySelector('.error__button');
  closeUploadDataErrorMessageBtn.addEventListener('click', onCloseUploadDataMessageBtn(errorElement, closeUploadDataErrorMessageBtn));
  document.addEventListener('click', onDocumentClick);
};
const onUploadImageEditFormBtnClick = () => {
  closeUploadImageEditForm();
};

const onDocumentKeydown = (evt) => {
  const uploadDataErrorMessage = document.querySelector('.error');
  if (isEscapeKey(evt) && !uploadDataErrorMessage) {
    closeUploadImageEditForm();
  } else if (isEscapeKey(evt) && uploadDataErrorMessage) {
    uploadDataErrorMessage.remove();
    document.removeEventListener('click', onDocumentClick);
  }
};

const getNoUiSliderConfig = ({ effectType }) => {
  let min = 0;
  let max = 1;
  let start = 1;
  let step = 0.1;

  if (effectType === 'marvin') {
    max = 100;
    step = 1;
    start = 100;
  }

  if (effectType === 'phobos') {
    max = 3;
    start = 3;
  }

  if (effectType === 'heat') {
    min = 1;
    max = 3;
    start = 3;
  }
  const configDictionary = {
    range: {
      min,
      max,
    },
    start,
    step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },


  };

  return configDictionary;

};

const getImgUploadPreviewStylesByCurrentEffect = ({ effectType, effectValue }) => {

  const stylesEffectDictionary = {
    chrome: `grayscale(${effectValue})`,
    sepia: `sepia(${effectValue})`,
    marvin: `invert(${effectValue}%)`,
    phobos: `blur(${effectValue}px)`,
    heat: `brightness(${effectValue})`,
  };

  return stylesEffectDictionary[effectType];
};

const onScaleControlBiggerBtnClick = () => {
  scaleControlInput.value = scaleControlInput.value === '100' ? scaleControlInput.value : parseFloat(scaleControlInput.value) + 25;
  imgUploadPreview.style.transform = `scale(${scaleControlInput.value / 100})`;

};

const onScaleControlSmallerBtnClick = () => {
  scaleControlInput.value = scaleControlInput.value === '25' ? scaleControlInput.value : parseFloat(scaleControlInput.value) - 25;
  imgUploadPreview.style.transform = `scale(${scaleControlInput.value / 100})`;
};

const onFocusedInputKeyDown = (evt) => {
  evt.stopPropagation();
};
const onInputOrHashtagFieldFocus = () => {
  inputHashtagField.addEventListener('keydown', onFocusedInputKeyDown);
  inputCommentField.addEventListener('keydown', onFocusedInputKeyDown);
};
const onInputOrHashtagFieldBlur = () => {
  inputHashtagField.removeEventListener('keydown', onFocusedInputKeyDown);
  inputCommentField.removeEventListener('keydown', onFocusedInputKeyDown);
};


function onImgUploadChangeEffectRadioInputChange({ target }) {

  scaleControlInput.value = '100';
  imgUploadPreview.style.transform = `scale(${scaleControlInput.value / 100})`;
  if (target.checked && target.value === 'none') {
    imgUploadPreview.style.filter = '';
    sliderLevelEffectElement.style.display = 'none';
    return;
  }

  sliderLevelEffectElement.style.display = 'block';
  const effectType = target.value;
  const sliderConfig = getNoUiSliderConfig({ effectType });
  if (sliderLevelEffectElement.noUiSlider) {
    sliderLevelEffectElement.noUiSlider.updateOptions(sliderConfig);
  } else {
    noUiSlider.create(sliderLevelEffectElement, sliderConfig);

    sliderLevelEffectElement.noUiSlider.on('update', () => {
      const selectedEffectType = document.querySelector('input[name="effect"]:checked').value;
      const effectValue = sliderLevelEffectElement.noUiSlider.get();

      imgUploadEffectValueInput.value = effectValue;
      const imgUploadPreviewStyles = getImgUploadPreviewStylesByCurrentEffect({ effectType: selectedEffectType, effectValue });
      imgUploadPreview.style.filter = imgUploadPreviewStyles;

    });
  }
}

const onSubmitImgUploadFormBtnClick = (evt) => {
  if (!pristine.validate()) {
    return;
  }
  evt.preventDefault();
  blockSubmitButton();
  const data = new FormData(evt.target);
  sendData(data)
    .then(() => {
      unblockSubmitButton();
      uploadImageEditForm.classList.toggle('hidden');
      body.classList.toggle('modal-open');
      imgUploadForm.reset();
      scaleControlInput.value = '100';
      imgUploadPreview.style.transform = `scale(${scaleControlInput.value / 100})`;
      imgUploadPreview.style.filter = '';
      sliderLevelEffectElement.style.display = 'none';
      showUploadDataSucessMessage();
    })
    .catch(() => showUploadDataErrorMessage())
    .finally(() => unblockSubmitButton());

};

function closeUploadImageEditForm() {
  imgUploadForm.reset();
  uploadImageEditForm.classList.toggle('hidden');
  body.classList.toggle('modal-open');
  imgUploadPreview.style.filter = '';
  imgUpload.value = '';
  scaleControlInput.value = '100';
  imgUploadChangeEffectRadioInput.forEach((radioInput) => radioInput.removeEventListener('change', onImgUploadChangeEffectRadioInputChange));

  const defaultEffect = document.querySelector('.effects__radio[value="none"]');
  defaultEffect.checked = true;
  inputHashtagField.removeEventListener('focus', onInputOrHashtagFieldFocus);
  inputCommentField.removeEventListener('focus', onInputOrHashtagFieldFocus);
  inputHashtagField.removeEventListener('blur', onInputOrHashtagFieldBlur);
  inputCommentField.removeEventListener('blur', onInputOrHashtagFieldBlur);

  scaleControlBiggerBtn.removeEventListener('click', onScaleControlBiggerBtnClick);
  scaleControlSmallerBtn.removeEventListener('click', onScaleControlSmallerBtnClick);
  closeUploadImageEditFormBtn.removeEventListener('click', onUploadImageEditFormBtnClick);
  imgUploadForm.removeEventListener('submit', onSubmitImgUploadFormBtnClick);

  document.removeEventListener('keydown', onDocumentKeydown);
  sliderLevelEffectElement?.noUiSlider?.destroy();
}


function onImgUploadChange() {
  imgUploadChangeEffectRadioInput.forEach((radioInput) => radioInput.addEventListener('change', onImgUploadChangeEffectRadioInputChange));
  scaleControlInput.value = 100;

  scaleControlBiggerBtn.addEventListener('click', onScaleControlBiggerBtnClick);
  scaleControlSmallerBtn.addEventListener('click', onScaleControlSmallerBtnClick);

  closeUploadImageEditFormBtn.addEventListener('click', onUploadImageEditFormBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  inputHashtagField.addEventListener('focus', onInputOrHashtagFieldFocus);
  inputCommentField.addEventListener('focus', onInputOrHashtagFieldFocus);
  inputHashtagField.addEventListener('blur', onInputOrHashtagFieldBlur);
  inputCommentField.addEventListener('blur', onInputOrHashtagFieldBlur);
  imgUploadForm.addEventListener('submit', onSubmitImgUploadFormBtnClick);
  uploadImageEditForm.classList.toggle('hidden');
  body.classList.toggle('modal-open');
}
imgUpload.addEventListener('change', onImgUploadChange);

