import { Document } from 'mongoose';

export interface IAnamnesis extends Document {
    activityObjective: string;
    healthProblems: string;
    medicalTreatment: boolean;
    medicationUse: string;
    diabetes: string;
    arterialHypertension: string;
    arterialHypotension: string;
    smoking: string;
    allergy: string;
    pacemaker: string;
    sittingTime: string;
    standingTime: string;
    prosthesis: string;
    orthosis: string;
    waterDay: string;
    intestinalDisorder: string;
    hormonalDisorder: string;
    nextReview: string;
    userId: string;
}