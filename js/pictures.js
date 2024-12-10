import { renderFullSizeImg } from './full-size-image.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const renderPhoto = ({ url, likes, comments, description }) => {
  const clonedPictureTemplate = pictureTemplate.cloneNode(true);
  const picture = clonedPictureTemplate.querySelector('.picture__img');
  const pictureCommentsCount = clonedPictureTemplate.querySelector('.picture__comments');
  const pictureLikesCount = clonedPictureTemplate.querySelector('.picture__likes');
  picture.src = url;
  picture.alt = description;

  pictureCommentsCount.textContent = comments.length;
  pictureLikesCount.textContent = likes;
  clonedPictureTemplate.addEventListener('click', () => {
    renderFullSizeImg({ url, likes, comments, description });
  });

  picturesContainer.append(clonedPictureTemplate);
};

export const renderPhotosList = (data) => {
  data.forEach(renderPhoto);
};
