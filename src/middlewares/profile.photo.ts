import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) callback(err, '')
            // TODO: Revisar hash depois. Essa hash coloca um id no nome da foto.
            const fileName = `${hash.toString("hex")}-${file.originalname}`
            callback(null, fileName)
        })
    }
})

export const UploadFile = multer({ storage })