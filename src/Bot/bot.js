const { Telegraf } = require("telegraf");

const BOT_TOKEN = "5524495934:AAFTNTejoN2bk2vSEr5IoK8KKJI12o3ZIgk";
const webLink =
  "https://hulugram-fund.herokuapp.com/706699c0-0d8e-41bb-bdbe-a041833b1af7/donate";
const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply("Welcome to Hulugram Fund", {
    reply_markup: {
      inline_keyboard: [[{ text: "Hulu Donate", web_app: { url: webLink } }]],
    },
  })
);

bot.launch();
