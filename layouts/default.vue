<template>
  <div class="main">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <h1>Cinema</h1>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <NuxtLink to="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</NuxtLink>
                <NuxtLink v-if="isAuthenticated" to="/profile" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</NuxtLink>
                <NuxtLink v-if="isAdmin" to="/admin" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Admin Dashboard</NuxtLink>
                <NuxtLink v-if="!isAuthenticated" to="/login" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</NuxtLink>
                <NuxtLink v-if="!isAuthenticated" to="/register" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</NuxtLink>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center">
            <div class="flex space-x-4">
              <a v-if="isAuthenticated" @click="logout" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer">Logout</a>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <NuxtLink to="/" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Home</NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/profile" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</NuxtLink>
          <NuxtLink v-if="isAdmin" to="/admin" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Admin Dashboard</NuxtLink>
          <a v-if="isAuthenticated" @click="logout" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer">Logout</a>
          <NuxtLink v-else to="/login" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/register" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</NuxtLink>
        </div>
      </div>
    </nav>
    <NuxtPage />
    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2024 Cinema</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useLocalStorage from '~/composables/useLocalStorage';

const { getItem, setItem, removeItem } = useLocalStorage();
const router = useRouter();
const isAuthenticated = ref(false);
const isAdmin = ref(false);

const checkAuthStatus = () => {
  const userId = getItem('userId');
  const userRole = getItem('userRole');
  isAuthenticated.value = !!userId;
  isAdmin.value = userRole === 'admin';
};

const logout = async () => {
  try {
    removeItem('userId');
    removeItem('userRole');
    isAuthenticated.value = false;
    isAdmin.value = false;
    console.log('Logged out successfully');
    await router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

onMounted(checkAuthStatus);
</script>

<style scoped>
.main {
  width: 80vw;
  height: 100vh; /* Full height of the viewport */
}

h1 {
  color: var(--color-secondary);
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
}
</style>
