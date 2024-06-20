<template>
  <div class="min-h-screen flex flex-col main">
    <!-- Header -->
    <header class="bg-gray-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl">Admin Dashboard</h1>
        <nav>
          <ul class="flex space-x-4">
            <li><NuxtLink to="/admin" class="hover:underline">Dashboard</NuxtLink></li>
            <li v-if="isAdmin"><NuxtLink to="/admin/movies" class="hover:underline"> Create Movies</NuxtLink></li>
            <li @click="logout" class="hover:underline cursor-pointer">Logout</li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="flex-grow bg-gray-100">
      <div class="container mx-auto py-8">
        <NuxtChild :layout="'admin'"/>
      </div>
    </main>
    <footer class="bg-gray-900 text-white p-4 text-center">
      <div class="container mx-auto">
        <p>&copy; 2024 Cinema Admin</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchUserData } from '~/utils/usersService';
import { useRouter } from 'vue-router';
import useLocalStorage from '~/composables/useLocalStorage';

const router = useRouter();
const { getItem, removeItem } = useLocalStorage();
const isAdmin = ref(false);

const fetchUserRole = async () => {
  try {
    const userId = getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const user = await fetchUserData(userId);
    isAdmin.value = user.role === 'admin';
  } catch (error) {
    console.error('Error fetching user role:', error);
  }
};

const logout = async () => {
  try {
    removeItem('userId');
    console.log('Logged out successfully');
    await router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

onMounted(fetchUserRole);
</script>

<style scoped>
.main {
  width: 80vw;
  height: 100vh; /* Full height of the viewport */
   /* box-shadow: -30px 0 30px rgba(0, 0, 0, 0.5), 30px 0 30px rgba(0, 0, 0, 0.5); */
}

</style>
