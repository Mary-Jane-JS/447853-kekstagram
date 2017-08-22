'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

appendPhotos();
updateGalleryOverlay();
document.querySelector('.upload-overlay').classList.add('hidden');

function generatePictureArray() {
  var NUMBER_OF_PICTURES = 25;
  var pictures = [];

  for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
    pictures.push({
      url: 'photos/' + generateRandom(1, 25) + '.jpg',
      likes: generateRandom(15, 200),
      comments: COMMENTS[generateRandom(0, COMMENTS.length - 1)],
      commentsNumber: generateRandom(1, 3)
    });
  }
  return pictures;
}

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function renderPhoto(picture) {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  return pictureElement;
}

function renderOverlayPhoto(picture) {
  var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');

  galleryOverlayPreview.querySelector('.gallery-overlay-image').src = picture.url;
  galleryOverlayPreview.querySelector('.comments-count').textContent = picture.commentsNumber;
  galleryOverlayPreview.querySelector('.likes-count').textContent = picture.likes;
  return galleryOverlayPreview;
}

function appendPhotos() {
  var photos = generatePictureArray();
  var fragment = document.createDocumentFragment();
  var picturesElement = document.querySelector('.pictures');

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesElement.appendChild(fragment);
}

function updateGalleryOverlay() {
  var photo = generatePictureArray()[0];
  var fragment = document.createDocumentFragment();
  var galleryOverlayElement = document.querySelector('.gallery-overlay');

  fragment.appendChild(renderOverlayPhoto(photo));
  galleryOverlayElement.appendChild(fragment);
  galleryOverlayElement.classList.remove('hidden');
}


