const { Telegraf } = require('telegraf');
const express = require('express');

const BOT_TOKEN = '7980015624:AAEdP30COOVbhlgP_hcX6mnoUfPUSErNTjg';
const WEBAPP_URL = 'https://swap-shoes-bot.vercel.app'; // Замените на ваш реальный URL

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// 1. Настройка вебхука (критически важно!)
const initWebhook = async () => {
  try {
    const webhookUrl = `https://${process.env.VERCEL_URL}/webhook` || 'https://your-app.vercel.app/webhook';
    await bot.telegram.setWebhook(webhookUrl);
    console.log('Webhook установлен на:', webhookUrl);
  } catch (e) {
    console.error('Ошибка настройки вебхука:', e);
  }
};

// 2. Обработчики команд
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

// 3. Подключение вебхука
app.post('/webhook', (req, res) => {
  try {
    bot.handleUpdate(req.body, res);
  } catch (e) {
    console.error('Ошибка обработки вебхука:', e);
    res.status(200).send();
  }
});

// 4. Обязательные экспорты для Vercel
module.exports = async (req, res) => {
  try {
    await initWebhook();
    return app(req, res);
  } catch (e) {
    console.error('Ошибка инициализации:', e);
    return res.status(500).send('Internal Server Error');
  }
};

// 5. Локальный запуск (для тестов)
if (process.env.NODE_ENV === 'development') {
  app.listen(3000, () => {
    console.log('Локальный сервер запущен на порту 3000');
    bot.launch();
  });
}
