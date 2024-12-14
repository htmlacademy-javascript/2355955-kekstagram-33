import { isEscapeKey } from './utils.js';

const fullSizeImgModal = document.querySelector('.big-picture');
const fullSizeImg = fullSizeImgModal.querySelector('.big-picture__img img');
const fullPictureLikesCount = fullSizeImgModal.querySelector('.likes-count');
const fullPictureShowedCommentsCount = fullSizeImgModal.querySelector('.social__comment-shown-count');
const fullPictureTotalCommentsCount = fullSizeImgModal.querySelector('.social__comment-total-count');
const fullPictureDescription = fullSizeImgModal.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const closeFullImgModalBtn = fullSizeImgModal.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.getElementsByTagName('body')[0];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullSizeImgModal();
  }
};

const onCloseFullImgModalBtnClick = () => {
  closeFullSizeImgModal();
};

const createCommentsToFullSizeImg = (comments) => {
  commentsContainer.innerHTML = '';
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
const onCommentLoadBtnClick = (comments) => {
  let end = 5;
  return () => {
    end += 5;
    const nextComments = comments.slice(0, end);
    const showedCountCommets = end < comments.length ? end : comments.length;
    createCommentsToFullSizeImg(nextComments);
    fullPictureShowedCommentsCount.textContent = showedCountCommets;
    if (end > comments.length) {
      commentsLoader.classList.add('hidden');

    }
  };
};

const renderFullSizeImg = ({ url, likes, comments, description }) => {
  const isTotalCommentAmountLessMinValue = comments.length <= 5;
  body.classList.toggle('modal-open');
  fullSizeImg.src = url;
  fullPictureLikesCount.textContent = likes;
  fullPictureShowedCommentsCount.textContent = isTotalCommentAmountLessMinValue ? comments.length : 5;
  fullPictureTotalCommentsCount.textContent = comments.length;
  fullPictureDescription.textContent = description;
  commentsContainer.innerHTML = '';
  createCommentsToFullSizeImg(comments.slice(0, 5));

  document.addEventListener('keydown', onDocumentKeydown);
  closeFullImgModalBtn.addEventListener('click', onCloseFullImgModalBtnClick);

  if (isTotalCommentAmountLessMinValue) {
    commentsLoader.classList.toggle('hidden');
  }
  commentsLoader.addEventListener('click', onCommentLoadBtnClick(comments));
  fullSizeImgModal.classList.toggle('hidden');
};

function closeFullSizeImgModal() {
  fullSizeImgModal.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
  commentsContainer.innerHTML = '';
  closeFullImgModalBtn.removeEventListener('click', onCloseFullImgModalBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.toggle('modal-open');
}

export { renderFullSizeImg };
