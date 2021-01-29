import { Request, Response } from 'express'
import Exercise, { IExercise } from '../../models/user.data/exercise.model'
import { responseError, responseSuccess } from '../../middlewares/response'
import { ValidateExercise } from '../../models/validators/exercise.validator'
import { PaginationData } from '../pagination/pagination.controller'
import { HttpStatus } from '../../middlewares/http.status'

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exercise: IExercise = new Exercise(req.body)
        if (!exercise) responseError(res, 'Exercise not created', HttpStatus.BAD_REQUEST)
        ValidateExercise.validate(exercise)
        await exercise.save()
        responseSuccess(res, exercise, HttpStatus.CREATED)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const getExercises = PaginationData(Exercise)

export const getByExerciseId = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId)
        if (!exercise) responseError(res, 'Exercise not found', HttpStatus.NOT_FOUND)
        responseSuccess(res, exercise, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const { exerciseId } = req.params
        if (!exerciseId) responseError(res, 'Exercise not found', HttpStatus.NOT_FOUND)
        // TODO Validar se precisar modificar ou se recebe tudo pelo req.body
        const exercise = {
            exercise_monday: req.body.exercise_monday,
            exercise_tuesday: req.body.exercise_tuesday,
            exercise_wednesday: req.body.exercise_wednesday,
            exercise_thursday: req.body.exercise_thursday,
            exercise_friday: req.body.exercise_friday,
            exercise_saturday: req.body.exercise_saturday,
            exercise_sunday: req.body.exercise_sunday,
            exercise_start: req.body.exercise_start,
            exercise_end: req.body.exercise_end
        }
        await Exercise.findByIdAndUpdate(exerciseId, {
            $set: exercise
        }, { new: true })
        responseSuccess(res, exercise, HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exerciseId = req.params.exerciseId
        if (!exerciseId) responseError(res, 'Exercise not found', HttpStatus.NOT_FOUND)
        await Exercise.findByIdAndRemove(exerciseId)
        responseSuccess(res, 'Exercise successfully removed', HttpStatus.OK)
    } catch (error) {
        responseError(res, error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}