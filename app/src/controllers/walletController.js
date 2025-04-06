import { restricted } from '../middlewares/authMiddleware.js';
import { walletScene } from '../scenes/walletScene.js';
import { loadWallets } from '../services/walletService.js';
import { getMainKeyboard } from './mainController.js';

export const setupWalletControllers = (bot) => {
    bot.action('add_wallet', restricted((ctx) => ctx.scene.enter('walletScene')));

    bot.action('list_wallet', restricted(async (ctx) => {
        const userId = ctx.from.id.toString();
        const wallets = loadWallets()[userId] || [];
        
        if (wallets.length === 0) {
            await ctx.reply('⚠️ ANDA BELUM MENYIMPAN WALLET.', getMainKeyboard());
            return;
        }
        
        let text = '💳 *LIST WALLET ADDRESS ANDA:*\n';
        wallets.forEach((wallet, i) => {
            text += `${i + 1}. ${wallet.address} (${wallet.chain})\n`;
        });
        
        await ctx.reply(text, { parse_mode: 'Markdown', ...getMainKeyboard() });
        await ctx.answerCbQuery();
    }));
};