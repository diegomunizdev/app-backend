import * as Yup from 'yup'

export const ValidatePayment = Yup.object().shape({
    value: Yup.number(),
    paymentId: Yup.number(),
    userId: Yup.string().required('Inform the user')
})