const API_KEY = '38454013-17980eddf6a7bc61211618417';

export async function fetchGallery(searchQuery, countPage) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${countPage}`;

  try {
    const response = await fetch(url);
    const gallery = await response.json();
    return gallery;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}