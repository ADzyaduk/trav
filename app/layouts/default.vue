<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Главная',
    icon: 'i-lucide-home',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'Экскурсии',
    icon: 'i-lucide-map',
    to: '/excursions',
    active: route.path.startsWith('/excursions')
  },
  {
    label: 'Яхты',
    icon: 'i-lucide-sailboat',
    to: '/yachts',
    active: route.path.startsWith('/yachts')
  },
  {
    label: 'Контакты',
    icon: 'i-lucide-phone',
    to: '/contacts',
    active: route.path === '/contacts'
  }
])

const footerNavItems: NavigationMenuItem[] = [
  {
    label: 'Экскурсии',
    to: '/excursions'
  },
  {
    label: 'Яхты',
    to: '/yachts'
  },
  {
    label: 'Контакты',
    to: '/contacts'
  }
]
</script>

<template>
  <UHeader title="TravelSite">
    <UNavigationMenu :items="navigationItems" />

    <template #right>
      <UButton
        icon="i-lucide-phone"
        color="primary"
        variant="ghost"
        to="tel:+79001234567"
        aria-label="Позвонить"
        class="hidden sm:inline-flex"
      />

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" />

      <UButton
        icon="i-lucide-phone"
        label="Позвонить"
        color="primary"
        variant="soft"
        to="tel:+79001234567"
        class="mt-4"
        block
      />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        &copy; {{ new Date().getFullYear() }} TravelSite. Все права защищены.
      </p>
    </template>

    <UNavigationMenu :items="footerNavItems" variant="link" />

    <template #right>
      <UButton
        icon="i-lucide-phone"
        color="neutral"
        variant="ghost"
        to="tel:+79001234567"
        aria-label="Позвонить"
      />
    </template>
  </UFooter>
</template>
