import { isEscapeKey } from './utils.js';

const fullSizeImgModal = document.querySelector('.big-picture');
const fullSizeImg = fullSizeImgModal.querySelector('.big-picture__img img');
const fullPictureLikesCount = fullSizeImgModal.querySelector('.likes-count');
const fullPictureShowedCommentsCount = fullSizeImgModal.querySelector('.social__comment-shown-count');
const fullPictureTotalCommentsCount = fullSizeImgModal.querySelector('.social__comment-total-count');
const fullPictureDescription = fullSizeImgModal.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = fullSizeImgModal.querySelector('.comments-loader');
const closeFullImgModalBtn = fullSizeImgModal.querySelector('.big-picture__cancel');

const body = document.getElementsByTagName('body')[0];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullSizeImgModal();
  }
};

const onCloseFullImgModalBtnClick = () => {
  closeFullSizeImgModal();
};

function closeFullSizeImgModal() {
  fullSizeImgModal.classList.toggle('hidden');
  commentsContainer.innerHTML = '';
  closeFullImgModalBtn.removeEventListener('click', onCloseFullImgModalBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.toggle('modal-open');
}


const createCommentsToFullSizeImg = (comments) => {
  comments.forEach(({ avatar, name, message }) => {
    const clonedCommentTemplate = commentTemplate.cloneNode(true);
    const commentAuthorAvatar = clonedCommentTemplate.querySelector('.social__picture');

    commentAuthorAvatar.src = avatar;
    commentAuthorAvatar.alt = name;

    const commentMessage = clonedCommentTemplate.querySelector('.social__text');
    commentMessage.textContent = message;
    commentsContainer.append(clonedCommentTemplate);

  });
};

const renderFullSizeImg = ({ url, likes, comments, description }) => {
  body.classList.toggle('modal-open');
  commentsLoader.classList.toggle('hidden');
  fullPictureTotalCommentsCount.classList.toggle('hidden');

  fullSizeImg.src = url;
  fullPictureLikesCount.textContent = likes;
  fullPictureShowedCommentsCount.textContent = comments.length;
  fullPictureTotalCommentsCount.textContent = comments.length;
  fullPictureDescription.textContent = description;
  createCommentsToFullSizeImg(comments);

  document.addEventListener('keydown', onDocumentKeydown);
  closeFullImgModalBtn.addEventListener('click', onCloseFullImgModalBtnClick);


  fullSizeImgModal.classList.toggle('hidden');

};

export { renderFullSizeImg };
