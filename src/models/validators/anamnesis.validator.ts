import * as yup from 'yup'

export const ValidateAnamnesis = yup.object().shape({
    diabetes: yup.string(),
    arterial_hypertension: yup.string(),
    arterial_hypotension: yup.string(),
    smoking: yup.string(),
    allergy: yup.string(),
    medical_treatment: yup.string(),
    medication_use: yup.string(),
    heart_problem: yup.string(),
    pacemaker: yup.string(),
    sitting_time: yup.string(),
    standing_time: yup.string(),
    prosthesis: yup.string(),
    orthosis: yup.string(),
    water_day: yup.string(),
    intestinal_disorder: yup.string(),
    hormonal_disorder: yup.string(),
    user_id: yup.string().required('Informe the user')
})