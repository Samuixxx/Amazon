require('dotenv').config()

const express = require('express')
const app = express()

// -------- FILE HANDLING --------
const fs = require('fs')
const path = require('path')

// -------- HTTPS --------
const https = require('https')

// -------- SECURITY MIDDLEWARES --------
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

// -------- OTHER MIDDLEWARES --------
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')

// -------- SECURITY HEADERS --------
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'self'"],
            upgradeInsecureRequests: [],
        }
    }
}))

// -------- RATE LIMITING --------
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
}))

// -------- SANITIZATION --------
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// -------- PERFORMANCE & LOGGING --------
app.use(compression())
app.use(morgan('combined'))

// -------- CROSS-ORIGIN --------
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}))

// -------- PARSING --------
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -------- START SERVERS --------
const httpsOptions = {
    key: fs.readFileSync('../ssl/key.pem'),
    cert: fs.readFileSync('../ssl/cert.pem')
};

https.createServer(httpsOptions, app).listen(process.env.SERVER_PORT, () => {
    console.log(`HTTPS server is running on port ${process.env.SERVER_PORT}`);
});

// -------- DEFAULT ROUTE --------
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, process.env.CLIENT_BUILD_PATH)))

    app.get('*', () => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
}