const { Telegraf } = require('telegraf');
const express = require('express');

const BOT_TOKEN = '7980015624:AAEdP30COOVbhlgP_hcX6mnoUfPUSErNTjg';
const WEBAPP_URL = 'https://swap-shoes-bot.vercel.app';
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// 1. Обработчики команд
bot.command('start', (ctx) => {
  try {
    ctx.reply('Добро пожаловать в SWAP SHOES! 👟', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: '🛍️ Открыть магазин',
            web_app: { url: WEBAPP_URL }
          }]
        ]
      }
    });
  } catch (e) {
    console.error('Ошибка в команде /start:', e);
  }
});

// 2. Обработка вебхука
app.post('/api/webhook', async (req, res) => {
  try {
    await bot.handleUpdate(req.body, res);
  } catch (e) {
    console.error('Ошибка обработки вебхука:', e);
    res.status(200).send();
  }
});

// 3. Инициализация вебхука (вызывается один раз)
const initWebhook = async () => {
  try {
    const webhookUrl = `${WEBAPP_URL}/api/webhook`;
    await bot.telegram.setWebhook(webhookUrl);
    console.log('Webhook установлен на:', webhookUrl);
  } catch (e) {
    console.error('Ошибка настройки вебхука:', e);
  }
};

// 4. Для Vercel - основной обработчик
module.exports = app;

// 5. Локальный запуск (для тестов)
if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, async () => {
    console.log(`Локальный сервер запущен на порту ${PORT}`);
    await initWebhook();
  });
} else {
  // Для продакшена инициализируем вебхук при старте
  initWebhook().catch(console.error);
}
