require('dotenv').config()

const express = require('express')
const app = express()

// -------- FILE HANDLING --------
const fs = require('fs')
const path = require('path')

// -------- TRANSLATIONS --------
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')

// -------- HTTPS --------
const https = require('https')

// -------- ROUTERS --------
const { apiRouter } = require('./routers/apiRouter')
const { authRouter } = require('./routers/authRouter')

// -------- SECURITY MIDDLEWARES --------
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const crypto = require('node:crypto')

// -------- OTHER MIDDLEWARES --------
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')

// -------- SESSIONS --------
const session = require('express-session')
const { RedisStore } = require('connect-redis')
const redisClient = require('./db/redisClient')

// -------- AUTHENTICATION --------
const passport = require('./config/passport')

// -------- TRANSLATIONS ---------
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        preload: ['en', 'es', 'it', 'de', 'fr', 'ch'],
        backend: {
            loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json')
        },
        detection: {
            order: ['header', 'querystring', 'cookie'],
            caches: false,
        },
    })

app.use(middleware.handle(i18next))

// -------- SECURITY HEADERS --------
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", process.env.CLIENT_ORIGIN_URL],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: [],
        }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
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
    max: 1000, // limit each IP to 100 requests per windowMs
    message: "Too much requests, try again in 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
}))

// ------- SESSIONS --------
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        sameSite: 'none', 
        maxAge: 1000 * 60 * 60 
    },
})
)

// -------- SANITIZATION --------
app.use(hpp())

// -------- PERFORMANCE & LOGGING --------
app.use(compression())
app.use(morgan('combined'))

// -------- CROSS-ORIGIN --------
allowedOrigins = [
    process.env.CLIENT_ORIGIN_URL,
    process.env.SERVER_ORIGIN_URL,
    'http://127.0.0.1:5500'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
}))

// -------- PARSING --------
app.use(cookieParser())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }))

// -------- AUTHENTICATION --------
app.use(passport.initialize())
app.use(passport.session())

// -------- DEFAULT ROUTE --------
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.resolve(__dirname, process.env.CLIENT_BUILD_PATH)
    console.log('Resolved client build path:', clientBuildPath)

    app.use(express.static(clientBuildPath))

    app.get('/', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'))
    })
}

// -------- ROUTERS --------
app.use("/api", apiRouter)
app.use("/auth", authRouter)

// -------- STATIC FOLDER FOR SAVING IMAGES ---------
const uploadFolder = path.join(__dirname, '../uploads')
app.use('/uploads', express.static(uploadFolder))

const requiredDirs = [
    path.join(__dirname, '../uploads/products/images'),
    path.join(__dirname, '../uploads/products/models')
]

requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
})

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
        console.error('HTTPS server error:', err.message);
    })



