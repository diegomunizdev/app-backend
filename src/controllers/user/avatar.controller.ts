import { Request, Response } from 'express'
import Avatar from '../../models/user.data/avatar.model'
import fs from 'fs-extra'
import { responseError, responseSuccess } from '../../middlewares/response'
import { HttpStatus } from '../../middlewares/http.status'

export const createAvatar = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body

        const myAvatar = {
            user_id: user_id,
            imagePath: `${process.env.URL_BASE}/user/${req.file.filename}`
        }

        if (!myAvatar.user_id) responseError(res, 'User not found', HttpStatus.NOT_FOUND)

        const avatar = new Avatar(myAvatar)
        await avatar.save()
        responseSuccess(res, avatar, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error)
    }
}

export const getAvatar = async (req: Request, res: Response) => {
    try {
        const userId = await Avatar.findOne({ user_id: req.params.userId })
        if (!userId) responseError(res, 'Avatar not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, userId, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updateAvatar = async (req: Request, res: Response) => {
    try {
        const avatar = await Avatar.findOne({ user_id: req.params.userId })
        if (!avatar) responseError(res, 'Avatar not found', HttpStatus.NOT_FOUND)
        const pht = {
            user_id: avatar?.user_id,
            imagePath: `${process.env.URL_BASE}/user/${req.file.filename}`
        }

        await Avatar.findByIdAndUpdate(avatar?.id, {
            $set: pht
        }, { new: true })
        responseSuccess(res, pht, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deleteAvatar = async (req: Request, res: Response) => {
    try {
        const avatar = await Avatar.findOne({ user_id: req.params.userId })
        if (!avatar) return responseError(res, 'Avatar not found', HttpStatus.NOT_FOUND)
        const avt = await Avatar.findByIdAndRemove(avatar?.id);
        if (avt) {
            const ph = avt.avatar.split('T')
            await fs.unlink(`uploads/T${ph[1]}`);
        }
        responseSuccess(res, 'Avatar successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}