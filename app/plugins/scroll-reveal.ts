export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    // SSR hook – просто возвращаем пустые пропсы, чтобы рендерер не падал
    getSSRProps() {
      return {}
    },

    mounted(el: HTMLElement) {
      // На сервере этот хук не вызывается, но на всякий случай проверим
      if (import.meta.server) return

      el.classList.add('scroll-reveal')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-reveal-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08 }
      )

      observer.observe(el)
    }
  })
})

