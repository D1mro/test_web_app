


const express = require('express');
const { Telegraf } = require('telegraf');

// Укажите токен бота вручную
const BOT_TOKEN = '7980015624:AAEdP30COOVbhlgP_hcX6mnoUfPUSErNTjg'; // Замените на ваш токен
const WEBAPP_URL = 'https://your-webapp-url.com'; // Замените на ваш URL веб-приложения

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// Установка вебхука
const webhookUrl = `https://your-vercel-app.vercel.app/webhook`; // Замените на ваш URL
bot.telegram.setWebhook(webhookUrl);

// Обработчик команды
bot.command('start', (ctx) => {
  ctx.reply('Welcome!', {
    reply_markup: {
      inline_keyboard: [[{
        text: 'Open WebApp',
        web_app: { url: WEBAPP_URL }
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
