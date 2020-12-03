import { Request, Response } from 'express'
import { HttpStatus } from '../../middlewares/http.status'
import { responseError, responseSuccess } from '../../middlewares/response'
import { UserType } from '../../models/user.data/user.model'

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

        try {
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

            result.data = await model.find()
                .limit(limit)
                .skip(startIndex)
                .exec()

            result.data.map((dt: any) => dt.password = undefined)

            if (!result.data) return responseError(res, 'Bad Request', HttpStatus.BAD_REQUEST)

            return responseSuccess(res, result, HttpStatus.OK)
        } catch (error) {
            responseError(res, error)
        }
    }
}

export const PaginationDataType = (model: any) => {
    return async (req: Request, res: Response) => {
        let page: number = 0
        let limit: number = 0
        let type: any = ''
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
        try {
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

            if (!result) return responseError(res, 'Bad request', HttpStatus.BAD_REQUEST)
            result.data.map((dt: any) => dt.password = undefined)
            return responseSuccess(res, result, HttpStatus.OK)
        } catch (error) {
            responseError(res, error)
        }
    }
}