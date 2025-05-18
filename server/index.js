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

// NGROK CONFIG
app.set('trust proxy', 1)

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64')
    next()
})

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
            scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
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
        httpOnly: true,  
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1000 * 60 * 60 * 24 * 7,  
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
    process.env.SERVER_ORIGIN_URL
]

app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
}))

// -------- PARSING --------
app.use(cookieParser())
app.use(express.json())
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



