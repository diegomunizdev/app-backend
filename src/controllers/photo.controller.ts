import { Request, Response } from 'express'
import Photo from '../models/user.data/photo.model'
import path from 'path'
import fs from 'fs-extra'
import { responseError, responseSuccess } from '../middlewares/response'

// TODO: refatorar respostas

export const createPhoto = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body

        const myPhoto = {
            user_id: user_id,
            imagePath: req.file.path
        }

        if (!myPhoto.user_id) return res.status(404).json({
            status: 'Failure',
            error: 'User not found'
        })

        const photo = new Photo(myPhoto)
        await photo.save()
        res.status(200).json({ status: 'Success', data: photo })
    } catch (error) {
        responseError(res, error)
    }
}

export const getPhoto = async (req: Request, res: Response) => {
    try {
        const userId = await Photo.findOne({ user_id: req.params.userId })
        if (!userId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. photo not found'
        })
        res.status(200).json({ status: 'Success', data: userId })
    } catch (error) {
        responseError(res, error)
    }
}

export const updatePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findOne({ user_id: req.params.userId })
        if (!photo) res.status(404).json({
            status: 'Failure',
            error: 'Failed. photo not found'
        })
        const pht = {
            user_id: photo?.user_id,
            imagePath: req.file.path
        }

        await Photo.findByIdAndUpdate(photo?.id, {
            $set: pht
        }, { new: true })
        res.status(200).json({ status: 'Success', data: pht })
    } catch (error) {
        responseError(res, error)
    }
}

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const photo = await Photo.findOne({ user_id: req.params.userId })
        const pht = await Photo.findByIdAndRemove(photo?.id);
        if (pht) {
            fs.unlink(path.resolve(pht.imagePath));
        }
        responseSuccess(res, 'Photo successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}