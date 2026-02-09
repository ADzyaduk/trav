<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const contacts = useContacts()

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
    <UNavigationMenu :items="navigationItems" aria-label="Основная навигация" />

    <template #right>
      <UButton
        icon="i-lucide-phone"
        color="primary"
        variant="ghost"
        :to="contacts.phoneHref"
        aria-label="Позвонить"
        class="hidden sm:inline-flex"
      />

      <UButton
        icon="i-simple-icons-telegram"
        color="primary"
        variant="ghost"
        :to="contacts.telegramLink"
        target="_blank"
        aria-label="Написать в Telegram"
        class="hidden sm:inline-flex"
      />

      <UButton
        variant="ghost"
        color="primary"
        :to="contacts.maxLink"
        target="_blank"
        aria-label="Написать в MAX"
        class="hidden sm:inline-flex"
      >
        <img :src="contacts.maxLogo" alt="MAX" class="size-5">
      </UButton>

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" aria-label="Основная навигация (мобильная)" />

      <div class="mt-4 flex flex-col gap-2">
        <UButton
          icon="i-lucide-phone"
          label="Позвонить"
          color="primary"
          variant="soft"
          :to="contacts.phoneHref"
          block
        />
        <UButton
          icon="i-simple-icons-telegram"
          label="Telegram"
          color="primary"
          variant="soft"
          :to="contacts.telegramLink"
          target="_blank"
          block
        />
        <UButton
          label="MAX"
          color="primary"
          variant="soft"
          :to="contacts.maxLink"
          target="_blank"
          block
        >
          <template #leading>
            <img :src="contacts.maxLogo" alt="MAX" class="size-5">
          </template>
        </UButton>
      </div>
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

    <UNavigationMenu :items="footerNavItems" variant="link" aria-label="Навигация по сайту в футере" />

    <template #right>
      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-phone"
          color="neutral"
          variant="ghost"
          :to="contacts.phoneHref"
          aria-label="Позвонить"
        />
        <UButton
          icon="i-simple-icons-telegram"
          color="neutral"
          variant="ghost"
          :to="contacts.telegramLink"
          target="_blank"
          aria-label="Написать в Telegram"
        />
        <UButton
          color="neutral"
          variant="ghost"
          :to="contacts.maxLink"
          target="_blank"
          aria-label="Написать в MAX"
        >
          <img :src="contacts.maxLogo" alt="MAX" class="size-5">
        </UButton>
      </div>
    </template>
  </UFooter>
</template>
