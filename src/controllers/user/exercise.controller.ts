import { Request, Response } from 'express'
import { Error } from 'mongoose'
import Exercise, { IExercise } from '../../models/user.data/exercise.model'
import { ValidateExercise } from '../../models/validators/exercise.validator'

export const createExercise = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const exercise: IExercise = new Exercise(req.body)
        if (!exercise) throw new Error(err.message)
        ValidateExercise.validate(exercise)
        const result: IExercise = await exercise.save()
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const getByExerciseId = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId)
        if (!exercise) throw new Error(err.message)
        res.status(201).json(exercise)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const updateExercise = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const { exerciseId } = req.params
        if (!exerciseId) throw new Error(err.message)
        const exercise = req.body
        const result = await Exercise.findByIdAndUpdate(exerciseId, {
            $set: exercise
        }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}

export const deleteExercise = async (err: Error, req: Request, res: Response): Promise<any> => {
    try {
        const exerciseId = req.params.exerciseId
        if (!exerciseId) throw new Error(err.message)
        const result = await Exercise.findByIdAndRemove(exerciseId)
        res.status(200).json(result)
    } catch (error) {
        throw new Error(error.message || err.message)
    }
}