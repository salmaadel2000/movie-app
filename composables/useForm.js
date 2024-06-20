import { reactive, ref } from 'vue';

export default function useForm(initialValues) {
  const form = reactive({});
  const errors = ref({});
  const globalError = ref(null);

  for (const key in initialValues) {
    form[key] = '';
  }

  const validate = () => {
    errors.value = {};
    let valid = true;

    for (const field in initialValues) {
      if (initialValues[field].required && !form[field]) {
        errors.value[field] = 'This field is required';
        valid = false;
      } else if (initialValues[field].email && !/\S+@\S+\.\S+/.test(form[field])) {
        errors.value[field] = 'This is not a valid email';
        valid = false;
      } else if (initialValues[field].minlength && form[field].length < initialValues[field].minlength) {
        errors.value[field] = `This field must be at least ${initialValues[field].minlength} characters`;
        valid = false;
      }
    }

    return valid;
  };

  return { form, errors, globalError, validate };
}
