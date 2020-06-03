import { TMDB_API_KEY } from 'react-native-dotenv'

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + TMDB_API_KEY + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getNewFilmsFromApi(page) {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + TMDB_API_KEY + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr' + "&page=" + page
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getTopRatedFilmsFromApi(page) {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + TMDB_API_KEY + '&language=fr' + "&page=" + page
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name
}

export function getFilmDetailFromApi(id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + TMDB_API_KEY + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
