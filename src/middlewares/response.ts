import { Response } from 'express'

export const responseError = (res: Response, err: any, status_code?: number) => {
    return res.status(status_code ? status_code : 500).json({
        code: status_code,
        status: 'Failure',
        error: err
    })
}

export const responseSuccess = (res: Response, data: any, status_code: number) => {
    return res.status(status_code).json({
        code: status_code,
        status: 'success',
        data: data
    })
}