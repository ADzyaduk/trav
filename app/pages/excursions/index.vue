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
  description: 'Экскурсии по Сочи и Абхазии 2026: Красная Поляна и Роза Хутор, Абхазия — Золотое кольцо (Гагра, Рица, Новый Афон), гора Ахун, 33 водопада, Скайпарк, квадроциклы, джип-тур по каньону Псахо и Олимпийский парк.'
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
      title="Экскурсии по Сочи и Абхазии"
      description="Лучшие экскурсии по Сочи и Абхазии: Красная Поляна и Роза Хутор, озеро Рица и Новый Афон, гора Ахун, 33 водопада, Скайпарк, квадроциклы, джип-тур по каньону Псахо и Олимпийский парк с шоу фонтанов."
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
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 items-stretch">
        <div
          v-for="excursion in store.excursions"
          :key="excursion.id"
          :class="[excursion.isFeatured && 'sm:col-span-2']"
        >
          <ExcursionCard
            :excursion="excursion"
            :featured="excursion.isFeatured"
            @book="handleBook"
          />
        </div>
      </div>
    </UPageSection>

    <BookingModal
      v-model="bookingModal"
      :service-type="bookingService?.type"
      :service-title="bookingService?.title"
    />
  </div>
</template>
