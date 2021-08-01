import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import fs from 'fs';
import {TELEGRAM_API_KEY, YA_API_KEY} from './api.js';


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
                
                bot.sendMessage(msg.chat.id, command)
            })
            .catch((err) => {
                console.log('Ошибка распознования речи: ', err)
            })
    })
});
