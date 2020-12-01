import * as yup from 'yup'

export const ValidateExercise = yup.object().shape({
    exercise_monday: yup.string(),
    exercise_tuesday: yup.string(),
    exercise_wednesday: yup.string(),
    exercise_thursday: yup.string(),
    exercise_friday: yup.string(),
    exercise_saturday: yup.string(),
    exercise_sunday: yup.string(),
    exercise_start: yup.string().required('Inform the date start'),
    exercise_end: yup.string(),
    user_id: yup.string().required('Inform the user')
})