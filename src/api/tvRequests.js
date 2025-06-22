// tvRequests.js
const BASE_URL = "https://api.themoviedb.org/3";
const tvRequests = {
  fetchTrending: `${BASE_URL}/trending/tv/week`,
  fetchTopRated: `${BASE_URL}/tv/top_rated`,
  fetchAiringToday: `${BASE_URL}/tv/airing_today`,
  fetchOnTheAir: `${BASE_URL}/tv/on_the_air`,
  fetchActionTV: `${BASE_URL}/discover/tv?with_genres=10759`,
  fetchComedyTV: `${BASE_URL}/discover/tv?with_genres=35`,
  fetchDramaTV: `${BASE_URL}/discover/tv?with_genres=18`,
  fetchDocumentaryTV: `${BASE_URL}/discover/tv?with_genres=99`,
  fetchAnimationTV: `${BASE_URL}/discover/tv?with_genres=16`,
  fetchCrimeTV: `${BASE_URL}/discover/tv?with_genres=80`,
  fetchFamilyTV: `${BASE_URL}/discover/tv?with_genres=10751`,
  fetchKidsTV: `${BASE_URL}/discover/tv?with_genres=10762`,
  fetchMysteryTV: `${BASE_URL}/discover/tv?with_genres=9648`,
  fetchSciFiTV: `${BASE_URL}/discover/tv?with_genres=10765`,
  fetchWarTV: `${BASE_URL}/discover/tv?with_genres=10768`,
  fetchWesternTV: `${BASE_URL}/discover/tv?with_genres=37`,
  fetchTvGenres: `${BASE_URL}/genre/tv/list`,
  searchTV: (query) => `${BASE_URL}/search/tv?query=${query}`,
  getTVDetails: (id) => `${BASE_URL}/tv/${id}`,
  getTVCredits: (id) => `${BASE_URL}/tv/${id}/credits`,
  getTVVideos: (id) => `${BASE_URL}/tv/${id}/videos`,
  getTVSeasons: (id, season) => `${BASE_URL}/tv/${id}/season/${season}`,
  getTVEpisodes: (id, season, episode) =>
    `${BASE_URL}/tv/${id}/season/${season}/episode/${episode}`,
  getSimilarTV: (id) => `${BASE_URL}/tv/${id}/similar`,
  getTVRecommendations: (id) => `${BASE_URL}/tv/${id}/recommendations`,
  getTvShowDetails: (id) => `${BASE_URL}/tv/${id}`,
  getSimilarTvShows: (id) => `${BASE_URL}/tv/${id}/similar`,
  getTvShowVideos: (id) => `${BASE_URL}/tv/${id}/videos`,
  getTvShowExternalIds: (id) => `${BASE_URL}/tv/${id}/external_ids`,
};

export default tvRequests;
