import { restricted } from '../middlewares/authMiddleware.js';
import { airdropScene } from '../scenes/airdropScene.js';
import { getMainKeyboard } from './mainController.js';
import { EXCEL_FILE } from '../../config/config.js';
import fs from 'fs';

export const setupAirdropControllers = (bot) => {
    bot.action('add_airdrop', restricted((ctx) => ctx.scene.enter('airdropScene')));

    bot.action('download_data', restricted(async (ctx) => {
        if (fs.existsSync(EXCEL_FILE)) {
            await ctx.replyWithDocument({ source: EXCEL_FILE });
        } else {
            await ctx.reply('File data tidak ditemukan.', getMainKeyboard());
        }
        await ctx.answerCbQuery();
    }));
};