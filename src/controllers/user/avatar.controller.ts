import { Request, Response } from 'express'
import Avatar from '../../models/user.data/avatar.model'
import fs from 'fs-extra'
import { responseError, responseSuccess } from '../../middlewares/response'
import { HttpStatus } from '../../middlewares/http.status'
import { Stream } from 'stream'

export const createAvatar = async (req: any, res: Response) => {
    try {
        console.log('req.file', req.file)
        if (!req.file) throw new Error('Please submit a image with refer key name "avatar".')
        const avatar = new Avatar({
            contentType: req.file.mimetype,
            filename: req.file.originalname,
            size: req.file.size,
            data: Buffer.from(req.file.buffer),
            userId: req.params.userId
        })

        await avatar.save()
        responseSuccess(res, avatar, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error)
    }
}

export const getAvatar = async (req: Request, res: Response): Promise<any> => {
    try {
        const avatar = await Avatar.findOne({ userId: req.params.userId })
        if (!avatar) responseError(res, 'Avatar not found', HttpStatus.NOT_FOUND)
        const readStream = new Stream.PassThrough()
        res.set('Content-Disposition', 'inline')
        res.set('Content-Type', avatar?.contentType)
        readStream.pipe(res)
        readStream.end(avatar?.data)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}