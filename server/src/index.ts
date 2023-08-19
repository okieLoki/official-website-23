import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/dbConfig'
import cookieParser from 'cookie-parser'
import { teamRoute } from './routes/teamRoute'
import { eventRoute } from './routes/eventRoute'
import { projectRoute } from './routes/projectRoute'
import { userRoute } from './routes/userRoute'

const app = express()

// db connection
connectDb()

// middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/user', userRoute)
app.use('/api/team', teamRoute)
app.use('/api/event', eventRoute)
app.use('/api/project', projectRoute)

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

