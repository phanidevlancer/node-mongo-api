const mongoose = require('mongoose')

const connectDatabae = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("connected to MongoDB")
        })
    } catch (error) {
        console.log("Not connected to MongoDB", error)
    }
}

module.exports = connectDatabae

