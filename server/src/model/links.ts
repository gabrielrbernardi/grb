import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema(
    {
        NameLink: { 
            type: String, 
            required: true 
        },
        Link: { 
            type: String, 
            required: true 
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Link", LinkSchema)