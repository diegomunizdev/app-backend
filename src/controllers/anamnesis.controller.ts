import { Request, Response } from 'express'
import Anamnesis, { IAnamnesis } from '../models/user.data/anamnesis.model'

export const createAnamnesis = async (req: Request, res: Response) => {
    try {
        const anamnesis: IAnamnesis = new Anamnesis(req.body)
        await anamnesis.save()
        res.status(200).json({
            message: 'Anamnesis successfully created'
        })
    } catch (error) {
        res.json(error)
    }
}

export const getAllAnamnesis = async (req: Request, res: Response) => {
    try {
        const anamnesis = await Anamnesis.find()
        if (!anamnesis) return res.status(400).json({
            message: 'Failed. Anamnesis were not found'
        })
        res.status(200).json(anamnesis)
    } catch (error) {
        res.json(error)
    }
}

export const getAnamnesis = async (req: Request, res: Response) => {
    try {
        const anamnesis = await Anamnesis.findById(req.params.anamnesisId)
        if (!anamnesis) return res.status(404).json({
            message: 'Failed. Anamnesis not found'
        })
        res.status(200).json(anamnesis)
    } catch (error) {

    }
}

export const updateAnamnesis = async (req: Request, res: Response) => {
    try {
        const { anamnesisId } = req.params
        if (!anamnesisId) return res.status(404).json({
            message: 'Failed. Anamnesis not found'
        })
        const anamnesis = {
            diabetes: req.body.diabetes,
            arterial_hypertension: req.body.arterial_hypertension,
            arterial_hypotension: req.body.arterial_hypotension,
            smoking: req.body.smoking,
            allergy: req.body.allergy,
            medical_treatment: req.body.medical_treatment,
            medication_use: req.body.medication_use,
            heart_problem: req.body.heart_problem,
            pacemaker: req.body.pacemaker,
            sitting_time: req.body.sitting_time,
            standing_time: req.body.standing_time,
            prosthesis: req.body.prosthesis,
            orthosis: req.body.orthosis,
            water_day: req.body.water_day,
            intestinal_disorder: req.body.intestinal_disorder,
            hormonal_disorder: req.body.hormonal_disorder
        }
        await Anamnesis.findByIdAndUpdate(anamnesisId, {
            $set: anamnesis
        }, { new: true })
        res.status(200).json({
            message: 'Anamnesis updated successfully'
        })
    } catch (error) {
        res.json(error)
    }
}

export const deleteAnamnesis = async (req: Request, res: Response) => {
    try {
        const anamnesisId = req.params.anamnesisId
        if (!anamnesisId) return res.status(404).json({
            message: 'Failed. Anamnesis not found'
        })
        await Anamnesis.findByIdAndRemove(anamnesisId)
        res.status(200).json({
            message: 'Anamnesis successfully removed'
        })
    } catch (error) {
        res.json(error)
    }
}