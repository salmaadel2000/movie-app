<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">All Movies</h1>

    <div v-if="loading" class="text-center my-8">
      Loading...
    </div>

    <div v-else class="main">
      <div v-for="movie in movies" :key="movie.id" class="mb-6 p-4 border rounded-lg card">
        <h2 class="text-xl font-semibold mb-2">{{ movie.name }}</h2>
        <p class="text-gray-700 mb-2">{{ movie.description }}</p>
        <img :src="movie.image" alt="Movie Poster" class="mb-2 img">

        <button @click="() => showDetails(movie.id)" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Show details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter from Vue Router
import { fetchAllMovies } from '~/utils/movieService'; // Adjust the path if necessary

const movies = ref([]);
const loading = ref(false);
const router = useRouter();

const loadMovies = async () => {
  try {
    loading.value = true;
    movies.value = await fetchAllMovies(); // Fetch all movies on component mount
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    loading.value = false;
  }
};

const showDetails = (movieId) => {
  console.log(movieId);
  router.push(`admin/movies/${movieId}`);
};

onMounted(() => {
  loadMovies(); 
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.bg-indigo-600 {
  background-color: var(--color-secondary);
}

.bg-indigo-600:hover {
  background-color: var(--color-primary);
}

.card {
  padding: 2.5rem 2rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .5);
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(0, 0, 0, .15);
  margin: 1rem;
  position: relative;
  transform-style: preserve-3d;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card img {
  width: 21rem !important;
  box-shadow: 0 0 0 5px #FFF;
  height: 400px;
}
</style>
