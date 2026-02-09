import type { BookingFormState } from '~/types'

export function useBooking() {
  const toast = useToast()
  const loading = ref(false)

  async function submitBooking(data: BookingFormState) {
    loading.value = true
    try {
      await $fetch('/api/notify', {
        method: 'POST',
        body: {
          type: data.type,
          serviceType: data.serviceType,
          serviceTitle: data.serviceTitle,
          name: data.name,
          phone: data.phone,
          date: data.date,
          comment: data.comment
        }
      })

      toast.add({
        title: 'Заявка отправлена!',
        description: 'Наш менеджер свяжется с вами в ближайшее время.',
        color: 'success'
      })

      return true
    }
    catch {
      toast.add({
        title: 'Ошибка отправки',
        description: 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.',
        color: 'error'
      })

      return false
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    submitBooking
  }
}
