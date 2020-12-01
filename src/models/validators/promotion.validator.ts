import * as yup from 'yup'

export const ValidatePromotion = yup.object().shape({
    title: yup.string().required('Inform the title'),
    subtitle: yup.string(),
    value: yup.number().required('Inform the value'),
    date_start: yup.string().required('Inform the date start'),
    date_end: yup.string(),
    user_id: yup.string().required('Inform the user'),
})