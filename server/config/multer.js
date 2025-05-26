const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest
        if (file.fieldname === 'images') {
            dest = path.join(__dirname, '../../uploads/products/images')
        } else if (file.fieldname === 'models') {
            dest = path.join(__dirname, '../../uploads/products/models')
        } else {
            dest = path.join(__dirname, '../../uploads/others')
        }
        
        fs.mkdirSync(dest, { recursive: true })
        cb(null, dest)
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const unique = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
        cb(null, unique)
    }
})

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'images' && !file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo file immagine consentiti'), false)
        }
        if (file.fieldname === 'models' && !['model/gltf+json', 'application/octet-stream', 'application/gltf-buffer', 'model/obj', 'model/stl'].includes(file.mimetype)) {
            return cb(new Error('Formato modello non supportato'), false)
        }
        cb(null, true)
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB
    }
})

const uploadMiddleware = upload.fields([
    { name: 'images', maxCount: 8 },
    { name: 'models', maxCount: 1 }
])

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Errore multer: ' + err.message })
    } else if (err) {
        return res.status(400).json({ error: 'Errore upload: ' + err.message })
    }
    next()
}


module.exports = { uploadMiddleware, multerErrorHandler }
