import type { NotifyRequest } from '~/types'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<NotifyRequest>(event)

  // Validate required fields
  if (!body.name?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Имя обязательно'
    })
  }

  if (!body.phone?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Телефон обязателен'
    })
  }

  if (!body.type || !['booking', 'callback'].includes(body.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Некорректный тип заявки'
    })
  }

  // Build the Telegram message
  let message = ''

  if (body.type === 'booking') {
    message = [
      '📋 *Новая заявка на бронирование*',
      '',
      `👤 *Имя:* ${escapeMarkdown(body.name)}`,
      `📞 *Телефон:* ${escapeMarkdown(body.phone)}`,
      body.serviceType ? `🏷 *Тип:* ${escapeMarkdown(body.serviceType === 'excursion' ? 'Экскурсия' : 'Яхта')}` : '',
      body.serviceTitle ? `📌 *Услуга:* ${escapeMarkdown(body.serviceTitle)}` : '',
      body.date ? `📅 *Дата:* ${escapeMarkdown(body.date)}` : '',
      body.comment ? `💬 *Комментарий:* ${escapeMarkdown(body.comment)}` : ''
    ].filter(Boolean).join('\n')
  }
  else {
    message = [
      '📞 *Запрос обратного звонка*',
      '',
      `👤 *Имя:* ${escapeMarkdown(body.name)}`,
      `📞 *Телефон:* ${escapeMarkdown(body.phone)}`,
      body.comment ? `💬 *Комментарий:* ${escapeMarkdown(body.comment)}` : ''
    ].filter(Boolean).join('\n')
  }

  // Send to Telegram
  const botToken = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!botToken || !chatId) {
    console.warn('[notify] Telegram credentials not configured. Message:', message)
    // Return success even without Telegram configured (for development)
    return { success: true, debug: 'Telegram not configured' }
  }

  try {
    await $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      }
    })

    return { success: true }
  }
  catch (error) {
    console.error('[notify] Telegram API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка отправки уведомления'
    })
  }
})

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}
