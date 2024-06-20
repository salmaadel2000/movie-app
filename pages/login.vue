<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 login">
    <div class="card">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input v-model="form.password" id="password" name="password" type="password" autocomplete="current-password" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            <p v-if="globalError" class="mt-2 text-sm text-red-600">{{ globalError }}</p>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="/register" class="link font-semibold leading-6">Register now</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { loginUser } from '~/utils/usersService'; 
import useForm from '~/composables/useForm';
import useLocalStorage from '~/composables/useLocalStorage';

export default {
  setup() {
    const { form, errors, globalError, validate } = useForm({
      email: { required: true, email: true },
      password: { required: true, minlength: 6 }
    });

    const { setItem } = useLocalStorage();

    const handleSubmit = async () => {
  if (validate()) {
    try {
      console.log('Email:', form.email);
      console.log('Password:', form.password);

      const user = await loginUser(form.email, form.password);
      console.log('User logged in:', user); 

      setItem('userId', user.id); 
      setItem('userRole', user.role); 

      if (user.role === 'admin') {
        window.location.href = '/admin'; 
      } else {
        window.location.href = '/profile'; 
      }
    } catch (error) {
      console.error('Login error:', error);
      globalError.value = error.message;
    }
  }
};

    return {
      form,
      errors,
      globalError,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.input-field {
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%; /* Ensures input fields take full width */
 padding-left: 20px;
}

.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.input-field:hover {
  border-color: var(--color-secondary);
}

.link {
  color: var(--color-primary);
  transition: color 0.3s;
}

.link:hover {
  color: var(--color-secondary);
}

/* Card style */
.card {
  padding: 2.5rem 2rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .5);
  width: 100%;
  max-width: 400px; /* Adjust this as needed */
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
.bg-indigo-600 {
  background-color: var(--color-secondary);
}

.bg-indigo-600:hover {
  background-color: var(--color-primary);
}

</style>
