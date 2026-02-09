<script setup lang="ts">
import type { Excursion } from '~/types'

interface Props {
  excursion: Excursion
  showBookButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBookButton: true
})

const emit = defineEmits<{
  book: [excursion: Excursion]
}>()
</script>

<template>
  <UCard class="h-full flex flex-col overflow-hidden transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
    <template #header>
      <div class="-mx-[calc(var(--ui-card-body-padding)+1px)] -mt-[calc(var(--ui-card-body-padding)+1px)]">
        <NuxtImg :src="props.excursion.image" :alt="props.excursion.title" class="w-full aspect-16/10 object-cover"
          loading="lazy" />
      </div>
      <div class="flex items-center justify-between mt-4">
        <h2 class="text-lg font-semibold">
          {{ props.excursion.title }}
        </h2>
        <UBadge variant="subtle">
          {{ props.excursion.city }}
        </UBadge>
      </div>
    </template>

    <p class="text-muted text-sm flex-1">
      {{ props.excursion.description }}
    </p>

    <div class="mt-4 flex items-center gap-3 text-sm text-muted">
      <span class="flex items-center gap-1">
        <UIcon name="i-lucide-clock" class="size-4" />
        {{ props.excursion.duration }}
      </span>
      <span class="font-semibold text-highlighted text-base">
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
