import { Response } from 'express'
import { HttpStatus } from './http.status'

export const responseError = (res: Response, err: any, status_code?: number) => {
    return res.status(status_code ? status_code : HttpStatus.BAD_REQUEST).json({
        code: status_code,
        status: 'Failure',
        message: err,
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