import { GenderType, UserType } from '../user.data/user.model'
import * as yup from 'yup'

/**
 * Yup validation field's
 * https://github.com/jquense/yup
 */

export const ValidateUser = yup.object().shape({
    name: yup.string().required('Inform the name'),
    username: yup.string().required('Inform the username'),
    email: yup.string().email('Inform the email'),
    password: yup.string().required('At least 8 characters').min(8),
    individual_registration: yup.string().required('Inform the cpf'),
    age: yup.number().required(),
    date_of_birth: yup.string().required(),
    type: yup.string().oneOf(Object.values(UserType)).required(), // admin, client or personal_trainer
    phone: yup.string(),
    gender: yup.string().oneOf(Object.values(GenderType)) // male or female
})
