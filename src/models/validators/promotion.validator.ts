import * as yup from 'yup'

export const ValidatePromotion = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string(),
    value: yup.number().required(),
    date_start: yup.string(),
    date_end: yup.string(),
    user_id: yup.string().required(),
})