
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchUserData } from '~/utils/usersService';

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/');
        return;
      }

      const user = await fetchUserData(userId);
      if (!user || user.role !== 'admin') {
        router.push('/');
      }
    });
  } catch (error) {
    console.error('Error checking user role:', error);
    router.push('/');
  }
});
