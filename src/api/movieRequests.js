// movieRequests.js
const BASE_URL = "https://api.themoviedb.org/3";

const movieRequests = {
  fetchTrending: `${BASE_URL}/trending/movie/week`,
  fetchTopRated: `${BASE_URL}/movie/top_rated`,
  fetchUpcoming: `${BASE_URL}/movie/upcoming`,
  fetchNowPlaying: `${BASE_URL}/movie/now_playing`,
  fetchActionMovies: `${BASE_URL}/discover/movie?with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?with_genres=35`,
  fetchDramaMovies: `${BASE_URL}/discover/movie?with_genres=18`,
  fetchDocumentaryMovies: `${BASE_URL}/discover/movie?with_genres=99`,
  fetchAnimationMovies: `${BASE_URL}/discover/movie?with_genres=16`,
  fetchCrimeMovies: `${BASE_URL}/discover/movie?with_genres=80`,
  fetchFamilyMovies: `${BASE_URL}/discover/movie?with_genres=10751`,
  fetchFantasyMovies: `${BASE_URL}/discover/movie?with_genres=14`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?with_genres=27`,
  fetchMysteryMovies: `${BASE_URL}/discover/movie?with_genres=9648`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?with_genres=10749`,
  fetchSciFiMovies: `${BASE_URL}/discover/movie?with_genres=878`,
  fetchThrillerMovies: `${BASE_URL}/discover/movie?with_genres=53`,
  fetchWarMovies: `${BASE_URL}/discover/movie?with_genres=10752`,
  fetchWesternMovies: `${BASE_URL}/discover/movie?with_genres=37`,
  fetchMovieGenres: `${BASE_URL}/genre/movie/list`,
  searchMovies: (query) => `${BASE_URL}/search/movie?query=${query}`,
  getMovieDetails: (id) => `${BASE_URL}/movie/${id}`,
  getMovieCredits: (id) => `${BASE_URL}/movie/${id}/credits`,
  getMovieVideos: (id) => `${BASE_URL}/movie/${id}/videos`,
  getMovieReviews: (id) => `${BASE_URL}/movie/${id}/reviews`,
  getSimilarMovies: (id) => `${BASE_URL}/movie/${id}/similar`,
  getMovieRecommendations: (id) => `${BASE_URL}/movie/${id}/recommendations`,
  getMovieWatchProviders: (id) => `${BASE_URL}/movie/${id}/watch/providers`,
  getMovieKeywords: (id) => `${BASE_URL}/movie/${id}/keywords`,
  getMovieExternalIds: (id) => `${BASE_URL}/movie/${id}/external_ids`,
  getMovieReleaseDates: (id) => `${BASE_URL}/movie/${id}/release_dates`,
  searchMulti: (query) => `${BASE_URL}/search/multi?query=${query}`,
};

export default movieRequests;
