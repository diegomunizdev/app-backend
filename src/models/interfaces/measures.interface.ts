import {Document} from 'mongoose';

export interface IMeasures extends Document {
    weight: number;
    height: number;
    chest: number;
    waist: number;
    upperAbdomen: number;
    lowerAbdormen: number;
    hip: number;
    rightArm: number;
    leftArm: number;
    beforeRightArm: number;
    beforeLeftArm: number;
    upperRightThigh: number;
    upperLeftThigh: number;
    mediumRightThigh: number;
    middleLeftThigh: number;
    rightCalf: number;
    leftCalf: number;
    nextReview: string;
    userId: string;
}