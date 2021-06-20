import * as yup from 'yup';

export const ValidateAnamnesis = yup.object().shape({
    diabetes: yup.string(),
    arterialHypertension: yup.string(),
    arterialHypotension: yup.string(),
    smoking: yup.string(),
    allergy: yup.string(),
    medicalTreatment: yup.string(),
    medicationUse: yup.string(),
    heartProblem: yup.string(),
    pacemaker: yup.string(),
    sittingTime: yup.string(),
    standingTime: yup.string(),
    prosthesis: yup.string(),
    orthosis: yup.string(),
    waterDay: yup.string(),
    intestinalDisorder: yup.string(),
    hormonalDisorder: yup.string(),
    userId: yup.string().required('Inform the user')
});