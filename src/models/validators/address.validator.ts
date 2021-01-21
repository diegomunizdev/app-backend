import * as yup from 'yup'

export const ValidateAddress = yup.object().shape({
    zip_code: yup.string().required('Inform the zip code'),
    street: yup.string(),
    complement: yup.string(),
    number: yup.string().required('Inform the number'),
    district: yup.string(),
    city: yup.string(),
    state: yup.string(),
    user_id: yup.string().required('Inform the user')
})