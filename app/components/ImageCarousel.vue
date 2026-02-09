<script setup lang="ts">
interface Props {
  images: string[]
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Фото'
})

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

function selectThumbnail(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}
</script>

<template>
  <div class="w-full">
    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="props.images"
      arrows
      loop
      :prev="{ onClick: onClickPrev, variant: 'solid' as const }"
      :next="{ onClick: onClickNext, variant: 'solid' as const }"
      :ui="{
        item: 'basis-full',
        prev: 'sm:start-4',
        next: 'sm:end-4',
        container: 'ms-0'
      }"
      @select="onSelect"
    >
      <NuxtImg
        :src="item"
        :alt="`${props.alt} ${index + 1}`"
        class="w-full aspect-video object-cover rounded-lg"
        loading="lazy"
      />
    </UCarousel>

    <div v-if="props.images.length > 1" class="flex gap-2 justify-center pt-4 flex-wrap">
      <button
        v-for="(item, index) in props.images"
        :key="index"
        class="size-16 rounded-md overflow-hidden opacity-50 hover:opacity-100 transition-opacity ring-2 ring-transparent"
        :class="{ 'opacity-100 ring-primary': activeIndex === index }"
        @click="selectThumbnail(index)"
      >
        <NuxtImg
          :src="item"
          :alt="`${props.alt} миниатюра ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </button>
    </div>
  </div>
</template>
