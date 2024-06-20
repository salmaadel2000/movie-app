<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div v-if="user" class="card">
      <img v-if="user.image" :src="user.image" alt="User Image">
      <div class="infos">
        <div class="name">
          <h2>Profile</h2>
        </div>
        <p class="text"><strong>Email:</strong> {{ user.email }}</p>
        <p class="text"><strong>Address:</strong> {{ user.address }}</p>
        <p class="text"><strong>Birthdate:</strong> {{ user.birthdate }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">Loading...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchUserData } from '~/utils/usersService';
import useLocalStorage from '~/composables/useLocalStorage';

export default {
  setup() {
    const user = ref(null);
    const { getItem } = useLocalStorage();

    const fetchUser = async () => {
      try {
        const userId = getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        user.value = await fetchUserData(userId);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    onMounted(() => {
      fetchUser();
    });

    return {
      user
    };
  }
};
</script>

<style scoped>
  .card {
    padding: 2.5rem 2rem;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .5);
    width: 700px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .15);
    margin: 1rem;
    position: relative;
    transform-style: preserve-3d;
    overflow: hidden;
  }
  
 
  
  .infos {
    margin-left: 1.5rem;
  }
  
  .name {
    margin-bottom: 1.1rem;
  }
  
  .name h2 {
    font-size: 1.8rem;
  }
  
  .name h4 {
    font-size: .9rem;
    color: #333;
  }
  
  .text {
    font-size: .9rem;
    margin-bottom: 1rem;
  }
  
  .stats {
    margin-bottom: 1rem;
  }
  
  .stats li {
    min-width: 5rem;
  }
  
  .stats li h3 {
    font-size: .99rem;
  }
  
  .stats li h4 {
    font-size: .75rem;
  }
  
  .links button {
    font-family: 'Poppins', sans-serif;
    min-width: 120px;
    padding: .5rem;
    border: 1px solid #222;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all .25s linear;
  }
  
  .links .follow,
  .links .view:hover {
    background-color: #222;
    color: #FFF;
  }
  
  .links .view,
  .links .follow:hover {
    background-color: transparent;
    color: #222;
  }
  
  @media screen and (max-width: 450px) {
    .card {
      display: block;
    }
  
    .infos {
      margin-left: 0;
      margin-top: 1.5rem;
    }
  
    .links button {
      min-width: 100px;
    }
  }
  
</style>
