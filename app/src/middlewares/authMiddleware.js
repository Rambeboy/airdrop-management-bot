import { accounts } from '../../config/config.js';

export const restricted = (handler) => {
    return async (ctx, next) => {
        if (ctx.from.id !== parseInt(accounts.ADMIN_ID)) {
            if (ctx.message) {
                await ctx.reply('Maaf, Anda tidak memiliki izin untuk menggunakan bot ini.');
            } else if (ctx.callbackQuery) {
                await ctx.answerCbQuery('Maaf, Anda tidak memiliki izin.', { show_alert: true });
            }
            return;
        }
        return handler(ctx, next);
    };
};