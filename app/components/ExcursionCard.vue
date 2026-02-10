<script setup lang="ts">
import type { Excursion } from '~/types'

interface Props {
  excursion: Excursion
  showBookButton?: boolean
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBookButton: true,
  featured: false
})

const isFeatured = computed(() => props.featured)
const featuredLabel = computed(() => props.excursion.featuredLabel || 'Топ выбор')

const emit = defineEmits<{
  book: [excursion: Excursion]
}>()
</script>

<template>
  <!-- Featured: horizontal layout -->
  <div
    v-if="isFeatured"
    class="h-full flex flex-col md:flex-row overflow-hidden rounded-lg border border-default bg-default ring-2 ring-primary/50 shadow-lg transition duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
  >
    <!-- Image — left on desktop, top on mobile -->
    <div class="md:w-1/2 shrink-0">
      <NuxtImg
        :src="props.excursion.image"
        :alt="props.excursion.title"
        class="w-full h-full object-cover aspect-16/10 md:aspect-auto md:min-h-full"
        loading="lazy"
      />
    </div>

    <!-- Content — right on desktop, bottom on mobile -->
    <div class="md:w-1/2 flex flex-col p-5 md:p-6">
      <div class="flex items-center gap-2 mb-3">
        <UBadge color="primary" variant="soft" class="shrink-0">
          {{ featuredLabel }}
        </UBadge>
        <UBadge variant="subtle" class="shrink-0">
          {{ props.excursion.city }}
        </UBadge>
      </div>

      <h2 class="text-xl font-semibold mb-2">
        {{ props.excursion.title }}
      </h2>

      <p class="text-muted text-sm line-clamp-3 flex-1">
        {{ props.excursion.description }}
      </p>

      <div class="mt-4 flex items-center justify-between text-sm text-muted">
        <span class="flex items-center gap-1">
          <UIcon name="i-lucide-clock" class="size-4" />
          {{ props.excursion.duration }}
        </span>
        <span class="font-semibold text-primary text-lg">
          {{ props.excursion.price.toLocaleString('ru-RU') }} ₽
        </span>
      </div>

      <div v-if="props.showBookButton" class="mt-4 flex gap-2">
        <UButton block :to="`/excursions/${props.excursion.id}`" variant="soft" color="neutral" size="sm">
          Подробнее
        </UButton>
        <UButton block size="sm" @click="emit('book', props.excursion)">
          Забронировать
        </UButton>
      </div>
    </div>
  </div>

  <!-- Regular: vertical card layout (unchanged) -->
  <UCard
    v-else
    class="h-full flex flex-col overflow-hidden transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
  >
    <template #header>
      <div class="-mx-[calc(var(--ui-card-body-padding)+1px)] -mt-[calc(var(--ui-card-body-padding)+1px)]">
        <NuxtImg :src="props.excursion.image" :alt="props.excursion.title" class="w-full aspect-16/10 object-cover"
          loading="lazy" />
      </div>
      <div class="flex items-center justify-between gap-2 mt-4 min-h-11">
        <h2 class="text-lg font-semibold line-clamp-2 flex-1 min-w-0">
          {{ props.excursion.title }}
        </h2>
        <UBadge variant="subtle" class="shrink-0">
          {{ props.excursion.city }}
        </UBadge>
      </div>
    </template>

    <p class="text-muted text-sm line-clamp-4 min-h-21">
      {{ props.excursion.description }}
    </p>

    <div class="mt-4 flex items-center justify-between text-sm text-muted">
      <span class="flex items-center gap-1">
        <UIcon name="i-lucide-clock" class="size-4" />
        {{ props.excursion.duration }}
      </span>
      <span class="font-semibold text-primary text-base">
        {{ props.excursion.price.toLocaleString('ru-RU') }} ₽
      </span>
    </div>

    <template v-if="props.showBookButton" #footer>
      <div class="flex gap-2">
        <UButton block :to="`/excursions/${props.excursion.id}`" variant="soft" color="neutral" size="sm">
          Подробнее
        </UButton>
        <UButton block size="sm" @click="emit('book', props.excursion)">
          Забронировать
        </UButton>
      </div>
    </template>
  </UCard>
</template>
