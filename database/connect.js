require('dotenv').config()
const mongoose = require('mongoose')

module.exports = function connect(){
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
    },async function (err) {
        if (err) {
            console.log(err)
            console.log('Что-то пошло не так. База данных не подключена')
        }
        console.log('База данных успешно подключена')
    })
}