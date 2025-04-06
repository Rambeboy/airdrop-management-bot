import { Scenes, Markup } from 'telegraf';
import { STATES } from '../../config/config.js';
import { loadWallets } from '../services/walletService.js';
import { getWorkbook, saveWorkbook } from '../services/excelService.js';
import { getMainKeyboard } from '../controllers/mainController.js';

export const airdropScene = new Scenes.BaseScene('airdropScene');

airdropScene.enter(async (ctx) => {
    await ctx.reply('📎 SILAHKAN KIRIMKAN LINK TELEGRAM UNTUK AIRDROP INI:');
    ctx.scene.state.step = STATES.INPUT_AIRDROP_LINK;
});

airdropScene.on('text', async (ctx) => {
    if (ctx.scene.state.step === STATES.INPUT_AIRDROP_LINK) {
        ctx.scene.state.airdropLink = ctx.message.text.trim().toUpperCase();
        await ctx.reply('📝 SILAHKAN MASUKKAN JUDUL AIRDROP:');
        ctx.scene.state.step = STATES.INPUT_AIRDROP_TITLE;
    } else if (ctx.scene.state.step === STATES.INPUT_AIRDROP_TITLE) {
        ctx.scene.state.airdropTitle = ctx.message.text.trim().toUpperCase();
        await ctx.reply('PILIH JENIS AIRDROP:', Markup.inlineKeyboard([
            [Markup.button.callback('TESTNET', 'airdrop_type_testnet')],
            [Markup.button.callback('AIRDROP', 'airdrop_type_airdrop')],
            [Markup.button.callback('NODE', 'airdrop_type_node')],
            [Markup.button.callback('OTHER', 'airdrop_type_other')]
        ]));
        ctx.scene.state.step = STATES.CHOOSE_AIRDROP_TYPE;
    }
});

airdropScene.action(/^airdrop_type_/, async (ctx) => {
    ctx.scene.state.airdropType = ctx.match[0].replace('airdrop_type_', '').toUpperCase();
    const userId = ctx.from.id.toString();
    const wallets = loadWallets()[userId] || [];
    
    if (wallets.length === 0) {
        await ctx.reply('⚠️ ANDA BELUM MEMILIKI WALLET. SILAHKAN TAMBAHKAN WALLET TERLEBIH DAHULU.', 
            getMainKeyboard());
        await ctx.scene.leave();
        return;
    }
    
    const buttons = wallets.map((wallet, i) => [
        Markup.button.callback(`${wallet.address} (${wallet.chain})`, `wallet_${i}`)
    ]);
    
    await ctx.reply('PILIH WALLET ADDRESS UNTUK AIRDROP INI:', 
        Markup.inlineKeyboard(buttons));
    ctx.scene.state.step = STATES.CHOOSE_WALLET;
    await ctx.answerCbQuery();
});

airdropScene.action(/^wallet_/, async (ctx) => {
    const index = parseInt(ctx.match[0].replace('wallet_', ''));
    const userId = ctx.from.id.toString();
    const wallets = loadWallets()[userId] || [];
    const walletAddress = index < wallets.length ? wallets[index].address : 'TIDAK DITEMUKAN';
    
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').replace(/\..+/, '');
    
    const newRow = [
        ctx.scene.state.airdropLink,
        ctx.scene.state.airdropTitle,
        ctx.scene.state.airdropType,
        walletAddress,
        timestamp
    ];
    
    try {
        const workbook = await getWorkbook();
        const worksheet = workbook.getWorksheet('AirdropData');
        worksheet.addRow(newRow);
        
        const lastRow = worksheet.lastRow;
        lastRow.eachCell((cell) => {
            cell.alignment = { horizontal: 'center', vertical: 'center' };
        });
        
        await saveWorkbook(workbook);
        await ctx.reply('✅ AIRDROP BERHASIL DISIMPAN KE FILE EXCEL!', 
            getMainKeyboard());
    } catch (error) {
        console.error('Error saving airdrop:', error);
        await ctx.reply('⚠️ GAGAL MENYIMPAN AIRDROP.', 
            getMainKeyboard());
    }
    
    await ctx.scene.leave();
    await ctx.answerCbQuery();
});