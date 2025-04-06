import fs from 'fs';
import { WALLET_FILE } from '../../config/config.js';

export const loadWallets = () => {
    if (fs.existsSync(WALLET_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(WALLET_FILE, 'utf8'));
        } catch (error) {
            return {};
        }
    }
    return {};
};

export const saveWallet = (userId, address, chain) => {
    const wallets = loadWallets();
    address = address.trim();
    chain = chain.toUpperCase();
    
    if (!wallets[userId]) {
        wallets[userId] = [];
    }
    
    wallets[userId].push({ address, chain });
    fs.writeFileSync(WALLET_FILE, JSON.stringify(wallets, null, 4));
};

export const deleteWalletByIndex = (userId, index) => {
    const wallets = loadWallets();
    const userWallets = wallets[userId] || [];
    
    if (index >= 0 && index < userWallets.length) {
        const removed = userWallets.splice(index, 1)[0];
        wallets[userId] = userWallets;
        fs.writeFileSync(WALLET_FILE, JSON.stringify(wallets, null, 4));
        return removed;
    }
    return null;
};