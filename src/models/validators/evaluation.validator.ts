import * as yup from 'yup';

export const ValidateEvaluation = yup.object().shape({
    note: yup.number().min(1).max(10),
    title: yup.string(),
    description: yup.string()
});