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
  description: 'ТОП-15 самых популярных экскурсий Сочи 2026: Красная Поляна, Абхазия, гора Ахун, 33 водопада, дельфины и другие.'
})

const store = useServicesStore()
const contacts = useContacts()

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
      title="Экскурсии по Сочи"
      description="ТОП-15 самых популярных экскурсий Сочи 2026. Красная Поляна, Абхазия, гора Ахун, морские прогулки с дельфинами и многое другое."
      orientation="horizontal"
      :links="[
        { label: 'Позвонить', icon: 'i-lucide-phone', to: contacts.phoneHref, size: 'xl' as const },
        { label: 'Telegram', icon: 'i-simple-icons-telegram', to: contacts.telegramLink, target: '_blank', variant: 'soft' as const, color: 'neutral' as const, size: 'xl' as const }
      ]"
    >
      <NuxtImg
        src="/images/hero/excursions.jpg"
        alt="Экскурсии"
        class="rounded-lg shadow-2xl ring ring-default w-full"
        loading="lazy"
      />
    </UPageHero>

    <UPageSection v-reveal>
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
        <ExcursionCard
          v-for="excursion in store.excursions"
          :key="excursion.id"
          :excursion="excursion"
          @book="handleBook"
        />
      </div>
    </UPageSection>

    <BookingModal
      v-model="bookingModal"
      :service-type="bookingService?.type"
      :service-title="bookingService?.title"
    />
  </div>
</template>
