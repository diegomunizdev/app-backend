import { Request, Response } from 'express'
import Photo from '../../models/user.data/photo.model'
import path from 'path'
import fs from 'fs-extra'
import { responseError, responseSuccess } from '../../middlewares/response'
import { HttpStatus } from '../../middlewares/http.status'

export const createPhoto = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body

        const myPhoto = {
            user_id: user_id,
            imagePath: `${process.env.URL_BASE}/user/${req.file.filename}`
        }

        if (!myPhoto.user_id) responseError(res, 'User not found', HttpStatus.NOT_FOUND)

        const photo = new Photo(myPhoto)
        await photo.save()
        responseSuccess(res, photo, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error)
    }
}

export const getPhoto = async (req: Request, res: Response) => {
    try {
        const userId = await Photo.findOne({ user_id: req.params.userId })
        if (!userId) responseError(res, 'Photo not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, userId, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updatePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findOne({ user_id: req.params.userId })
        if (!photo) responseError(res, 'Photo not found', HttpStatus.NOT_FOUND)
        const pht = {
            user_id: photo?.user_id,
            imagePath: `${process.env.URL_BASE}/user/${req.file.filename}`
        }

        await Photo.findByIdAndUpdate(photo?.id, {
            $set: pht
        }, { new: true })
        responseSuccess(res, pht, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findOne({ user_id: req.params.userId })
        if (!photo) return responseError(res, 'Photo not found', HttpStatus.NOT_FOUND)
        const pht = await Photo.findByIdAndRemove(photo?.id);
        if (pht) {
            const ph = pht.imagePath.split('T')
            await fs.unlink(`uploads/T${ph[1]}`);
        }
        responseSuccess(res, 'Photo successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}