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
  <div v-if="excursion" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
    <!-- Back link -->
    <NuxtLink
      to="/excursions"
      class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-highlighted transition-colors mb-4"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      Все экскурсии
    </NuxtLink>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <!-- Left: Carousel -->
      <div class="lg:col-span-7 lg:sticky lg:top-20 lg:self-start">
        <ImageCarousel :images="galleryImages" :alt="excursion.title" />
      </div>

      <!-- Right: Info -->
      <div class="lg:col-span-5 flex flex-col gap-5">
        <!-- Title -->
        <h1 class="text-2xl lg:text-3xl font-bold text-highlighted">
          {{ excursion.title }}
        </h1>

        <!-- Compact specs row -->
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span class="inline-flex items-center gap-1.5">
            <UIcon name="i-lucide-map-pin" class="size-4 text-primary" />
            {{ excursion.city }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UIcon name="i-lucide-clock" class="size-4 text-primary" />
            {{ excursion.duration }}
          </span>
          <span class="inline-flex items-center gap-1.5 text-base font-semibold text-highlighted">
            <UIcon name="i-lucide-tag" class="size-4 text-primary" />
            {{ excursion.price.toLocaleString('ru-RU') }} ₽
          </span>
        </div>

        <!-- Description -->
        <p class="text-sm text-muted leading-relaxed">
          {{ excursion.fullDescription }}
        </p>

        <!-- Highlights -->
        <div v-if="excursion.highlights.length">
          <h2 class="text-sm font-semibold text-highlighted mb-2">Что вас ждёт</h2>
          <ul class="space-y-1.5">
            <li
              v-for="(highlight, index) in excursion.highlights"
              :key="index"
              class="flex items-start gap-2 text-sm text-muted"
            >
              <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0 mt-0.5" />
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-wrap gap-3 pt-2">
          <UButton
            label="Забронировать"
            icon="i-lucide-calendar-check"
            size="lg"
            @click="bookingModal = true"
          />
          <UButton
            label="Позвонить"
            icon="i-lucide-phone"
            variant="soft"
            color="neutral"
            size="lg"
            :to="contacts.phoneHref"
          />
          <UButton
            label="Telegram"
            icon="i-simple-icons-telegram"
            variant="soft"
            color="neutral"
            size="lg"
            :to="contacts.telegramLink"
            target="_blank"
          />
        </div>
      </div>
    </div>

    <BookingModal
      v-model="bookingModal"
      service-type="excursion"
      :service-title="excursion.title"
    />
  </div>
</template>
