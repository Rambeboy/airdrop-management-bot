import { Markup } from 'telegraf';

export const getMainKeyboard = () => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('✨ ADD AIRDROP', 'add_airdrop'),
            Markup.button.callback('💳 ADD WALLET', 'add_wallet')
        ],
        [
            Markup.button.callback('🗑 Delete Wallet', 'delete_wallet'),
            Markup.button.callback('📋 LIST WALLET ADDRESS', 'list_wallet')
        ],
        [
            Markup.button.callback('📊 LIST AIRDROP SAVED', 'list_airdrop'),
            Markup.button.callback('⏰ REMINDER LIST', 'reminder_lst')
        ],
        [
            Markup.button.callback('⚙️ Reminder Sett', 'reminder_sett'),
            Markup.button.callback('⏹ STOP REMINDER', 'stop_reminder')
        ],
        [
            Markup.button.callback('📥 DOWNLOAD DATA', 'download_data')
        ],
        [
            Markup.button.callback('🗑 DELETE AIRDROP', 'delete_airdrop')
        ]
    ]);
};