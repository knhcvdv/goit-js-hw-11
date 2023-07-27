import Notiflix from 'notiflix';
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

loadMoreButton.style.display = 'none';

export function renderGallery(images) {
  images.forEach(image => {
    const photoCard = createPhotoCard(image);
    gallery.appendChild(photoCard);
  });
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

export function showEndMessage() {
  hideLoadMoreButton();
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function createPhotoCard(image) {
  const {
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
    largeImageURL,
  } = image;

  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const link = document.createElement('a');
  link.href = largeImageURL;

  const img = document.createElement('img');
  img.src = webformatURL;
  img.alt = tags;
  img.loading = 'lazy';

  link.appendChild(img);
  photoCard.appendChild(link);

  const info = document.createElement('div');
  info.classList.add('info');

  const likesItem = createInfoItem('Likes', likes);
  const viewsItem = createInfoItem('Views', views);
  const commentsItem = createInfoItem('Comments', comments);
  const downloadsItem = createInfoItem('Downloads', downloads);

  info.append(likesItem, viewsItem, commentsItem, downloadsItem);
  photoCard.appendChild(info);

  return photoCard;
}

function createInfoItem(label, value) {
  const item = document.createElement('p');
  item.classList.add('info-item');
  item.innerHTML = `<b>${label}</b> ${value}`;

  return item;
}