<script setup lang="ts">
import type { GroupTrip } from '~/types'

interface Props {
  trip: GroupTrip
  showBookButton?: boolean
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBookButton: true,
  featured: false
})

const isFeatured = computed(() => props.featured)
const featuredLabel = computed(() => props.trip.featuredLabel || 'Спецпредложение')

const emit = defineEmits<{
  book: [trip: GroupTrip]
}>()
</script>

<template>
  <div v-if="isFeatured"
    class="h-full flex flex-col md:flex-row overflow-hidden rounded-lg border border-default bg-default ring-2 ring-primary/50 shadow-lg transition duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
    <div class="md:w-1/2 shrink-0">
      <NuxtImg :src="props.trip.image" :alt="props.trip.title"
        class="w-full h-full object-cover aspect-16/10 md:aspect-auto md:min-h-full" loading="lazy" />
    </div>

    <div class="md:w-1/2 flex flex-col p-5 md:p-6">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <UBadge color="primary" variant="soft" class="shrink-0">
          {{ featuredLabel }}
        </UBadge>
        <UBadge variant="subtle" color="info" class="shrink-0">
          Групповая
        </UBadge>
        <UBadge v-if="props.trip.port" variant="subtle" class="shrink-0">
          {{ props.trip.port }}
        </UBadge>
      </div>

      <h2 class="text-xl font-semibold mb-2">
        {{ props.trip.title }}
      </h2>

      <p class="text-muted text-sm line-clamp-3 flex-1">
        {{ props.trip.description }}
      </p>

      <div class="mt-4 flex items-center justify-between text-sm text-muted">
        <span class="flex items-center gap-1">
          <UIcon name="i-lucide-clock" class="size-4" />
          {{ props.trip.duration }}
        </span>
        <span class="font-semibold text-primary text-lg">
          {{ props.trip.pricePerTicket.toLocaleString('ru-RU') }} ₽/билет
        </span>
      </div>

      <div v-if="props.showBookButton" class="mt-4 flex gap-2">
        <UButton block :to="`/yachts/group/${props.trip.id}`" variant="soft" color="neutral" size="sm">
          Подробнее
        </UButton>
        <UButton block size="sm" @click="emit('book', props.trip)">
          Забронировать
        </UButton>
      </div>
    </div>
  </div>

  <UCard v-else
    class="h-full flex flex-col overflow-hidden transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
    <template #header>
      <div class="-mx-[calc(var(--ui-card-body-padding)+1px)] -mt-[calc(var(--ui-card-body-padding)+1px)]">
        <NuxtImg :src="props.trip.image" :alt="props.trip.title" class="w-full aspect-16/10 object-cover"
          loading="lazy" />
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2 mt-4">
        <h2 class="text-lg font-semibold">
          {{ props.trip.title }}
        </h2>
        <div class="flex items-center gap-1.5">
          <UBadge variant="subtle" color="info">
            Групповая
          </UBadge>
          <UBadge v-if="props.trip.port" variant="subtle">
            {{ props.trip.port }}
          </UBadge>
        </div>
      </div>
    </template>

    <p class="text-muted text-sm flex-1">
      {{ props.trip.description }}
    </p>

    <div class="mt-4 flex items-center justify-between text-sm text-muted">
      <span class="flex items-center gap-1">
        <UIcon name="i-lucide-clock" class="size-4" />
        {{ props.trip.duration }}
      </span>
      <span class="font-semibold text-primary text-base">
        {{ props.trip.pricePerTicket.toLocaleString('ru-RU') }} ₽/билет
      </span>
    </div>

    <template v-if="props.showBookButton" #footer>
      <div class="flex gap-2">
        <UButton block :to="`/yachts/group/${props.trip.id}`" variant="soft" color="neutral" size="sm">
          Подробнее
        </UButton>
        <UButton block size="sm" @click="emit('book', props.trip)">
          Забронировать
        </UButton>
      </div>
    </template>
  </UCard>
</template>
