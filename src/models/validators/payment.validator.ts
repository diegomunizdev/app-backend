import * as Yup from 'yup'

export const ValidatePayment = Yup.object().shape({
    value: Yup.number(),
    payment_id: Yup.number(),
    user_id: Yup.string().required('Inform the user')
})