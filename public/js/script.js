// Обработка формы заказа
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        // Переключение вкладок площадок
        document.querySelectorAll('.platform-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Удаляем активный класс у всех вкладок и блоков информации
                document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.platform-info').forEach(info => info.classList.remove('active'));
                
                // Добавляем активный класс текущей вкладке
                tab.classList.add('active');
                
                // Показываем соответствующую информацию
                const platform = tab.getAttribute('data-platform');
                document.getElementById(`${platform}-info`).classList.add('active');
                
                // Обновляем выбор в форме
                document.getElementById('platform').value = platform;
                
                // Показываем/скрываем поле для своей площадки
                if (platform === 'other') {
                    document.getElementById('custom-platform-group').style.display = 'block';
                } else {
                    document.getElementById('custom-platform-group').style.display = 'none';
                }
            });
        });
        
        // Обработка выбора платформы в форме
        const platformSelect = document.getElementById('platform');
        if (platformSelect) {
            platformSelect.addEventListener('change', (e) => {
                const platform = e.target.value;
                
                // Показываем/скрываем поле для своей площадки
                if (platform === 'other') {
                    document.getElementById('custom-platform-group').style.display = 'block';
                } else {
                    document.getElementById('custom-platform-group').style.display = 'none';
                }
            });
        }
        
        // Обработка отправки формы
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = {
                platform: document.getElementById('platform').value,
                customPlatform: document.getElementById('custom-platform').value,
                productUrl: document.getElementById('product-url').value,
                size: document.getElementById('size').value,
                color: document.getElementById('color').value,
                quantity: document.getElementById('quantity').value,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                comments: document.getElementById('comments').value
            };
            
            // Здесь можно добавить отправку данных на сервер
            console.log('Данные заказа:', formData);
            
            alert('Заказ отправлен! Мы свяжемся с вами для уточнения деталей.');
            
            // Очищаем форму
            orderForm.reset();
        });
    }
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
