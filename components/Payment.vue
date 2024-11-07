<template>
  <div v-if="isVisible" class="overlay">
    <div class="popup">
      <div class="loading-screen">
        <div class="spinner"></div>
        <p>正在唤起{{ title }}，请稍候...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const isVisible = ref(false)
  const typeRef = ref(0)
  const title = computed(() => (typeRef.value ? '微信' : '支付宝'))
  const show = (type) => {
    typeRef.value = type
    isVisible.value = true

    setTimeout(() => {
      window.location.href = typeRef.value ? 'weixin://' : 'alipay://'
      setTimeout(() => {
        hide()
      }, 3000)
    }, 1000)
  }
  const hide = () => {
    isVisible.value = false
  }

  defineExpose({ show, hide })
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .popup {
    background-color: white;
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 300px;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    margin-top: 20px;
    font-size: 16px;
    color: #333;
  }
</style>
