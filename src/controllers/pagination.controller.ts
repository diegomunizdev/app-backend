import { Request, Response } from "express"
import { UserType } from '../models/user.data/user.model'

export const PaginationData = (model: any) => {
    return async (req: Request, res: Response) => {
        const page = parseInt(String(req.query.page), 10)
        const limit = parseInt(String(req.query.limit), 10)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = {
            "total": await model.countDocuments().exec(),
            "previous": {},
            "next": {},
            "data": []
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }

        if (endIndex < await model.countDocuments().exec()) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }

        try {
            result.data = await model.find()
                .limit(limit)
                .skip(startIndex)
                .exec()

            result.data.map((dt: any) => dt.password = undefined)

            if (!result) return res.status(400).json({
                status: 'Failure',
                error: 'Users not found'
            })

            res.status(200).json({ status: 'Success', result: result })
        } catch (error) {
            res.json({ status: 'Failure', error: error })
        }
    }
}

export const PaginationDataType = (model: any) => {
    return async (req: Request, res: Response) => {
        let page: number = 0
        let limit: number = 0
        let type: string = ''
        if (req.params.type && req.query.page && req.query.limit) {
            page = parseInt(String(req.query.page), 10)
            limit = parseInt(String(req.query.limit), 10)
            type = req.params.type
        }

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = {
            "total": await model.countDocuments({ type: type }).exec(),
            "previous": {},
            "next": {},
            "data": []
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }

        if (endIndex < await model.countDocuments({ type: type }).exec()) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }

        try {

            if (UserType.ADMIN === type) {
                result.data = await model.find({ type: UserType.ADMIN })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            } else if (UserType.CLIENT === type) {
                result.data = await model.find({ type: UserType.CLIENT })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            } else if (UserType.PERSONAL_TRAINER === type) {
                result.data = await model.find({ type: UserType.PERSONAL_TRAINER })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            }

            if (!result.data) return res.status(404).json({
                status: 'Failute',
                message: 'User not found'
            })

            result.data.map((dt: any) => dt.password = undefined)

            if (!result) return res.status(400).json({
                status: 'Failure',
                error: 'Users not found'
            })

            res.status(200).json({ status: 'Success', result: result })
        } catch (error) {
            res.json({ status: 'Failure', error: error })
        }
    }
}