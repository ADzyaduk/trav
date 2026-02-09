<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Контакты — TravelSite'
})

useSeoMeta({
  title: 'Контакты — TravelSite',
  description: 'Свяжитесь с нами: телефон, форма обратной связи, заказ звонка.'
})

const toast = useToast()
const loading = ref(false)

const state = reactive({
  name: '',
  phone: '',
  comment: ''
})

function validate(s: Partial<typeof state>): FormError[] {
  const errors: FormError[] = []
  if (!s.name?.trim()) errors.push({ name: 'name', message: 'Введите ваше имя' })
  if (!s.phone?.trim()) errors.push({ name: 'phone', message: 'Введите номер телефона' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  loading.value = true
  try {
    await $fetch('/api/notify', {
      method: 'POST',
      body: {
        type: 'callback',
        name: event.data.name,
        phone: event.data.phone,
        comment: event.data.comment
      }
    })

    toast.add({
      title: 'Заявка отправлена',
      description: 'Мы перезвоним вам в ближайшее время!',
      color: 'success'
    })

    state.name = ''
    state.phone = ''
    state.comment = ''
  }
  catch {
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.',
      color: 'error'
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <UPageSection>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <!-- Левая колонка — контакты -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-bold">Наши контакты</h2>
          </template>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                <UIcon name="i-lucide-phone" class="size-6 text-primary" />
              </div>
              <div>
                <p class="text-sm text-muted">Телефон</p>
                <UButton
                  variant="link"
                  to="tel:+79001234567"
                  :padded="false"
                  class="text-lg font-semibold"
                >
                  +7 (900) 123-45-67
                </UButton>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                <UIcon name="i-lucide-clock" class="size-6 text-primary" />
              </div>
              <div>
                <p class="text-sm text-muted">Время работы</p>
                <p class="text-lg font-semibold">Ежедневно, 09:00 — 21:00</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                <UIcon name="i-lucide-mail" class="size-6 text-primary" />
              </div>
              <div>
                <p class="text-sm text-muted">E-mail</p>
                <UButton
                  variant="link"
                  to="mailto:info@travelsite.com"
                  :padded="false"
                  class="text-lg font-semibold"
                >
                  info@travelsite.com
                </UButton>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center size-12 rounded-lg bg-primary/10 shrink-0">
                <UIcon name="i-lucide-map-pin" class="size-6 text-primary" />
              </div>
              <div>
                <p class="text-sm text-muted">Адрес</p>
                <p class="text-lg font-semibold">г. Анталья, Турция</p>
              </div>
            </div>

            <p class="text-sm text-muted mt-2">
              Неудобно звонить? Заполните форму справа — мы сами вам перезвоним.
            </p>
          </div>
        </UCard>

        <!-- Правая колонка — форма -->
        <UCard>
          <template #header>
            <div>
              <h2 class="text-xl font-bold">Заказать звонок</h2>
              <p class="text-sm text-muted mt-1">Оставьте номер и мы перезвоним в ближайшее время</p>
            </div>
          </template>

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

            <UFormField label="Комментарий" name="comment">
              <UTextarea
                v-model="state.comment"
                placeholder="Расскажите, чем мы можем помочь..."
                autocomplete="off"
                class="w-full"
              />
            </UFormField>

            <UButton
              type="submit"
              icon="i-lucide-send"
              :loading="loading"
              block
            >
              Отправить заявку
            </UButton>
          </UForm>
        </UCard>
      </div>
    </UPageSection>
  </div>
</template>
