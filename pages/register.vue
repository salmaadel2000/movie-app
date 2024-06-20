<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 register">
    <div class="card">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register a new account</h2>
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
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <div class="mt-2">
              <input v-model="form.address" id="address" name="address" type="text" autocomplete="address" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
              <p v-if="errors.address" class="mt-2 text-sm text-red-600">{{ errors.address }}</p>
            </div>
          </div>

          <div>
            <label for="birthdate" class="block text-sm font-medium leading-6 text-gray-900">Birthdate</label>
            <div class="mt-2">
              <input v-model="form.birthdate" id="birthdate" name="birthdate" type="date" autocomplete="birthdate" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
              <p v-if="errors.birthdate" class="mt-2 text-sm text-red-600">{{ errors.birthdate }}</p>
            </div>
          </div>

          <div>
            <label for="image" class="block text-sm font-medium leading-6 text-gray-900">Upload Image</label>
            <div class="mt-2 relative">
              <input @change="handleImageUpload" id="image" name="image" type="file" accept="image/*" required class="hidden">
              <label for="image" class="file-upload-button cursor-pointer bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Choose File
              </label>
              <p v-if="errors.image" class="mt-2 text-sm text-red-600">{{ errors.image }}</p>
              <p v-if="previewImage" class="mt-2 text-sm text-gray-600">Image selected</p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="form.password" id="password" name="password" type="password" autocomplete="new-password" required class="input-field block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <a href="/login" class="link font-semibold leading-6">Sign in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { registerUser } from '~/utils/usersService';
import useForm from '~/composables/useForm';
import { useRouter } from 'vue-router';
import useLocalStorage from '~/composables/useLocalStorage';

export default {
  setup() {
    const { form, errors, validate } = useForm({
      email: { required: true, email: true },
      address: { required: true },
      birthdate: { required: true },
      image: { required: true },
      password: { required: true, minlength: 6 }
    });

    const previewImage = ref('');
    const router = useRouter();
    const { setItem } = useLocalStorage();

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.value = e.target.result;
          form.image = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async () => {
      if (validate()) {
        try {
          const user = await registerUser({
            email: form.email,
            address: form.address,
            birthdate: form.birthdate,
            image: form.image,
            password: form.password
          });
          console.log('User registered successfully:', user);
          setItem('userId', user.id);
          router.push('/');
        } catch (error) {
          console.error('Registration error:', error);
        }
      }
    };

    return {
      form,
      errors,
      previewImage,
      handleImageUpload,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.card {
  padding: 2.5rem 2rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .5);
  width: 500px !important;
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

.input-field {
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%; /* Ensures input fields take full width */
  padding-left: 20px;
}
.file-upload-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
  transition: background-color 0.2s;
  background-color: var(--color-secondary);
  color: #fff;
  cursor: pointer;
}

.file-upload-button:hover {
  background-color: var(--color-primary);
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

.bg-indigo-600 {
  background-color: var(--color-secondary);
}

.bg-indigo-600:hover {
  background-color: var(--color-primary);
}


</style>
