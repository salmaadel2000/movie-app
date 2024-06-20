<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="card">
      <div v-if="movie" class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img :src="movie.image" alt="Movie Image" class="w-full h-64 object-cover rounded-md">
        <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ movie.name }}</h2>
        <p class="mt-4 text-center text-sm text-gray-600">{{ movie.description }}</p>
        <button v-if="isAdmin" @click="handleDeleteMovie" class="mt-6 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete Movie</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchMovieById, deleteMovie as deleteMovieService } from '~/utils/movieService'
import useLocalStorage from '~/composables/useLocalStorage'

export default {
  setup() {
    const movie = ref(null)
    const route = useRoute()
    const router = useRouter()
    const movieId = route.params.id
    const { getItem } = useLocalStorage()
    const isAdmin = ref(false)

    const fetchMovie = async () => {
      movie.value = await fetchMovieById(movieId)
    }

    const handleDeleteMovie = async () => {
      try {
        await deleteMovieService(movieId)
        router.push('/')
      } catch (error) {
        console.error('Error deleting movie:', error)
      }
    }

    onMounted(() => {
      fetchMovie()
      const userRole = getItem('userRole')
      if (userRole === 'admin') {
        isAdmin.value = true
      }
    })

    return {
      movie,
      handleDeleteMovie,
      isAdmin
    }
  }
}
</script>

<style scoped>
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
}
</style>
