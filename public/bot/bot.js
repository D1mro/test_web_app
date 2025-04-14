const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать!', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Открыть WebApp',
          web_app: { url: 'https://test-web-app-tawny.vercel.app' }
        }]
      ]
    }
  });
});

bot.launch();
