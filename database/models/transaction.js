const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    transaction_id: {
        type: String,
        required: true,
    },
    transaction_value:{
        type: Number,
        required: true,
    },
    transaction_status:{
        type: String,
        required: true,
    },
    transaction_date:{
        type: Date,
        required: true,
    },
    transaction_type:{
        type: String,
        required: true,
    },
}, {
    versionKey: false
})

module.exports = model('transaction', userSchema)