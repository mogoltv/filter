const {Schema,model} = require('mongoose')
const Double = require('@mongoosejs/double')

const userSchema = new Schema({
    promo: {
        type: String,
        required: true,
    },
    promo_type:{
        type: String,
        required: true,
    },
    promo_type_vip:{
        type: Number,
        required: false,
    },
    value:{
        type: Double,
        required: true,
    },
    activation_count:{
        type: Number,
        required: true,
    },
    activation_max:{
        type: Number,
        required: false,
    },
    used_by:{
        type: Object,
        required: false,
    }
}, {
    versionKey: false
})

module.exports = model('promo', userSchema)