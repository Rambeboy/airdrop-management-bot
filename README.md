# TELEGRAM AIRDROP MANAGEMENT BOT 🤖

A Telegram bot for managing airdrop campaigns, wallet addresses, and reminders. Built with Node.js and Telegraf framework.

## FEATURES ✨
1. Wallet Management 💳
- Add multiple wallet addresses
- List all saved wallets
- Delete wallets
- Categorize by chain type (EVM/Other)

2. Airdrop Management 🪂
- Save airdrop details with:
- Telegram links
- Titles
- Types (Testnet, Airdrop, Node, Other)
- Associated wallet
- Timestamps
- List all saved airdrops
- Delete airdrop entries

3. Data Export 📤
- Download Excel file with all airdrop data
- Automatic Excel file formatting

4. Reminders ⏰
- Set automatic reminders for airdrops
- Custom reminder intervals
- Stop reminders

## PREREQUISITES 📋

- Node.js v18 or higher
- Telegram Bot Token from [@BotFather](https://t.me/BotFather)
- Admin Telegram User ID

## INSTALLATION 🛠️

1. Clone the repository:
```bash
git clone https://github.com/Rambeboy/airdrop-management-bot.git && cd airdrop-management-bot
```

2. Install dependencies:
```bash
npm install && npm run setup
```

3. Set up configuration:
```bash
nano accounts/accounts.js
```

## RUNNING THE BOT 🚀

1. **Development Mode (with auto-restart):**
```bash
npm run dev
```

2. **Production Mode:**
```bash
npm run start
```

## PROJECT STRUCTURE 📂

```
src/      
├── controllers/     # Bot command handlers
├── middlewares/     # Authentication middleware
├── scenes/          # Conversation scenes
├── services/        # Business logic services
└── index.js         # Main entry point
```


## AVAILABLE COMMANDS 🎛️

| Command | Description |
|---------|-------------|
| /start | Start the bot and show main menu |
| Add Wallet | Add new wallet address |
| Add Airdrop | Save new airdrop information |
| List Wallet | Show all saved wallets |
| List Airdrop | Show all saved airdrops |
| Download Data | Get Excel file with all data |
| Reminder Settings | Configure airdrop reminders |

## ENVIRONMENT VARIABLES🔧

The bot uses the following configuration (set in `accounts.js`):

| Variable | Description |
|----------|-------------|
| ADMIN_ID | Your Telegram user ID |
| TELEGRAM_BOT_TOKEN | Token from BotFather |

## CONTRIBUTING 🤝

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## LICENSE 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
