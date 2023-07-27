import { fetchGallery } from './js/search';
import {
  renderGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
} from './js/gallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const submitPhoto = document.querySelector('[type=submit]');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
const perPage = 40;
let totalHits = 0;
let isFirstSearch = true;

let lightbox = null;

submitPhoto.addEventListener('click', event => {
  event.preventDefault();

  const searchQuery = document.querySelector('[name=searchQuery]').value.trim();

  if (searchQuery === '') {
    return;
  }

  if (document.querySelector('.gallery').children.length) {
    hideLoadMoreButton();
    clearGallery();
    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }
  }

  currentPage = 1;
  isFirstSearch = true;

  searchImages(searchQuery);
});

loadMoreButton.addEventListener('click', event => {
  event.preventDefault();
  const searchQuery = document.querySelector('[name=searchQuery]').value.trim();
  currentPage++;
  searchImages(searchQuery);
});

function searchImages(searchQuery) {
  fetchGallery(searchQuery, currentPage)
    .then(gallery => {
      if (!gallery || gallery.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      totalHits = gallery.total;
      if (isFirstSearch) {
        showTotalHitsMessage(totalHits);
        isFirstSearch = false;
      }

      renderGallery(gallery.hits);

      if (currentPage < Math.ceil(totalHits / perPage)) {
        showLoadMoreButton();
      } else {
        showEndMessage();
      }

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.photo-card a');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function showTotalHitsMessage(totalHits) {
  const message = `Hooray! We found ${totalHits} images.`;
  Notiflix.Notify.success(message);
}