import GenderType from '../user.data/admin.model'
import * as yup from 'yup'

/**
 * Yup validation field's
 * https://github.com/jquense/yup
 */

export const ValidateUser = yup.object().shape({
    name: yup.string().required('Inform the name'),
    email: yup.string().email('Inform the email'),
    password: yup.string().required('At least 8 characters').min(4).max(30),
    individualRegistration: yup.string().required('Inform the individual registration'),
    age: yup.number().required(),
    dateBirth: yup.string().required(),
    type: yup.string().required(), // admin, client or personal_trainer
    phone: yup.string(),
    gender: yup.string().oneOf(Object.values(GenderType)), // male or female
    contractStart: yup.string(),
    contractEnd: yup.string()
})
