
const apiUrl = 'http://localhost:3002/movies';

async function fetchAllMovies() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

async function createMovie(movieData) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error('Failed to create movie');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
}

async function deleteMovie(movieId) {
  try {
    const response = await fetch(`${apiUrl}/${movieId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
    return true;
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}

async function fetchMovieById(movieId) {
    try {
      const response = await fetch(`${apiUrl}/${movieId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  }
  

export { fetchAllMovies, createMovie, deleteMovie, fetchMovieById };
