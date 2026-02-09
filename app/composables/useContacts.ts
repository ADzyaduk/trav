export function useContacts() {
  const config = useRuntimeConfig()

  return {
    phone: config.public.phoneNumber as string,
    phoneFormatted: config.public.phoneFormatted as string,
    phoneHref: `tel:${config.public.phoneNumber}`,
    telegramLink: config.public.telegramLink as string,
    telegramUsername: config.public.telegramUsername as string,
    maxLink: config.public.maxLink as string,
    maxLogo: '/max.png'
  }
}
