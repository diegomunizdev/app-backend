import { Request, Response } from 'express'
import Avatar from '../../models/user.data/avatar.model'
import { Stream } from 'stream'
import { Error } from 'mongoose'

export const createAvatar = async (err: Error, req: any, res: Response): Promise<any> => {
    try {
        if (!req.file) throw new Error(err.message)
        const avatar = new Avatar({
            contentType: req.file.mimetype,
            filename: req.file.originalname,
            size: req.file.size,
            data: Buffer.from(req.file.buffer),
            userId: req.params.userId
        })
        const result = await avatar.save()
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const getAvatar = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const avatar = await Avatar.findOne({ userId: req.params.userId })
        if (!avatar) throw new Error(err.message)
        const readStream = new Stream.PassThrough()
        res.set('Content-Disposition', 'inline')
        res.set('Content-Type', avatar?.contentType)
        readStream.pipe(res)
        readStream.end(avatar?.data)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}