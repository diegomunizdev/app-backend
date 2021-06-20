import * as yup from 'yup';

export const ValidateExercise = yup.object().shape({
    exerciseMonday: yup.string(),
    exerciseTuesday: yup.string(),
    exerciseWednesday: yup.string(),
    exerciseThursday: yup.string(),
    exerciseFriday: yup.string(),
    exerciseSaturday: yup.string(),
    exerciseSunday: yup.string(),
    exerciseStart: yup.string().required('Inform the date start'),
    exerciseEnd: yup.string().required('Inform the date end'),
    userId: yup.string().required('Inform the user')
});