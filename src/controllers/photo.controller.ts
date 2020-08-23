import { Request, Response } from 'express'
import Photo from '../models/user.data/photo.model'
import path from 'path'
import fs from 'fs-extra'
import { responseError, responseSuccess } from '../middlewares/response'

export const createPhoto = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body

        const myPhoto = {
            user_id: user_id,
            imagePath: req.file.path
        }

        if (!myPhoto.user_id) responseError(res, 'User not found', 404)

        const photo = new Photo(myPhoto)
        await photo.save()
        responseSuccess(res, photo, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const getPhoto = async (req: Request, res: Response) => {
    try {
        const userId = await Photo.findOne({ user_id: req.params.userId })
        if (!userId) responseError(res, 'Photo not found', 404)
        responseSuccess(res, userId, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const updatePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findOne({ user_id: req.params.userId })
        if (!photo) responseError(res, 'Photo not found', 404)
        const pht = {
            user_id: photo?.user_id,
            imagePath: req.file.path
        }

        await Photo.findByIdAndUpdate(photo?.id, {
            $set: pht
        }, { new: true })
        responseSuccess(res, pht, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findOne({ user_id: req.params.userId })
        if (!photo) responseError(res, 'Photo not found', 404)
        const pht = await Photo.findByIdAndRemove(photo?.id);
        if (pht) {
            fs.unlink(path.resolve(pht.imagePath));
        }
        responseSuccess(res, 'Photo successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}