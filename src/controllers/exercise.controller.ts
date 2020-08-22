import { Request, Response } from 'express'
import Exercise, { IExercise } from '../models/user.data/exercise.model'
import { PaginationData } from './pagination.controller'
import { responseError, responseSuccess} from '../middlewares/response'

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exercise: IExercise = new Exercise(req.body)
        if (!exercise) return res.status(400).json({
            status: 'Failure',
            error: 'Unable to save exercise'
        })
        await exercise.save()
        res.status(200).json({ status: 'Success', data: exercise })
    } catch (error) {
        responseError(res, error)
    }
}

export const getExercises = PaginationData(Exercise)

export const getByExerciseId = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId)
        if (!exercise) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Exercise not found'
        })
        res.status(200).json({ status: 'Success', data: exercise })
    } catch (error) {
        responseError(res, error)
    }
}

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const { exerciseId } = req.params
        if (!exerciseId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Exercise not found'
        })
        const exercise = {
            exercise_monday: req.body.exercise_monday,
            exercise_tuesday: req.body.exercise_tuesday,
            exercise_wednesday: req.body.exercise_wednesday,
            exercise_thursday: req.body.exercise_thursday,
            exercise_friday: req.body.exercise_friday,
            exercise_saturday: req.body.exercise_saturday,
            exercise_sunday: req.body.exercise_sunday
        }
        await Exercise.findByIdAndUpdate(exerciseId, {
            $set: exercise
        }, { new: true })
        res.status(200).json({ status: 'Success', data: exercise })
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exerciseId = req.params.exerciseId
        if (!exerciseId) return res.status(404).json({
            status: 'Failure',
            error: 'Failed. Exercise not found'
        })
        await Exercise.findByIdAndRemove(exerciseId)
        res.status(200).json({
            status: 'Success',
            message: 'Exercise successfully removed'
        })
    } catch (error) {
        responseError(res, error)
    }
}