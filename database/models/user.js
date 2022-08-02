const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    id:{
        type: Number,
        required: true,
    },
    info:{
        login: {
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        reg_date:{
            type: Date,
            required: true
        },
        type: Object,
        required: true,
    },
    settings:{
        style:{
            default: 0,
            type: Number,
            required: false
        },
        type: Object,
        required: false,
    },
    ref:{
        ref_id:{
            type: Number,
            required: true,
        },
        ref_balance:{
            default: 0,
            type: Number,
            required: false,
        },
        type: Object,
        required: true,
    },
    balance:{
        default: 0,
        type: Number,
        required: false,
    },
    transactions:{
        default: [],
        type: Array,
        required: false,
    },
    ban:{
        is_banned:{
            type: Boolean,
            default: false,
            required: false,
        },
        ban_reason:{
            type: String,
            required: false,
        },
        type: Object,
        required: false,
    },
    edit_mode:{
        is_edit_mode_enabled:{
            default: false,
            type: Boolean,
            required: false,
        },
        edit_mode_type:{
            type: String,
            required: false,
        },
        required: false,
        type: Object,
    },
    links:{
        redirects:{
            type: Object,
        },
        shorten_links:{
            type: Object,
        },
        links_stats:{
            type: Object,
        },
        required: true,
        type: Object,
    },
    vip:{
        is_vip_exists:{
            default: false,
            type: Boolean,
            required: true,
        },
        vip_until_date:{
            type: Date,
            required: false,
        },
        vip_type:{
            type: Number,
            required: false,
        },
        required: false,
        type: Object
    },
    admin_permission:{
        default: false,
        type: Boolean,
        required: true
    },
    request_data:{
        is_user_accepted:{
            default: '-',
            type: String,
            required: true
        },
        user_expirience:{
            type: String,
            required: true
        },
        known_from:{
            type: String,
            required: true
        },
        is_rules_accepted:{
            type: Boolean,
            required: true
        },
        required: false,
        type: Object
    },
    last_message_date: {
        type: Date,
        required: false
    }
}, {
    versionKey: false
})

module.exports = model('user', userSchema)