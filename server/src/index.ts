import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/dbConfig'
import { teamRoute } from './routes/teamRoute'
import { eventRoute } from './routes/eventRoute'

const app = express()

// db connection
connectDb()

// middleware
const corsOptions = {
    origin: process.env.CLIENT_URL
}

app.use(cors(corsOptions))
app.use(express.json())

// routes
app.use('/api/team', teamRoute)
app.use('/api/event', eventRoute)

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

