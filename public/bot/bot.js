const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Установка вебхука
bot.telegram.setWebhook(`${process.env.VERCEL_URL}/webhook`);

// Обработчик команды
bot.command('start', (ctx) => {
  ctx.reply('Welcome!', {
    reply_markup: {
      inline_keyboard: [[{
        text: 'Open WebApp',
        web_app: { url: process.env.WEBAPP_URL }
      }]]
    }
  });
});

// Вебхук для Telegram
app.use(bot.webhookCallback('/webhook'));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Критично для Vercel!
