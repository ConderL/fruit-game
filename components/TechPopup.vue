<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup">
      <h2 class="popup-title">{{ props.title }}</h2>
      <slot></slot>
      <button @click="closePopup" class="popup-close">关闭</button>
    </div>
  </div>
</template>

<script setup>
  const isVisible = ref(false)
  const props = defineProps({
    title: {
      type: String,
      default: '标题',
    },
  })

  const openPopup = () => {
    isVisible.value = true
  }

  const closePopup = () => {
    isVisible.value = false
  }

  defineExpose({
    openPopup,
    closePopup,
  })
</script>

<style scoped>
  /* 确保整个页面覆盖 */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.5s ease-in-out;
    z-index: 1000;
  }

  /* 弹窗的基础样式 */
  .popup {
    background: linear-gradient(145deg, #1a202c, #2d3748);
    color: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    text-align: center;
    transform: scale(0.8);
    animation: popupAnimation 0.6s ease-out forwards;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px); /* 添加模糊背景 */
  }

  /* 弹窗标题 */
  .popup-title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow:
      0 0 20px #00bfff,
      0 0 30px #00bfff,
      0 0 40px #00bfff; /* 蓝色光晕 */
  }

  /* 弹窗内容 */
  .popup-content {
    font-size: 18px;
    margin-bottom: 30px;
    opacity: 0;
    animation: fadeInContent 1s ease-in-out forwards;
    text-shadow:
      0 0 15px rgba(255, 255, 255, 0.3),
      0 0 25px rgba(255, 255, 255, 0.3); /* 柔光效果 */
  }

  /* 关闭按钮 */
  .popup-close {
    background-color: #ff0080;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
    box-shadow: 0 5px 15px rgba(255, 0, 128, 0.5);
    transition: all 0.3s ease;
  }

  .popup-close:hover {
    background-color: #d7006f;
    box-shadow: 0 10px 20px rgba(255, 0, 128, 0.7);
    transform: translateY(-2px);
  }

  /* 漂浮光效 */
  .popup-close:active {
    transform: translateY(2px);
  }

  /* 3D弹窗动画 */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popupAnimation {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeInContent {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
