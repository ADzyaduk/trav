<script setup lang="ts">
import type { Excursion, Yacht } from '~/types'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'TravelSite — экскурсии и аренда яхт'
})

useSeoMeta({
  title: 'TravelSite — экскурсии и аренда яхт',
  description: 'Откройте мир путешествий: экскурсии по лучшим городам, аренда яхт и незабываемые приключения.'
})

const store = useServicesStore()
const bookingModal = ref(false)
const bookingService = ref<{ type: 'excursion' | 'yacht', title: string }>()

function openBooking(type: 'excursion' | 'yacht', title: string) {
  bookingService.value = { type, title }
  bookingModal.value = true
}

function handleBookExcursion(excursion: Excursion) {
  openBooking('excursion', excursion.title)
}

function handleBookYacht(yacht: Yacht) {
  openBooking('yacht', yacht.title)
}
</script>

<template>
  <div>
    <!-- Hero -->
    <UPageHero
      title="Откройте мир путешествий"
      description="Экскурсии по лучшим городам мира, аренда яхт и незабываемые приключения. Забронируйте прямо сейчас!"
      orientation="vertical"
      :links="[
        { label: 'Экскурсии', to: '/excursions', icon: 'i-lucide-map', size: 'xl' as const },
        { label: 'Яхты', to: '/yachts', icon: 'i-lucide-sailboat', variant: 'soft' as const, color: 'neutral' as const, size: 'xl' as const }
      ]"
      :ui="{
        root: 'overflow-hidden',
        title: 'text-white drop-shadow-lg',
        description: 'text-white/90 drop-shadow-md',
      }"
    >
      <template #top>
        <NuxtImg
          src="/images/hero/main.jpg"
          alt=""
          class="absolute inset-0 w-full h-full object-cover -z-10"
          loading="eager"
        />
        <div class="absolute inset-0 bg-black/50 -z-10" />
      </template>
    </UPageHero>

    <!-- Services overview -->
    <UPageSection
      headline="Услуги"
      title="Что мы предлагаем"
      description="Выбирайте из лучших экскурсий и яхт для идеального отдыха."
      :features="[
        {
          title: 'Экскурсии',
          description: 'Увлекательные экскурсии по самым красивым городам и местам. Профессиональные гиды и удобные маршруты.',
          icon: 'i-lucide-map',
          to: '/excursions'
        },
        {
          title: 'Аренда яхт',
          description: 'Моторные и парусные яхты для любого случая — от романтических прогулок до VIP-мероприятий.',
          icon: 'i-lucide-sailboat',
          to: '/yachts'
        },
        {
          title: 'Персональный подход',
          description: 'Менеджер свяжется с вами в Telegram для уточнения деталей и поможет организовать идеальный отдых.',
          icon: 'i-lucide-headset'
        }
      ]"
    />

    <!-- Popular excursions -->
    <UPageSection
      headline="Популярное"
      title="Топ экскурсии"
      description="Самые востребованные экскурсии нашего сервиса."
      :links="[{ label: 'Все экскурсии', to: '/excursions', variant: 'soft' as const, color: 'neutral' as const, trailingIcon: 'i-lucide-arrow-right' }]"
    >
      <UPageGrid>
        <ExcursionCard
          v-for="excursion in store.popularExcursions"
          :key="excursion.id"
          :excursion="excursion"
          @book="handleBookExcursion"
        />
      </UPageGrid>
    </UPageSection>

    <!-- Popular yachts -->
    <UPageSection
      headline="Флот"
      title="Наши яхты"
      description="Выбирайте яхту под любой случай и бюджет."
      :links="[{ label: 'Все яхты', to: '/yachts', variant: 'soft' as const, color: 'neutral' as const, trailingIcon: 'i-lucide-arrow-right' }]"
    >
      <UPageGrid>
        <YachtCard
          v-for="yacht in store.popularYachts"
          :key="yacht.id"
          :yacht="yacht"
          @book="handleBookYacht"
        />
      </UPageGrid>
    </UPageSection>

    <!-- CTA -->
    <UPageSection :ui="{ container: 'px-0' }">
      <UPageCTA
        title="Готовы к приключению?"
        description="Оставьте заявку и наш менеджер свяжется с вами для организации идеального отдыха."
        variant="subtle"
        orientation="horizontal"
        class="rounded-none sm:rounded-xl"
        :links="[
          { label: 'Забронировать', icon: 'i-lucide-calendar-check', size: 'lg' as const, onClick: () => { bookingService = undefined; bookingModal = true } },
          { label: 'Позвонить', icon: 'i-lucide-phone', variant: 'soft' as const, color: 'neutral' as const, size: 'lg' as const, to: 'tel:+79001234567' }
        ]"
      >
        <NuxtImg
          src="/images/cta/adventure.jpg"
          alt="Приключения ждут"
          class="w-full rounded-lg"
          loading="lazy"
        />
      </UPageCTA>
    </UPageSection>

    <!-- Booking Modal -->
    <BookingModal
      v-model="bookingModal"
      :service-type="bookingService?.type"
      :service-title="bookingService?.title"
    />
  </div>
</template>
