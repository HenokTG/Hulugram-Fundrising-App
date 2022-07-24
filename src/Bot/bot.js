const { Telegraf } = require("telegraf");

const BOT_TOKEN = "5524495934:AAFTNTejoN2bk2vSEr5IoK8KKJI12o3ZIgk";
const webLink = ""
const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome to Hulugram Fund"));

bot.launch();
