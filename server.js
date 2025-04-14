const express = require('express');
const app = express();

// Раздаем статику из папки public
app.use(express.static('public'));

// Все запросы перенаправляем на index.html
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Экспорт для Vercel
module.exports = app;