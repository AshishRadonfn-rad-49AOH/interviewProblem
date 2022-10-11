const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)