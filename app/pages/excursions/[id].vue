<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const store = useServicesStore()

const excursion = computed(() => store.getExcursionById(route.params.id as string))

if (!excursion.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Экскурсия не найдена'
  })
}

useHead({
  title: () => excursion.value ? `${excursion.value.title} — TravelSite` : 'Экскурсия — TravelSite'
})

const contacts = useContacts()
const bookingModal = ref(false)

const galleryImages = computed(() => excursion.value?.images ?? [excursion.value!.image])
</script>

<template>
  <div v-if="excursion">
    <UPageHero
      :title="excursion.title"
      :description="excursion.fullDescription"
      :links="[
        { label: 'Забронировать', icon: 'i-lucide-calendar-check', onClick: () => { bookingModal = true } },
        { label: 'Все экскурсии', to: '/excursions', variant: 'soft' as const, color: 'neutral' as const, icon: 'i-lucide-arrow-left' }
      ]"
    />

    <UPageSection v-reveal headline="Галерея" title="Фотографии">
      <ImageCarousel :images="galleryImages" :alt="excursion.title" />
    </UPageSection>

    <UPageSection v-reveal headline="Детали" title="Информация">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-map-pin" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Город</p>
              <p class="font-medium">{{ excursion.city }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-clock" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Длительность</p>
              <p class="font-medium">{{ excursion.duration }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-dollar-sign" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Стоимость</p>
              <p class="font-medium">{{ excursion.price.toLocaleString('ru-RU') }} ₽</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-star" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Особенности</p>
              <p class="font-medium">{{ excursion.highlights.length }} пунктов</p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection v-reveal headline="Что вас ждёт" title="Основные моменты">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UCard v-for="(highlight, index) in excursion.highlights" :key="index">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-check-circle" class="size-5 text-primary shrink-0" />
            <span>{{ highlight }}</span>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection v-reveal :ui="{ container: 'px-0' }">
      <UPageCTA
        title="Готовы к этой экскурсии?"
        :description="`Забронируйте «${excursion.title}» прямо сейчас и наш менеджер свяжется с вами.`"
        variant="subtle"
        orientation="horizontal"
        class="rounded-none sm:rounded-xl"
        :links="[
          { label: 'Забронировать', icon: 'i-lucide-calendar-check', size: 'lg' as const, onClick: () => { bookingModal = true } },
          { label: 'Позвонить', icon: 'i-lucide-phone', variant: 'soft' as const, color: 'neutral' as const, size: 'lg' as const, to: contacts.phoneHref },
          { label: 'Telegram', icon: 'i-simple-icons-telegram', variant: 'soft' as const, color: 'neutral' as const, size: 'lg' as const, to: contacts.telegramLink, target: '_blank' }
        ]"
      >
        <NuxtImg
          :src="excursion.image"
          :alt="excursion.title"
          class="w-full rounded-lg"
          loading="lazy"
        />
      </UPageCTA>
    </UPageSection>

    <BookingModal
      v-model="bookingModal"
      service-type="excursion"
      :service-title="excursion.title"
    />
  </div>
</template>
