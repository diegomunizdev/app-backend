import { Request, Response } from 'express'
import Exercise, { IExercise } from '../models/user.data/exercise.model'
import { PaginationData } from './pagination.controller'
import { responseError, responseSuccess } from '../middlewares/response'
import { ValidateExercise } from '../validators/exercise.validator'

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exercise: IExercise = new Exercise(req.body)
        if (!exercise) responseError(res, 'Exercise not created', 404)
        ValidateExercise.validate(exercise)
        await exercise.save()
        responseSuccess(res, exercise, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const getExercises = PaginationData(Exercise)

export const getByExerciseId = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId)
        if (!exercise) responseError(res, 'Exercise not found', 404)
        responseSuccess(res, exercise, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const { exerciseId } = req.params
        if (!exerciseId) responseError(res, 'Exercise not found', 404)
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
        responseSuccess(res, exercise, 200)
    } catch (error) {
        responseError(res, error)
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exerciseId = req.params.exerciseId
        if (!exerciseId) responseError(res, 'Exercise not found', 404)
        await Exercise.findByIdAndRemove(exerciseId)
        responseSuccess(res, 'Exercise successfully removed', 200)
    } catch (error) {
        responseError(res, error)
    }
}