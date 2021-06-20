import { Request, Response } from 'express';
import { Error } from 'mongoose';

import { IEvaluation } from '../models/interfaces/evalution.interface';
import Evaluation from '../models/evaluation.model';
import { ValidateEvaluation } from '../models/validators/evaluation.validator';
import { HttpStatusCode } from './errors/errors';


export const createEvaluation = async (err: Error, req: Request, res: Response) => {
    try {
        const evaluation: IEvaluation = new Evaluation(req.body);
        if (!evaluation) throw new Error(err.message);
        ValidateEvaluation.validate(evaluation);
        const result = await evaluation.save();
        res.status(HttpStatusCode.CREATED).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getEvaluationById = async (err: Error, req: Request, res: Response) => {
    try {
        const evaluation = await Evaluation.findOne({ id: req.params.evaluationId });
        if (!evaluation) throw new Error(err.message);
        res.status(HttpStatusCode.OK).json(evaluation);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateEvaluation = async (err: Error, req: Request, res: Response) => {
    try {
        const evaluationId = Evaluation.findById({ id: req.params.evaluationId });
        if (!evaluationId) throw new Error(err.message);
        const evaluation = req.body;
        ValidateEvaluation.validate(evaluation);
        const result = await Evaluation.findByIdAndUpdate(evaluationId, {
            $set: evaluation
        }, { new: true });
        res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteEvaluation = async (err: Error, req: Request, res: Response) => {
    try {
        const evaluationId = await Evaluation.findById({ id: req.params.evaluationId });
        if (!evaluationId) throw new Error(err.message);
        const deleteEvaluation = await Evaluation.findByIdAndRemove(evaluationId);
        if (!deleteEvaluation) throw new Error(err.message);
        res.status(HttpStatusCode.OK);
    } catch (error) {
        throw new Error(error.message);
    }
}
