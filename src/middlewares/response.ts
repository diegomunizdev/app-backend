import { Response } from 'express'

export const responseError = (res: Response, err: any, status_code?: number) => {
    return res.status(status_code ? status_code : 400).json({
        code: status_code,
        status: 'Failure',
        message: err.message,
        field: err.path
    })
}

export const responseSuccess = (res: Response, data: any, status_code: number) => {
    return res.status(status_code).json({
        code: status_code,
        status: 'success',
        data: data
    })
}