'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var galleryOverlay = document.querySelector('.gallery-overlay');

appendPhotos();
document.querySelector('.upload-overlay').classList.add('hidden');
initHandlers();

function generatePictureArray() {
  var NUMBER_OF_PICTURES = 25;
  var pictures = [];

  for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
    var index = i + 1;

    pictures.push({
      url: 'photos/' + index + '.jpg',
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
  var pictureLink = pictureElement.querySelector('.picture');
  var commentNumberElem = document.createElement('span');
  var pictureElementItems = {
    img: pictureElement.querySelector('img'),
    comments: pictureElement.querySelector('.picture-comments'),
    likes: pictureElement.querySelector('.picture-likes')
  };

  commentNumberElem.classList.add('picture-comments-num');
  commentNumberElem.classList.add('hidden');
  commentNumberElem.textContent = picture.commentsNumber;
  pictureLink.appendChild(commentNumberElem);
  pictureElementItems.img.setAttribute('tabindex', 0);
  pictureElementItems.img.src = picture.url;
  pictureElementItems.comments.textContent = picture.comments;
  pictureElementItems.likes.textContent = picture.likes;

  pictureLink.addEventListener('click', function (event) {
    event.preventDefault();
    updateGalleryOverlay(event.currentTarget);
  });
  pictureLink.addEventListener('keydown', onOverlayEnterPress(event));
  return pictureElement;
}

function renderOverlayPhoto(picture) {
  var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');

  galleryOverlayPreview.querySelector('.gallery-overlay-image').src = picture.querySelector('img').src;
  galleryOverlayPreview.querySelector('.comments-count').textContent = picture.querySelector('.picture-comments-num').textContent;
  galleryOverlayPreview.querySelector('.likes-count').textContent = picture.querySelector('.picture-likes').textContent;
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

function updateGalleryOverlay(photo) {
  galleryOverlay.appendChild(renderOverlayPhoto(photo));
  openOverlay();
}

function initHandlers() {
  var closeBtn = document.querySelector('.gallery-overlay-close');

  closeBtn.setAttribute('tabindex', 1);
  closeBtn.addEventListener('click', function () {
    closeOverlay();
  });

  closeBtn.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      closeOverlay();
    }
  });
}

function onOverlayEnterPress(event) {
  if (event && event.keyCode === 13) {
    updateGalleryOverlay(event.currentTarget);
  }
}

function openOverlay() {
  galleryOverlay.classList.remove('hidden');
}

function closeOverlay() {
  galleryOverlay.classList.add('hidden');
}
