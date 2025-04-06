import { Scenes, Markup } from 'telegraf';
import { STATES } from '../../config/config.js';
import { saveWallet } from '../services/walletService.js';
import { getMainKeyboard } from '../controllers/mainController.js';

export const walletScene = new Scenes.BaseScene('walletScene');

walletScene.enter(async (ctx) => {
    await ctx.reply('💳 SILAHKAN MASUKKAN WALLET ADDRESS ANDA:');
    ctx.scene.state.step = STATES.INPUT_WALLET_ADDRESS;
});

walletScene.on('text', async (ctx) => {
    if (ctx.scene.state.step === STATES.INPUT_WALLET_ADDRESS) {
        ctx.scene.state.walletAddress = ctx.message.text.trim();
        await ctx.reply('Pilih tipe wallet:', Markup.inlineKeyboard([
            [Markup.button.callback('EVM', 'wallet_type_evm')],
            [Markup.button.callback('Other', 'wallet_type_other')]
        ]));
        ctx.scene.state.step = STATES.CHOOSE_WALLET_TYPE;
    } else if (ctx.scene.state.step === STATES.INPUT_CHAIN) {
        const chain = ctx.message.text.trim();
        saveWallet(ctx.from.id.toString(), ctx.scene.state.walletAddress, chain);
        await ctx.reply(`✅ WALLET ${ctx.scene.state.walletAddress.toUpperCase()} (${chain.toUpperCase()}) BERHASIL DISIMPAN!`, 
            getMainKeyboard());
        await ctx.scene.leave();
    }
});

walletScene.action(/^wallet_type_/, async (ctx) => {
    if (ctx.match[0] === 'wallet_type_evm') {
        saveWallet(ctx.from.id.toString(), ctx.scene.state.walletAddress, 'EVM');
        await ctx.reply(`✅ WALLET ${ctx.scene.state.walletAddress} (EVM) BERHASIL DISIMPAN!`, 
            getMainKeyboard());
        await ctx.scene.leave();
    } else {
        await ctx.reply('SILAHKAN MASUKKAN NAMA CHAIN UNTUK WALLET ANDA:');
        ctx.scene.state.step = STATES.INPUT_CHAIN;
    }
    await ctx.answerCbQuery();
});