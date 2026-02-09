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

const contacts = useContacts()
const bookingModal = ref(false)

const galleryImages = computed(() => yacht.value?.images ?? [yacht.value!.image])
</script>

<template>
  <div v-if="yacht" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
    <!-- Back link -->
    <NuxtLink
      to="/yachts"
      class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-highlighted transition-colors mb-4"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      Все яхты
    </NuxtLink>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      <!-- Left: Carousel -->
      <div class="lg:col-span-7 lg:sticky lg:top-20 lg:self-start">
        <ImageCarousel :images="galleryImages" :alt="yacht.title" />
      </div>

      <!-- Right: Info -->
      <div class="lg:col-span-5 flex flex-col gap-5">
        <!-- Title -->
        <h1 class="text-2xl lg:text-3xl font-bold text-highlighted">
          {{ yacht.title }}
        </h1>

        <!-- Specs 2x2 grid -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
            <UIcon name="i-lucide-sailboat" class="size-4 text-primary shrink-0" />
            <div class="min-w-0">
              <p class="text-xs text-muted">Тип</p>
              <p class="text-sm font-medium text-highlighted truncate">{{ yacht.type }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
            <UIcon name="i-lucide-users" class="size-4 text-primary shrink-0" />
            <div class="min-w-0">
              <p class="text-xs text-muted">Вместимость</p>
              <p class="text-sm font-medium text-highlighted">до {{ yacht.capacity }} чел.</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
            <UIcon name="i-lucide-ruler" class="size-4 text-primary shrink-0" />
            <div class="min-w-0">
              <p class="text-xs text-muted">Длина</p>
              <p class="text-sm font-medium text-highlighted">{{ yacht.length }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
            <UIcon name="i-lucide-tag" class="size-4 text-primary shrink-0" />
            <div class="min-w-0">
              <p class="text-xs text-muted">Стоимость</p>
              <p class="text-sm font-semibold text-highlighted">{{ yacht.pricePerHour.toLocaleString('ru-RU') }} ₽/час</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-muted leading-relaxed">
          {{ yacht.fullDescription }}
        </p>

        <!-- Features -->
        <div v-if="yacht.features.length">
          <h2 class="text-sm font-semibold text-highlighted mb-2">На борту</h2>
          <ul class="space-y-1.5">
            <li
              v-for="(feature, index) in yacht.features"
              :key="index"
              class="flex items-start gap-2 text-sm text-muted"
            >
              <UIcon name="i-lucide-check" class="size-4 text-primary shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-wrap gap-3 pt-2">
          <UButton
            label="Арендовать"
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
      service-type="yacht"
      :service-title="yacht.title"
    />
  </div>
</template>
