import { Telegraf, session } from 'telegraf';
import { Scenes } from 'telegraf';
import { accounts } from './accounts/accounts.js';
import { walletScene } from './src/scenes/walletScene.js';
import { airdropScene } from './src/scenes/airdropScene.js';
import { setupWalletControllers } from './src/controllers/walletController.js';
import { setupAirdropControllers } from './src/controllers/airdropController.js';
import { restricted } from './src/middlewares/authMiddleware.js';
import { getMainKeyboard } from './src/controllers/mainController.js';

const bot = new Telegraf(accounts.TELEGRAM_BOT_TOKEN);

const stage = new Scenes.Stage([walletScene, airdropScene]);
bot.use(session());
bot.use(stage.middleware());

bot.command('start', restricted(async (ctx) => {
    await ctx.reply('THIS BOT WAS CREATED BY NOFAN RAMBE🚀', getMainKeyboard());
}));

setupWalletControllers(bot);
setupAirdropControllers(bot);

bot.launch().then(() => {
    console.log('Bot started');
}).catch((error) => {
    console.error('Error starting bot:', error);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));