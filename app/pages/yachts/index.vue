<script setup lang="ts">
import type { GroupTrip, Yacht } from '~/types'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Яхты — TravelSite'
})

useSeoMeta({
  title: 'Яхты — TravelSite',
  description: 'Аренда яхт: моторные, парусные и люксовые яхты для прогулок, мероприятий и морских путешествий.'
})

const store = useServicesStore()

const bookingModal = ref(false)
const bookingService = ref<{ type: 'excursion' | 'yacht', title: string }>()

function handleBook(yacht: Yacht) {
  bookingService.value = { type: 'yacht', title: yacht.title }
  bookingModal.value = true
}

function handleBookGroupTrip(trip: GroupTrip) {
  bookingService.value = { type: 'yacht', title: trip.title }
  bookingModal.value = true
}
</script>

<template>
  <div>
    <UPageHero
      title="Аренда яхт"
      description="Моторные и парусные яхты для любого случая — от романтических прогулок до VIP-мероприятий. Выбирайте яхту и отправляйтесь в морское приключение!"
      orientation="horizontal"
      :links="[
        { label: 'Позвонить', icon: 'i-lucide-phone', to: 'tel:+79001234567', size: 'xl' as const }
      ]"
    >
      <NuxtImg
        src="/images/hero/yachts.jpg"
        alt="Аренда яхт"
        class="rounded-lg shadow-2xl ring ring-default w-full"
        loading="lazy"
      />
    </UPageHero>

    <UPageSection>
      <UPageGrid>
        <YachtCard
          v-for="yacht in store.yachts"
          :key="yacht.id"
          :yacht="yacht"
          @book="handleBook"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      headline="Групповые"
      title="Групповые поездки"
      description="Присоединяйтесь к группе — морские прогулки и рыбалка по доступной цене за билет."
    >
      <UPageGrid
        :class="[
          'grid-cols-1 sm:grid-cols-2',
          store.groupTrips.length === 3
            ? 'lg:grid-cols-3'
            : store.groupTrips.length === 1
              ? 'lg:grid-cols-1'
              : 'lg:grid-cols-2'
        ]"
      >
        <GroupTripCard
          v-for="trip in store.groupTrips"
          :key="trip.id"
          :trip="trip"
          @book="handleBookGroupTrip"
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
