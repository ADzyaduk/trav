<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const store = useServicesStore()

const trip = computed(() => store.getGroupTripById(route.params.id as string))

if (!trip.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Поездка не найдена'
  })
}

useHead({
  title: () => trip.value ? `${trip.value.title} — TravelSite` : 'Групповая поездка — TravelSite'
})

const bookingModal = ref(false)

const galleryImages = computed(() => trip.value?.images ?? [trip.value!.image])
</script>

<template>
  <div v-if="trip">
    <UPageHero
      :title="trip.title"
      :description="trip.fullDescription"
      :links="[
        { label: 'Забронировать', icon: 'i-lucide-calendar-check', onClick: () => { bookingModal = true } },
        { label: 'Все яхты', to: '/yachts', variant: 'soft' as const, color: 'neutral' as const, icon: 'i-lucide-arrow-left' }
      ]"
    />

    <UPageSection headline="Галерея" title="Фотографии">
      <ImageCarousel :images="galleryImages" :alt="trip.title" />
    </UPageSection>

    <UPageSection headline="Детали" title="Информация">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-clock" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Длительность</p>
              <p class="font-medium">{{ trip.duration }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-ticket" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Стоимость билета</p>
              <p class="font-medium">{{ trip.pricePerTicket.toLocaleString('ru-RU') }} ₽</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-users" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Тип</p>
              <p class="font-medium">Групповая поездка</p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection headline="Что вас ждёт" title="Основные моменты">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UCard v-for="(highlight, index) in trip.highlights" :key="index">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-check-circle" class="size-5 text-primary shrink-0" />
            <span>{{ highlight }}</span>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection :ui="{ container: 'px-0' }">
      <UPageCTA
        title="Присоединяйтесь к группе!"
        :description="`Забронируйте билет на «${trip.title}» прямо сейчас и наш менеджер свяжется с вами.`"
        variant="subtle"
        class="rounded-none sm:rounded-xl"
        :links="[
          { label: 'Забронировать', icon: 'i-lucide-calendar-check', size: 'lg' as const, onClick: () => { bookingModal = true } },
          { label: 'Позвонить', icon: 'i-lucide-phone', variant: 'soft' as const, color: 'neutral' as const, size: 'lg' as const, to: 'tel:+79001234567' }
        ]"
      />
    </UPageSection>

    <BookingModal
      v-model="bookingModal"
      service-type="yacht"
      :service-title="trip.title"
    />
  </div>
</template>
