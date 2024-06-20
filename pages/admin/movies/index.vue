<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="card">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a New Movie</h2>
        </div>
  
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Movie Name</label>
              <div class="mt-2">
                <input v-model="form.name" id="name" name="name" type="text" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
              </div>
            </div>
  
            <div>
              <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Movie Image</label>
              <div class="mt-2">
                <input @change="handleImageUpload" id="image" name="image" type="file" accept="image/*" required class="block w-full text-gray-900">
              </div>
            </div>
  
            <div>
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div class="mt-2">
                <textarea v-model="form.description" id="description" name="description" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>
  
            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Movie</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { createMovie } from '~/utils/movieService';
  const route = useRoute();
  export default {
    setup() {
      const form = ref({
        name: '',
        image: '',
        description: ''
      });
  
      const router = useRouter();
  
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            form.value.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
  
      const handleSubmit = async () => {
        try {
          const newMovie = await createMovie({
            name: form.value.name,
            image: form.value.image,
            description: form.value.description
          });
          router.push(`/`);
        } catch (error) {
          console.error('Error creating movie:', error);
        }
      };
  
      return {
        form,
        handleImageUpload,
        handleSubmit
      };
    }
  };
  </script>
  
  <style scoped>
  /* Reuse the styles as needed */
  .input-field {
    transition: border-color 0.3s, box-shadow 0.3s;
    width: 100%;
  }
  
  .input-field:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  
  .input-field:hover {
    border-color: var(--color-secondary);
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
  </style>
  