
// Проверяем, открыто ли в Telegram Web App
if (window.Telegram && Telegram.WebApp) {
    document.body.classList.add('tg');
    Telegram.WebApp.ready();
} else {
    // Стандартное поведение для браузера
    console.log('Not in Telegram Web App');
}

// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Функция для расширения приложения на весь экран
function expandApp() {
    tg.expand();
}

// Функция для обработки данных из Telegram
function processInitData() {
    const initData = tg.initDataUnsafe;
    if (initData && initData.user) {
        // Автозаполнение данных пользователя из Telegram
        document.getElementById('name').value = initData.user.first_name || '';
        document.getElementById('phone').value = initData.user.phone_number || '';
        
        if (initData.user.last_name) {
            document.getElementById('name').value += ' ' + initData.user.last_name;
        }
    }
}

// Функция для закрытия приложения
function closeApp() {
    tg.close();
}

// Функция для отправки данных в Telegram
function sendDataToTelegram(data) {
    tg.sendData(JSON.stringify(data));
}

// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Изменяем стили под Telegram Web App
    document.body.style.backgroundColor = 'var(--tg-theme-bg-color, #ffffff)';
    document.body.style.color = 'var(--tg-theme-text-color, #000000)';
    
    // Показываем кнопку "Закрыть" в шапке
    const header = document.querySelector('header');
    if (header) {
        header.style.paddingTop = '50px';
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '15px';
        closeBtn.style.fontSize = '24px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = closeApp;
        header.appendChild(closeBtn);
    }
    
    // Обработка формы заказа
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                platform: document.getElementById('platform').value,
                productUrl: document.getElementById('product-url').value,
                size: document.getElementById('size').value,
                color: document.getElementById('color').value,
                quantity: document.getElementById('quantity').value,
                user: tg.initDataUnsafe.user
            };
            
            // Отправляем данные в Telegram
            sendDataToTelegram(formData);
            
            // Показываем подтверждение
            tg.showAlert('Заказ принят! Мы свяжемся с вами в ближайшее время.');
        });
    }
    
    // Инициализация данных пользователя
    processInitData();
    
    // Расширяем приложение на весь экран
    expandApp();
});
