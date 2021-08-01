const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios')
const fs = require('fs')

const TELEGRAM_API_KEY = '1913684884:AAF0FmR2EBx2Q-wHfnZFOELbhf3cZN98N8o';
const YA_API_KEY = 'AQVNxZLk3itKM7UOw6rImer82gQvDaFeNMlxbkE8'

const bot = new TelegramBot(TELEGRAM_API_KEY, {polling: true})

// Отслеживаем отправку голосовых сообщений
bot.on('voice', (msg) => {
    //Бинарные данные нашего голосового сообщения
    const stream = bot.getFileStream(msg.voice.file_id)

    let chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))

    stream.on('end', () => {
        // Запрос на SpeechkitAPI
        const axiosConfig = {
            method: 'POST',
            url: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
            headers: {
                Authorization: 'Api-Key ' + YA_API_KEY
            },
            data: Buffer.concat(chunks)
        }

        axios(axiosConfig)
            .then(response => {
                const command = response.data.result
                if(command == 'Выключи компьютер'){
                    bot.sendMessage(msg.chat.id, 'Компьютер сейчас будет выключен')
                }

                if(command == 'Удали файл'){
                    fs.unlinkSync('./text.txt')
                    bot.sendMessage(msg.chat.id, 'Файл удален')
                }
            })
            .catch((err) => {
                console.log('Ошибка распознования речи: ', err)
            })
    })
});
