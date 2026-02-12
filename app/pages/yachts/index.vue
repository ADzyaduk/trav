<script setup lang="ts">
import type { GroupTrip, Yacht } from '~/types'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Яхты — TravelSite'
})

useSeoMeta({
  title: 'Аренда яхт в Сочи — TravelSite',
  description: 'Аренда моторных и парусных яхт в Сочи: Порт Сочи и Порт Имеретинский. Прогулки, мероприятия и морские путешествия на комфортных яхтах.'
})

const store = useServicesStore()
const contacts = useContacts()

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
      title="Аренда яхт в Сочи"
      description="Моторные и парусные яхты в Порту Сочи и Порту Имеретинский — от романтических прогулок до VIP-мероприятий. Выбирайте яхту и отправляйтесь в морское приключение!"
      orientation="horizontal"
      :links="[
        { label: 'Позвонить', icon: 'i-lucide-phone', to: contacts.phoneHref, size: 'xl' as const },
        { label: 'Telegram', icon: 'i-simple-icons-telegram', to: contacts.telegramLink, target: '_blank', variant: 'soft' as const, color: 'neutral' as const, size: 'xl' as const }
      ]"
    >
      <NuxtImg
        src="/images/hero/yachts.jpg"
        alt="Аренда яхт"
        class="rounded-lg shadow-2xl ring ring-default w-full"
        loading="lazy"
      />
    </UPageHero>

    <UPageSection v-reveal>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 items-stretch">
        <div
          v-for="yacht in store.yachts"
          :key="yacht.id"
          :class="[yacht.isFeatured && 'sm:col-span-2']"
        >
          <YachtCard
            :yacht="yacht"
            :featured="yacht.isFeatured"
            @book="handleBook"
          />
        </div>
      </div>
    </UPageSection>

    <UPageSection
      v-reveal
      headline="Групповые"
      title="Групповые поездки"
      description="Присоединяйтесь к группе — морские прогулки и рыбалка по доступной цене за билет."
    >
      <UPageGrid class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
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
