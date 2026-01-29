import mongoose from 'mongoose'


const URLSchema = new mongoose.Schema({
    url: String,
    shortUrl: {
        url: String,
        clicks: Number
    }
}, { timestamps: true })

const URL = mongoose.model('URL', URLSchema)

module.exports = URL;