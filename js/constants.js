const PHOTOS_URLS = Array.from({ length: 25 }, (_, i) => `photos/${i + 1}.jpg`);
const COMMENTS_AVATAR_URLS = Array.from({ length: 25 }, (_, i) => `img/avatart/${i + 1}.svg`);
const DESCRIPTION_TEMPLATE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const COMMENT_MESSAGE_TEMPLATE = `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`.split('\n');
const COMMENT_AUTHOR_NAMES = ['Артем', 'Роман', 'Николай', 'Георгий', 'Евгений', 'Никита', 'Андрей', 'Руслан', 'Михаил', 'Василий'];

export { PHOTOS_URLS, COMMENTS_AVATAR_URLS, DESCRIPTION_TEMPLATE, COMMENT_MESSAGE_TEMPLATE, COMMENT_AUTHOR_NAMES };
