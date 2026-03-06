import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes/index.js'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
)

app.use(morgan('dev'))
app.use(express.json())

app.get('/api/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'API Mercurius online',
        timestamp: new Date().toISOString(),
    })
})

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app