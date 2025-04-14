const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

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

module.exports = app; // Критично для Vercel!
