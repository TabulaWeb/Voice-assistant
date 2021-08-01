# Голосовой помошник
Данный голосовой помошник слушжит для автоматизации процессов, таких как выключение компьютера, запуск программ и все, что вашей душе угодно.

При разработке использовались:
- [node.js](https://nodejs.org/en/)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [axios](https://github.com/axios/axios)
- [Yandex SpeechKit](https://console.cloud.yandex.ru/)

## Установка 
### Шаг 1
Устанавливаем [node.js](https://nodejs.org/en/)

### Шаг 2
Скачиваем репозиторий и устанавливаем пакеты<br>
```
yarn add
```

### Шаг 3
Создаем телеграм бота через [BotFather](https://telegram.me/BotFather)

### Шаг 4
Получаем ключик в [Yandex SpeechKit](https://console.cloud.yandex.ru/)

### Шаг 5
Создаем файл api.js

```javascript
const TELEGRAM_API_KEY = '<key>';
const YA_API_KEY = '<key>'

export {TELEGRAM_API_KEY, YA_API_KEY}
```

### Шаг 6
Запускаем бота 
```
node index.js
```

## Итог
У вас должен получится эхо бот, который просто выводить в чат, всё что вы проговорили.
Дальше всё зависит от вашей фантазии, или можете зайти во вторую ветку и посмотреть, что получилось у меня.