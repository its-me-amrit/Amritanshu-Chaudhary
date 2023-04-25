const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// allow cross-origin requests
app.use(cors())

// connect to the database
mongoose.connect('mongodb://localhost:27017/ads_database', { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

// define the ad schema
const adSchema = new mongoose.Schema({
    company: String,
    headline: String,
    primary_text: String,
    description: String
})

// define the ad model
const Ad = mongoose.model('Ad', adSchema)

// define the search route
app.get('/search', async (req, res) => {
    try {
        const keyword = req.query.q

        // search across the company name, primary text, headline, and description
        const results = await Ad.aggregate([
            {
                $match: {
                    $or: [
                        { company: { $regex: keyword, $options: 'i' } },
                        { primary_text: { $regex: keyword, $options: 'i' } },
                        { headline: { $regex: keyword, $options: 'i' } },
                        { description: { $regex: keyword, $options: 'i' } },
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    company: 1,
                    headline: 1
                }
            },
            {
                $group: {
                    _id: "$company",
                    ads: {
                        $push: {
                            headline: "$headline"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    company: "$_id",
                    ads: 1
                }
            }
        ])

        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

// start the server
app.listen(5000, () => {
    console.log("Server started on port 5000")
})
