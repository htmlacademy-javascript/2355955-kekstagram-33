const PHOTOS_URLS = Array.from({ length: 25 }, (_, i) => `photos/${i + 1}.jpg`);
const COMMENTS_AVATAR_URLS = Array.from({ length: 25 }, (_, i) => `img/avatart/${i + 1}.svg`);
const DESCRIPTION_TEMPLATE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const COMMENT_MESSAGE_TEMPLATE = `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`.split('\n')
const COMMENT_AUTHOR_NAMES = ['Артем', 'Роман', 'Николай', 'Георгий', 'Евгений', 'Никита', 'Андрей', 'Руслан', 'Михаил', 'Василий'];

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
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

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

const getPublishPhotoId = createRandomIndexFromRangeGenerator(0, 25);
const getPublishPhotoIndex = createRandomIndexFromRangeGenerator(0, 25);
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

Array.from({ length: 25 }, getMockPhotoDescriptionEntity);
