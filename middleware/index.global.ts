export default defineNuxtRouteMiddleware((to, from) => {
  if(to.fullPath === '/') {
    return navigateTo('/games/fruits')
  }
})