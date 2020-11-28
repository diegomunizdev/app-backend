import { Request, Response } from 'express'
import { HttpStatus } from '../../middlewares/http.status'
import { responseError, responseSuccess } from '../../middlewares/response'
import Anamnesis, { IAnamnesis } from '../../models/user.data/anamnesis.model'
import { ValidateAnamnesis } from '../../models/validators/anamnesis.validator'
import { PaginationData } from '../pagination/pagination.controller'

export const createAnamnesis = async (req: Request, res: Response) => {
    try {
        const anamnesis: IAnamnesis = new Anamnesis(req.body)
        if (!anamnesis) responseError(res, 'Listing could not be created.', HttpStatus.BAD_REQUEST)
        ValidateAnamnesis.validate(anamnesis)
        await anamnesis.save()
        responseSuccess(res, anamnesis, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error)
    }
}

export const getAllAnamnesis = PaginationData(Anamnesis)

export const getByAnamnesisId = async (req: Request, res: Response) => {
    try {
        const anamnesis = await Anamnesis.findById(req.params.anamnesisId)
        if (!anamnesis) responseError(res, 'Bad request', HttpStatus.BAD_REQUEST)
        responseSuccess(res, anamnesis, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error)
    }
}

export const updateAnamnesis = async (req: Request, res: Response) => {
    try {
        const { anamnesisId } = req.params
        if (!anamnesisId) responseError(res, 'Bad request', HttpStatus.BAD_REQUEST)
        const anamnesis = {
            activity_objective: req.body.activity_objective,
            health_problems: req.body.health_problems,
            medical_treatment: req.body.medical_treatment,
            medication_use: req.body.medication_use,
            diabetes: req.body.diabetes,
            arterial_hypertension: req.body.arterial_hypertension,
            arterial_hypotension: req.body.arterial_hypotension,
            smoking: req.body.smoking,
            allergy: req.body.allergy,
            pacemaker: req.body.pacemaker,
            sitting_time: req.body.sitting_time,
            standing_time: req.body.standing_time,
            prosthesis: req.body.prosthesis,
            orthosis: req.body.orthosis,
            water_day: req.body.water_day,
            intestinal_disorder: req.body.intestinal_disorder,
            hormonal_disorder: req.body.hormonal_disorder,
            next_review: req.body.next_review
        }
        await Anamnesis.findByIdAndUpdate(anamnesisId, {
            $set: anamnesis
        }, { new: true })
        responseSuccess(res, anamnesis, HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteAnamnesis = async (req: Request, res: Response) => {
    try {
        const anamnesisId = req.params.anamnesisId
        if (!anamnesisId) responseError(res, 'Bad request', HttpStatus.BAD_REQUEST)
        await Anamnesis.findByIdAndRemove(anamnesisId)
        responseSuccess(res, 'Anamneses successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error)
    }
}