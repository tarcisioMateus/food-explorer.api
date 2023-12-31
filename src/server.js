require('express-async-errors')
require('dotenv/config')

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const routes = require('./routes')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["https://foodexplorer-api-aflp.onrender.com", "https://foodexplorerweb.netlify.app"],
    credentials: true
}))

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)



app.use(( error, request, response, next ) => {
    if (error instanceof AppError) {
        return response.status(error.status).json({
            message : error.message
        })
    }
    return response.status(500).json({
        message : `Internal Server Error .......... ${error.message}`,
    })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`running on port: ${PORT}`))
