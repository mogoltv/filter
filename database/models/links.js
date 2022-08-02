const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    link: {
        link_url:{
            type: String,
            required: true
        },
        link_name:{
            type: String,
            required: false
        },
        type: Object,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    queries:{
        type: Array,
        required: true,
    }
}, {
    versionKey: false
})

module.exports = model('link', userSchema)