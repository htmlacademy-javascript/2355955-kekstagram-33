import { PHOTOS_URLS, COMMENTS_AVATAR_URLS, DESCRIPTION_TEMPLATE, COMMENT_MESSAGE_TEMPLATE, COMMENT_AUTHOR_NAMES } from './constants.js';
import { getRandomInteger, createRandomIndexFromRangeGenerator } from './utils.js';

const getPublishPhotoId = createRandomIndexFromRangeGenerator(0, 25);
const getPublishPhotoIndex = createRandomIndexFromRangeGenerator(0, 25);

const getPublishPhotoDescription = () => {

  const minDescriptionLength = 10;
  const maxDescriptionLength = DESCRIPTION_TEMPLATE.length - 10;

  const firstIndex = getRandomInteger(minDescriptionLength, maxDescriptionLength);
  const secondIndex = getRandomInteger(minDescriptionLength, maxDescriptionLength);

  const start = Math.min(firstIndex, secondIndex);
  const end = Math.max(firstIndex, secondIndex);

  return start === end ? DESCRIPTION_TEMPLATE.slice(0, 11) : DESCRIPTION_TEMPLATE.slice(start, end);
};

const getCommentMessage = () => {
  const firstIndex = getRandomInteger(0, COMMENT_MESSAGE_TEMPLATE.length);
  const secondIndex = getRandomInteger(0, COMMENT_MESSAGE_TEMPLATE.length);

  const start = Math.min(firstIndex, secondIndex);
  const end = Math.max(firstIndex, secondIndex);

  return start === end ? COMMENT_MESSAGE_TEMPLATE.slice(0, 2) : COMMENT_MESSAGE_TEMPLATE.slice(start, end);
};

const getCommentAuthorName = () => {
  const nameIndex = getRandomInteger(0, COMMENT_AUTHOR_NAMES.length - 1);
  return COMMENT_AUTHOR_NAMES[nameIndex];
};

const getCommentAuthorId = createRandomIndexFromRangeGenerator();
const getComments = (commentsNumber) => {
  const comments = [];

  const generateCommentAuthorAvatarIndex = createRandomIndexFromRangeGenerator(0, COMMENTS_AVATAR_URLS.length - 1);
  const getCommentAuthorAvatarUrl = () => {
    const avatarIndex = generateCommentAuthorAvatarIndex();
    return COMMENTS_AVATAR_URLS[avatarIndex || 0];
  };


  while (comments.length < commentsNumber) {
    const id = getCommentAuthorId();
    const avatar = getCommentAuthorAvatarUrl();
    const message = getCommentMessage().join(' ');
    const name = getCommentAuthorName();
    const comment = { id, avatar, message, name };

    comments.push(comment);
  }

  return comments;
};

const getMockPhotoDescriptionEntity = () => {
  const id = getPublishPhotoId();
  const url = PHOTOS_URLS[getPublishPhotoIndex()];
  const description = getPublishPhotoDescription();
  const likes = getRandomInteger(15, 200);

  const commentsNumber = getRandomInteger(0, 25);
  const comments = getComments(commentsNumber);
  const res = { id, url, description, likes, comments };

  return res;

};

export const createMockPhotosDescriptionData = () => Array.from({ length: 25 }, getMockPhotoDescriptionEntity);

