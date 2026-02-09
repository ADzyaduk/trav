<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

interface Props {
  serviceType?: 'excursion' | 'yacht'
  serviceTitle?: string
}

const props = defineProps<Props>()

const open = defineModel<boolean>({ default: false })

const { loading, submitBooking } = useBooking()

const state = reactive({
  name: '',
  phone: '',
  date: '',
  comment: ''
})

const serviceLabel = computed(() => {
  if (props.serviceTitle) return props.serviceTitle
  if (props.serviceType === 'excursion') return 'Экскурсия'
  if (props.serviceType === 'yacht') return 'Яхта'
  return ''
})

const modalTitle = computed(() => {
  if (props.serviceTitle) return `Бронирование: ${props.serviceTitle}`
  return 'Оставить заявку'
})

function validate(s: Partial<typeof state>): FormError[] {
  const errors: FormError[] = []
  if (!s.name?.trim()) errors.push({ name: 'name', message: 'Введите ваше имя' })
  if (!s.phone?.trim()) errors.push({ name: 'phone', message: 'Введите номер телефона' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  const success = await submitBooking({
    type: 'booking',
    serviceType: props.serviceType,
    serviceTitle: serviceLabel.value,
    name: event.data.name,
    phone: event.data.phone,
    date: event.data.date,
    comment: event.data.comment
  })

  if (success) {
    state.name = ''
    state.phone = ''
    state.date = ''
    state.comment = ''
    open.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" :title="modalTitle" :description="serviceLabel ? `Услуга: ${serviceLabel}` : 'Заполните форму и мы свяжемся с вами'">
    <template #body>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Ваше имя" name="name" required>
          <UInput
            v-model="state.name"
            placeholder="Иван Иванов"
            icon="i-lucide-user"
            autocomplete="name"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Телефон" name="phone" required>
          <UInput
            v-model="state.phone"
            placeholder="+7 (900) 123-45-67"
            icon="i-lucide-phone"
            type="tel"
            autocomplete="tel"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Желаемая дата" name="date">
          <UInput
            v-model="state.date"
            type="date"
            icon="i-lucide-calendar"
            autocomplete="off"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Комментарий" name="comment">
          <UTextarea
            v-model="state.comment"
            placeholder="Пожелания, количество человек, особые условия..."
            autocomplete="off"
            class="w-full"
          />
        </UFormField>

        <div class="flex gap-2 justify-end pt-2">
          <UButton
            variant="soft"
            color="neutral"
            @click="open = false"
          >
            Отмена
          </UButton>
          <UButton
            type="submit"
            icon="i-lucide-send"
            :loading="loading"
          >
            Отправить заявку
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
