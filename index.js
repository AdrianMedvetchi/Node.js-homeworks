const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Файл для хранения счетчиков
const counterFile = 'counters.json';

// Функция для чтения счетчиков из файла
const readCounters = () => {
    try {
        const data = fs.readFileSync(counterFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Если файл не существует или пустой, возвращаем начальные значения
        return { '/': 0, '/about': 0 };
    }
};

// Функция для записи счетчиков в файл
const writeCounters = (counters) => {
    fs.writeFileSync(counterFile, JSON.stringify(counters, null, 2), 'utf-8');
};

// Загрузка начальных значений счетчиков
let counters = readCounters();

app.get('/', (req, res) => {
    counters['/'] += 1; // Увеличиваем счетчик для главной страницы
    writeCounters(counters); // Сохраняем счетчики в файл

    res.send(`
        <h1>Home Page</h1>
        <p>Views: ${counters['/']}</p>
        <a href="/about">About</a>
    `);
});

app.get('/about', (req, res) => {
    counters['/about'] += 1; // Увеличиваем счетчик для страницы "About"
    writeCounters(counters); // Сохраняем счетчики в файл

    res.send(`
        <h1>About Page</h1>
        <p>Views: ${counters['/about']}</p>
        <a href="/">Home</a>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

