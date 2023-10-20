require('express-async-errors')

const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')

const app = express()
app.use(express.json)
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

const PORT = 3333
app.listen(PORT, () => console.log(`running on port: ${PORT}`))