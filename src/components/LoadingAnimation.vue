<template>
    <div class="loading-animation" v-if="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .loading-animation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  
    i {
      font-size: 5rem;
      color: #ff00fb;
      animation: rotate 2s linear infinite;
    }
  
    p {
      font-size: 2rem;
      color: #ff00fb;
      margin-top: 20px;
    }
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>