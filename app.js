require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./database/connect')()
app.use(cors());
app.options('*', cors());
app.use(express.json({extended: true}))
app.use('/api/', require('./api/v1/api.js'))

app.listen(3000, ()=>{
    console.log('Сервер запущен и готов к приему аккаунтов')
})