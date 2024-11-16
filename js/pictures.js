import { createMockPhotosDescriptionData } from './mock-data.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const mockPhotosDescriptionData = createMockPhotosDescriptionData();
mockPhotosDescriptionData.forEach(({ url, likes, comments, description }) => {
  const clonedPictureTemplate = pictureTemplate.cloneNode(true);
  const picture = clonedPictureTemplate.querySelector('.picture__img');
  const pictureCommentsCount = clonedPictureTemplate.querySelector('.picture__comments');
  const pictureLikesCount = clonedPictureTemplate.querySelector('.picture__likes');
  picture.src = url;
  picture.alt = description;

  pictureCommentsCount.textContent = comments.length;
  pictureLikesCount.textContent = likes;

  picturesContainer.append(clonedPictureTemplate);
});
