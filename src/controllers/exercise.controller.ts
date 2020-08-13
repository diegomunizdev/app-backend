import { Request, Response } from 'express'
import Exercise, { IExercise } from '../models/user.data/exercise.model'

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exercise: IExercise = new Exercise(req.body)
        await exercise.save()
        res.status(200).json({
            message: 'Exercise successfully created'
        })
    } catch (error) {
        res.json(error)
    }
}

export const getExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await Exercise.find()
        if (!exercises) return res.status(404).json({
            error: 'Failed. Exercises were not found'
        })
        res.status(200).json(exercises)
    } catch (error) {
        res.json(error)
    }
}

export const getExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId)
        if (!exercise) return res.status(404).json({
            error: 'Failed. Exercise not found'
        })
        res.status(200).json(exercise)
    } catch (error) {
        res.json(error)
    }
}

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const { exerciseId } = req.params
        if (!exerciseId) return res.status(404).json({
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
        res.status(200).json({
            message: 'Exercises updated successfully'
        })
    } catch (error) {
        res.json(error)
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exerciseId = req.params.exerciseId
        if (!exerciseId) return res.status(404).json({
            error: 'Failed. Exercise not found'
        })
        await Exercise.findByIdAndRemove(exerciseId)
        res.status(200).json({
            message: 'Exercise successfully removed'
        })
    } catch (error) {
        res.json(error)
    }
}