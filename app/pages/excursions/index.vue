<script setup lang="ts">
import type { Excursion } from '~/types'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Экскурсии — TravelSite'
})

useSeoMeta({
  title: 'Экскурсии по Сочи и Абхазии — TravelSite',
  description: 'Экскурсии по Сочи и Абхазии 2026: Золотое кольцо Абхазии, Красная Поляна 5 в 1, 33 водопада с адыгейским шоу и обзорная экскурсия по Сочи.'
})

const store = useServicesStore()
const contacts = useContacts()

const bookingModal = ref(false)
const bookingService = ref<{ type: 'excursion' | 'yacht', title: string }>()

const displayedExcursions = computed(() => {
  const featured = store.excursions.filter(excursion => excursion.isFeatured).slice(0, 3)
  const regular = store.excursions.filter(excursion => !excursion.isFeatured)
  const result: Excursion[] = []

  let featuredIndex = 0
  let regularIndex = 0

  while (featuredIndex < featured.length || regularIndex < regular.length) {
    if (featuredIndex < featured.length) {
      result.push(featured[featuredIndex++])
    }

    for (let i = 0; i < 2 && regularIndex < regular.length; i++) {
      result.push(regular[regularIndex++])
    }
  }

  return result
})

function handleBook(excursion: Excursion) {
  bookingService.value = { type: 'excursion', title: excursion.title }
  bookingModal.value = true
}
</script>

<template>
  <div>
    <UPageHero title="Экскурсии по Сочи и Абхазии"
      description="Авторские маршруты по Сочи и Абхазии: Золотое кольцо Абхазии, Красная Поляна 5 в 1, 33 водопада с адыгейским шоу и обзорная по Сочи."
      orientation="horizontal" :links="[
        { label: 'Позвонить', icon: 'i-lucide-phone', to: contacts.phoneHref, size: 'xl' as const },
        { label: 'Telegram', icon: 'i-simple-icons-telegram', to: contacts.telegramLink, target: '_blank', variant: 'soft' as const, color: 'neutral' as const, size: 'xl' as const }
      ]">
      <NuxtImg src="/images/hero/excursions.jpg" alt="Экскурсии" class="rounded-lg shadow-2xl ring ring-default w-full"
        loading="lazy" />
    </UPageHero>

    <UPageSection v-reveal>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 items-stretch">
        <div v-for="excursion in displayedExcursions" :key="excursion.id"
          :class="[excursion.isFeatured && 'sm:col-span-2']">
          <ExcursionCard :excursion="excursion" :featured="excursion.isFeatured" @book="handleBook" />
        </div>
      </div>
    </UPageSection>

    <BookingModal v-model="bookingModal" :service-type="bookingService?.type" :service-title="bookingService?.title" />
  </div>
</template>
