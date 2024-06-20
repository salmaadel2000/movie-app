
<template>
    <div class="container mx-auto py-16">
      <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the admin dashboard.</p>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'admin',
    middleware: 'admin'
  });
  </script>
  