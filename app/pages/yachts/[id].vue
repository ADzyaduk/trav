<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const store = useServicesStore()

const yacht = computed(() => store.getYachtById(route.params.id as string))

if (!yacht.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Яхта не найдена'
  })
}

useHead({
  title: () => yacht.value ? `${yacht.value.title} — TravelSite` : 'Яхта — TravelSite'
})

const bookingModal = ref(false)

const galleryImages = computed(() => yacht.value?.images ?? [yacht.value!.image])
</script>

<template>
  <div v-if="yacht">
    <UPageHero
      :title="yacht.title"
      :description="yacht.fullDescription"
      :links="[
        { label: 'Арендовать', icon: 'i-lucide-calendar-check', onClick: () => { bookingModal = true } },
        { label: 'Все яхты', to: '/yachts', variant: 'soft' as const, color: 'neutral' as const, icon: 'i-lucide-arrow-left' }
      ]"
    />

    <UPageSection headline="Галерея" title="Фотографии">
      <ImageCarousel :images="galleryImages" :alt="yacht.title" />
    </UPageSection>

    <UPageSection headline="Характеристики" title="О яхте">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-sailboat" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Тип</p>
              <p class="font-medium">{{ yacht.type }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-users" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Вместимость</p>
              <p class="font-medium">до {{ yacht.capacity }} чел.</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-ruler" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Длина</p>
              <p class="font-medium">{{ yacht.length }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-dollar-sign" class="size-5 text-primary" />
            <div>
              <p class="text-sm text-muted">Стоимость</p>
              <p class="font-medium">{{ yacht.pricePerHour }} $/час</p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection headline="На борту" title="Удобства и оснащение">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard v-for="(feature, index) in yacht.features" :key="index">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-check-circle" class="size-5 text-primary shrink-0" />
            <span>{{ feature }}</span>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection :ui="{ container: 'px-0' }">
      <UPageCTA
        title="Готовы выйти в море?"
        :description="`Арендуйте «${yacht.title}» прямо сейчас и наш менеджер свяжется с вами.`"
        variant="subtle"
        orientation="horizontal"
        class="rounded-none sm:rounded-xl"
        :links="[
          { label: 'Арендовать', icon: 'i-lucide-calendar-check', size: 'lg' as const, onClick: () => { bookingModal = true } },
          { label: 'Позвонить', icon: 'i-lucide-phone', variant: 'soft' as const, color: 'neutral' as const, size: 'lg' as const, to: 'tel:+79001234567' }
        ]"
      >
        <NuxtImg
          :src="yacht.image"
          :alt="yacht.title"
          class="w-full rounded-lg"
          loading="lazy"
        />
      </UPageCTA>
    </UPageSection>

    <BookingModal
      v-model="bookingModal"
      service-type="yacht"
      :service-title="yacht.title"
    />
  </div>
</template>
