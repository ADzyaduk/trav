<script setup lang="ts">
import type { Excursion } from '~/types'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Экскурсии — TravelSite'
})

useSeoMeta({
  title: 'Экскурсии — TravelSite',
  description: 'Лучшие экскурсии по городам мира: Стамбул, Анталья, Каппадокия, Дубай и другие направления.'
})

const store = useServicesStore()

const bookingModal = ref(false)
const bookingService = ref<{ type: 'excursion' | 'yacht', title: string }>()

function handleBook(excursion: Excursion) {
  bookingService.value = { type: 'excursion', title: excursion.title }
  bookingModal.value = true
}
</script>

<template>
  <div>
    <UPageHero
      title="Экскурсии"
      description="Увлекательные экскурсии по самым красивым городам и местам мира. Выбирайте направление и отправляйтесь в путешествие!"
      orientation="horizontal"
      :links="[
        { label: 'Позвонить', icon: 'i-lucide-phone', to: 'tel:+79001234567', size: 'xl' as const }
      ]"
    >
      <NuxtImg
        src="/images/hero/excursions.jpg"
        alt="Экскурсии"
        class="rounded-lg shadow-2xl ring ring-default w-full"
        loading="lazy"
      />
    </UPageHero>

    <UPageSection>
      <UPageGrid>
        <ExcursionCard
          v-for="excursion in store.excursions"
          :key="excursion.id"
          :excursion="excursion"
          @book="handleBook"
        />
      </UPageGrid>
    </UPageSection>

    <BookingModal
      v-model="bookingModal"
      :service-type="bookingService?.type"
      :service-title="bookingService?.title"
    />
  </div>
</template>
