require('dotenv').config()

const express = require('express')
const app = express()

// -------- FILE HANDLING --------
const fs = require('fs')
const path = require('path')

// -------- HTTPS --------
const https = require('https')

// -------- ROUTERS --------
const apiRouter = require('./routers/apiRouter')

// -------- SECURITY MIDDLEWARES --------
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
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
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: [],
        }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "no-referrer" },
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
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
app.use(hpp())

// -------- PERFORMANCE & LOGGING --------
app.use(compression())
app.use(morgan('combined'))

// -------- CROSS-ORIGIN --------
app.use(cors({
    origin: process.env.CLIENT_ORIGIN_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
}))

// -------- PARSING --------
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -------- ROUTERS --------
app.use("/api", apiRouter)

// -------- START SERVERS --------
const httpsOptions = {
    key: fs.readFileSync('../ssl/localhost-key.pem'),
    cert: fs.readFileSync('../ssl/localhost.pem')
};
const SERVER_PORT = parseInt(process.env.SERVER_PORT) || 4444

https.createServer(httpsOptions, app)
    .listen(SERVER_PORT, () => {
        console.log(`HTTPS server is running on port ${SERVER_PORT}`);
    })
    .on('error', (err) => {
        console.error('❌ HTTPS server error:', err.message);
    })

// -------- DEFAULT ROUTE --------
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, process.env.CLIENT_BUILD_PATH)))

    app.get('*', () => {
        res.sendFile(path.join(__dirname, process.env.CLIENT_BUILD_PATH, 'index.html'))
    })
}

