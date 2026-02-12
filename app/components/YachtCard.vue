<script setup lang="ts">
import type { Yacht } from '~/types'

interface Props {
  yacht: Yacht
  showBookButton?: boolean
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBookButton: true,
  featured: false
})

const isFeatured = computed(() => props.featured)
const featuredLabel = computed(() => props.yacht.featuredLabel || 'Топ яхта')

const emit = defineEmits<{
  book: [yacht: Yacht]
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
        :src="props.yacht.image"
        :alt="props.yacht.title"
        class="w-full h-full object-cover aspect-16/10 md:aspect-auto md:min-h-full"
        loading="lazy"
      />
    </div>

    <!-- Content — right on desktop, bottom on mobile -->
    <div class="md:w-1/2 flex flex-col p-5 md:p-6">
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <UBadge color="primary" variant="soft" class="shrink-0">
          {{ featuredLabel }}
        </UBadge>
        <UBadge variant="subtle" color="secondary" class="shrink-0">
          {{ props.yacht.type }}
        </UBadge>
        <UBadge v-if="props.yacht.port" variant="subtle" class="shrink-0">
          {{ props.yacht.port }}
        </UBadge>
      </div>

      <h2 class="text-xl font-semibold mb-2">
        {{ props.yacht.title }}
      </h2>

      <p class="text-muted text-sm line-clamp-3 flex-1">
        {{ props.yacht.description }}
      </p>

      <div class="mt-4 flex items-center justify-between text-sm text-muted">
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-users" class="size-4" />
            до {{ props.yacht.capacity }} чел.
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-ruler" class="size-4" />
            {{ props.yacht.length }}
          </span>
        </div>
        <span class="font-semibold text-primary text-lg">
          {{ props.yacht.pricePerHour.toLocaleString('ru-RU') }} ₽/час
        </span>
      </div>

      <div v-if="props.showBookButton" class="mt-4 flex gap-2">
        <UButton block :to="`/yachts/${props.yacht.id}`" variant="soft" color="neutral" size="sm">
          Подробнее
        </UButton>
        <UButton block size="sm" @click="emit('book', props.yacht)">
          Арендовать
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
        <NuxtImg
          :src="props.yacht.image"
          :alt="props.yacht.title"
          class="w-full aspect-16/10 object-cover"
          loading="lazy"
        />
      </div>
      <div class="mt-4">
        <h2 class="text-lg font-semibold line-clamp-1">
          {{ props.yacht.title }}
        </h2>
        <div class="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
          <UBadge variant="subtle" color="secondary">
            {{ props.yacht.type }}
          </UBadge>
          <UBadge v-if="props.yacht.port" variant="subtle">
            {{ props.yacht.port }}
          </UBadge>
        </div>
      </div>
    </template>

    <p class="text-muted text-sm flex-1 line-clamp-3">
      {{ props.yacht.description }}
    </p>

    <div class="mt-4 flex items-center justify-between text-sm text-muted">
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1">
          <UIcon name="i-lucide-users" class="size-4" />
          до {{ props.yacht.capacity }} чел.
        </span>
        <span class="flex items-center gap-1">
          <UIcon name="i-lucide-ruler" class="size-4" />
          {{ props.yacht.length }}
        </span>
      </div>
      <span class="font-semibold text-primary text-base">
        {{ props.yacht.pricePerHour.toLocaleString('ru-RU') }} ₽/час
      </span>
    </div>

    <template v-if="props.showBookButton" #footer>
      <div class="flex gap-2">
        <UButton block :to="`/yachts/${props.yacht.id}`" variant="soft" color="neutral" size="sm">
          Подробнее
        </UButton>
        <UButton block size="sm" @click="emit('book', props.yacht)">
          Арендовать
        </UButton>
      </div>
    </template>
  </UCard>
</template>
