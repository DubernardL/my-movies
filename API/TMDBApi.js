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

export function getCategoriesFromApi() {
  return fetch('https://api.themoviedb.org/3/genre/movie/list' + '?api_key=' + TMDB_API_KEY + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export async function getSimilarMovies(movie_id, page) {
  console.log('PAGE FROM API:' + page)
  let response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${TMDB_API_KEY}&language=fr&page=${page}`)
  let data = await response.json()
  return data
}

export async function getMoviesByGenre(genres_movies, page) {
  let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genres_movies.join()}&sort_by=popularity.desc&language=fr&page=${page}`)
  let data = await response.json()
  return data
}

export async function getPeople(query) {
  let response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${query}&language=fr&page=1`)
  let data = await response.json()
  return data
}

export async function getMoviesByPeople(peoples, page) {
  const peoples_id = []
  peoples.forEach((people) => { peoples_id.push(people.id) })
  let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_people=${peoples_id.join()}&sort_by=popularity&language=fr&page=1`)
  let data = await response.json()
  return data
}
